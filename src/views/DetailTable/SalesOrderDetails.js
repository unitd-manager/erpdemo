import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';

const OpportunityDetails = () => {
  const [quote, setQuote] = useState();
  const [insertQuote, setInsertQuote] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  //Api call for getting company dropdown
  const getQuote = () => {
    api.get('/finance/getQuote').then((res) => {
      setQuote(res.data.data);
    });
  };
  const handleInputs = (e) => {
    setInsertQuote({ ...insertQuote, [e.target.name]: e.target.value });
  };


  //console.log(tenderDetails);
  const insertOrder = (code) => {
    if (insertQuote.quote_id !== '' ) {
      insertQuote.order_code = code;
      insertQuote.creation_date = creationdatetime;
      api
        .post('/finance/insertOrder', insertQuote)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Order inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/OrdersEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //QUTO GENERATED CODE
  const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type: 'orders' })
      .then((res) => {
        insertOrder(res.data.data);
      })
      .catch(() => {
        insertOrder('');
      });
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
                    Quote Code <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="select"
                      name="quote_id"
                      value={insertQuote && insertQuote.quote_id}
                      onChange={handleInputs}
                    >
                      <option>Please Select</option>
                      {quote &&
                        quote.map((ele) => {
                          return (
                            <option key={ele.quote_id} value={ele.quote_id}>
                              {ele.quote_code}
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
                      generateCode();
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

export default OpportunityDetails;
