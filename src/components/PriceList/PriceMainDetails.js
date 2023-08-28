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
                  <Label>Customer Name</Label>
                  <br />
                  <Input
                  type="text"
                  onChange={handleInputs}
                  value={plannings && plannings.customer_name}
                  name="customer_name"
                />                </FormGroup>
              </Col>
             
            <Col md="4">
              <FormGroup>
                <Label>Notes <span style={{ color: 'red' }}>*</span></Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={plannings && plannings.notes}
                  name="notes"
                />
              </FormGroup>
            </Col>
              
            </Row>
            <Row>
            <Col md="4">
                <FormGroup>
                  <Label>Effective Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.effective_date}
                    name="effective_date"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label> Expiry Date</Label>
                  <Input
                    type="Date"
                    onChange={handleInputs}
                    value={plannings && plannings.expiry_date}
                    name="expiry_date"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <Label>Status</Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  value={plannings && plannings.status}
                  name="status"
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  
                </Input>
              </Col>
            </Row>
          </FormGroup>
        </Form>
      </ComponentCard>
     
    </>
  );
}
