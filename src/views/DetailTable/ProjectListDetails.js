import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import creationdatetime from '../../constants/creationdatetime';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import AppContext from '../../context/AppContext';
import message from '../../components/Message';

const ProjectDetails = () => {
  //all state variables
  const [projectdetails, setProjectDetails] = useState({
    contact_id: '',
    proposal_id: '',
  });
  const [proposalcode, setPoposalCode] = useState();
  const [proposaldetails, setProposalDetails] = useState();
  //navigation and params
  const navigate = useNavigate();
  //supplierData in supplier details
  const handleInputs = (e) => {
    setProjectDetails({ ...projectdetails, [e.target.name]: e.target.value });
  };
   //get staff details
   const { loggedInuser } = useContext(AppContext);
  //inserting supplier data
  const insertProjectData = (ProjectCode) => {
    if (projectdetails.contact_id !== '' &&
    projectdetails.proposal_id!=='') 
      {
        projectdetails.project_code = ProjectCode;
        projectdetails.creation_date = creationdatetime;
        projectdetails.created_by= loggedInuser.first_name;
        projectdetails.company_id= proposaldetails.company_id; 
        projectdetails.contact_id = proposaldetails.contact_id;  
        projectdetails.start_date = proposaldetails.start_date;
        projectdetails.end_date = proposaldetails.end_date; 
      api
        .post('/project/insertProjectData', projectdetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Project data inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/ProjectEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };
    
const getProposalCode = () => {
        api
          .get('/project/getProposalCode')
          .then((res) => {
            setPoposalCode(res.data.data);
            console.log(res.data.data[0]);
          })
          .catch(() => {
            message('Proposal Code not found', 'info');
          });
      };

  // Get Purchase Order data By Purchase Order Id
  const getProposalDataById = () => {
    api
      .post('/purchaseinvoice/getProposalDataById', { proposal_id: projectdetails.proposal_id })
      .then((res) => {
        setProposalDetails(res.data.data[0]);
        console.log(res.data.data[0]);
      })
  };

   //Auto generation code
   const generateCode = () => {
    api
      .post('/project/getCodeValue', { type: 'ProjectCode' })
      .then((res) => {
        const ProjectCode = res.data.data
        insertProjectData(ProjectCode);
      })
      .catch(() => {
        insertProjectData('');
      });
  };

  useEffect(() => {
    getProposalDataById(projectdetails.proposal_id);
    getProposalCode();
  }, [ projectdetails.proposal_id],[]);

    
   return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6" xs="12">
          {/* Key Details */}
          <ComponentCard title="Key Details">
          <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      {' '}
                       Quote Code <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectdetails && projectdetails.proposal_id}
                          name="proposal_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {proposalcode &&
                            proposalcode.map((e) => {
                              return (
                                <option key={e.proposal_id} value={e.proposal_id}>
                                  {e.proposal_code}
                                </option>
                              );
                            })}
                        </Input>
                    </Col>

                    <Col md="12">
                      <FormGroup>
                        <Label>Title<span className="required"> *</span>{' '}</Label>
                        <Input
                          type="text"
                          onChange={handleInputs}
                          value={projectdetails && projectdetails.title}
                          name="title"
                        />
                      </FormGroup>
                    </Col>

                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
          <div className="pt-3 mt-3 d-flex align-items-center gap-2">
            <Button color="primary"
              onClick={() => {
                generateCode();
              }}
              type="button"
              className="btn mr-2 shadow-none"  >
              Save & Continue
            </Button>
            <Button
              onClick={() => {
                navigate('/Project')
              }}
              type="button"
              className="btn btn-dark shadow-none" >
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

export default ProjectDetails;
