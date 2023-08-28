import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import creationdatetime from '../../constants/creationdatetime';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const SubConDetails = () => {
  //All state variables
  const [quoteDetails, setQuoteDetails] = useState({
    quote_status: '',
  });
  //Navigation and parameters
  const navigate = useNavigate();
  //subcon data in subconDetails
  const handleInputs = (e) => {
    setQuoteDetails({ ...quoteDetails, [e.target.name]: e.target.value });
  };
  //Insert subcon
  const insertRequest = () => {
    quoteDetails.creation_date = creationdatetime;
    if (quoteDetails.quote_status !== '')
      api
        .post('/quote/insertQuote', quoteDetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Quote inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/RequestForQuoteEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    else {
      message('Please fill all required fields.', 'error');
    }
  };

  useEffect(() => {}, []);
  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          <ComponentCard title="SubCon Name">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      {' '}
                       Status <span className="required"> *</span>{' '}
                    </Label>
                    <Input type="select" name="quote_status" onChange={handleInputs} >  <option value="">Please Select</option>
                        <option value="New">New</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Awarded">Awarded</option>
                        <option value="Not Awarded">Not Awarded</option>
                        <option value="Cancelled">Cancelled</option>
                      </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertRequest();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/Subcon');
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default SubConDetails;
