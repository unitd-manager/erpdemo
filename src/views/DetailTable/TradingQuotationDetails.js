import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import 'bootstrap/dist/css/bootstrap.min.css';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const TradingQuotationDetails = () => {
  const [enquirycode, setEnquiryCode] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);

  

  //Api call for getting Enquiry dropdown
  const getEnquiryCode = () => {
    api.get('/tradingquote/getEnquiryCode').then((res) => {
      setEnquiryCode(res.data.data);
    });
  };

 

  //Logic for adding tender in db
  const [tenderForms, setTenderForms] = useState({
    opportunity_id: '',
    quote_date: new Date().toISOString().split('T')[0],
    enquiry_code:'',
    
  });
  // const [enquiryCodeError, setEnquiryCodeError] = useState('');
  const handleInputsTenderForms = (e) => {
    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
    // setEnquiryCodeError('');
  };

  const getTendersById = () => {
    api
      .post('/tradingquote/getTradingquoteById', { quote_id: id })
      .then((res) => {
        setTenderForms(res.data.data);
        // getContact(res.data.data.company_id);
      })
      .catch(() => {});
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);

  const updateEnquiryStatus = (opportunityId) => {
    api
      .post(`/tender/updateEnquiryStatus/${opportunityId}`, { status: 'Quotation Sent' })
      .then(() => {
        console.log('Enquiry status updated successfully');
      })
      .catch((error) => {
        console.error('Error updating enquiry status:', error);
      });
  };

  //console.log(tenderDetails);
  const insertQuote = (code) => {
    setFormSubmitted(true);
    if ( tenderForms.opportunity_id.trim() !== '' && tenderForms.quote_date.trim() !== '') {
      tenderForms.quote_code = code;
      tenderForms.creation_date = creationdatetime;
      tenderForms.created_by = loggedInuser.first_name;
      api
        .post('/tradingquote/inserttradingquote', tenderForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          updateEnquiryStatus(tenderForms.opportunity_id); // Call updateEnquiryStatus here
        message('Tender inserted successfully.', 'success');
          getTendersById();
          message('Tender inserted successfully.', 'success');
          navigate(`/TradingQuotationEdit/${insertedDataId}?tab=1`);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
// console.log("1223434",enquiryCodeError)
  //QUOTE GENERATED CODE
  const generateCode = () => {
    api
      .post('/tender/getCodeValue', { type: 'quote' })
      .then((res) => {
        insertQuote(res.data.data);
      })
      .catch(() => {
        insertQuote('');
      });
  };

  

  useEffect(() => {
    getEnquiryCode();
  }, [id]);
  const inputClass = `form-control ${
    formSubmitted && (!tenderForms.opportunity_id || tenderForms.opportunity_id === 'Please Select') ? 'highlight' : ''
  }`;
  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6" xs="12">
          <ComponentCard title="New Quotation">
            <Form>
              <FormGroup>
                <Col md="9">
                  <Label>Enquiry Code<span className="required"> *</span></Label>
                  <Input
                    type="select"
                    onChange={handleInputsTenderForms}
                    value={tenderForms && tenderForms.opportunity_id}
                    name="opportunity_id"
                    className={inputClass}
                  >
                    <option>Please Select</option>
                    {enquirycode &&
                      enquirycode.map((e) => {
                        return (
                          <option key={e.opportunity_id} value={e.opportunity_id}>
                            {' '}
                            {e.opportunity_code}{' '}
                          </option>
                        );
                      })}
                  </Input>
                  {(formSubmitted && !tenderForms.opportunity_id) && (
      <div className="error-message">Please Select the Quote Code</div>
    )}
                </Col>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="9">
                    <Label>
                      {' '}
                      Quote Date <span className="required"> </span>{' '}
                    </Label>
                    <Input
                      type="date"
                      name="quote_date"
                      value={tenderForms && tenderForms.quote_date}
                      onChange={handleInputsTenderForms}
                      className={`form-control ${
                        formSubmitted && tenderForms.quote_date.trim() === '' ? 'highlight' : ''
                      }`}
                      />
                      {formSubmitted && tenderForms.quote_date.trim() === '' && (
                        <div className="error-message">Please Select the Date</div>
                      )}
                    
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

export default TradingQuotationDetails;
