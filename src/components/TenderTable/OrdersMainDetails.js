import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function TenderMoreDetails({
  orderDetails,
  handleInputs,
}) {
  TenderMoreDetails.propTypes = {
    orderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
 };
  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Enquiry Details" creationModificationDate={orderDetails}>
            <Row>
            <Col md="3">
                <FormGroup>
                  <Label>
                    Order Code<span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={orderDetails && orderDetails.order_code}
                    name="order_code"
                  />
                </FormGroup>
              </Col>
             
              <Col md="3">
                <FormGroup>
                  <Label>Quote Code</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={orderDetails && orderDetails.quote_code}
                    name="quote_code"
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Company</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={orderDetails && orderDetails.company_name}
                    name="company_name"
                   
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Reference</Label>
                  <Input
                    type="text"
                    value={orderDetails && orderDetails.office_ref_no}
                    onChange={handleInputs}
                    name="office_ref_no"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={orderDetails && orderDetails.order_status}
                    name="order_status"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Net Amount</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={orderDetails && orderDetails.amount}
                    name="amount"
                  />
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}
