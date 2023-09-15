import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import { Button, Col, FormGroup, Row } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import ComponentCard from '../../components/ComponentCard';
import InvoiceDetailComp from '../../components/BookingTable/InvoiceDetailComp';
import creationdatetime from '../../constants/creationdatetime';
import ComponentCardV2 from '../../components/ComponentCardV2';
import InvoiceItem from '../../components/BookingTable/InvoiceItem';
import ItemTable from '../../components/BookingTable/ItemTable';
import OrderItemTable from '../../components/BookingTable/OrderItemTable';

const InvoiceEdit = () => {
  const [bookingDetails, setBookingDetails] = useState({});
  const [editInvoiceItemData, setEditInvoiceItemData] = useState(false);
  const [itemDetails, setItemDetails] = useState([]);
  const [orderitemDetails, setOrderItemDetails] = useState([]);
  const { insertedDataId, orderId } = useParams();

  console.log('order ID:', orderId);
  const navigate = useNavigate();
  const handleInputs = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };
  const generateData = () => {
    // Step 1: Delete old order items by quote_id
    api
      .delete(`/finance/deleteinvoice_item/${insertedDataId}`)
      .then(() => {
        api
          .post('/invoice/getOrderLineItemsById', { order_id: orderId })
          .then((res) => {
            const quoteItems = res.data.data;
    
            console.log('Received quote items:', quoteItems);
    
            if (quoteItems.length === 0) {
              console.warn('No quote items to insert');
              return;
            }
    
            // Step 3: Insert new order items based on quote items
            const insertInvoiceItems = (index) => {
              if (index < quoteItems.length) {
                const quoteItem = quoteItems[index];
    
                // Insert the order item
                const orderItemData = {
                 invoice_id: insertedDataId,
                  qty: quoteItem.qty,
                  unit_price: quoteItem.unit_price,
                  item_title: quoteItem.item_title,
                  total_cost: quoteItem.cost_price,
                };
    
                console.log(`Inserting order item ${index + 1}:`, orderItemData);
    
                // Send a POST request to your /finance/insertorder_item API with the current order item
                api
                  .post('/finance/insertInvoiceItem', orderItemData)
                  .then((result) => {
                    if (result.data.msg === 'Success') {
                      console.log(`Order item ${index + 1} inserted successfully`);
                    } else {
                      console.error(`Failed to insert order item ${index + 1}`);
                    }
                    // Continue to the next item
                    insertInvoiceItems(index + 1);
                  })
                  .catch((error) => {
                    console.error(`Error inserting order item ${index + 1}`, error);
                    // Continue to the next item
                    insertInvoiceItems(index + 1);
                  });
              } else {
                console.log('All order items inserted successfully');
                // You might want to trigger a UI update here
              }
            };
    
            // Start inserting order items from index 0
            insertInvoiceItems(0);
          })
          .catch((error) => {
            console.error('Error fetching quote items', error);
          });
      })
      .catch((error) => {
        console.error('Error deleting old order items', error);
      });
  };
  const editBookingById = () => {
    api
      .post('/invoice/getInvoiceById', { invoice_id: insertedDataId })
      .then((res) => {
        setBookingDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };
 
  const editItemById = () => {
    api
      .post('/invoice/getInvoiceByItemId', { invoice_id: insertedDataId })
      .then((res) => {
        setItemDetails(res.data.data);
      })
      .catch(() => {
        //message('Booking Data Not Found', 'info');
      });
  };

  const getOrderItemById = () => {
    api
      .post('/invoice/getInvoiceByOrderItemId', { invoice_id: insertedDataId })
      .then((res) => {
        setOrderItemDetails(res.data.data);
      })
      .catch(() => {
        //message('Booking Data Not Found', 'info');
      });
  };

  const editInvoiceData = (shouldNavigate) => {
    api
      .post('/invoice/editInvoices', bookingDetails)
      .then(() => {
        message('Record edited successfully', 'success');
        if (shouldNavigate) {
          setTimeout(() => {
            navigate('/SalesInvoice'); // Navigate after showing the message if shouldNavigate is true
          }, 100);
        }
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const cancelInvoice = () => {
    if (bookingDetails.status !== 'Paid') {
      bookingDetails.modification_date = creationdatetime;
      const updatedInvoice = { ...bookingDetails, status: 'Cancelled' };
      api
        .post('/invoice/editInvoice', updatedInvoice)
        .then(() => {
          message('Invoice cancelled successfully', 'success');
          window.location.reload();
          editBookingById(); // Refresh the invoice details after updating
        })
        .catch(() => {
          message('Unable to cancel invoice.', 'error');
        });
    } else {
      message('Paid invoices cannot be cancelled.', 'info');
    }
  };

  useEffect(() => {
    editBookingById();
    editItemById();
    getOrderItemById();
  }, [insertedDataId]);

  return (
    <>
      <BreadCrumbs />
      <FormGroup>
      <ToastContainer/>
      <ComponentCardV2>
      <Row>
      <Col>
              <Button
                color="primary"
                className="shadow-none"
                onClick={() => {
                  generateData();
                  window.location.reload();
                }}
              >
                Generate Data
              </Button>
            </Col>
         <Col>
              <Button
                color="primary"
                className="shadow-none"
                onClick={() => {
                  editInvoiceData(true);
                
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button
                color="primary"
                className="shadow-none"
                onClick={() => {
                  editInvoiceData(false);
                  
                }}
              >
                Apply
              </Button>
            </Col>
            <Col>
            <Button
        color="danger"
        className="shadow-none"
        onClick={cancelInvoice}
        disabled={bookingDetails.status === 'Paid'}
      >
        Cancel
      </Button>
            </Col>
    
          </Row>
      </ComponentCardV2>
      
      </FormGroup>
  
      {/*Main Details*/}
      <ComponentCard title="Invoice Details">
        <InvoiceDetailComp
          bookingDetails={bookingDetails}
          handleInputs={handleInputs}
        />
      </ComponentCard>
      <InvoiceItem
        editInvoiceItemData={editInvoiceItemData}
        setEditInvoiceItemData={setEditInvoiceItemData}
        invoiceInfo={insertedDataId}
        ></InvoiceItem>
      <ComponentCard title="Invoice Items">
      <Col>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              setEditInvoiceItemData(true);
            }}
          >
            Add Items
          </Button>
        </Col>
        <Row className="border-bottom mb-3">
         <ItemTable
        itemDetails={itemDetails}
        invoiceInfo={insertedDataId}
       />
      </Row>
      </ComponentCard>
      <ComponentCard title="Order Items">
     
        <Row className="border-bottom mb-3">
         <OrderItemTable
        orderitemDetails={orderitemDetails}
        
       />
      </Row>
      </ComponentCard>
    </>
  );
};

export default InvoiceEdit;