import React, { useEffect, useState, useContext } from 'react';
import { TabPane, TabContent, Col, Button, Table, Row} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import TradingQuoteButton from '../../components/EquipmentRequest/TradingQuoteButton';
import TradingQuoteMoreDetails from '../../components/EquipmentRequest/TradingQuoteMoreDetails';
import QuotationAttachment from '../../components/EquipmentRequest/QuotationAttachment';
import Tab from '../../components/project/Tab';
import QuoteLineItem from '../../components/EquipmentRequest/QuoteLineItem';
import EditLineItemModal from '../../components/EquipmentRequest/EditLineItemModal';
import AppContext from '../../context/AppContext';

const EquipmentRequestEdit = () => {
  const [tenderDetails, setTenderDetails] = useState();
  const [company, setCompany] = useState();
  const [contact, setContact] = useState();
  const [addLineItemModal, setAddLineItemModal] = useState(false);
  const [lineItem, setLineItem] = useState();
  const [viewLineModal, setViewLineModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState();
  const [editLineModelItem, setEditLineModelItem] = useState(null);
  const [editLineModal, setEditLineModal] = useState(false);
  //const [quoteLine, setQuoteLine] = useState();

  //const [contact, setContact] = useState();
  //   const [addContactModal, setAddContactModal] = useState(false);
  //   const [addCompanyModal, setAddCompanyModal] = useState(false);

  const { loggedInuser } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('1');
  const { id } = useParams();
  const navigate = useNavigate();
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/EquipmentRequest');
  };
  const addQuoteItemsToggle = () => {
    setAddLineItemModal(!addLineItemModal);
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  const viewLineToggle = () => {
    setViewLineModal(!viewLineModal);
  };
  console.log(viewLineToggle);
  const tabs = [
    { id: '1', name: 'Equipment Request' },
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
    api.post('/equipmentrequest/getEquipmentRequestById', { equipment_request_id: id }).then((res) => {
      setTenderDetails(res.data.data[0]);
      getContact(res.data.data.company_id);
    });
  };

  const [status, setStatus] = useState(tenderDetails && tenderDetails.equipment_status);
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
  
    // Check if the status has changed to "Approved"
    if (newStatus === "Approved") {
      const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
  
      // Update the state and the "approved_by" and "approved_date" fields
      setStatus(newStatus);
      setTenderDetails({
        ...tenderDetails,
        equipment_status: newStatus,
        approved_by: loggedInuser.first_name,
        approved_date: currentDate,
      });
    } else {
      // If the status is not "Approved," update only the state
      setStatus(newStatus);
      setTenderDetails({
        ...tenderDetails,
        equipment_status: newStatus,
      });
    }
  };
  

  const handleInputs = (e) => {
    setTenderDetails({ ...tenderDetails, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editTenderData = () => {
    tenderDetails.modification_date = creationdatetime;
    tenderDetails.modified_by = loggedInuser.first_name;
    api
      .post('/equipmentrequest/editEquipmentRequest', tenderDetails)
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
  // Get Line Item
  const getLineItem = () => {
    api.post('/equipmentRequest/getMRLineItemsById', { equipment_request_id: id }).then((res) => {
      setLineItem(res.data.data);
      //setAddLineItemModal(true);
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
    if (
      newDataWithCompanyId.salutation !== '' &&
      newDataWithCompanyId.first_name !== '' 
    
    ) {
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
    getLineItem();
    getCompany();
   
    // getAllCountries();
  }, [id]);

  const columns1 = [
    {
      name: '#',
    },
   
    {
      name: 'Description',
    },
    {
      name: 'Brand',
    },
    {
      name: 'Supplier',
    },
    {
      name: 'Qty',
    },
    {
      name: 'Unit Price',
    },
    {
      name: 'Amount',
    },
 
    {
      name: 'Updated By ',
    },
    {
      name: 'Action ',
    },
  ];
  const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure? ${deleteID}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/equipmentrequest/deleteEquipmentRequestItem', { equipment_request_item_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };
 
  
  return (
    <>
      <BreadCrumbs heading={tenderDetails && tenderDetails.title} />
      <TradingQuoteButton
        editTenderData={editTenderData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></TradingQuoteButton>
     
      <TradingQuoteMoreDetails
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
        handleStatusChange={handleStatusChange}
        status={status}
      ></TradingQuoteMoreDetails>

      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col md="6">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addQuoteItemsToggle.bind(null)}
                >
                  Add Quote Items
                </Button>
              </Col>
            </Row>
            <br />
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
                    {lineItem &&
                      lineItem.map((e, index) => {
                        return (
                          <tr key={e.material_request_id}>
                            <td>{index + 1}</td>
                            <td data-label="Description">{e.product_name}</td>
                            <td data-label="Brand">{e.brand}</td>
                            <td data-label="Supplier">{e.supplier_name}</td>
                            <td data-label="Quantity">{e.quantity}</td>
                            <td data-label="Unit Price">{e.unit_price}</td>
                            <td data-label="Amount">{e.amount}</td>
                            <td data-label="Updated By">
  {e.modification_date
    ? `${e.modified_by} (Modified on ${e.modification_date})`
    : `${e.created_by} (Created on ${e.creation_date})`}
</td>

                            <td data-label="Actions">
                              <span
                                className="addline"
                                onClick={() => {
                                  setEditLineModelItem(e);
                                  setEditLineModal(true);
                                }}
                              >
                                <Icon.Edit2 />
                              </span>
                              <span
                                className="addline"
                                onClick={() => {
                                  deleteRecord(e.equipment_request_item_id);
                                }}
                              >
                                <Icon.Trash2 />
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
            {/* End View Line Item Modal */}
            <EditLineItemModal
              editLineModal={editLineModal}
              setEditLineModal={setEditLineModal}
              FetchLineItemData={editLineModelItem}
              getLineItem={getLineItem}
              setViewLineModal={setViewLineModal}
            ></EditLineItemModal>
            {addLineItemModal && (
              <QuoteLineItem
                //projectInfo={tenderId}
                setTenderDetails={setTenderDetails}
                addLineItemModal={addLineItemModal}
                setAddLineItemModal={setAddLineItemModal}
                handleInputs={handleInputs}
                quoteLine={id}
              ></QuoteLineItem>
            )}
          </TabPane>
          <TabPane tabId="2">
            <QuotationAttachment></QuotationAttachment>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default EquipmentRequestEdit;
