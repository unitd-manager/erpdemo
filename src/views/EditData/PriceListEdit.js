import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Button,
  TabPane,
  TabContent,
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ComponentCard from '../../components/ComponentCard';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
import PlanningMainDetails from '../../components/PriceList/PriceMainDetails';
import PlanningButton from '../../components/PriceList/PriceButton';
import PlanningCpanel from '../../components/PriceList/PriceListItem';
import PlanEditModal from '../../components/PriceList/PriceEditModal';
import Tab from '../../components/project/Tab';

const PriceListEdit = () => {
  //Const Variables
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [plannings, setPlannings] = useState({});
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [update, setUpdate] = useState(false);
  const [planningDetails, setPlanningDetails] = useState(null);
  const [newPlanningData, setNewPlanningData] = useState({
    product_id: '',
    price: '',
    unit: '',
    title:'',

  });
  const [addContactModal, setAddContactModal] = useState(false);
  const [planData, setPlanData] = useState();
  const [editPlanEditModal, setPlanEditModal] = useState(false);

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  // Button Save Apply Back List
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/PriceList');
  };

    // Start for tab refresh navigation #Renuka 1-06-23
    const tabs =  [
      {id:'1',name:'Price List Item'},
      {id:'2',name:'Attachment'},
    ];
    const toggle = (tab) => {
      setActiveTab(tab);
    };
    // End for tab refresh navigation #Renuka 1-06-23
    const addContactToggle = () => {
      setAddContactModal(!addContactModal);
    };
  // Get Leaves By Id
  const PlanningById = () => {
    api
      .post('/pricelistitem/getPriceListById', { price_list_id: id })
      .then((res) => {
        setPlannings(res.data.data[0]);
      })
      .catch(() => {
        
      });
  };
  //Leave Functions/Methods
  const handleInputs = (e) => {
    setPlannings({ ...plannings, [e.target.name]: e.target.value });
  
  };
  // Attachment
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  //Logic for edit data in db
  const editplanningData = () => {
    
    if (
      plannings.effective_date &&
      plannings.customer_name 
      ) {
      api
        .post('/pricelistitem/editPriceList', plannings)
        .then(() => {
          message('Record editted successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  const getCpanelLinked = () => {
    api
      .post('/pricelistitem/getPriceListItemLinkedById', { price_list_id: id })
      .then((res) => {
        setPlanningDetails(res.data.data);
      })
      .catch(() => {
       
      });
  };
  
  
  
  const AddNewPlanning = () => {
  
    const newContactWithCompanyId = newPlanningData;
newContactWithCompanyId.price_list_id = id;
if (
  newContactWithCompanyId.price !== ''


) {
api
  .post('/pricelistitem/insertPriceListItem', newContactWithCompanyId)
  .then(() => {
    message('Contact inserted successfully.', 'success');
     window.location.reload();
  })
  .catch(() => { 
    message('Network connection error.', 'error');
  });
}else {
message('Please fill all required fields', 'warning');
}
};

//Contact Functions/Methods
const handleAddNewPlanning = (e) => {
  setNewPlanningData({ ...newPlanningData, [e.target.name]: e.target.value });
};

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
      api.post('/pricelistitem/deletePriceListItem', { price_list_item_id: deleteID }).then(() => {
        Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
        window.location.reload();
      });
    }
  });
};
  useEffect(() => {
    PlanningById();
    getCpanelLinked();
  }, [id]);

  return (
    <>
      {/* BreadCrumbs */}
      <BreadCrumbs />
      {/* Button */}
      <PlanningButton
       editData={editplanningData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
       ></PlanningButton>
       
       {/* Main Details */}
      <PlanningMainDetails
        handleInputs={handleInputs}
        plannings={plannings}
        ></PlanningMainDetails>

      {/* Nav tab */}
      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

      <Tab toggle={toggle} tabs={tabs} />

        <TabContent className="p-4" activeTab={activeTab}>
        <TabPane tabId="1">
           <PlanningCpanel
           planningDetails={planningDetails}
           handleAddNewPlanning={handleAddNewPlanning}
           newPlanningData={newPlanningData}
           setNewPlanningData={setNewPlanningData}
           AddNewPlanning={AddNewPlanning}
           addContactModal={addContactModal}
           addContactToggle={addContactToggle}
           setPlanData={setPlanData}
           setPlanEditModal={setPlanEditModal}
           deleteRecord={deleteRecord}
           ></PlanningCpanel>
           {/* Cpanel Linked Edit modal */}
           <PlanEditModal
           planData={planData}
           editPlanEditModal={editPlanEditModal}
           setPlanEditModal={setPlanEditModal}
           ></PlanEditModal>
          </TabPane>
          {/* Attachment */}
          <TabPane tabId="2">
            <Form>
              <FormGroup>
                  <Row>
                    <Col xs="12" md="3" className="mb-3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          setRoomName('Leave');
                          setFileTypes(['JPG','JPEG', 'PNG', 'GIF', 'PDF']);
                          dataForAttachment();
                          setAttachmentModal(true);
                        }}
                      >
                        <Icon.File className="rounded-circle" width="20" />
                      </Button>
                    </Col>
                  </Row>
                  <AttachmentModalV2
                    moduleId={id}
                    attachmentModal={attachmentModal}
                    setAttachmentModal={setAttachmentModal}
                    roomName={RoomName}
                    fileTypes={fileTypes}
                    altTagData="LeaveRelated Data"
                    desc="LeaveRelated Data"
                    recordType="RelatedPicture"
                    mediaType={attachmentData.modelType}
                    update={update}
                    setUpdate={setUpdate}
                  />
                  <ViewFileComponentV2 moduleId={id} roomName="Leave" recordType="RelatedPicture" update={update}
                    setUpdate={setUpdate}/>
              </FormGroup>
            </Form>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};
export default PriceListEdit;
