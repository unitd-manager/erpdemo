import React, {useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, TabContent, TabPane, Button} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import PurchaseEditButton from '../../components/PurchaseRquestTable/PurchaseEditButton';
import PurchaseRequestItemModal from '../../components/PurchaseRquestTable/PurchaseRequestItemModal';
import PurchaseRequestLineItems from '../../components/PurchaseRquestTable/PurchaseRequestLineItems';
import PurchaseRequestAttachment from '../../components/PurchaseRquestTable/PurchaseRequestAttachment';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import Tab from '../../components/project/Tab';




const PurchaseRequestEdit = () => {
  // All state variables

  const [purchaserequesteditdetails, setPurchaseRequestEditDetails] = useState();
  const [customername, setCustomerName] = useState([]);
  const [activeTab, setActiveTab] = useState('1');
  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState();
  const [project, setProject] = useState([]);
  const [quote, setQuote] = useState({});

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  const tabs = [
    { id: '1', name: 'Purchase Request Item' },
    { id: '2', name: 'Attachment' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  //get staff details
  const { loggedInuser } = useContext(AppContext);

  //Setting data in purchaserequesteditdetails
  const handleInputs = (e) => {
    setPurchaseRequestEditDetails({ ...purchaserequesteditdetails, [e.target.name]: e.target.value });
  };

  // Get Purchase data By Purchase Id
  const getPurchaseRequestDataById = () => {
    api
      .post('/purchaserequest/getPurchaseRequestById', { purchase_request_id: id })
      .then((res) => {
        setPurchaseRequestEditDetails(res.data.data[0]);
      })
  };
  //Edit Product
  const editPurchaseRequestData = () => {
    if (purchaserequesteditdetails.purchase_request_date !== '' &&
    purchaserequesteditdetails.purchase_delivery_date !== '' &&
    purchaserequesteditdetails.department !== ''
    )
    {
      purchaserequesteditdetails.modification_date = creationdatetime;
      purchaserequesteditdetails.modified_by= loggedInuser.first_name; 
      api
        .post('/purchaserequest/editPurchaseRequest', purchaserequesteditdetails)
        .then(() => {
          message('Record edited successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  // getting data from Category
  const getCustomerName = () => {
    api
      .get('/purchaserequest/getCustomerName')
      .then((res) => {
        setCustomerName(res.data.data);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };


  const getProject = () => {
    api.get('project/getOppProject').then((res) => {
      setProject(res.data.data);
    });
  };

  const getQuote = () => {
    api.post('/tender/getQuoteById', { opportunity_id: id }).then((res) => {
      setQuote(res.data.data[0]);
    });
  }; 

  //useEffect
  useEffect(() => {
    getPurchaseRequestDataById();
    getCustomerName();
  
    getQuote();
    getProject();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={purchaserequesteditdetails && purchaserequesteditdetails.title} />
      <Form>
        <FormGroup>
          <PurchaseEditButton id={id} editPurchaseRequestData={editPurchaseRequestData} navigate={navigate} />
          {/* Content Details Form */}
          <ComponentCard title="Purchase Request Details" creationModificationDate={purchaserequesteditdetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Purchase Request code </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaserequesteditdetails && purchaserequesteditdetails.purchase_request_code}
                    name="purchase_request_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Purchase Request Date <span className="required"> *</span> </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={purchaserequesteditdetails && purchaserequesteditdetails.purchase_request_date}
                    name="purchase_request_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Purchase Delivery Date <span className="required"> *</span> </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={purchaserequesteditdetails && purchaserequesteditdetails.purchase_delivery_date}
                    name="purchase_delivery_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Department <span className="required"> *</span> </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaserequesteditdetails && purchaserequesteditdetails.department}
                    name="department"
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Customer Name</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={purchaserequesteditdetails && purchaserequesteditdetails.company_id}
                    name="company_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {customername &&
                      customername.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {e.company_name}
                          </option>
                        );               
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Status </Label>
                  <Input
                    value={purchaserequesteditdetails && purchaserequesteditdetails.status}
                    type="select"
                    onChange={handleInputs}
                    name="status"
                  >
                    <option value="">Please Select</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Priority </Label>
                  <Input
                    value={purchaserequesteditdetails && purchaserequesteditdetails.priority}
                    type="select"
                    onChange={handleInputs}
                    name="priority"
                  >
                    <option value="">Please Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Input>
                </FormGroup>
              </Col>
              </Row>
              </ComponentCard>
              </FormGroup>
              </Form>

              <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
          <PurchaseRequestItemModal
          PurchaseRequestId={id}
          addPurchaseOrderModal={addPurchaseOrderModal}
          setAddPurchaseOrderModal={setAddPurchaseOrderModal}
        />
          <Row className="mb-4">
          <Col md="2">
            <Button
              color="primary"
              onClick={() => {
                setAddPurchaseOrderModal(true);
              }}
            >
              Add Product
            </Button>
          </Col>
          </Row>
          
        <PurchaseRequestLineItems
        PurchaseRequestID={id}
        project={project}
        quote={quote}

        ></PurchaseRequestLineItems>
          </TabPane>

          <TabPane tabId="2">
          <PurchaseRequestAttachment 
          ></PurchaseRequestAttachment>
          </TabPane>
        </TabContent>

        </ComponentCard>
              
              </>   
  );
};
export default PurchaseRequestEdit;
