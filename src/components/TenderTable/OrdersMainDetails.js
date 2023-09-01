import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function TenderMoreDetails({
  orderDetails,
  handleInputs,
  company,
}) {
  TenderMoreDetails.propTypes = {
    orderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
    company: PropTypes.array,
 };
  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Orders Details" creationModificationDate={orderDetails}>
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
                    <Label>
                     Company <span className="required"> *</span>
                    </Label>
                    <Input type="select" onChange={handleInputs} name="company_id">
                      <option defaultValue="selected">Please Select</option>
                      {company &&
                        company.map((e) => (
                          <option key={e.company_id} value={e.company_name}>
                            {e.company_name}
                          </option>
                        ))}
                    </Input>
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
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={orderDetails && orderDetails.order_date}
                    onChange={handleInputs}
                    name="order_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={orderDetails && orderDetails.order_status}
                    name="order_status"
                  >
                   <option defaultValue="selected">
                please Select
              </option>
              <option value="new">New</option>
              <option value="paid">Paid</option>
              <option value="partially paid">Partially Paid</option>
              <option value="Cancelled">Cancelled</option>
        
                  </Input>
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
