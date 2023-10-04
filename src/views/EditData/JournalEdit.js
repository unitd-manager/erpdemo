import React, { useState,useEffect } from 'react';
import {
    Row,
    Col,
    Form,
    FormGroup,
    TabContent, TabPane, Button
} from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import * as Icon from 'react-feather';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import api from '../../constants/api';
import JournalButton from '../../components/Journal/JournalButton';
import ComponentCard from '../../components/ComponentCard';
import Tab from '../../components/project/Tab';
import JournalEditDetails from '../../components/Journal/JournalEditDetails';

const JournalEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState('1');
    const [update, setUpdate] = useState(false);
    const [attachmentModal, setAttachmentModal] = useState(false);
    const [RoomName, setRoomName] = useState('');
    const [fileTypes, setFileTypes] = useState('');
    const [attachmentData, setDataForAttachment] = useState({
        modelType: '',
    });
    const [journalData, setJournalData] = useState('');

    // Function to toggle tabs
    const toggle = (tab) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
        }
    };
    const tabs = [
        { id: '1', name: 'Attachment' },
    ];
    // Attachment
    const dataForAttachment = () => {
        setDataForAttachment({
            modelType: 'attachment',
        });
    };

//Setting data in setJournalData
//   const handleInputs = (e) => {
//     setJournalData({ ...journalData, [e.target.name]: e.target.value });
//     console.log({ ...journalData, [e.target.name]: e.target.value });
//   };

const handleInputs = (e) => {
    console.log("e.target.value",e.target.value)
    const updatedJournalData = [...journalData];
    console.log("updatedJournalData",updatedJournalData)
    const indexToUpdate = updatedJournalData.findIndex((item) => item.journal_id === e.target.value);
  
    console.log("indexToUpdate",indexToUpdate)


    if (indexToUpdate !== -1) {
      // Check if the object exists in the array
      updatedJournalData[indexToUpdate] = {
        ...updatedJournalData[indexToUpdate],
        [e.target.name]: e.target.value, // Update the specific property
      };
  
      setJournalData(updatedJournalData); // Set the updated array as the new state
      console.log(updatedJournalData);
    }
  };


// Get Journal data By Journal Id
  const getJournalDataById = () => {
    api
      .post('/journal/getJournalById', { journal_master_id: id })
      .then((res) => {
        setJournalData(res.data.data);
        console.log("multi data",res.data.data)
      })
  };


  useEffect(() => {
    getJournalDataById();
  }, [id]);
    return (
        <>
            <BreadCrumbs heading='' />
            <JournalButton navigate={navigate} />
            <JournalEditDetails journalData={journalData} handleInputs={handleInputs} />
            <ComponentCard title="More Details">
                <ToastContainer></ToastContainer>
                <Tab toggle={toggle} tabs={tabs} />
                <TabContent className="p-4" activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Form>
                            <FormGroup>
                                <Row>
                                    <Col xs="12" md="3" className="mb-3">
                                        <Button
                                            className="shadow-none"
                                            color="primary"
                                            onClick={() => {
                                                setRoomName('Journal');
                                                setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF']);
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
                                    altTagData="JournalRequestRelated Data"
                                    desc="JournalRequestRelated Data"
                                    recordType="RelatedPicture"
                                    mediaType={attachmentData.modelType}
                                    update={update}
                                    setUpdate={setUpdate}
                                />
                                <ViewFileComponentV2 moduleId={id} roomName="Journal" recordType="RelatedPicture" update={update}
                                    setUpdate={setUpdate} />
                            </FormGroup>
                        </Form>
                    </TabPane>
                </TabContent>
            </ComponentCard>

        </>
    );
};
export default JournalEdit;
