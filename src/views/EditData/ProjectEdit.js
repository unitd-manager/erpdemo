import React, { useState, useEffect } from 'react';
import { Row, Col, TabContent,Table, TabPane, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import ProjectButton from '../../components/ProjectTable/ProjectButton';
import ViewFileComponentV2 from '../../components/ProjectModal/ViewFileComponentV2';
import AttachmentModalV2 from '../../components/Tender/AttachmentModalV2';
import AddEmployee from '../../components/ProjectTabContent/AddEmployee';
import Tab from '../../components/project/Tab';
import ProjectEditForm from '../../components/project/ProjectEditForm';
import ProjectMaterialLineItem from '../../components/project/ProjectMaterialLineItem';
import EditProjectMaterialLineItemModal from '../../components/project/EditProjectMaterialLineItemModal'

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const applyChanges = () => {};
  const backToList = () => {
    navigate('/Project');
  };
  const [projectDetail, setProjectDetail] = useState();
  const [activeTab, setActiveTab] = useState('1');
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [incharge, setIncharge] = useState();
  const [lineItem, setLineItem] = useState([]);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [RoomName, setRoomName] = useState('');
  const [fileTypes, setFileTypes] = useState('');
  const [contact, setContact] = useState();
  const [materialItem, setMaterialItem] = useState();
  const [editMaterialModelItem, setEditMaterialModelItem] = useState(null); 
  const [addMaterialItemModal, setAddMaterialItemModal] = useState(false);
  const [viewMaterialModal, setViewMaterialModal] = useState(false);
  const [editMaterialModal, setEditMaterialModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const addMaterialItemsToggle = () => {
    setAddMaterialItemModal(!addMaterialItemModal);
  };
  const viewMaterialToggle = () => {
    setViewMaterialModal(!viewMaterialModal);
  };
  console.log(viewMaterialToggle);
  // Start for tab refresh navigation #Renuka 31-05-23
  const tabs = [
   
    { id: '1', name: 'Quote' },
    { id: '2', name: 'Material Needed' },
    { id: '3', name: 'Project Team' },
    { id: '4', name: 'Job Order' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
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
  ];

  const columns2 = [
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
  // Get Project By Id
  const getProjectById = () => {
    api
      .post('/project/getProjectById', { project_id: id })
      .then((res) => {
        setProjectDetail(res.data.data[0]);
      })
      .catch(() => {});
  };
  const ProposalId = projectDetail?.proposal_id;
  console.log('ProposalId', ProposalId);
  
  const getContact = () => {
    api
      .post('/project/getContactLinkedByProjectId', { project_id: id })
      .then((res) => {
        setContact(res.data.data);
      })
      .catch(() => {});
  };
  const getMaterialItem = () => {
    api.post('/project/getProjectMaterialLineItemsById', { project_id: id }).then((res) => {
      setMaterialItem(res.data.data);
      //setAddLineItemModal(true);
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
        api.post('/project/deleteProjectMaterialneed', { project_material_needed_id: deleteLine }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };
  const getIncharge = () => {
    api
      .get('/tender/projectIncharge')
      .then((res) => {
        setIncharge(res.data.data);
      })
      .catch(() => {});
  };
  const UpdateData = () => {
    setFormSubmitted(true);
    if(projectDetail.category.trim() !== '')
    api.post('/project/edit-Project', projectDetail).then(() => {
      message('Record editted successfully', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 300);
    });
  };
  console.log('ProposalId1',ProposalId)
  const getLineItem = () => {
    api.post('/project/getQuoteLineItemsById', { project_id:id }).then((res) => {
      setLineItem(res.data.data);
      //setAddLineItemModal(true);
    });
  };
  //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };

  
  useEffect(() => {
    getProjectById();
    getContact();
    getIncharge();
    getLineItem();
    getMaterialItem();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ProjectButton
        UpdateData={UpdateData}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></ProjectButton>

      <ProjectEditForm
        projectDetail={projectDetail}
        setProjectDetail={setProjectDetail}
        contact={contact}
        incharge={incharge}
        formSubmitted={formSubmitted}
      />

      <ComponentCard title="More Details">
        <ToastContainer></ToastContainer>

        {/* Call Modal's */}
    <Tab toggle={toggle} tabs={tabs} />
        {/* Tab 1 */}
        <TabContent className="p-4" activeTab={activeTab}>
          {/* Start Tab Content 1 */}
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
                      {columns2.map((cell) => {
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
                                  deleteMaterial(e.project_material_needed_id);
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
            <EditProjectMaterialLineItemModal
              editMaterialModal={editMaterialModal}
              setEditMaterialModal={setEditMaterialModal}
              FetchMaterialItemData={editMaterialModelItem}
              getMaterialItem={getMaterialItem}
              setViewMaterialModal={setViewMaterialModal}
              projectDetail={projectDetail}
              //insertquote={insertquote}
            ></EditProjectMaterialLineItemModal>
            {addMaterialItemModal && (
              <ProjectMaterialLineItem
                //projectInfo={tenderId}
                addMaterialItemModal={addMaterialItemModal}
                setAddMaterialItemModal={setAddMaterialItemModal}
                projectLine={id}
              ></ProjectMaterialLineItem>
            )}
          </TabPane>
          <TabPane tabId="3" eventkey="addEmployee">
            <Row>
              <AddEmployee ProposalId ={ProposalId}projectId={id}/>
              <Col xs="12" md="3" className="mb-3">
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    setRoomName('Tender');
                    setFileTypes(['JPG', 'JPEG', 'PNG', 'GIF', 'PDF','OGG']);
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
              altTagData="TenderRelated Data"
              desc="TenderRelated Data"
              recordType="RelatedPicture"
              mediaType={attachmentData.modelType}
              update={update}
              setUpdate={setUpdate}
            />
            <ViewFileComponentV2
              moduleId={id}
              roomName="Tender"
              recordType="RelatedPicture"
              update={update}
              setUpdate={setUpdate}
            />
          </TabPane>
          <TabPane tabId="4">
            </TabPane>

          {/* End Tab Content 12 */}
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default ProjectEdit;
