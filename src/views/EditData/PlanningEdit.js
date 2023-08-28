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
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import ComponentCard from '../../components/ComponentCard';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import api from '../../constants/api';
import PlanningMainDetails from '../../components/Planning/PlanningMainDetails';
import PlanningButton from '../../components/Planning/PlanningButton';
import PlanningCpanel from '../../components/Planning/PlanningCpanel';
import PlanEditModal from '../../components/Planning/PlanEditModal';
import Tab from '../../components/project/Tab';

const PlanningEdit = () => {
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
    cpanel_name: '',
    ordered_qty: '',
    fg_code: '',
    start_date: '',
    end_date: '',
    due_date: '',
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
    navigate('/Planning');
  };

    // Start for tab refresh navigation #Renuka 1-06-23
    const tabs =  [
      {id:'1',name:'Cpanel'},
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
      .post('/planning/getPlanningById', { project_planning_id: id })
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
      plannings.title &&
      plannings.customer 
      ) {
      api
        .post('/planning/editPlanning', plannings)
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
      .post('/planning/getPlanningCpanelLinkedById', { project_planning_id: id })
      .then((res) => {
        setPlanningDetails(res.data.data);
      })
      .catch(() => {
       
      });
  };
  const CalculateBillofmaterials = (cpanelId) => {
    api
      .post('/planning/getPlanningCpanelMaterialsById', { planning_cpanel_id: cpanelId })
      .then((res) => {
        res.data.data.forEach((element) => {
          const orderedQty = element.ordered_qty ? parseFloat(element.ordered_qty) : 0;
          const qty = element.qty ? parseFloat(element.qty) : 0;
          const totalMaterial = orderedQty * qty;
          console.log('totalMaterial', totalMaterial);
          const Inventorystock = element.actual_stock ? parseFloat(element.actual_stock) : 0;
          console.log('Inventorystock', Inventorystock);
  
          if (totalMaterial > Inventorystock) {
            element.matrl_shortage = 1;
            // Calculate matrl_shortage_qty and insert it
            element.matrl_shortage_qty = totalMaterial - Inventorystock;
            api.post('/planning/editPlanningBom',element).then(()=>{
           
            }).catch(()=>{})
          } else {
            element.matrl_shortage = 0;
            // Set matrl_shortage_qty to 0 when there's no shortage
            element.matrl_shortage_qty = 0;
            api.post('/planning/editPlanningBom',element).then(()=>{}).catch(()=>{})
          }
          message('Material shortage insert successfully', 'success');
          console.log('el', element.matrl_shortage);
          console.log('el.matrl_shortage_qty', element.matrl_shortage_qty);
        });
      })
      .catch(() => {
        
      });
  };
  
  
  
  const AddNewPlanning = () => {
  
    const newContactWithCompanyId = newPlanningData;
newContactWithCompanyId.project_planning_id = id;
console.log('idra',newContactWithCompanyId.project_planning_id )
if (
  newContactWithCompanyId.cpanel_name !== '' 


) {
api
  .post('/planning/insertPlanningCpanel', newContactWithCompanyId)
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
           AddNewPlanning={AddNewPlanning}
           addContactModal={addContactModal}
           addContactToggle={addContactToggle}
           setPlanData={setPlanData}
           setPlanEditModal={setPlanEditModal}
           CalculateBillofmaterials={CalculateBillofmaterials}
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
export default PlanningEdit;
