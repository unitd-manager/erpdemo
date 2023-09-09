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
                  <Label>Order Code</Label>

                  <Input
                    type="text"
                    value={returnDetails && returnDetails.order_code}
                    onChange={handleInputs}
                    name="order_code"
                    readOnly
                  >
                  
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Invoice Code</Label>

                  <Input
                    type="text"
                    value={returnDetails && returnDetails.invoice_code}
                    onChange={handleInputs}
                    name="invoice_code"
                    readOnly
                  >
                  
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={returnDetails && returnDetails.status}
                    name="status"
                    readOnly
                  >
                   
                  </Input>
                </FormGroup>
              </Col>
              
              <Col md="3">
                <FormGroup>
                  <Label>Invoice Date</Label>

                  <Input
                    type="date"
                    value={
                      returnDetails &&
                      moment(returnDetails.invoice_date).format('YYYY-MM-DD')
                    }
                    onChange={handleInputs}
                    name="invoice_date"
                   
                  >
                  
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Invoice Terms</Label>

                  <Input
                    type="text"
                    value={returnDetails && returnDetails.invoice_terms}
                    onChange={handleInputs}
                    name="invoice_terms"
                  >
                 
                  </Input>
                </FormGroup>
              </Col>
             
            </Row>
            <Row></Row>
        </FormGroup>
      </Form>
    </>
  );
}
