import React, { useEffect, useState, useContext } from 'react';
import { TabPane, TabContent,  Table, Row} from 'reactstrap';
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
import ProjectQuoteButton from '../../components/PurchaseReturn/ProjectQuoteButton';
import ProjectQuoteMoreDetails from '../../components/PurchaseReturn/ProjectQuoteMoreDetails';
import QuotationAttachment from '../../components/PurchaseReturn/QuotationAttachment';
import Tab from '../../components/project/Tab';
import AppContext from '../../context/AppContext';

const PurchaseReturnEdit = () => {
  const [tenderDetails, setTenderDetails] = useState();
  const [company, setCompany] = useState();
  const [contact, setContact] = useState();
  const [lineItem, setLineItem] = useState();
  const [viewLineModal, setViewLineModal] = useState(false);
  const [addContactModal, setAddContactModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState();
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
    navigate('/PurchaseReturn');
  };

  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };
  const viewLineToggle = () => {
    setViewLineModal(!viewLineModal);
  };
  console.log(viewLineToggle);
  const tabs = [
    { id: '1', name: 'Purchase Return' },
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
    api
      .post('/purchasereturn/getPurchaseReturnById', { purchase_return_id: id })
      .then((res) => {
        setTenderDetails(res.data.data[0]);
      })
      .catch(() => {
        
      });
  };

  const handleInputs = (e) => {
    setTenderDetails({ ...tenderDetails, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db

  const editTenderData = () => {
    tenderDetails.modification_date = creationdatetime;
    tenderDetails.modified_by = loggedInuser.first_name;
    api
      .post('/purchasereturn/editpurchasereturn', tenderDetails)
      .then(() => {
        message('Record editted successfully', 'success');
       
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
    api.post('/purchasereturn/getQuoteLineItemsById', { purchase_return_id: id }).then((res) => {
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
      title: `Are you sure? ${id}`,
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

  return (
    <>
      <BreadCrumbs heading={tenderDetails && tenderDetails.title} />
      <ProjectQuoteButton
        editTenderData={editTenderData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></ProjectQuoteButton>
     
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
                          <tr key={e.purchase_return_id}>
                            <td>{index + 1}</td>
                            <td data-label="Title">{e.item_title}</td>
                            <td data-label="Description"></td>
                            <td data-label="Quantity">{e.ordered_quantity}</td>
                            <td data-label="Unit Price"></td>
                            <td data-label="Amount"></td>
                            <td data-label="Updated By"></td>
                            <td data-label="Actions">
                             
                              <span
                                className="addline"
                                onClick={() => {
                                  deleteRecord(e.purchase_return_items_id);
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
           
           
          </TabPane>
          <TabPane tabId="2">
            <QuotationAttachment></QuotationAttachment>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default PurchaseReturnEdit;
