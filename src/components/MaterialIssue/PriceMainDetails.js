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
      <ComponentCard title="Material Issue Edit" creationModificationDate={plannings}>
        <Form>
          <FormGroup>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Project Name</Label>
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
                  value={plannings && plannings.material_request_code}
                  name="material_request_code"
                  disabled
                />  
               </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Issue Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.material_issue_date}
                    name="material_issue_date"
                  />
                </FormGroup>
              </Col>
              
            </Row>
            <Row>
            <Col md="4">
                <FormGroup>
                  <Label>Reason For Issue</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={plannings && plannings.reason_for_issue}
                    name="reason_for_issue"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Authorized By</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={plannings && plannings.authorized_by}
                    name="authorized_by"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Notes</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={plannings && plannings.notes}
                    name="notes"
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
