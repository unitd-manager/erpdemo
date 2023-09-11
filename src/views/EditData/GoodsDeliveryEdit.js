import React, { useEffect, useState, useContext } from 'react';
import { TabPane, TabContent, Button, Table, Row, Col, FormGroup } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
//import * as Icon from 'react-feather';
//import Swal from 'sweetalert2';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import GoodsDeliveryButton from '../../components/GoodsDelivery/GoodsDeliveryButton';
import QuotationAttachment from '../../components/TradingQuotation/QuotationAttachment';
import Tab from '../../components/project/Tab';
import AppContext from '../../context/AppContext';
import GoodsDeliveryMoreDetails from '../../components/GoodsDelivery/GoodsDeliveryMoreDetails';
import EditLineItem from '../../components/GoodsDelivery/EditLineItem';

const GoodsDeliveryEdit = () => {
  const [tenderDetails, setTenderDetails] = useState();
  const [goodsitemdetails, setgoodslineDetails] = useState();

  const [editModal, setEditModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [addCompanyModal, setAddCompanyModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState();
  const { loggedInuser } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('1');
  const { id } = useParams();
  const navigate = useNavigate();
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/GoodsDelivery');
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  const addCompanyToggle = () => {
    setAddCompanyModal(!addCompanyModal);
  };

  const tabs = [
    { id: '1', name: 'Goods Delivery ' },
    { id: '2', name: 'Attachment' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };

  const [contact, setContact] = useState();
  const [company, setCompany] = useState();
  // Get Tenders By Id

  

  const handleInputs = (e) => {
    setTenderDetails({ ...tenderDetails, [e.target.name]: e.target.value });
  };

  // Get Company Data
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };

  const getContact = (companyId) => {
    setSelectedCompany(companyId);
    api.post('/company/getContactByCompanyId', { company_id: companyId }).then((res) => {
      setContact(res.data.data);
    });
  };
  const getgoodsdeliveryById = () => {
    api.post('/goodsdelivery/getgoodsdeliveryById', { goods_delivery_id: id }).then((res) => {
      setTenderDetails(res.data.data[0]);
      //getContact(res.data.data.company_id);
    });
  };
  //Logic for adding company in db

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

  const companyhandleInputs = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  };

  // Insert Company
  const insertCompany = () => {
    if (
      companyInsertData.company_name !== '' &&
      companyInsertData.phone !== '' &&
      companyInsertData.address_country !== ''
    ) {
      api
        .post('/company/insertCompany', companyInsertData)
        .then(() => {
          message('Company inserted successfully.', 'success');
          toggle();
          getCompany();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'error');
    }
  };

  //Add new Contact

  const [newContactData, setNewContactData] = useState({
    salutation: '',
    first_name: '',
    email: '',
    position: '',
    department: '',
    phone_direct: '',
    fax: '',
    mobile: '',
  });

  const handleAddNewContact = (e) => {
    setNewContactData({ ...newContactData, [e.target.name]: e.target.value });
  };

  const AddNewContact = () => {
    const newDataWithCompanyId = newContactData;
    newDataWithCompanyId.company_id = selectedCompany;
    if (newDataWithCompanyId.salutation !== '' && newDataWithCompanyId.first_name !== '') {
      api
        .post('/tender/insertContact', newDataWithCompanyId)
        .then(() => {
          getContact(newDataWithCompanyId.company_id);
          message('Contact Inserted Successfully', 'success');
          //window.location.reload();
        })
        .catch(() => {
          message('Unable to add Contact! try again later', 'error');
        });
    } else {
      message('All fields are required.', 'info');
    }
  };

  const getgoodsLineItemById = () => {
    api.post('/goodsdelivery/getgoodsdeliveryitemById', { goods_delivery_id: id }).then((res) => {
      setgoodslineDetails(res.data.data);
    });
  };

  //Logic for edit data in db

  const editGoodsDelivery = () => {
    tenderDetails.modification_date = creationdatetime;
    tenderDetails.modified_by = loggedInuser.first_name;
    api
      .post('/goodsdelivery/edit-goodsdelivery', tenderDetails)
      .then(() => {
        message('Record editted successfully', 'success');
        getgoodsdeliveryById();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  // Generate Data for Delivery Items
  const generateData = () => {
    api
      .post('/goodsdelivery/getOrdersById', { order_id: tenderDetails.order_id })
      .then((res) => {
        const DeliveryItems = res.data.data;
        console.log('Received items:', DeliveryItems);
        if (DeliveryItems.length === 0) {
          console.warn('No Delivery items to insert');
          return;
        }
        // Retrieve all order_item_id  values from the goods_delivery_items table
        api
          .get('/goodsdelivery/checkDeliveryItems')
          .then((response) => {
            const ExistingDeliveryItemsId = response.data.data;
            let alreadyInserted = false;
            const insertDeliveryItems = (index) => {
              if (index < DeliveryItems.length) {
                const DeliveryItem = DeliveryItems[index];
                // Check if the order_item_id  already exists in the ExistingDeliveryItemsId array
                if (ExistingDeliveryItemsId.includes(DeliveryItem.order_item_id)) {
                  if (!alreadyInserted) {
                    console.warn(
                      `Delivery items are already Inserted (Order_item_id: ${DeliveryItem.order_item_id})`,
                    );
                    message('Delivery items are already Inserted', 'warning');
                    alreadyInserted = true; // Set the flag to true so the message is shown only once
                    setTimeout(() => {
                      alreadyInserted = false;
                    }, 3000);
                  }

                  insertDeliveryItems(index + 1);
                } else {
                  // Insert the order item
                  const DeliveryItemsData = {
                    creation_date: creationdatetime,
                    modified_by: loggedInuser.first_name,
                    goods_delivery_id: id,
                    order_id: tenderDetails.order_id,
                    order_item_id: DeliveryItem.order_item_id,
                    title: DeliveryItem.item_title,
                    unit: DeliveryItem.unit,
                    unit_price: DeliveryItem.unit_price,
                    amount: DeliveryItem.cost_price,
                    description: DeliveryItem.description,
                    quantity: DeliveryItem.qty,
                  };
                  console.log(`Inserting order item ${index + 1}:`, DeliveryItemsData);
                  // Send a POST request to your /goodsdelivery/insertGoodsDeliveryItems API with the current DeliveryItemsData
                  api
                    .post('/goodsdelivery/insertgoodsdeliveryitem', DeliveryItemsData)
                    .then((result) => {
                      if (result.data.msg === 'Success') {
                        console.log(`Order item ${index + 1} inserted successfully`);

                        if (!alreadyInserted) {
                          console.log(`Order item ${index + 1} inserted successfully`);
                          message('All Order items Inserted successfully');
                          alreadyInserted = true;
                        }
                        getgoodsLineItemById();
                        window.location.reload();
                      } else {
                        console.error(`Failed to insert order item ${index + 1}`);
                      }
                      // Continue to the next item
                      insertDeliveryItems(index + 1);
                    })
                    .catch((error) => {
                      console.error(`Error inserting order item ${index + 1}`, error);
                      // Continue to the next item
                      insertDeliveryItems(index + 1);
                    });
                }
              } else {
                console.log('All order items inserted successfully');
                // You might want to trigger a UI update here
              }
            };
            // Start inserting order items from index 0
            insertDeliveryItems(0);
          })
          .catch((error) => {
            console.error('Error checking order item existence', error);
          });
      })

      .catch((error) => {
        console.error('Error fetching quote items', error);
      });
  };

  useEffect(() => {
    getCompany();
    getContact();
    getgoodsdeliveryById();
    getgoodsLineItemById();
  }, [id]);

  //Structure of Invoice table
  const columns1 = [
    { name: 'SN.No' },
    { name: 'Item Title' },
    { name: 'Description' },
    { name: 'Unit' },
    { name: 'quantity' },
    { name: 'Unit Price' },
    { name: 'Total Amount ' },
  ];

  return (
    <>
      <BreadCrumbs heading={tenderDetails && tenderDetails.title} />
      <GoodsDeliveryButton
        editGoodsDelivery={editGoodsDelivery}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></GoodsDeliveryButton>
      <GoodsDeliveryMoreDetails
        contact={contact}
        handleInputs={handleInputs}
        company={company}
        tenderDetails={tenderDetails}
        addCompanyModal={addCompanyModal}
        addCompanyToggle={addCompanyToggle}
        companyhandleInputs={companyhandleInputs}
        insertCompany={insertCompany}
        AddNewContact={AddNewContact}
        addContactToggle={addContactToggle}
        setAddCompanyModal={setAddCompanyModal}
        getContact={getContact}
        handleAddNewContat={handleAddNewContact}
      ></GoodsDeliveryMoreDetails>

      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        <Tab toggle={toggle} tabs={tabs} />
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
                    Generate Delivery Item
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
                    Edit
                  </Button>
                </FormGroup>
              </Col>
            </Row>
            <EditLineItem
              editModal={editModal}
              setEditModal={setEditModal}
              getgoodsLineItemById={getgoodsLineItemById}
            ></EditLineItem>

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
                            <td>{element.title}</td>
                            <td>{element.description}</td>
                            <td>{element.unit}</td>
                            <td>{element.quantity}</td>
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
            <QuotationAttachment></QuotationAttachment>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default GoodsDeliveryEdit;
