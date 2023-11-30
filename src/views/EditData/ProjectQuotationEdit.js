import React, { useEffect, useState, useContext } from 'react';
import { TabPane, TabContent, Col, Button, Table, Row,Label } from 'reactstrap';
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
import ProjectQuoteButton from '../../components/ProjectQuotation/ProjectQuoteButton';
import ProjectQuoteMoreDetails from '../../components/ProjectQuotation/ProjectQuoteMoreDetails';
import QuotationAttachment from '../../components/ProjectQuotation/QuotationAttachment';
import Tab from '../../components/project/Tab';
import QuoteLineItem from '../../components/ProjectQuotation/QuoteLineItem';
import EditLineItemModal from '../../components/ProjectQuotation/EditLineItemModal';
import EditMaterialLineItemModal from '../../components/ProjectQuotation/EditMaterialLineItemModal';
import MaterialLineItem from '../../components/ProjectQuotation/MaterialLineItem';
import AppContext from '../../context/AppContext';
import PdfQuote from '../../components/PDF/PdfQuotation';

const ProjectQuotationEdit = () => {
  const [tenderDetails, setTenderDetails] = useState();
  const [company, setCompany] = useState();
  const [contact, setContact] = useState();
  const [addLineItemModal, setAddLineItemModal] = useState(false);
  const [addMaterialItemModal, setAddMaterialItemModal] = useState(false);
  const [lineItem, setLineItem] = useState();
  const [materialItem, setMaterialItem] = useState();
  const [viewLineModal, setViewLineModal] = useState(false);
  const [viewMaterialModal, setViewMaterialModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState();
  const [editLineModelItem, setEditLineModelItem] = useState(null);
  const [editLineModal, setEditLineModal] = useState(false);
  const [editMaterialModelItem, setEditMaterialModelItem] = useState(null);
  const [editMaterialModal, setEditMaterialModal] = useState(false);
  //const [previousTenderDetails, setPreviousTenderDetails] = useState(null);
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
    navigate('/ProjectQuotation');
  };
  const addQuoteItemsToggle = () => {
    setAddLineItemModal(!addLineItemModal);
  };
  const addMaterialItemsToggle = () => {
    setAddMaterialItemModal(!addMaterialItemModal);
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  const viewLineToggle = () => {
    setViewLineModal(!viewLineModal);
  };
  console.log(viewLineToggle);

  const viewMaterialToggle = () => {
    setViewMaterialModal(!viewMaterialModal);
  };
  console.log(viewMaterialToggle);
  
  const tabs = [
    { id: '1', name: 'Quotation ' },
    { id: '2', name: 'Material Needed ' },
    { id: '3', name: 'Attachment' },
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
    api.post('/projectquote/getProjectquoteById', { project_quote_id: id }).then((res) => {
      //setPreviousTenderDetails(res.data.data);
      setTenderDetails(res.data.data[0]);
 // Assuming you have a company_id in your response data
 const companyId = res.data.data[0].company_id;

 // Call getContact with the companyId
 getContact(companyId);
    });
  };

  const handleInputs = (e) => {
    setTenderDetails({ ...tenderDetails, [e.target.name]: e.target.value });
  };

  

  
//   //Logic for edit data in db
//   const insertquote = () => {
//     const quoteData = {
//     quote_date: previousTenderDetails.quote_date,
//     quote_status: previousTenderDetails.quote_status,
//     quote_code: previousTenderDetails.quote_code,
//     quote_id: id,
//     created_by: loggedInuser.first_name,
//     creation_date: creationdatetime,
//   };
 

//   api.post('/project/insertLog', quoteData).then((res) => {
//     message('quote inserted successfully.', 'success');
//     lineItem.forEach((element) => {
//       element.quote_log_id = res.data.data.insertId;
      
//       api.post('/project/insertLogLine', element).then(() => {
//         window.location.reload();
//       });
//     });
//   });
// };

  const editTenderData = () => {
    tenderDetails.modification_date = creationdatetime;
    tenderDetails.modified_by = loggedInuser.first_name;
    api
      .post('/projectquote/edit-Tradingquote', tenderDetails)
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
    api.post('/projectquote/getQuoteLineItemsById', { project_quote_id: id }).then((res) => {
      setLineItem(res.data.data);
      //setAddLineItemModal(true);
    });
  };

  const getMaterialItem = () => {
    api.post('/projectquote/getMaterialLineItemsById', { project_quote_id: id }).then((res) => {
      setMaterialItem(res.data.data);
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
    getMaterialItem();
    getCompany();
    // getAllCountries();
  }, [id]);

  const columns1 = [
    {
      name: '#',
    },
    {
      name: 'Title',
    },
    {
      name: 'Description',
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
        api.post('/projectquote/deleteEditItem', { project_quote_items_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };

  const deleteMaterial = (deleteLine) => {
    Swal.fire({
      title: `Are you sure? ${deleteLine}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/projectquote/deleteMaterial', { material_used_id: deleteLine }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };


  return (
    <>
      <BreadCrumbs heading={tenderDetails && tenderDetails.title} />
      <ProjectQuoteButton
        editTenderData={editTenderData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></ProjectQuoteButton>
      <Col md="4">
        <Label>
          <PdfQuote id={id} quoteId={id}></PdfQuote>
        </Label>
      </Col> 
      <ProjectQuoteMoreDetails
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
      ></ProjectQuoteMoreDetails>

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
                          <tr key={e.project_quote_id}>
                            <td>{index + 1}</td>
                            <td data-label="Title">{e.title}</td>
                            <td data-label="Description">{e.description}</td>
                            <td data-label="Quantity">{e.quantity}</td>
                            <td data-label="Unit Price">{e.unit_price}</td>
                            <td data-label="Amount">{e.amount}</td>
                            <td data-label="Updated By">{e.created_by} {e.creation_date}</td>
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
                                  deleteRecord(e.project_quote_items_id);
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
              //insertquote={insertquote}
            ></EditLineItemModal>
            {addLineItemModal && (
              <QuoteLineItem
                //projectInfo={tenderId}
                addLineItemModal={addLineItemModal}
                setAddLineItemModal={setAddLineItemModal}
                quoteLine={id}
              ></QuoteLineItem>
            )}
          </TabPane>
          <TabPane tabId="2">
            <Row>
                <Col md="6">
                <Button
                  className="shadow-none"
                  color="primary"
                  to=""
                  onClick={addMaterialItemsToggle.bind(null)}
                >
                  Add Material Items
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
                    {materialItem &&
                      materialItem.map((e, index) => {
                        return (
                          <tr key={e.project_quote_id}>
                            <td>{index + 1}</td>
                            <td data-label="Title">{e.title}</td>
                            <td data-label="Description">{e.description}</td>
                            <td data-label="Quantity">{e.quantity}</td>
                            <td data-label="Unit Price">{e.unit_price}</td>
                            <td data-label="Amount">{e.amount}</td>
                            <td data-label="Updated By">{e.created_by} {e.creation_date}</td>
                            <td data-label="Actions">
                              <span
                                className="addline"
                                onClick={() => {
                                  setEditMaterialModelItem(e);
                                  setEditMaterialModal(true);
                                }}
                              >
                                <Icon.Edit2 />
                              </span>
                              <span
                                className="addline"
                                onClick={() => {
                                  deleteMaterial(e.material_used_id);
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
            <EditMaterialLineItemModal
              editMaterialModal={editMaterialModal}
              setEditMaterialModal={setEditMaterialModal}
              FetchMaterialItemData={editMaterialModelItem}
              getMaterialItem={getMaterialItem}
              setViewMaterialModal={setViewMaterialModal}
              tenderDetails={tenderDetails}
              //insertquote={insertquote}
            ></EditMaterialLineItemModal>
            {addMaterialItemModal && (
              <MaterialLineItem
                //projectInfo={tenderId}
                addMaterialItemModal={addMaterialItemModal}
                setAddMaterialItemModal={setAddMaterialItemModal}
                quoteLine={id}
              ></MaterialLineItem>
            )}
          </TabPane>
          <TabPane tabId="3">
            <QuotationAttachment></QuotationAttachment>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default ProjectQuotationEdit;
