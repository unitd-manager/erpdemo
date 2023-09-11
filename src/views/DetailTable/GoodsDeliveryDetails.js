import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const GoodsDeliveryDetails = () => {
  const [enquirycode, setEnquiryCode] = useState();
  const { id } = useParams();
  const navigate = useNavigate();


  //Api call for getting Enquiry dropdown
  const getOrderCode = () => {
    api.get('/goodsdelivery/getOrderCode').then((res) => {
      setEnquiryCode(res.data.data);
    });
  };

  //Logic for adding tender in db
  const [tenderForms, setTenderForms] = useState({
    order_code: '',
  });

  const handleInputsTenderForms = (e) => {
    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
  };

  //const[tenderDetails,setTenderDetails]=useState();
  const getTendersById = () => {
    api
      .post('/goodsdelivery/getgoodsdeliveryById', { goods_delivery_id: id })
      .then((res) => {
        setTenderForms(res.data.data);
        // getContact(res.data.data.company_id);
      })
      .catch(() => {});
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);

  //console.log(tenderDetails);
  const insertgoodsDelivery = (code) => {
    if (tenderForms.company_id !== '' && tenderForms.goods_delivery_date !== '') {
      tenderForms.goods_delivery_code = code;
      tenderForms.creation_date = creationdatetime;
      tenderForms.created_by = loggedInuser.first_name;
      api
        .post('/goodsdelivery/insertgoodsdelivery', tenderForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          getTendersById();
          message('Goods inserted successfully.', 'success');
          //   setTimeout(() => {
          navigate(`/GoodsDeliveryEdit/${insertedDataId}?tab=1`);
          //   }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

 // QUOTE GENERATED CODE
  const generateCode = () => {
    api
      .post('/tender/getCodeValue', { type: 'goodsdelivery' })
      .then((res) => {
        insertgoodsDelivery(res.data.data);
      })
      .catch(() => {
        insertgoodsDelivery('');
      });
  };

  useEffect(() => {
    getOrderCode();
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6" xs="12">
          <ComponentCard title="New Opportunity">
            <Form>
              <FormGroup>
                <Col md="9">
                  <Label> Order Code</Label>
                  <Input
                    type="select"
                    onChange={handleInputsTenderForms}
                    value={tenderForms && tenderForms.order_id}
                    name="order_id"
                  >
                    <option>Please Select</option>
                    {enquirycode &&
                      enquirycode.map((e) => {
                        return (
                          <option key={e.order_id} value={e.order_id}>
                            {' '}
                            {e.order_code}{' '}
                          </option>
                        );
                      })}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="9">
                    <Label>
                      {' '}
                      Goods Delivery Date <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="date"
                      name="goods_delivery_date"
                      value={tenderForms && tenderForms.goods_delivery_date}
                      onChange={handleInputsTenderForms}
                    />
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

export default GoodsDeliveryDetails;
