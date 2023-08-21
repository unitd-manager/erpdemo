import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function TenderMoreDetails({
  tenderDetails,
  handleInputs,
}) {
  TenderMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
 };
  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Enquiry Details" creationModificationDate={tenderDetails}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Enquiry Date <span className="required"> *</span>
                  </Label>
                  <Input
                    type="Date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Enquiry No</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.office_ref_no}
                    name="office_ref_no"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Customer</Label>
                  <Input
                    type="text"
                    value={tenderDetails && tenderDetails.mode_of_submission}
                    onChange={handleInputs}
                    name="mode_of_submission"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Reference</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.services}
                    name="services"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>BID Expiry</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.site_show_date}
                    name="site_show_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Service</Label>
                  <Input
                    value={tenderDetails && tenderDetails.project_end_date}
                    type="text"
                    onChange={handleInputs}
                    name="project_end_date"
                  />
                </FormGroup>
              </Col>
                  
              <Col md="3">
                <FormGroup>
                  <Label>Service</Label>
                  <Input
                    type="text"
                    value={tenderDetails && tenderDetails.actual_submission_date}
                    onChange={handleInputs}
                    name="actual_submission_date"
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Enquiry Status</Label>
                  <Input
                    type="select"
                    value={tenderDetails && tenderDetails.actual_closing}
                    onChange={handleInputs}
                    name="actual_closing"
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
