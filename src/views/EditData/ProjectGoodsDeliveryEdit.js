import React, { useEffect, useState, useContext } from 'react';
import { TabPane, TabContent, Button, Table, Row, Col, FormGroup } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../form-editor/editor.scss';
//import * as Icon from 'react-feather';
//import Swal from 'sweetalert2';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import GoodsDeliveryButton from '../../components/GoodsDelivery/GoodsDeliveryButton';
import ProjectGoodsAttachment from '../../components/GoodsDelivery/ProjectGoodsAttachment';
import Tab from '../../components/project/Tab';
import Tabs from '../../components/project/Tabs';
import AppContext from '../../context/AppContext';
import GoodsDeliveryMoreDetails from '../../components/GoodsDelivery/GoodsDeliveryMoreDetails';
import ProjectEditLineItem from '../../components/GoodsDelivery/ProjectEditLineItem';
// import ApiButton from '../../components/ApiButton';
 
const GoodsDeliveryEdit = () => {
  const [tenderDetails, setTenderDetails] = useState();
  const [goodsitemdetails, setgoodslineDetails] = useState();
  const [company, setCompany] = useState();
  const [editModal, setEditModal] = useState(false);
  const { loggedInuser } = useContext(AppContext);
  const { insertedDataId, OrderId } = useParams();
  console.log('orderId', OrderId);
  const [activeTab, setActiveTab] = useState('1');
  const navigate = useNavigate();
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/ProjectGoodsDelivery');
  };

  const tabs = [
    { id: '1', name: 'Goods Delivery ' },
    { id: '2', name: 'Attachment' },
  ];
  const tabsArb = [ 
    { id: '1', name: 'تسليم جيد' },
    { id: '2', name: 'مرفق' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  // Get goods delivery By Id

  const handleInputs = (e) => {
    setTenderDetails({ ...tenderDetails, [e.target.name]: e.target.value });
  };

  // Get Company Data
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };
  const [companyInsertData, setCompanyInsertData] = useState({
    company_name: '',
    address_street: '',
    address_town: '',
    address_country: '',
    address_po_code: '',
    phone: '',
    fax: '',
    website: '',
    supplier_type: '',
    industry: '',
    company_size: '',
    source: '',
  });
  
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);
  const companyhandleInputs = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  };

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/goodsdelivery/getTranslationforTradingGoods')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  console.log('arabic', arabic);
  useEffect(() => {
    getArabicCompanyName();
  }, []);

  const getgoodsdeliveryById = () => {
    api.post('/projectgoodsdelivery/getgoodsdeliveryById', { project_goods_delivery_id: insertedDataId }).then((res) => {
      setTenderDetails(res.data.data[0]);
    });
  };

  const getgoodsLineItemById = () => {
    api.post('/projectgoodsdelivery/getgoodsdeliveryitemById', { project_goods_delivery_id: insertedDataId }).then((res) => {
      setgoodslineDetails(res.data.data);
    });
  };

  //Logic for edit data in db

  const editGoodsDelivery = () => {
    tenderDetails.modification_date = creationdatetime;
    tenderDetails.modified_by = loggedInuser.first_name;
    api
      .post('/projectgoodsdelivery/edit-goodsdelivery', tenderDetails)
      .then(() => {
        message('Record editted successfully', 'success');
        getgoodsdeliveryById();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  const generateData = () => {
    api.post('/projectgoodsdelivery/getOrdersById', { project_order_id: tenderDetails.project_order_id })
      .then((res) => {
        const DeliveryItems = res.data.data;
        console.log('Received items:', DeliveryItems);
        if (DeliveryItems.length === 0) {
          console.warn('No Delivery items to insert');
          return;
        }
  
        // Delete existing project_goods_delivery_item records for the given project_goods_delivery_id
        api.post('/projectgoodsdelivery/deleteGoodsDeliveryItems', { project_goods_delivery_id: insertedDataId })
          .then((deleteResponse) => {
            console.log('Deleted existing delivery items:', deleteResponse.data);
  
            // Insert new DeliveryItems
            DeliveryItems.forEach((DeliveryItem, index) => {
              const DeliveryItemsData = {
                creation_date: creationdatetime,
                modified_by: loggedInuser.first_name,
                project_goods_delivery_id: insertedDataId,
                project_order_id: DeliveryItem.project_order_id,
                project_order_item_id: DeliveryItem.project_order_item_id,
                item_title: DeliveryItem.item_title,
                unit: DeliveryItem.unit,
                unit_price: DeliveryItem.unit_price,
                amount: DeliveryItem.cost_price,
                description: DeliveryItem.description,
                quantity: DeliveryItem.qty,
              };
  
              console.log(`Inserting order item ${index + 1}:`, DeliveryItemsData);
  
              // Send a POST request to insert the new DeliveryItem
              api.post('/projectgoodsdelivery/insertgoodsdeliveryitem', DeliveryItemsData)
                .then((result) => {
                  if (result.data.msg === 'Success') {
                    console.log(`Order item ${index + 1} inserted successfully`);
                    window.location.reload();

                  } else {
                    console.error(`Failed to insert order item ${index + 1}`);
                  }
                })
                .catch((error) => {
                  console.error(`Error inserting order item ${index + 1}`, error);
                });
            });
  
            console.log('All new order items inserted successfully');
          })
          .catch((error) => {
            console.error('Error deleting existing delivery items', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching quote items', error);
      });
  };

  useEffect(() => {
    getCompany();
    getgoodsdeliveryById();
    getgoodsLineItemById();
  }, [insertedDataId]);

  //Structure of Invoice table
  const columns1 = [
    { name:arb ? 'رقم لا' : 'SN.No' },
    { name:arb ? 'عنوان البند' : 'Item Title' },
    { name:arb ? 'وحدة' : 'Unit' },
    { name:arb ? 'الكمية المطلوبة' : 'Ordered Quantity' },
    { name:arb ? 'كمية تسليمها' : 'Delivered Quantity' },
    { name:arb ? 'سعر الوحدة' : 'Unit Price' },
    { name:arb ? 'المبلغ الإجمالي' : 'Total Amount ' },
  ];

  return (
    <>
    {eng === true && <BreadCrumbs heading={tenderDetails && tenderDetails.title} />}
      {arb === true && <BreadCrumbs heading={tenderDetails && tenderDetails.title_arb} />}
     {/* <BreadCrumbs heading={tenderDetails && tenderDetails.title} />*/}
      <GoodsDeliveryButton
        editGoodsDelivery={editGoodsDelivery}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
        //OrderId={OrderId}
        id={insertedDataId}
      ></GoodsDeliveryButton>

{/* <ApiButton
              editData={editGoodsDelivery}
              navigate={navigate}
              applyChanges={editGoodsDelivery}
              //deleteData={deleteBookingData}
              backToList={backToList}
              module="GoodsDelivery"
            ></ApiButton> */}
      <GoodsDeliveryMoreDetails
      arb={arb}
      arabic={arabic}
        handleInputs={handleInputs}
        company={company}
        tenderDetails={tenderDetails}
        companyhandleInputs={companyhandleInputs}

      ></GoodsDeliveryMoreDetails>

      <ComponentCard title={arb ? 'المزيد من التفاصيل' : 'More Details'}>
        <ToastContainer></ToastContainer>
        {eng === true &&

        <Tab toggle={toggle} tabs={tabs} />
        }
        { arb === true &&
        <Tabs toggle={toggle} tabsArb={tabsArb} />
        }
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col md="3">
                <FormGroup>
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      generateData();
                    }}
                  >
                    {arb?'إنشاء عنصر التسليم': 'Generate Delivery Item'} 
                  </Button>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      setEditModal(true);
                    }}
                  >
            {arb?'يحرر': 'Edit'} 
 
                  </Button>
                </FormGroup>
              </Col>
            </Row>
            <ProjectEditLineItem
              editModal={editModal}
              id={insertedDataId}
              setEditModal={setEditModal}
              getgoodsLineItemById={getgoodsLineItemById}
            ></ProjectEditLineItem>

            <FormGroup>
              <div className="container">
                <Table id="example" className="lineitem border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns1.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {goodsitemdetails &&
                      goodsitemdetails.map((element, index) => {
                        return (
                          <tr key={element.goods_delivery_id}>
                            <td>{index + 1}</td>
                            <td>{element.item_title}</td>
                            <td>{element.unit}</td>
                            <td>{element.quantity}</td>
                            <td>{element.delivery_qty}</td>
                            <td>{element.unit_price}</td>
                            <td>{element.amount}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </FormGroup>
          </TabPane>
          <TabPane tabId="2">
            <ProjectGoodsAttachment></ProjectGoodsAttachment>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default GoodsDeliveryEdit;
