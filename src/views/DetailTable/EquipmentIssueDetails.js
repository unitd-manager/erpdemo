import React, { useState,useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';

const EquipmentIssueDetails = () => {
  //Navigation and Parameter Constants
  const navigate = useNavigate();

  //Logic for adding Planning in db
  const [planningForms, setPlanningForms] = useState({
    equipment_issue_date: '',
    project_id:'',
    equipment_request_id:'',
  });
  const [project, setProject] = useState();
  const [equipment, setEquipment] = useState();

  const { id } = useParams();

  const editJobById = () => {
    api
      .get('/labourrequest/getProject')
      .then((res) => {
        setProject(res.data.data);
      })
      .catch(() => {});
  };

  const editMaterialById = () => {
    api
      .get('/equipmentissue/getEquipmentRequest')
      .then((res) => {
        setEquipment(res.data.data);
      })
      .catch(() => {});
  };
  //setting data in PlanningForms
  const handlePlanningForms = (e) => {
    setPlanningForms({ ...planningForms, [e.target.name]: e.target.value });
  };

  //Api for insertPlanning
  const insertPlanning = () => {
    if (planningForms.equipment_issue_date !== '') {
      planningForms.creation_date = creationdatetime;
      api
        .post('/equipmentissue/insertEquipmentIssue', planningForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Request inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/EquipmentIssueEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };
  useEffect(() => {
    editJobById();
    editMaterialById();
  }, [id]);
  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
              <Row>
                  <Label>Title <span style={{color:'red'}}>*</span> </Label>
                  <Input
                    type="select"
                    name="project_id"
                    onChange={(e) => {
                      handlePlanningForms(e);
                    }}
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {project &&
                      project.map((ele) => {
                        return (
                            <option key={ele.project_id} value={ele.project_id}>
                              {ele.project_title}
                            </option>
                          
                        );
                      })}
                  </Input>
                </Row>
              </FormGroup>
              <FormGroup>
              <Row>
                  <Label>Code <span style={{color:'red'}}>*</span> </Label>
                  <Input
                    type="select"
                    name="equipment_request_id"
                    onChange={(e) => {
                      handlePlanningForms(e);
                    }}
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {equipment &&
                      equipment.map((mat) => {
                        return (
                            <option key={mat.equipment_request_id} value={mat.equipment_request_id}>
                              {mat.equipment_request_code}
                            </option>
                          
                        );
                      })}
                  </Input>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Issue Date
                    </Label>
                    <Input
                      type="date"
                      name="equipment_issue_date"
                      onChange={handlePlanningForms}
                      value={planningForms && planningForms.equipment_issue_date}
                    ></Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertPlanning();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate(-1);
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default EquipmentIssueDetails;
