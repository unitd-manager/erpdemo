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
import ReturnDetailComp from '../../components/BookingTable/ReturnDetailComp';
import creationdatetime from '../../constants/creationdatetime';
import ComponentCardV2 from '../../components/ComponentCardV2';
// import InvoiceItem from '../../components/BookingTable/InvoiceItem';
// import ItemTable from '../../components/BookingTable/ItemTable';

const InvoiceEdit = () => {
  const [returnDetails, setReturnDetails] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const handleInputs = (e) => {
    setReturnDetails({ ...returnDetails, [e.target.name]: e.target.value });
  };
 
  const getReturnById = () => {
    api
      .post('/invoice/getSalesReturnId', { sales_return_history_id: id })
      .then((res) => {
        setReturnDetails(res.data.data);
      })
      .catch(() => {
        message('Invoice Data Not Found', 'info');
      });
  };


  const editInvoiceData = () => {
    api
      .post('/invoice/editInvoices', returnDetails)
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
                  navigate('/Invoice');
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
          handleInputs={handleInputs}
        />
      </ComponentCard>
      {/* <InvoiceItem
        editInvoiceItemData={editInvoiceItemData}
        setEditInvoiceItemData={setEditInvoiceItemData}
        invoiceInfo={id}
        ></InvoiceItem> */}
      <ComponentCard title="Invoice Items">
      {/* <Col>
          <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              setEditInvoiceItemData(true);
            }}
          >
            Add Items
          </Button>
        </Col> */}
        <Row className="border-bottom mb-3">
         {/* <ItemTable
        itemDetails={itemDetails}
        invoiceInfo={id}
       /> */}
      </Row>
      </ComponentCard>
      {/* <EditInvoiceItem
              editModal={editModal}
              setEditModal={setEditModal}
              editInvoiceModal={editInvoiceModal}
              setInvoiceDatas={setInvoiceDatas}
              invoiceDatas={invoiceDatas}
              invoiceInfo={id}
              editInvoiceItem={editInvoiceItem}
            /> */}
    </>
  );
};

export default InvoiceEdit;