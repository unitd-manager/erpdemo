import React, { useEffect, useState } from 'react';
import { useParams,useNavigate, useLocation } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import { ToastContainer } from 'react-toastify';
import { Button, Col, FormGroup, Row } from 'reactstrap';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import api from '../../constants/api';
import ComponentCard from '../../components/ComponentCard';
import ReturnDetailComp from '../../components/BookingTable/ReturnDetailComp';
import creationdatetime from '../../constants/creationdatetime';
import ComponentCardV2 from '../../components/ComponentCardV2';
// import InvoiceItem from '../../components/BookingTable/InvoiceItem';
import ReturnItemTable from '../../components/BookingTable/ReturnItemTable';

const InvoiceEdit = () => {
  const [returnDetails, setReturnDetails] = useState({});
  const [returnItemDetails, setReturnItemDetails] = useState();
  const [returnItems, setReturnItems] = useState();
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const invId = queryParams.get('invoice_id');
  console.log('Invoice ID:', invId);
  const navigate = useNavigate();
  const handleInputs = (e) => {
    setReturnDetails({ ...returnDetails, [e.target.name]: e.target.value });
  };
 
  const getReturnById = () => {
    api
      .post('/invoice/getSalesReturnId', { sales_return_history_id: id })
      .then((res) => {
        setReturnDetails(res.data.data[0]);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };

  const getReturnItemById = () => {
    api
      .post('/invoice/getInvoiceItemsById', { invoice_id: invId })
      .then((res) => {
        setReturnItemDetails(res.data.data);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };

  const getReturnItemsById = () => {
    api
      .post('/invoice/getReturnItemsById', { invoice_id: invId })
      .then((res) => {
        setReturnItems(res.data.data);
      })
      .catch(() => {
        //message('Booking Data Not Found', 'info');
      });
  };


  const editInvoiceData = () => {
    api
      .post('/finance/editSalesReturn', returnDetails)
      .then(() => {
        message('Record edited successfully', 'success');
        getReturnById();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const cancelInvoice = () => {
    if (returnDetails.status !== 'Paid') {
      returnDetails.modification_date = creationdatetime;
      const updatedInvoice = { ...returnDetails, status: 'Cancelled' };
      api
        .post('/invoice/editInvoice', updatedInvoice)
        .then(() => {
          message('Invoice cancelled successfully', 'success');
          window.location.reload();
          getReturnById(); // Refresh the invoice details after updating
        })
        .catch(() => {
          message('Unable to cancel invoice.', 'error');
        });
    } else {
      message('Paid invoices cannot be cancelled.', 'info');
    }
  };

  useEffect(() => {
    getReturnById();
    getReturnItemById();
    getReturnItemsById();
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
                  navigate('/SalesReturn');
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
        disabled={returnDetails.status === 'Paid'}
      >
        Cancel
      </Button>
            </Col>
    
          </Row>
      </ComponentCardV2>
      
      </FormGroup>
  
      {/*Main Details*/}
      <ComponentCard title="Invoice Details">
        <ReturnDetailComp
          returnDetails={returnDetails}
          returnItems={returnItems}
          handleInputs={handleInputs}
        />
      </ComponentCard>
     
      <ComponentCard title="Invoice Items">
     
        <Row className="border-bottom mb-3">
         <ReturnItemTable
        returnItemDetails={returnItemDetails}
        invoiceInfo={id}
       />
      </Row>
      </ComponentCard>
    
    </>
  );
};

export default InvoiceEdit;