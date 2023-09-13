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

const InvoiceEdit = () => {
  const [bookingDetails, setBookingDetails] = useState({});
  const [editInvoiceItemData, setEditInvoiceItemData] = useState(false);
  const [itemDetails, setItemDetails] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleInputs = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };
  // const getInvoiceItemById = (invoiceItemId) => {
  //   api
  //     .get(`/invoice/getInvoiceItemsByItemsId/${invoiceItemId}`)
  //     .then((response) => {
  //       // Set the fetched data to the state
  //       setEditInvoiceItem(response.data);
  //     })
  //     .catch((error) => {
  //       // Handle errors here
  //       console.error(error);
  //     });
  // };
  // const handleEditClick = (invoiceItemId) => {
  //   // Fetch the invoice item data
  //   getInvoiceItemById(invoiceItemId);
  //   // Open the Edit Modal
  //   setEditModal(true);
  // };
  const editBookingById = () => {
    api
      .post('/invoice/getInvoiceById', { invoice_id: id })
      .then((res) => {
        setBookingDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };
 
  const editItemById = () => {
    api
      .post('/invoice/getInvoiceByItemId', { invoice_id: id })
      .then((res) => {
        setItemDetails(res.data.data);
      })
      .catch(() => {
        //message('Booking Data Not Found', 'info');
      });
  };

  const editInvoiceData = () => {
    api
      .post('/invoice/editInvoices', bookingDetails)
      .then(() => {
        message('Record edited successfully', 'success');
        editBookingById();
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
  }, [id]);

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
                  editInvoiceData();
                  navigate('/SalesInvoice');
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
                  editInvoiceData();
                  
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
        invoiceInfo={id}
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
        invoiceInfo={id}
       />
      </Row>
      </ComponentCard>
    
    </>
  );
};

export default InvoiceEdit;