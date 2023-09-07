import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button , TabContent, TabPane} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import DeleteButton from '../../components/DeleteButton';
// import QuotationMoreDetails from '../../components/ProjectModal/QuotationMoreDetails';
import Tab from '../../components/project/Tab';
import RequestPurchase from '../../components/RequestForQuote/RequestPurchase';


const RequestForQuoteEdit = () => {
  //All state variable
  const [quoteDetails, setQuoteDetails] = useState();
  const [supplier, setSupplier] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [orderDetails, setOrderDetails] = useState();


  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  const applyChanges = () => {};
  const backToList = () => {
    navigate('/RequestForQuote');
  };
  
  const handleInputs = (e) => {
    setQuoteDetails({ ...quoteDetails, [e.target.name]: e.target.value });
  };
  

  //Update Setting
  const editQuoteData = () => {
    quoteDetails.modification_date = creationdatetime;
    if (quoteDetails.status !== '') {
      api
        .post('/quote/editPurchseQuote', quoteDetails)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };
   // Gettind data from Job By Id
   const getSupplier = () => {
    api
      .get('/purchaseorder/getSupplier')
      .then((res) => {
        setSupplier(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };
  const tabs = [
    { id: '1', name: 'Request For Quotation' }
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  const generateData = () => {
    // Fetch quote items by purchase_request_id
    api.post('/quote/getPurchaseQuoteRequestById', { purchase_request_id: quoteDetails.purchase_request_id }).then((res) => {
      const orderItems = res.data.data;
  
       // Create a helper function to insert a single order item
       orderItems.forEach((quoteItem) => {
        const orderItemData = {
      purchase_quote_id: id,
      quantity: quoteItem.purchase_request_qty,
      product_id: quoteItem.product_id,
      purchase_request_id: quoteDetails.purchase_request_id,
      unit: quoteItem.unit,
      amount: quoteItem.amount,
      description: quoteItem.description,
    };

    api
      .post('/quote/insertQuoteItems', orderItemData)
      .then(() => {
        // Handle success if needed
        console.log('Item inserted successfully');
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error inserting item:', error);
      });
  });
});
  
  }
  
   //getting data from setting by Id
   const getTabQuoteById = () => {
    api
      .post('/quote/getPurchaseQuoteById', { purchase_quote_id: id })
      .then((res) => {
        setQuoteDetails(res.data.data[0]);
        generateData(res.data.data[0].purchase_request_id);
      })
      .catch(() => {
        message('Quote Data Not Found', 'info');
      });
  };
  const getOrdersByOrderId = () => {
    api.post('/quote/RequestLineItemById', { purchase_quote_id : id }).then((res) => {
      setOrderDetails(res.data.data);
    
    });
  };
  
  useEffect(() => {
    getTabQuoteById();
    getSupplier();
    getOrdersByOrderId();
  }, [id]);
  

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          <ComponentCardV2>
            <Row>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  generateData();
                }}
              >
                Generate Data
              </Button>
            </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editQuoteData();
                    navigate('/RequestForQuote');
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editQuoteData();
                    applyChanges();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  className="btn btn-dark shadow-none"
                  onClick={(e) => {
                    if (window.confirm('Are you sure you want to cancel? ')) {
                      navigate('/RequestForQuote');
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <DeleteButton id={id} columnname="purchase_quote_id" tablename="quote"></DeleteButton>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    backToList();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* Setting Details */}
      <Form>
        <FormGroup>
          <ComponentCard title="Quote Details"     righttitle={
              <Row>
                <Col className="fs-10 small">
                  <small>Creation :</small>
                  <small>
                    {quoteDetails && quoteDetails.created_by}
                    {quoteDetails && quoteDetails.creation_date}
                  </small>
                </Col>

                <Col className="fs-10 small">
                  <small>Modification :</small>

                  <small>
                    {quoteDetails && quoteDetails.modified_by}
                    {quoteDetails && quoteDetails.modification_date}
                  </small>
                </Col>
              </Row>
            }
          >
            {' '}
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Code</Label>
                  <br></br>
                  <span>{quoteDetails && quoteDetails.purchase_request_code}</span>
                  
                </FormGroup>
              </Col>
                <Col md="4">
                  <FormGroup>
                    <Label>Status</Label>
                    <Input
                      type="select"
                      onChange={handleInputs}
                      value={quoteDetails && quoteDetails.status}
                      name="status">
                      <option value="">Please Select</option>
                        <option value="New">New</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Awarded">Awarded</option>
                        <option value="Not Awarded">Not Awarded</option>
                        <option value="Cancelled">Cancelled</option>
                      </Input>
                  </FormGroup>
                </Col>  
                <Col md="4">
                    <FormGroup>
                      <Label>Date Issued</Label>
                      <Input
                        type="date"
                        onChange={handleInputs}
                        value={quoteDetails && moment(quoteDetails.date_issued).format('YYYY-MM-DD')}
                        name="date_issued"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Due Date</Label>
                      <Input
                        type="date"
                        onChange={handleInputs}
                        value={quoteDetails && moment(quoteDetails.due_date).format('YYYY-MM-DD')}
                        name="due_date"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="3">
                <FormGroup>
                  <Label>Supplier Name</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={quoteDetails && quoteDetails.supplier_id}
                    name="supplier_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {supplier &&
                      supplier.map((e) => {
                        return (
                          <option key={e.supplier_id} value={e.supplier_id}>
                            {e.company_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
      <Tab toggle={toggle} tabs={tabs} />
      <TabContent className="p-4" activeTab={activeTab}>
      <TabPane tabId="1" eventkey="MoreDetails">
          {orderDetails && <RequestPurchase
  orderDetails={orderDetails}
          />
          }
          </TabPane>
          </TabContent>
    </>
  );
};

export default RequestForQuoteEdit;
