import React, { useEffect, useState } from 'react';
import { TabContent, TabPane, Table, Row } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import ProposalButtons from '../../components/ProposalTable/ProposalButtons';
// import PdfQuote from '../../components/PDF/PdfQuote';
import creationdatetime from '../../constants/creationdatetime';

// import TenderQuotation from '../../components/TenderTable/TenderQuotation';
import ProposalMoreDetails from '../../components/ProposalTable/ProposalMoreDetails';
import TenderAttachment from '../../components/TenderTable/TenderAttachment';
import Tab from '../../components/project/Tab';

const ProposalEdit = () => {
  const [activeTab, setActiveTab] = useState('1');
  //const [projectTeam, setProjectTeam] = useState({});
  //   const [quote, setQuote] = useState({});
  const [lineItem, setLineItem] = useState([]);
  const [employee,setEmployee] = useState([]);
  const [proposalDetails, setProposalDetails] = useState();

  // Start for tab refresh navigation #Renuka 1-06-23
  const tabs = [
    { id: '1', name: 'Material Needed' },
    { id: '2', name: 'Project Team' },
    { id: '3', name: 'Attachment' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  // End for tab refresh navigation #Renuka 1-06-23

  //   const [quotationsModal, setquotationsModal] = useState(false);
  //   const [viewLineModal, setViewLineModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [addCompanyModal, setAddCompanyModal] = useState(false);
  //   const [editQuoteModal, setEditQuoteModal] = useState(false);
  //const [editLineModal, setEditLineModal] = useState(false);
  const [contact, setContact] = useState();
  const [company, setCompany] = useState();

  const [selectedCompany, setSelectedCompany] = useState();
  //const [addLineItemModal, setAddLineItemModal] = useState(false);

  const [allCountries, setallCountries] = useState();
  
  //   const [quoteForm, setQuoteForm] = useState({
  //     quote_date: '',
  //     quote_code: '',
  //   });
  const { id } = useParams();
  const navigate = useNavigate();
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Proposal');
  };

  //   const viewLineToggle = () => {
  //     setViewLineModal(!viewLineModal);
  //   };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  const addCompanyToggle = () => {
    setAddCompanyModal(!addCompanyModal);
  };

  // Get Company Data
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };

  const getLineItem = () => {
    api.post('/proposal/getQuoteLineItemsById', { proposal_id: id }).then((res) => {
      setLineItem(res.data.data);
      //setAddLineItemModal(true);
    });
  };

  const getEmployeeById = () => {
    api.post('/proposal/getEmployeeById', { proposal_id: id }).then((res) => {
      setEmployee(res.data.data);
      //setAddLineItemModal(true);
    });
  };
  //   // Get Quote By Id
  //   const getQuote = () => {
  //     api.post('/tender/getQuoteById', { opportunity_id: id }).then((res) => {
  //       setQuote(res.data.data[0]);
  //     });
  //   };

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

  const getContact = (companyId) => {
    setSelectedCompany(companyId);
    api.post('/company/getContactByCompanyId', { company_id: companyId }).then((res) => {
      setContact(res.data.data);
    });
  };

  // Get Tenders By Id

  const editProposalById = () => {
    api.post('/proposal/getProposalById', { proposal_id: id }).then((res) => {
      setProposalDetails(res.data.data);
      getContact(res.data.data.company_id);
    });
  };

  const handleInputs = (e) => {
    setProposalDetails({ ...proposalDetails, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editProposalData = () => {
    if ( proposalDetails.title !== '' ) {
    proposalDetails.modification_date = creationdatetime;
    api
      .post('/proposal/editProposal', proposalDetails)
      .then(() => {
        message('Record editted successfully', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
      
    }
    else {
      message('Please fill all required fields', 'warning');
    }
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
        .post('/proposal/insertContact', newDataWithCompanyId)
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

  //Api for getting all countries
  const getAllCountries = () => {
    api.get('/clients/getCountry').then((res) => {
      setallCountries(res.data.data);
    });
  };

  //   // Get Line Item
  //   const getLineItem = (quotationId) => {
  //     api.post('/proposal/getQuoteLineItemsById', { quote_id: quotationId }).then((res) => {
  //       setLineItem(res.data.data);
  //       //setViewLineModal(true);
  //     });
  //   };

  //   const handleQuoteForms = (ele) => {
  //     setQuoteForm({ ...quoteForm, [ele.target.name]: ele.target.value });
  //   };
  //Add Quote
  //   const insertQuote = (code) => {
  //     const newQuoteId = quoteForm;
  //     newQuoteId.opportunity_id = id;
  //     newQuoteId.quote_code = code;

  //     api.post('/proposal/insertquote', newQuoteId).then(() => {
  //       message('Quote inserted successfully.', 'success');
  //       window.location.reload();
  //     });
  //   };
  //QUOTE GENERATED CODE
  //   const generateCode = () => {
  //     api
  //       .post('/proposal/getCodeValue', { type: 'quote' })
  //       .then((res) => {
  //         insertQuote(res.data.data);
  //       })
  //       .catch(() => {
  //         insertQuote('');
  //       });
  //   };

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
    
  ];

  const columns2 = [
    {
      name: '#',
    },
    {
      name: 'Name',
    },
    {
      name: 'Position',
    },
    
    {
      name: 'Updated By ',
    },
    
  ];

  //Add new Project

  useEffect(() => {
    editProposalById();
    getLineItem();
    getEmployeeById();
    getCompany();

    getAllCountries();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={proposalDetails && proposalDetails.quote_code} />
      <ProposalButtons
        editProposalData={editProposalData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></ProposalButtons>
      <ProposalMoreDetails
        companyInsertData={companyInsertData}
        newContactData={newContactData}
        handleInputs={handleInputs}
        handleAddNewContact={handleAddNewContact}
        setAddContactModal={setAddContactModal}
        addContactModal={addContactModal}
        proposalDetails={proposalDetails}
        allCountries={allCountries}
        company={company}
        contact={contact}
        addCompanyModal={addCompanyModal}
        addCompanyToggle={addCompanyToggle}
        companyhandleInputs={companyhandleInputs}
        insertCompany={insertCompany}
        AddNewContact={AddNewContact}
        addContactToggle={addContactToggle}
        setAddCompanyModal={setAddCompanyModal}
        getContact={getContact}
      ></ProposalMoreDetails>

      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          <TabPane tabId="1">
            {/* <Row>
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
            </Row> */}
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
                          <tr key={e.proposal_id}>
                            <td>{index + 1}</td>
                            <td data-label="Title">{e.title}</td>
                            <td data-label="Description">{e.description}</td>
                            <td data-label="Quantity">{e.quantity}</td>
                            <td data-label="Unit Price">{e.unit_price}</td>
                            <td data-label="Amount">{e.amount}</td>
                            <td data-label="Updated By"></td>
                            
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
          </TabPane>
          <TabPane tabId="2">
          <Row>
              <div className="container">
                <Table id="example" className="display border border-secondary rounded">
                  <thead>
                    <tr>
                      {columns2.map((cell) => {
                        return <td key={cell.name}>{cell.name}</td>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {employee &&
                      employee.map((e, index) => {
                        return (
                          <tr key={e.employee_id}>
                            <td>{index + 1}</td>
                            <td data-label="Name">{e.first_name}</td>
                            <td data-label="Position">{e.position}</td>
                            
                            
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </div>
            </Row>
            
            
          </TabPane>

          <TabPane tabId="3">
            <TenderAttachment></TenderAttachment>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default ProposalEdit;
