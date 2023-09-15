import React, { useEffect, useState, useContext } from 'react';
import { TabPane, TabContent } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import ClientButton from '../../components/ClientTable/ClientButton';
import ClientMainDetails from '../../components/ClientTable/ClientMainDetails';
import ContactEditModal from '../../components/Tender/ContactEditModal';
import ClientContactGetAndInsert from '../../components/ClientTable/ClientContactGetAndInsert';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import AddNote from '../../components/Tender/AddNote';
import ViewNote from '../../components/Tender/ViewNote';
import creationdatetime from '../../constants/creationdatetime';
import Tab from '../../components/project/Tab';
import AppContext from '../../context/AppContext';

const ClientsEdit = () => {
  //Const Variables
  const [activeTab, setActiveTab] = useState('1');
  const [contactData, setContactData] = useState();
  const [addContactModal, setAddContactModal] = useState(false);
  const [clientsDetails, setClientsDetails] = useState();
  const [contactsDetails, setContactsDetails] = useState(null);
  const [editContactEditModal, setEditContactEditModal] = useState(false);
  const [allCountries, setallCountries] = useState();
  const { loggedInuser } = useContext(AppContext);

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  //  button
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/client');
  };

  // Start for tab refresh navigation  #Renuka 1-06-23
  const tabs = [
    { id: '1', name: 'Contacts Linked' },
    { id: '2', name: 'Add notes' },
  ];

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const addContactToggle = () => {
    setAddContactModal(!addContactModal);
  };

  //Client Functions/Methods
  const handleInputs = (e) => {
    setClientsDetails({ ...clientsDetails, [e.target.name]: e.target.value });
  };

  //  Get Clients By Id
  const editClientsById = () => {
    api
      .post('/clients/getClientsById', { company_id: id })
      .then((res) => {
        setClientsDetails(res.data.data[0]);
      })
      .catch(() => {});
  };

  //Logic for edit data in db
  const editClientsData = () => {
    if (clientsDetails.company_name !== '') {
      clientsDetails.modification_date = creationdatetime;
      clientsDetails.modified_by = loggedInuser.first_name;
      api
        .post('/clients/editClients', clientsDetails)
        .then(() => {
          message('Record editted successfully', 'success');
          editClientsById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  // get Contact Linked by id
  const getContactLinked = () => {
    api
      .post('/clients/getContactLinkedByCompanyId', { company_id: id })
      .then((res) => {
        setContactsDetails(res.data.data);
      })
      .catch(() => {
        message('Conatct Data Not Found', 'info');
      });
  };
  //Email
  const sendMail = () => {
    if (window.confirm(' Are you sure do you want to send Mail to this Client \n')) {
      const to = 'fatema@unitdtechnologies.com';
      const text = 'Hello';
      const subject = 'Test Mail';
      api
        .post('/email/sendemail', { to, text, subject })
        .then(() => {
          message('Email sent successfully.', 'success');
        })
        .catch(() => {
          message('Email Data Not Found', 'info');
        });
    } else {
      applyChanges();
    }
  };

  // insert Contact
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
    const newContactWithCompanyId = newContactData;
    newContactWithCompanyId.company_id = id;
    if (newContactWithCompanyId.salutation !== '' && newContactWithCompanyId.first_name !== '') {
      api
        .post('/clients/insertContact', newContactWithCompanyId)
        .then(() => {
          message('Contact inserted successfully.', 'success');
          window.location.reload();
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //  deleteRecord
  const DeleteClient = () => {
    api
      .post('/clients/deleteCompany', { company_id: id })
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to delete record.', 'error');
      });
  };

  //Api for getting all countries
  const getAllCountries = () => {
    api
      .get('/clients/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
        //message('Country Data Not Found', 'info');
      });
  };

  // Delete Contact
  const deleteRecord = (staffId) => {
    Swal.fire({
      title: `Are you sure? `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('/clients/deleteContact', { contact_id: staffId })
          .then(() => {
            Swal.fire('Deleted!', 'Contact has been deleted.', 'success');
            message('Record deleted successfully', 'success');
            window.location.reload();
          })
          .catch(() => {
            message('Unable to delete record.', 'error');
          });
      }
    });
  };

  useEffect(() => {
    editClientsById();
    getContactLinked();
    getAllCountries();
  }, [id]);

  return (
    <>
      {/* BreadCrumbs */}
      <BreadCrumbs heading={clientsDetails && clientsDetails.company_name} />
      {/* Button List */}
      <ClientButton
        editClientsData={editClientsData}
        navigate={navigate}
        applyChanges={applyChanges}
        DeleteClient={DeleteClient}
        backToList={backToList}
        sendMail={sendMail}
      ></ClientButton>

      {/* Client Main details */}
      <ComponentCard title="Client Details" creationModificationDate={clientsDetails}>
        <ClientMainDetails
          handleInputs={handleInputs}
          clientsDetails={clientsDetails}
          allCountries={allCountries}
        ></ClientMainDetails>
      </ComponentCard>
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>
        {/* Nav Tab */}
        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
          {/* Contact Linked */}
          <TabPane tabId="1">
            <ClientContactGetAndInsert
              setContactData={setContactData}
              setEditContactEditModal={setEditContactEditModal}
              deleteRecord={deleteRecord}
              contactsDetails={contactsDetails}
              addContactToggle={addContactToggle}
              addContactModal={addContactModal}
              handleAddNewContact={handleAddNewContact}
              newContactData={newContactData}
              AddNewContact={AddNewContact}
            ></ClientContactGetAndInsert>
            {/* Contact Linked Edit modal */}
            <ContactEditModal
              editContactEditModal={editContactEditModal}
              setEditContactEditModal={setEditContactEditModal}
              contactData={contactData}
            />
          </TabPane>
          {/* ADD NOTE */}
          <TabPane tabId="2">
            <AddNote recordId={id} roomName="AccountEdit" />
            <ViewNote recordId={id} roomName="AccountEdit" />
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default ClientsEdit;
