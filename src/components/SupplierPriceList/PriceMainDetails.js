import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function PlanningMainDetails({ handleInputs, plannings,arb,
  arabic }) {
  PlanningMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    plannings: PropTypes.object,
    arb: PropTypes.any,
    arabic: PropTypes.any,
    
  };
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  return (
    <>
      <ComponentCard title="Price List Edit">
        <Form>
          <FormGroup>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>{arabic.find((item) => item.key_text === 'mdSupplierPriceList.Customer Name')?.[genLabel]}<span style={{ color: 'red' }}>*</span></Label>
                  <br />
                  <Input
                  type="text"
                  onChange={handleInputs}
                  
                  value={
                    arb
                      ? plannings && plannings.customer_name_arb
                      : plannings && plannings.customer_name
                  }
                  name={arb ? 'customer_name_arb' : 'customer_name'}
                  disabled
                />                </FormGroup>
              </Col>
             
            <Col md="4">
              <FormGroup>
                <Label>{arabic.find((item) => item.key_text === 'mdSupplierPriceList.Notes')?.[genLabel]} </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                 
                  value={
                    arb
                      ? plannings && plannings.notes_arb
                      : plannings && plannings.notes
                  }
                  name={arb ? 'notes_arb' : 'notes'}
                />
              </FormGroup>
            </Col>
            <Col md="4">
                <FormGroup>
                  <Label>{arabic.find((item) => item.key_text === 'mdSupplierPriceList.Effective Date')?.[genLabel]}</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={plannings && plannings.effective_date}
                    name="effective_date"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
            
              <Col md="4">
                <FormGroup>
                  <Label> {arabic.find((item) => item.key_text === 'mdSupplierPriceList.Expiry Date')?.[genLabel]}</Label>
                  <Input
                    type="Date"
                    onChange={handleInputs}
                    value={plannings && plannings.expiry_date}
                    name="expiry_date"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <Label>{arabic.find((item) => item.key_text === 'mdSupplierPriceList.Status')?.[genLabel]}</Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                 
                  value={
                    arb
                      ? plannings && plannings.status_arb
                      : plannings && plannings.status
                  }
                  name={arb ? 'status_arb' : 'status'}
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
