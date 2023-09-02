import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams} from 'react-router-dom';
import moment from 'moment';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import ComponentCardV2 from '../../components/ComponentCardV2';
import message from '../../components/Message';
import api from '../../constants/api';
import DeleteButton from '../../components/DeleteButton';

const TaskEdit = () => {
  //All state variable
  const [projectTask, setProjectTask] = useState();
  const [employeeProject, setEmployeeProject] = useState();
  const [projectdetails, setProjectDetails] = useState();
  const [companydetails, setCompanyDetails] = useState();
  const [description, setDescription] = useState('');
  // const [joborder, setJobOrder] = useState('');

  //navigation and parameters
  const { id } = useParams();
  const navigate = useNavigate();

  const applyChanges = () => {};
  const backToList = () => {
    navigate('/ProjectTask');
  };

  // data in Description Modal
  const handleDataEditor = (e, type) => {
    setProjectTask({
      ...projectTask,
      [type]: draftToHtml(convertToRaw(e.getCurrentContent())),
    });
  };

  //Description Modal
  const convertHtmlToDraft = (existingQuoteformal) => {
    const contentBlock = htmlToDraft(existingQuoteformal && existingQuoteformal);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
  };
  //Api call for getting project name dropdown
  const getProjectname = () => {
    api
      .get('/projecttask/getProjectTitle')
      .then((res) => {
        setProjectDetails(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  //Api call for getting company name dropdown
  const getCompanyName = () => {
    api
      .get('/projecttask/getCompanyName')
      .then((res) => {
        setCompanyDetails(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  // const getJobOrderTitle = () => {
  //   api
  //     .get('/projecttask/getJobOrderTitle')
  //     .then((res) => {
  //       setJobOrder(res.data.data);
  //       console.log(res.data.data[0]);
  //     })
  //     .catch(() => {
  //       message('Company not found', 'info');
  //     });
  // };
  
  //timesheet data in timesheet
  const handleInputs = (e) => {
    setProjectTask({ ...projectTask, [e.target.name]: e.target.value });
  };

  //getting data from task by Id
  const getTaskById = () => {
    api.post('/projecttask/getProjectTaskById', { project_task_id: id })
    .then((res) => {
      const taskData = res.data.data[0];
      setProjectTask(taskData);
      if (taskData.description) {
        convertHtmlToDraft(taskData.description);
      }
    });
  };  
  // //  Gettind data from Job By Id
  const getEmployee = () => {
    api
      .get('/projecttask/getEmployeeName')
      .then((res) => {
        console.log(res.data.data);
        setEmployeeProject(res.data.data);
      })
      .catch(() => {});
  };


  //Update task
  const editTask = () => {
    api
      .post('/projecttask/editProjectTask', projectTask)
      .then(() => {
        message('Record editted successfully', 'success');
        // getTaskById();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };


  useEffect(() => {
    getTaskById();
    getProjectname();
    getEmployee();
    getCompanyName();
    // getJobOrderTitle();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <Form>
        <FormGroup>
          <ToastContainer></ToastContainer>
          <ComponentCardV2>
            <Row>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editTask();
                    navigate('/ProjectTask');
                  }}
                >
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    editTask();
                    applyChanges();
                  }}
                >
                  Apply
                </Button>
              </Col>
              <Col>
                <Button
                  type="submit"
                  className="btn btn-dark shadow-none"
                  onClick={(e) => {
                    if (window.confirm('Are you sure you want to cancel? ')) {
                      navigate('/ProjectTask');
                    } else {
                      e.preventDefault();
                    }
                  }}
                >
                  Cancel
                </Button>
              </Col>
              <Col>
                <DeleteButton
                  id={id}
                  columnname="project_task_id"
                  tablename="project_task"
                ></DeleteButton>
              </Col>
              <Col>
                <Button
                  className="shadow-none"
                  color="dark"
                  onClick={() => {
                    backToList();
                  }}
                >
                  Back to List
                </Button>
              </Col>
            </Row>
          </ComponentCardV2>
        </FormGroup>
      </Form>
      {/* projectTask Details */}
      <Form>
        <FormGroup>
        <ComponentCard title="Project Task Details" creationModificationDate={projectTask}>
            <ToastContainer></ToastContainer>
            <div>
              <BreadCrumbs />

              <ComponentCard title="Task">
                <Form>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <Label>Task Title</Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={projectTask && projectTask.task_title}
                          name="task_title"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Job Order Title</Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={projectTask && projectTask.job_order_title}
                          name="job_order_title"
                          disabled
                        />

                        {/* <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectTask && projectTask.job_order_id}
                          name="job_order_id"
                          disabled
                        >
                          <option defaultValue="selected">Please Select</option>
                          {joborder &&
                            joborder.map((e) => {
                              return (
                                <option key={e.job_order_id} value={e.job_order_id}>
                                  {e.job_order_title}
                                </option>
                              );
                            })}
                        </Input> */}
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Job Order Code</Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={projectTask && projectTask.job_order_code}
                          name="job_order_code"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Project Name</Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectTask && projectTask.project_id}
                          name="project_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {projectdetails &&
                            projectdetails.map((e) => {
                              return (
                                <option key={e.project_id} value={e.project_id}>
                                  {e.title}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Customer Name</Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectTask && projectTask.company_id}
                          name="company_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {companydetails &&
                            companydetails.map((e) => {
                              return (
                                <option key={e.company_id} value={e.company_id}>
                                  {e.company_name}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>
                    
                    <Col md="3">
                      <FormGroup>
                        <Label>Staff Name</Label>
                        <Input
                          type="select"
                          name="employee_id"
                          onChange={handleInputs}
                          value={projectTask && projectTask.employee_id}
                        >
                          <option value="" defaultValue="selected"></option>
                          {employeeProject &&
                            employeeProject.map((ele) => {
                              return (
                                <option key={ele.employee_id} value={ele.employee_id}>
                                  {ele.first_name}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>

                    <Col md="3">
                      <FormGroup>
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(projectTask && projectTask.start_date).format('YYYY-MM-DD')}
                          name="start_date"
                        />
                      </FormGroup>
                    </Col>
                    
                    <Col md="3">
                      <FormGroup>
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(projectTask && projectTask.end_date).format('YYYY-MM-DD')}
                          name="end_date"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Actual Comp Date</Label>
                        <Input
                          type="date"
                          onChange={handleInputs}
                          value={moment(projectTask && projectTask.actual_completed_date).format('YYYY-MM-DD')}
                          name="actual_completed_date"
                        />
                      </FormGroup>
                    </Col>
                    
                    <Col md="3">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectTask && projectTask.status}
                          name="status"
                        >
                          {' '}
                          <option value="" selected="selected">
                            Please Select
                          </option>
                          <option value="Pending">Pending</option>
                          <option value="InProgress">InProgress</option>
                          <option value="Completed">Completed</option>
                          <option value="OnHold">OnHold</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Task Type</Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectTask && projectTask.task_type}
                          name="task_type"
                        >
                          {' '}
                          <option value="" selected="selected">
                            Please Select
                          </option>
                          <option value="Development">Development</option>
                            <option value="ChangeRequest">ChangeRequest</option>
                            <option value="Issues">Issues</option>     
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Priority</Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectTask && projectTask.priority}
                          name="priority"
                        >
                          {' '}
                          <option value="" selected="selected">
                            Please Select
                          </option>
                          <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option> 
                            <option value="4">4</option> 
                            <option value="5">5</option>     
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Completion</Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={projectTask && projectTask.completion}
                          name="completion"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Actual Hours</Label>
                        <Input
                          type="number"
                          onChange={handleInputs}
                          value={projectTask && projectTask.actual_hours}
                          name="actual_hours"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Estimated Hours</Label>
                        <Input
                          type="number"
                          onChange={handleInputs}
                          value={projectTask && projectTask.estimated_hours}
                          name="hours"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </ComponentCard>
              <ComponentCard title="Description">
                <Editor
                  editorState={description}
                  wrapperClassName="demo-wrapper mb-0"
                  editorClassName="demo-editor border mb-4 edi-height"
                  onEditorStateChange={(e) => {
                    handleDataEditor(e, 'description');
                    setDescription(e);
                  }}
                />
              </ComponentCard>

              
            </div>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default TaskEdit;
