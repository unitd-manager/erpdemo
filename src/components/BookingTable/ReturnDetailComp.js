import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function ReturnDetailComp({ returnDetails, handleInputs }) {
  ReturnDetailComp.propTypes = {
    returnDetails: PropTypes.object,
    handleInputs: PropTypes.func,
  
  };

  return (
    <>
      <Form>
        <FormGroup>
          <Row>
           
            <Col md="3">
              <FormGroup>
                <Label>Invoice Code</Label>

                <Input
                  type="text"
                  value={returnDetails && returnDetails.invoice_code}
                  onChange={handleInputs}
                  name="invoice_code"
                  readOnly
                ></Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Status</Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  value={returnDetails && returnDetails.status}
                  name="status"
              
                > <option value="" selected="selected">
                Please Select
              </option>
              <option value="InProgress">In Progress</option>
              <option value="Return">Return</option>
</Input>
              </FormGroup>
            </Col>

            <Col md="3">
              <FormGroup>
                <Label>Date</Label>

                <Input
                  type="date"
                  value={returnDetails && moment(returnDetails.return_date).format('YYYY-MM-DD')}
                  onChange={handleInputs}
                  name="return_date"
                ></Input>
              </FormGroup>
            </Col>
        
            </Row>
         
        </FormGroup>
      </Form>
    </>
  );
}
