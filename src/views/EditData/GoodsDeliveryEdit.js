import React, { useEffect, useState, useContext } from 'react';
import { TabPane, TabContent, Button, Table, Row, Col } from 'reactstrap';
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
  const [company, setCompany] = useState();
  const [contact, setContact] = useState();
  const [addContactModal, setAddContactModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState();
  const [editModal, setEditModal] = useState(false);
  //const [lineItemDatas, setLineItemDatas] = useState({});

  //const [contact, setContact] = useState();
  //   const [addContactModal, setAddContactModal] = useState(false);
  //   const [addCompanyModal, setAddCompanyModal] = useState(false);

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

  const tabs = [
    { id: '1', name: 'Goods Delivery ' },
    { id: '2', name: 'Attachment' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  const getContact = (companyId) => {
    setSelectedCompany(companyId);
    api.post('/company/getContactByCompanyId', { company_id: companyId }).then((res) => {
      setContact(res.data.data);
    });
  };

  // Get Tenders By Id

  const editTenderById = () => {
    api.post('/goodsdelivery/getgoodsdeliveryById', { goods_delivery_id: id }).then((res) => {
      setTenderDetails(res.data.data[0]);
      getContact(res.data.data.company_id);
    });
  };

  const handleInputs = (e) => {
    setTenderDetails({ ...tenderDetails, [e.target.name]: e.target.value });
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
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  // Get Company Data
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };

  // Function to insert order_item data into goods_delivery_item
  const generateData = () => {
    api.post('/goodsdelivery/getOrdersById', { order_id: tenderDetails.order_id }).then((res) => {
      const orderItems = res.data.data;

      // Loop through order items and insert them into goods_delivery_item
      orderItems.forEach((orderItem) => {
        const newItem = {
          goods_delivery_id: id,
          order_id: tenderDetails.order_id,
          order_item_id: orderItem.order_item_id,
          title: orderItem.item_title,
          description: orderItem.description,
          quantity: orderItem.qty,
          // Add other properties as needed
        };

        // Use your API call to insert the item into goods_delivery_item
        api
          .post('/goodsdelivery/insertgoodsdeliveryitem', newItem)
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
  };
  // Add new Contact

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
          window.location.reload();
        })
        .catch(() => {
          message('Unable to add Contact! try again later', 'error');
        });
    } else {
      message('All fields are required.', 'info');
    }
  };

  useEffect(() => {
    editTenderById();
    getgoodsLineItemById();
    getCompany();
  }, [id]);

  //Structure of Invoice table
  const columns1 = [
    { name: 'Item Title' },
    { name: 'Description' },
    { name: 'Unit' },
    { name: 'quantity' },
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
        newContactData={newContactData}
        handleInputs={handleInputs}
        handleAddNewContact={handleAddNewContact}
        setAddContactModal={setAddContactModal}
        addContactModal={addContactModal}
        tenderDetails={tenderDetails}
        company={company}
        contact={contact}
        AddNewContact={AddNewContact}
        addContactToggle={addContactToggle}
        getContact={getContact}
      ></GoodsDeliveryMoreDetails>

      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          
          <TabPane tabId="1">
            {!tenderDetails && (
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
            )}
            <br/>
            <Button
            className="shadow-none"
            color="primary"
            onClick={() => {
              setEditModal(true);
            }}
          >
            Edit
          </Button>
          <br />
            {tenderDetails && (
              <Row>
                <div className="container">
                  <Table id="example" className="display border border-secondary rounded">
                    <thead>
                      <tr>
                        {columns1.map((cell) => {
                          return <td key={cell.name}>{cell.name}</td>;
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {goodsitemdetails &&
                        goodsitemdetails.map((element) => {
                          return (
                            <tr key={element.goods_delivery_id}>
                              <td>{element.title}</td>
                              <td>{element.description}</td>
                              <td>{element.unit}</td>
                              <td>{element.quantity}</td>
                              <td>{element.amount}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              </Row>
            )}
            <EditLineItem editModal={editModal} setEditModal={setEditModal}></EditLineItem>
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
