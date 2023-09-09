import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';

const ReturnDetails = () => {
  const [invoice, setInvoice] = useState();
  const [insertReturn, setInsertReturn] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  //Api call for getting company dropdown
  const getQuote = () => {
    api.get('/invoice/getInvoice').then((res) => {
      setInvoice(res.data.data);
    });
  };
  const handleInputs = (e) => {
    setInsertReturn({ ...insertReturn, [e.target.name]: e.target.value });
  };


  //console.log(tenderDetails);
 const insertOrder = () => {
  if (insertReturn.invoice_id !== '') {
    insertReturn.creation_date = creationdatetime;
    api
      .post('/invoice/insertSalesReturn', insertReturn)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        const selectedQuoteId = encodeURIComponent(insertReturn.invoice_id);
        // Navigate to OrdersEdit page with quote_id and insertedDataId as query parameters
        navigate(`/ReturnEdit/${insertedDataId}?tab=1&invoice_id=${selectedQuoteId}`);
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  } else {
    message('Please fill all required fields', 'warning');
  }
};

  useEffect(() => {
    getQuote();
    
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6" xs="12">
          <ComponentCard title="New Enquiry">
            <Form>
              <FormGroup>
              
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="9">
                    <Label>
                 Invoices<span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="select"
                      name="invoice_id"
                      value={insertReturn && insertReturn.invoice_id}
                      onChange={handleInputs}
                    >
                      <option>Please Select</option>
                      {invoice &&
                        invoice.map((ele) => {
                          return (
                            <option key={ele.invoice_id} value={ele.invoice_id}>
                              {ele.invoice_code}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                 
                </Row>
               
              </FormGroup>
            
                  <Row>
                <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button
                    type="button"
                    color="primary"
                    className="btn mr-2 shadow-none"
                    onClick={() => {
                      insertOrder();
                    }}
                  >
                    Save & Continue
                  </Button>
                  <Button
                    className="shadow-none"
                    color="dark"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to cancel  \n  \n You will lose any changes made',
                        )
                      ) {
                        navigate(-1);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Row>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default ReturnDetails;
