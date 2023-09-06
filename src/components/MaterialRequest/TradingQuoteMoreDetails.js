import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function TradingQuoteMoreDetails({
  tenderDetails,
  handleInputs,
  handleStatusChange,
  status,
 
}) {
  TradingQuoteMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
    handleStatusChange: PropTypes.object,
    status: PropTypes.object,
  };
  const isApproved = tenderDetails && tenderDetails.material_status === 'Approved';
  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Material Request Details" creationModificationDate={tenderDetails}>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>
                    Request Code <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.material_request_code}
                    name="material_request_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.request_date}
                    name="request_date"
                  />
                </FormGroup>
              </Col>
             
              <Col md="4">
                <FormGroup>
                  <Label>Shipping Method</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.shipping_method}
                    name="shipping_method"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row> 
              <Col md="3">
                <FormGroup>
                  <Label>Material Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.material_request_date}
                    name="material_request_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Site Reference</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.site_reference}
                    name="site_reference"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Request By</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.request_by}
                    name="request_by"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <Label>Status</Label>
                <Input
                  type="select"
                  onChange={handleStatusChange}
                  value={status || tenderDetails && tenderDetails.material_status}
                  name="material_status"
                  disabled={isApproved} // Disable if status is "Approved"
                >
                  <option value="Please Select">Please Select</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Cancelled">Cancelled</option>
                </Input>
              </Col>
              </Row>
             
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Approved By</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.approved_by}
                    name="approved_by"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Approved Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.approved_date}
                    name="approved_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Payment Terms</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.payment_terms}
                    name="payment_terms"
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
