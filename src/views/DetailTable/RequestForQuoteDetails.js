import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const RequestForQuoteDetails = () => {
  //All state variables
  const [purchaseReport, setPurchaseRequest] = useState();
  const [requestForQuote, setRequestForQuote] = useState({
    purchase_request_id: '',
    purchase_request_code:'',
  });
  //Navigation and Parameters
  const { id } = useParams();
  const navigate = useNavigate();
  // Gettind data from  By Id
  const getPurchaseRequest = () => {
    api
      .get('/quote/getPurchaseRequest')
      .then((res) => {
        setPurchaseRequest(res.data.data);
      })
      .catch(() => {});
  };
  //jobinformation data in RequestForQuoteDetails
  const handleInputs = (e) => {
    setRequestForQuote({ ...requestForQuote, [e.target.name]: e.target.value });
  };
  //inserting data of job information
  const insertJobInformation = () => {
    if(requestForQuote.purchase_request_id !==''){
    api
      .post('/quote/insertQuote', requestForQuote)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        message('Request For Quote inserted successfully.', 'success');
        setTimeout(() => {
          navigate(`/RequestForQuoteEdit/${insertedDataId}`);
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });}
      else{
        message('Please Select the quote', 'warning');
      }
  };
  useEffect(() => {
    getPurchaseRequest();
  }, [id]);
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Label>Purchase Request Code <span style={{color:'red'}}>*</span> </Label>
                  <Input
                    type="select"
                    name="purchase_request_id"
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {purchaseReport &&
                      purchaseReport.map((ele) => {
                        return (
                         
                            <option key={ele.purchase_request_id} value={ele.purchase_request_id}>
                              {ele.purchase_request_code}
                            </option>
                          
                        );
                      })}
                  </Input>
                </Row>

                <FormGroup>
                  <Row>
                    <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                      <Button
                        color="primary"
                        type="button"
                        className="btn mr-2 shadow-none"
                        onClick={() => {
                          insertJobInformation();
                        }}
                      >
                        Save & Continue
                      </Button>
                      <Button
                        onClick={() => {
                          navigate('/JobInformation');
                        }}
                        type="button"
                        className="btn btn-dark shadow-none"
                      >
                        Go to List
                      </Button>
                    </div>
                  </Row>
                </FormGroup>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default RequestForQuoteDetails;
