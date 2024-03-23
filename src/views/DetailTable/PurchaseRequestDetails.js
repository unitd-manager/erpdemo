import React, {useContext, useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const PurchaseRequestDetails = () => {
  //All const variables
  const navigate = useNavigate();
  const [purchaserequestdetails, setPurchaseRequestDetails] = useState({
    purchase_request_date: '',
    purchase_delivery_date: '',
    department:''
  });
  //setting data in ProductDetails
  const handleInputs = (e) => {
    setPurchaseRequestDetails({ ...purchaserequestdetails, [e.target.name]: e.target.value });
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
  const selectedLanguage = getSelectedLanguageFromLocalStorage();


  //Insert Product Data
  const insertPurchaseRequestData = (PurchaseRequestCode) => {
    if (purchaserequestdetails.purchase_request_date !== '' &&
    purchaserequestdetails.purchase_delivery_date !== ''
    )
    {
      purchaserequestdetails.purchase_request_code = PurchaseRequestCode;
      purchaserequestdetails.creation_date = creationdatetime;
      purchaserequestdetails.created_by= loggedInuser.first_name;   
      api
        .post('/purchaserequest/insertPurchaseRequest', purchaserequestdetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('PurchaseRequest inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/PurchaseRequestEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to insert record.', 'error');
        });
    } else {
      message('Please fill all required field.', 'warning');
    }
  };


  //Auto generation code
  const generateCode = () => {
    api
      .post('/purchaserequest/getCodeValue', { type: 'PurchaseRequestCode' })
      .then((res) => {
        const PurchaseRequestCode = res.data.data
        insertPurchaseRequestData(PurchaseRequestCode );
      })
      .catch(() => {
        insertPurchaseRequestData('');
      });
  };

  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  //const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
      api
      .get('/purchaserequest/getTranslationForPurchaseRequest')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });   
  };

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  //useeffect
  useEffect(() => {
    getArabicCompanyName();
  }, []);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseRequest.Purchase Request Date')?.[genLabel]} 
                <span className="required"> *</span> </Label>
                    <Input
                      type="date"
                      onChange={handleInputs}
                      value={purchaserequestdetails && moment(purchaserequestdetails.purchase_request_date).format('YYYY-MM-DD')}
                      name="purchase_request_date"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="12">
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseRequest.Purchase Delivery Date')?.[genLabel]}
                <span className="required"> *</span> </Label>
                    <Input
                      type="date"
                      onChange={handleInputs}
                      min={purchaserequestdetails && moment(purchaserequestdetails.purchase_request_date).format('YYYY-MM-DD')}
                      value={purchaserequestdetails && moment(purchaserequestdetails.purchase_delivery_date).format('YYYY-MM-DD')}
                      name="purchase_delivery_date"
                    />
                  </Col>
                </Row>
                <Row>
                  {/* <Col md="12">
                    <Label>Department<span className="required"> *</span> </Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={purchaserequestdetails && purchaserequestdetails.department}
                      name="department"
                    />
                  </Col> */}
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        generateCode();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/PurchaseRequest');
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
export default PurchaseRequestDetails;
