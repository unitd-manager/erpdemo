import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function PlanningMainDetails({ handleInputs, plannings }) {
  PlanningMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    plannings: PropTypes.object,
    
  };
  return (
    <>
      <ComponentCard title=" Project Planning Edit">
        <Form>
          <FormGroup>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Project Nmae</Label>
                  <br />
                  <Input
                  type="text"
                  onChange={handleInputs}
                  value={plannings && plannings.proj_title}
                  name="proj_title" disabled
                />                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Code</Label>
                  <br />
                  <Input
                  type="text"
                  onChange={handleInputs}
                  value={plannings && plannings.project_code}
                  name="project_code"
                  disabled
                />  
               </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Request Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.request_date}
                    name="request_date"
                  />
                </FormGroup>
              </Col>
              
            </Row>
            <Row>
            <Col md="4">
                <FormGroup>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.request_start_date}
                    name="request_start_date"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.request_end_date}
                    name="request_end_date"
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>Request By</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={plannings && plannings.request_by}
                    name="request_by"
                  />
                </FormGroup>
              </Col>
             
            </Row>
            <Row>
            <Col md="4">
                <Label>Request Urgency</Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  value={plannings && plannings.request_urgency}
                  name="request_urgency"
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                 
                </Input>
              </Col>
              <Col md="4">
                <Label>Request Type</Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  value={plannings && plannings.request_type}
                  name="request_type"
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="Skilled">Skilled</option>
                  <option value="UnSkilled">UnSkilled</option>
                  <option value="Temporary">Temporary</option>
                 
                </Input>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>Department</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={plannings && plannings.department}
                    name="department"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row><Col md="4">
                <FormGroup>
                  <Label>No Of Employee</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={plannings && plannings.no_of_employees}
                    name="no_of_employees"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Job Description</Label>
                  <textarea
                    onChange={handleInputs}
                    value={plannings && plannings.job_description}
                    name="job_description"
                    rows="4" // You can adjust the number of rows as needed
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                  <FormGroup>
                    <Label>Skills Required</Label>
                    <textarea
                      onChange={handleInputs}
                      value={plannings && plannings.skills_required}
                      name="skills_required"
                      rows="4" // You can adjust the number of rows as needed
                    />
                  </FormGroup>
                </Col>

            </Row>
            
            
        
          </FormGroup>
        </Form>
      </ComponentCard>
     
    </>
  );
}
