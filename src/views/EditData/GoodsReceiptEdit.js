import React, {useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, TabContent, TabPane, Button} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import GoodsReceiptEditButton from '../../components/GoodsReceipt/GoodsReceiptEditButton';
import GoodsReceiptLineItems from '../../components/GoodsReceipt/GoodsReceiptLineItems';
import PurchaseRequestItemModal from '../../components/PurchaseRquestTable/PurchaseRequestItemModal';
import PurchaseRequestAttachment from '../../components/PurchaseRquestTable/PurchaseRequestAttachment';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import Tab from '../../components/project/Tab';




const PurchaseRequestEdit = () => {
  // All state variables

  const [goodsreceipteditdetails, setGoodsReceiptEditDetails] = useState();
  // const [pocode, setPoCode] = useState();
  // const [supplier, setSupplier] = useState();
  const [employee, setEmployee] = useState();
  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState();
  const [project, setProject] = useState([]);
  const [quote, setQuote] = useState({});
  const [activeTab, setActiveTab] = useState({});

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  const tabs = [
    { id: '1', name: 'Goods received Items' },
    { id: '2', name: 'Attachment' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  //get staff details
  const { loggedInuser } = useContext(AppContext);

  //Setting data in goodsreceipteditdetails
  const handleInputs = (e) => {
    setGoodsReceiptEditDetails({ ...goodsreceipteditdetails, [e.target.name]: e.target.value });
  };

  // Get Purchase data By Purchase Id
  const getGoodsReceiptById = () => {
    api
      .post('/goodsreceipt/getGoodsReceiptById', { goods_receipt_id: id })
      .then((res) => {
        setGoodsReceiptEditDetails(res.data.data[0]);
        console.log("setGoodsReceiptEditDetails",res.data.data[0])
      })
  };
  //Edit Product
  const editGoodsReceiptData = () => {
    if (goodsreceipteditdetails.purchase_order_id !== '' &&
    goodsreceipteditdetails.goods_received_date !== ''
    )
    {
      goodsreceipteditdetails.modification_date = creationdatetime;
      goodsreceipteditdetails.modified_by= loggedInuser.first_name; 
      api
        .post('/goodsreceipt/editGoodsReceipt', goodsreceipteditdetails)
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
  // const getPoCode = () => {
  //   api
  //     .get('/goodsreceipt/getPoCode')
  //     .then((res) => {
  //       setPoCode(res.data.data);
  //     })
  //     .catch(() => {
  //       message('Company not found', 'info');
  //     });
  // };


  // const getSupplierName = () => {
  //   api
  //     .get('/goodsreceipt/getSupplierName')
  //     .then((res) => {
  //       setSupplier(res.data.data);
  //     })
  //     .catch(() => {
  //       message('Supplier not found', 'info');
  //     });
  // };

  const getEmployeeName = () => {
    api
      .get('/goodsreceipt/getEmployeeName')
      .then((res) => {
        setEmployee(res.data.data);
      })
      .catch(() => {
        message('Supplier not found', 'info');
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
    getGoodsReceiptById();
    // getPoCode();
    // getSupplierName();
    getEmployeeName();
    getQuote();
    getProject();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={goodsreceipteditdetails && goodsreceipteditdetails.title} />
      <Form>
        <FormGroup>
          <GoodsReceiptEditButton id={id} editGoodsReceiptData={editGoodsReceiptData} navigate={navigate} />
          {/* Content Details Form */}
          <ComponentCard title="Goods Receipt Details" creationModificationDate={goodsreceipteditdetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> PO Code </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={goodsreceipteditdetails && goodsreceipteditdetails.po_code}
                    name="po_code"
                    disabled
                  />
                  {/* <Input
                          type="select"
                          onChange={handleInputs}
                          value={goodsreceipteditdetails && goodsreceipteditdetails.purchase_order_id}
                          name="purchase_order_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {pocode &&
                            pocode.map((e) => {
                              return (
                                <option key={e.purchase_order_id} value={e.purchase_order_id}>
                                  {e.po_code}
                                </option>
                              );
                            })}
                        </Input> */}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Supplier Name </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={goodsreceipteditdetails && goodsreceipteditdetails.company_name}
                    name="company_name"
                    disabled
                  />
                  {/* <Input
                          type="select"
                          onChange={handleInputs}
                          value={goodsreceipteditdetails && goodsreceipteditdetails.supplier_id}
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
                        </Input> */}
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label> Goods Received Date <span className="required"> *</span> </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    // value={goodsreceipteditdetails && goodsreceipteditdetails.goods_received_date}
                    value={
                      goodsreceipteditdetails && moment(goodsreceipteditdetails.goods_received_date).format('YYYY-MM-DD')
                    }
                    name="goods_received_date"
                  />
                </FormGroup>
              </Col>
              
             
              <Col md="3">
                <FormGroup>
                  <Label>Received By</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={goodsreceipteditdetails && goodsreceipteditdetails.employee_id}
                    name="employee_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {employee &&
                      employee.map((e) => {
                        return (
                          <option key={e.employee_id} value={e.employee_id}>
                            {e.first_name}
                          </option>
                        );               
                      })}
                  </Input>
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Total Amount </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={goodsreceipteditdetails && goodsreceipteditdetails.total_amount}
                    name="total_amount"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Status </Label>
                  <Input
                    value={goodsreceipteditdetails && goodsreceipteditdetails.status}
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
          
        <GoodsReceiptLineItems
        PurchaseOrderId={goodsreceipteditdetails && goodsreceipteditdetails.purchase_order_id}
        project={project}
        quote={quote}

        ></GoodsReceiptLineItems>
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
