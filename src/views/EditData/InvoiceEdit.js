import React, { useContext, useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import { ToastContainer } from 'react-toastify';
import { Row, Col, Form, FormGroup, TabContent, TabPane, Button, Nav, NavItem, NavLink } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import ComponentCard from '../../components/ComponentCard';
import InvoiceDetailComp from '../../components/BookingTable/InvoiceDetailComp';
import creationdatetime from '../../constants/creationdatetime';
import ComponentCardV2 from '../../components/ComponentCardV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
// import InvoiceItem from '../../components/BookingTable/InvoiceItem';
// import ItemTable from '../../components/BookingTable/ItemTable';
import OrderItemTable from '../../components/BookingTable/OrderItemTable';
import PartialINvoiceEdit from '../../components/BookingTable/PartialINvoiceEdit';
import GoodsItemTable from '../../components/BookingTable/GoodsItemTable';
import PartialInvoiceGoodsEdit from '../../components/BookingTable/PartialInvoiceGoodsEdit';
import AppContext from '../../context/AppContext';

const InvoiceEdit = () => {
  const [bookingDetails, setBookingDetails] = useState({});
  // const [editInvoiceItemData, setEditInvoiceItemData] = useState(false);
  // const [itemDetails, setItemDetails] = useState([]);
  const [partialinvoiceeditmodal, setPartialInvoiceEditModal] = useState(false);
  const [partialgoodsinvoiceeditmodal, setPartialGoodsInvoiceEditModal] = useState(false);
  const [orderitemDetails, setOrderItemDetails] = useState([]);
  const { insertedDataId, orderId } = useParams();
  
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [update, setUpdate] = useState(false);

  const { id } = useParams();
  const { loggedInuser } = useContext(AppContext);
  console.log('order ID:', orderId);
  const navigate = useNavigate();
  const handleInputs = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const InvoiceSource = bookingDetails.source_type;

const getDefaultActiveTab = () => {
  if (InvoiceSource === 'Sales_Order') {
    return '1'; // Set to '1' for Sales Invoice Item
  }
  if (InvoiceSource === 'Goods_Delivery') {
    return '2'; // Set to '2' for Goods Invoice Item
  }
  return '3'; // Default to '3' for Attachment
};

const [activeTab, setActiveTab] = useState(getDefaultActiveTab);
// Retrieve visibility states from local storage
const initialVisibilityStates = JSON.parse(localStorage.getItem('visibilityStates')) || {};

const [hideButtonVisible, setHideButtonVisible] = useState(
  initialVisibilityStates[insertedDataId] !== true
);
const [displayButtonVisible, setDisplayButtonVisible] = useState(
  initialVisibilityStates[insertedDataId] !== false
);

const handleHideButtonClick = () => {
  // Update visibility state for the current ID
  const updatedVisibilityStates = {
    ...initialVisibilityStates,
    [insertedDataId]: true,
  };
  localStorage.setItem('visibilityStates', JSON.stringify(updatedVisibilityStates));

  setHideButtonVisible(false);
  setDisplayButtonVisible(true);
};

const handleDisplayButtonClick = () => {
  // Update visibility state for the current ID
  const updatedVisibilityStates = {
    ...initialVisibilityStates,
    [insertedDataId]: false,
  };
  localStorage.setItem('visibilityStates', JSON.stringify(updatedVisibilityStates));

  setDisplayButtonVisible(false);
  setHideButtonVisible(true);
};

// Goods delivry button position

const initialGoodsVisibilityStates = JSON.parse(localStorage.getItem('visibilityStates')) || {};

const [hideGoodsButtonVisible, setGoodsHideButtonVisible] = useState(
  initialGoodsVisibilityStates[insertedDataId] !== true
);
const [displayGoodsButtonVisible, setDisplayGoodsButtonVisible] = useState(
  initialGoodsVisibilityStates[insertedDataId] !== false
);

const handleGoodsHideButtonClick = () => {
  // Update visibility state for the current ID
  const updatedGoodsVisibilityStates = {
    ...initialGoodsVisibilityStates,
    [insertedDataId]: true,
  };
  localStorage.setItem('visibilityStates', JSON.stringify(updatedGoodsVisibilityStates));

  setGoodsHideButtonVisible(false);
  setDisplayGoodsButtonVisible(true);
};

const handleGoodsDisplayButtonClick = () => {
  // Update visibility state for the current ID
  const updatedGoodsVisibilityStates = {
    ...initialGoodsVisibilityStates,
    [insertedDataId]: false,
  };
  localStorage.setItem('visibilityStates', JSON.stringify(updatedGoodsVisibilityStates));

  setDisplayGoodsButtonVisible(false);
  setGoodsHideButtonVisible(true);
};

// Function to toggle tabs
const toggle = (tab) => {
  if (
    (InvoiceSource === 'Sales_Order' && tab === '2') ||
    (InvoiceSource === 'Goods_Delivery' && tab === '1')
  ) {
    // Prevent toggling to other tabs sed on InvoiceSource
    return;
  }

  setActiveTab(tab);
}; 

   // Attachment
   const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  
  const generateData = () => {
    api
      .post('/invoice/getOrderLineItemsById', { order_id: orderId })
      .then((res) => {
        const quoteItems = res.data.data;
        console.log(' Received quote items::', quoteItems);
        if (quoteItems.length === 0) {
          console.warn('No Quote items to insert');
          return;
        }
        // Retrieve all po_product_id  values from the purchase_invoice_items table
        api
          .get('/invoice/checkQuoteItems')
          .then((response) => {
            const ExistingQuoteItemsId = response.data.data; 
            const insertQuoteItems = (index) => {
              if (index < quoteItems.length) {
                const QuoteItem = quoteItems[index];  
                // Check if the po_product_id  already exists in the ExistingQuoteItemsId array
                if (ExistingQuoteItemsId.includes(QuoteItem.order_item_id  )) {
                  console.warn(`Quote item for order id  ${QuoteItem.order_item_id  } already exists, skipping insertion`);
                  message('Invoice items are already Inserted', 'warning');
                  insertQuoteItems(index + 1);
                } else {
                  // Insert the order item
                  const QuoteItemsData = {
                    creation_date : creationdatetime,
                    created_by : loggedInuser.first_name, 
                    invoice_id: insertedDataId,
                  qty: QuoteItem.qty,
                  invoice_qty: QuoteItem.qty,
                  unit_price: QuoteItem.unit_price,
                  item_title: QuoteItem.item_title,
                  total_cost: QuoteItem.cost_price,
                  order_id: QuoteItem.order_id,
                  order_item_id: QuoteItem.order_item_id,
                  invoice_source_id: bookingDetails.invoice_source_id,
                  source_type: bookingDetails.source_type,
                  quote_id: QuoteItem.quote_id
                  };  
                  console.log(`Inserting order item ${index + 1}:`, QuoteItemsData);  
                  // Send a POST request to your /goodsreceipt/insertGoodsReceiptItems API with the current QuoteItemsData
                  api
                    .post('/invoice/insertInvoiceItem', QuoteItemsData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} inserted successfully`);
                        setTimeout(() => {
                          window.location.reload()
                        }, 100);
                      } else {
                        console.error(`Failed to insert order item ${index + 1}`);
                      }
                      // Continue to the next item
                      insertQuoteItems(index + 1);
                    })
                    .catch((error) => {
                      console.error(`Error inserting order item ${index + 1}`, error);
                      // Continue to the next item
                      insertQuoteItems(index + 1);
                    });
                }
              } else {
                console.log('All order items inserted successfully');
                // You might want to trigger a UI update here
              }
            }; 
            // Start inserting order items from index 0
            insertQuoteItems(0);
          })
          .catch((error) => {
            console.error('Error checking order item existence', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching quote items', error);
      });
  };

  const generatePartialData = () => {
    api
      .post('/invoice/getOrderLineItemsById', { order_id: orderId })
      .then((res) => {
        const quoteItems = res.data.data;
        console.log(' Received quote items::', quoteItems);
        if (quoteItems.length === 0) {
          console.warn('No Quote items to insert');
          return;
        }
        // Retrieve all po_product_id  values from the purchase_invoice_items table
        api
          .get('/invoice/checkQuoteItems')
          .then((response) => {
            const ExistingQuoteItemsId = response.data.data; 
            const insertQuoteItems = (index) => {
              if (index < quoteItems.length) {
                const QuoteItem = quoteItems[index];  
                // Check if the po_product_id  already exists in the ExistingQuoteItemsId array
                if (ExistingQuoteItemsId.includes(QuoteItem.order_item_id )) {
                  // console.warn(`Quote item for order id  ${QuoteItem.order_item_id } already exists, skipping insertion`);
                  // message('Invoice items are already Inserted', 'warning');
                insertQuoteItems(index + 1);
                } else {
                  // Insert the order item
                  const QuoteItemsData = {
                    creation_date : creationdatetime,
                    created_by : loggedInuser.first_name, 
                    invoice_id: insertedDataId,
                  qty: QuoteItem.qty,
                  unit_price: QuoteItem.unit_price,
                  item_title: QuoteItem.item_title,
                  total_cost: QuoteItem.cost_price,
                  order_id: QuoteItem.order_id,
                  order_item_id: QuoteItem.order_item_id,
                  invoice_source_id: bookingDetails.invoice_source_id,
                  source_type: bookingDetails.source_type,
                  quote_id: QuoteItem.quote_id
                  };  
                  console.log(`Inserting order item ${index + 1}:`, QuoteItemsData);  
                  // Send a POST request to your /goodsreceipt/insertGoodsReceiptItems API with the current QuoteItemsData\
                  api
                    .post('/invoice/insertInvoiceItem', QuoteItemsData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} inserted successfully`);
                        setTimeout(() => {
                          window.location.reload()
                        }, 100);
                      } else {
                        console.error(`Failed to insert order item ${index + 1}`);
                      }
                      // Continue to the next item
                      insertQuoteItems(index + 1);
                    })
                    .catch((error) => {
                      console.error(`Error inserting order item ${index + 1}`, error);
                      // Continue to the next item
                      insertQuoteItems(index + 1);
                    });
                }
              } else {
                console.log('All order items inserted successfully');
                // You might want to trigger a UI update here
              }
            }; 
            // Start inserting order items from index 0
            insertQuoteItems(0);
          })
          .catch((error) => {
            console.error('Error checking order item existence', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching quote items', error);
      });
  };

  const generateGoodsData = () => {
    api
      .post('/invoice/getGoodsLineItemsById', { goods_delivery_id: orderId })
      .then((res) => {
        console.log('getGoodsLineItemsById', orderId)
        const quoteItems = res.data.data;
        console.log(' Received quote items::', quoteItems);
        if (quoteItems.length === 0) {
          console.warn('No Quote items to insert');
          return;
        }
        // Retrieve all po_product_id  values from the purchase_invoice_items table
        api
          .get('/invoice/checkGoodsItems')
          .then((response) => {
            const ExistingQuoteItemsId = response.data.data; 
            const insertQuoteItems = (index) => {
              if (index < quoteItems.length) {
                const QuoteItem = quoteItems[index];  
                // Check if the po_product_id  already exists in the ExistingQuoteItemsId array
                if (ExistingQuoteItemsId.includes(QuoteItem.goods_delivery_item_id )) {
                  console.warn(`Quote item for goods_delivery_id  ${QuoteItem.goods_delivery_item_id } already exists, skipping insertion`);
                  message('Goods items are already Inserted', 'warning');
                  insertQuoteItems(index + 1);
                } else {
                  // Insert the order item
                  const QuoteItemsData = {
                    creation_date : creationdatetime,
                    created_by : loggedInuser.first_name, 
                    invoice_id: insertedDataId,
                  qty: QuoteItem.quantity,
                  unit_price: QuoteItem.unit_price,
                  item_title: QuoteItem.title,
                  invoice_qty: QuoteItem.quantity,
                  goods_delivery_item_id: QuoteItem.goods_delivery_item_id,
                  goods_delivery_id : QuoteItem.goods_delivery_id,
                  invoice_source_id: bookingDetails.invoice_source_id,
                  source_type: bookingDetails.source_type,
                  quote_id: QuoteItem.quote_id
                  };  
                  console.log(`Inserting order item ${index + 1}:`, QuoteItemsData);  
                  // Send a POST request to your /goodsreceipt/insertGoodsReceiptItems API with the current QuoteItemsData
                  api
                    .post('/invoice/insertInvoiceItem', QuoteItemsData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} inserted successfully`);
                        setTimeout(() => {
                          window.location.reload()
                        }, 100);
                      } else {
                        console.error(`Failed to insert order item ${index + 1}`);
                      }
                      // Continue to the next item
                      insertQuoteItems(index + 1);
                    })
                    .catch((error) => {
                      console.error(`Error inserting order item ${index + 1}`, error);
                      // Continue to the next item
                      insertQuoteItems(index + 1);
                    });
                }
              } else {
                console.log('All order items inserted successfully');
                // You might want to trigger a UI update here
              }
            }; 
            // Start inserting order items from index 0
            insertQuoteItems(0);
          })
          .catch((error) => {
            console.error('Error checking order item existence', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching quote items', error);
      });
  };

  const generatePartialGoodsData = () => {
    api
      .post('/invoice/getGoodsLineItemsById', { goods_delivery_id: orderId })
      .then((res) => {
        const quoteItems = res.data.data;
        console.log(' Received quote items::', quoteItems);
        if (quoteItems.length === 0) {
          console.warn('No Quote items to insert');
          return;
        }
        // Retrieve all po_product_id  values from the purchase_invoice_items table
        api
          .get('/invoice/checkGoodsItems')
          .then((response) => {
            const ExistingQuoteItemsId = response.data.data; 
            const insertQuoteItems = (index) => {
              if (index < quoteItems.length) {
                const QuoteItem = quoteItems[index];  
                // Check if the po_product_id  already exists in the ExistingQuoteItemsId array
                if (ExistingQuoteItemsId.includes(QuoteItem.goods_delivery_item_id )) {
                  // console.warn(`Quote item for goods_delivery_id  ${QuoteItem.goods_delivery_item_id } already exists, skipping insertion`);
                  // message('Goods items are already Inserted', 'warning');
                  insertQuoteItems(index + 1);
                } else {
                  // Insert the order item
                  const QuoteItemsData = {
                    creation_date : creationdatetime,
                    created_by : loggedInuser.first_name, 
                    invoice_id: insertedDataId,
                  qty: QuoteItem.quantity,
                  unit_price: QuoteItem.unit_price,
                  item_title: QuoteItem.title,
                  goods_delivery_item_id: QuoteItem.goods_delivery_item_id,
                  goods_delivery_id : QuoteItem.goods_delivery_id,
                  invoice_source_id: bookingDetails.invoice_source_id,
                  source_type: bookingDetails.source_type,
                  quote_id: QuoteItem.quote_id
                  };  
                  console.log(`Inserting order item ${index + 1}:`, QuoteItemsData);  
                  // Send a POST request to your /goodsreceipt/insertGoodsReceiptItems API with the current QuoteItemsData
                  api
                    .post('/invoice/insertInvoiceItem', QuoteItemsData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} inserted successfully`);
                        setTimeout(() => {
                          window.location.reload()
                        }, 100);
                      } else {
                        console.error(`Failed to insert order item ${index + 1}`);
                      }
                      // Continue to the next item
                      insertQuoteItems(index + 1);
                    })
                    .catch((error) => {
                      console.error(`Error inserting order item ${index + 1}`, error);
                      // Continue to the next item
                      insertQuoteItems(index + 1);
                    });
                }
              } else {
                console.log('All order items inserted successfully');
                // You might want to trigger a UI update here
              }
            }; 
            // Start inserting order items from index 0
            insertQuoteItems(0);
          })
          .catch((error) => {
            console.error('Error checking order item existence', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching quote items', error);
      });
  };

  
  // ... (rest of the code)
  // const generateData = () => {
  //   // Step 1: Delete old order items by quote_id
  //   api
  //     .delete(`/finance/deleteinvoice_item/${insertedDataId}`)
  //     .then(() => {
  //       api
  //         .post('/invoice/getOrderLineItemsById', { order_id: orderId })
  //         .then((res) => {
  //           const quoteItems = res.data.data;
    
  //           console.log('Received quote items:', quoteItems);
    
  //           if (quoteItems.length === 0) {
  //             console.warn('No quote items to insert');
  //             return;
  //           }
    
  //           // Step 3: Insert new order items based on quote items
  //           const insertInvoiceItems = (index) => {
  //             if (index < quoteItems.length) {
  //               const quoteItem = quoteItems[index];
    
  //               // Insert the order item
  //               const orderItemData = {
  //                invoice_id: insertedDataId,
  //                 qty: quoteItem.qty,
  //                 unit_price: quoteItem.unit_price,
  //                 item_title: quoteItem.item_title,
  //                 total_cost: quoteItem.cost_price,
  //               };
    
  //               console.log(`Inserting order item ${index + 1}:`, orderItemData);
    
  //               // Send a POST request to your /finance/insertorder_item API with the current order item
  //               api
  //                 .post('/invoice/insertInvoiceItem', orderItemData)
  //                 .then((result) => {
  //                   if (result.data.msg === 'Success') {
  //                     console.log(`Order item ${index + 1} inserted successfully`);
  //                   } else {
  //                     console.error(`Failed to insert order item ${index + 1}`);
  //                   }
  //                   // Continue to the next item
  //                   insertInvoiceItems(index + 1);
         
  //                 })
  //                 .catch((error) => {
  //                   console.error(`Error inserting order item ${index + 1}`, error);
  //                   // Continue to the next item
  //                   insertInvoiceItems(index + 1);
  //                 });
  //             } else {
  //               console.log('All order items inserted successfully');
  //               window.location.reload();
  //               // You might want to trigger a UI update here
  //             }
  //           };
    
  //           // Start inserting order items from index 0
  //           insertInvoiceItems(0);
  //         })
  //         .catch((error) => {
  //           console.error('Error fetching quote items', error);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error('Error deleting old order items', error);
  //     });
  // };
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
 
  // const editItemById = () => {
  //   api
  //     .post('/invoice/getInvoiceByItemId', { invoice_id: insertedDataId })
  //     .then((res) => {
  //       setItemDetails(res.data.data);
  //     })
  //     .catch(() => {
  //       //message('Booking Data Not Found', 'info');
  //     });
  // };

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
    bookingDetails.modification_date = creationdatetime;
    bookingDetails.modified_by = loggedInuser.first_name;
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
    // editItemById();
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
      <ComponentCard title="Invoice Details" creationModificationDate={bookingDetails}>
        <InvoiceDetailComp
          bookingDetails={bookingDetails}
          handleInputs={handleInputs}
        />
      </ComponentCard>
      
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        <Nav tabs>
    {InvoiceSource !== 'Goods_Delivery' && (
      <NavItem>
        <NavLink onClick={() => toggle('1')} active={activeTab === '1'}>
          Sales Invoice Item
        </NavLink>
      </NavItem>
    )}
    {InvoiceSource !== 'Sales_Order' && (
      <NavItem>
        <NavLink onClick={() => toggle('2')} active={activeTab === '2'}>
          Goods Invoice Item
        </NavLink>
      </NavItem>
    )}
    <NavItem>
      <NavLink onClick={() => toggle('3')} active={activeTab === '3'}>
        Attachment
      </NavLink>
    </NavItem>
  </Nav>
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
          
          <Row className="mb-4">
          <Col md="3">
          {hideButtonVisible  && (
          <Button
                color="primary"
                className="shadow-none"
                onClick={() => {
                  generateData();
                  handleDisplayButtonClick();  
                }}
              >
              Create Full Invoice
            </Button>
          )}
            </Col>
          <Col md="3">
                  <PartialINvoiceEdit
                  partialinvoiceeditmodal={partialinvoiceeditmodal}
                  setPartialInvoiceEditModal={setPartialInvoiceEditModal}
                  SalesInvoiceId={insertedDataId}
                    ></PartialINvoiceEdit>
                    
                    {displayButtonVisible  && (
  <Button
    className="shadow-none"
    color="primary"
    onClick={() => {
      generatePartialData();
      setPartialInvoiceEditModal(true);
      handleHideButtonClick();
    }}
  >
    Create Partial Invoice
  </Button>
)}
           
        
      </Col>
          </Row>   
          <OrderItemTable
        orderitemDetails={orderitemDetails}
        
       />     
          </TabPane>

          <TabPane tabId="2">
          
          <Row className="mb-4">
          <Col md="3">
          {hideGoodsButtonVisible  && (
              <Button
                color="primary"
                className="shadow-none"
                onClick={() => {
                  generateGoodsData();
                  handleGoodsDisplayButtonClick();
                }}
              >
                Create Full Invoice
              </Button>
          )}
            </Col>
          <Col md="3">
                  <PartialInvoiceGoodsEdit
                  partialgoodsinvoiceeditmodal={partialgoodsinvoiceeditmodal}
                  setPartialGoodsInvoiceEditModal={setPartialGoodsInvoiceEditModal}
                  SalesInvoiceId={insertedDataId}
                    ></PartialInvoiceGoodsEdit>
                    {displayGoodsButtonVisible  && (
                    <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              
              setPartialGoodsInvoiceEditModal(true);
              generatePartialGoodsData();
              handleGoodsHideButtonClick();
            }
            }
          >
            Create Partial Invoice
          </Button>
                    )}
        
      </Col>
          </Row>   
          <GoodsItemTable
        orderitemDetails={orderitemDetails}
       />     
          </TabPane>

          <TabPane tabId="3">
          <Form>
              <FormGroup>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('SalesInvoice');
                          setFileTypes(['JPG','JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={RoomName}
                    fileTypes={fileTypes}
                    altTagData="SalesInvoiceRequestRelated Data"
                    desc="SalesInvoiceRequestRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="SalesInvoice" recordType="RelatedPicture" update={update}
                    setUpdate={setUpdate}/>
              </FormGroup>
            </Form>  
          </TabPane>
        </TabContent>
        </ComponentCard>
      {/* <InvoiceItem
        editInvoiceItemData={editInvoiceItemData}
        setEditInvoiceItemData={setEditInvoiceItemData}
        invoiceInfo={insertedDataId}
        ></InvoiceItem> */}
      {/* <ComponentCard title="Invoice Items">
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
      </ComponentCard> */}
      {/* <ComponentCard title="Order Items">
     
        <Row className="border-bottom mb-3">
         <OrderItemTable
        orderitemDetails={orderitemDetails}
        
       />
      </Row>
      </ComponentCard> */}
    </>
  );
};

export default InvoiceEdit;