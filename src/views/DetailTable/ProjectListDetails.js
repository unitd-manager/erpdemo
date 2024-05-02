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
  const [formSubmitted, setFormSubmitted] = useState(false);
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
    setFormSubmitted(true);
    api
    .post('/project/getProposalDataById', { proposal_code: projectdetails.proposal_id })
    .then((res1) => {
      const proposalId = res1.data.data.proposal_id
      const CompanyId = res1.data.data.company_id
      const categoryId = res1.data.data.category
      const contactId = res1.data.data.contact_id
      const titleId = res1.data.data.title
      const descriptionId = res1.data.data.description
      const startDateId = res1.data.data.start_date
      const estimatedFinishDateId = res1.data.data.estimated_finish_date
      const projectQuoteId = res1.data.data.project_quote_id

      console.log('projectQuoteId',projectQuoteId)
      api
      .post('/project/getProposalEmployee', { proposal_id:proposalId })
      .then((res2) => {
        const proposalEmployees = res2.data.data
        console.log('proposalId',proposalId)
        api
        .post('/proposal/getMaterialLineItemsById', { proposal_id:proposalId })
        .then((res3) => {
          const proposalMaterial = res3.data.data
          console.log('proposalId',proposalId)
          console.log('proposalMaterial',proposalMaterial)

          
    
    if (projectdetails.proposal_id.trim() !== '') 
      {
        projectdetails.project_code = ProjectCode;
        projectdetails.creation_date = creationdatetime;
        projectdetails.created_by= loggedInuser.first_name;
        projectdetails.company_id= CompanyId;
        projectdetails.proposal_id= proposalId; 
        projectdetails.category = categoryId;
        projectdetails.contact_id = contactId;  
        projectdetails.title = titleId;
        projectdetails.description = descriptionId;
        projectdetails.start_date = startDateId;
        projectdetails.estimated_finish_date = estimatedFinishDateId;
        projectdetails.project_quote_id = projectQuoteId;
        console.log('projectdetails',projectdetails) 
        console.log('proposalEmployees',proposalEmployees) 
      api
        .post('/project/insertProject', projectdetails)
        .then((res) => {
           console.log('projectid',res.data.data)
           proposalEmployees.forEach((el)=>{
            el.project_id = res.data.data.insertId
            proposalMaterial.forEach((ele)=>{
              ele.project_id = res.data.data.insertId
              api
              .post('/project/insertProjectMaterialItems', ele)
            api
            .post('/project/insertPrjectEmployee', el)
             const insertedDataId = res.data.data.insertId;
            message('Project data inserted successfully.', 'success');
            setTimeout(() => {
            navigate(`/ProjectEdit/${insertedDataId}`);
          }, 300);
            
        })
           })
        
         
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  })
})
})
  };
    
const getProposalCode = () => {
        api
          .get('/project/getProposalCode')
          .then((res) => {
            setPoposalCode(res.data.data);
          })
          .catch(() => {
            message('Proposal Code not found', 'info');
          });
      };


  //  Auto generation code
   const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type: 'project' })
      .then((res) => {
        const ProjectCode = res.data.data
        insertProjectData(ProjectCode);
      })
      .catch(() => {
        insertProjectData('');
      });
  };

  useEffect(() => {
    getProposalCode();
  }, [],[]);

  const inputClass = `form-control ${
    formSubmitted && (!projectdetails.proposal_id || projectdetails.proposal_id === 'Please Select') ? 'highlight' : ''
  }`;
  

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
                      Proposal Code <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                          type="select"
                          onChange={handleInputs}
                          value={projectdetails && projectdetails.proposal_id}
                          name="proposal_id"
                          className={inputClass}
                        >
                          <option defaultValue="selected">Please Select</option>
                          {proposalcode &&
                            proposalcode.map((e) => {
                              return (
                                <option key={e.proposal_id} value={e.proposal_code}>
                                  {e.proposal_code} - {e.company_name}
                                </option>
                              );
                            })}
                        </Input>
                        {(formSubmitted && !projectdetails.proposal_id) && (
      <div className="error-message">Please Select the Proposal Code</div>
    )}
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
