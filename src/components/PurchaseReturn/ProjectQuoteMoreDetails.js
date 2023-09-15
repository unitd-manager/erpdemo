import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function ProjectQuoteMoreDetails({
  tenderDetails,
  handleInputs,
 
}) {
  ProjectQuoteMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    handleInputs: PropTypes.func,
   
  };
  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Return Details" creationModificationDate={tenderDetails}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Purchase Invoice Number <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.purchase_invoice_code}
                    name="purchase_invoice_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Return Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.purchase_return_date}
                    name="purchase_return_date"
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="select"
                    value={tenderDetails && tenderDetails.status}
                    onChange={handleInputs}
                    name="status"
                  >
                    <option selected="selected" value="New">
                      New
                    </option>
                    <option value="Returned">Returned</option>
                    <option value="Not Returned">Not Returned</option>
                    <option value="Cancelled">Cancelled</option>
                  </Input>
                </FormGroup>
              </Col>
              {/* <Col md="3">
                <FormGroup>
                  <Label>Net Total</Label>
                  <Input
                    type="text"
                    value={tenderDetails && tenderDetails.total_amount}
                    onChange={handleInputs}
                    name="total_amount"
                  />
                </FormGroup>
              </Col> */}
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}
