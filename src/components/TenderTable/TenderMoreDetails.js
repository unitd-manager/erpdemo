import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';

export default function TenderMoreDetails({
  tenderDetails,
  handleInputs,
  company,
  
}) {
  TenderMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    company: PropTypes.array,
    handleInputs: PropTypes.object,
    
 };

 const getCurrentDate = () => {
  return moment().format('YYYY-MM-DD');
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
                    Title<span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
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
                    value={tenderDetails && tenderDetails.opportunity_code}
                    name="opportunity_code"
                    readOnly
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Enquiry Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      tenderDetails && moment(tenderDetails.enquiry_date).format('YYYY-MM-DD')
                    }
                    defaultValue={getCurrentDate()}
                    name="enquiry_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                    <Label>
                      Client <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="select"
                      name="company_id"
                      value={tenderDetails && tenderDetails.company_id}
                      onChange={handleInputs}
                    >
                      <option>Please Select</option>
                      {company &&
                        company.map((ele) => {
                          return (
                            <option key={ele.company_id} value={ele.company_id}>
                              {ele.company_name}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Reference</Label>
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
                  <Label>Expiry Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.project_end_date}
                    name="project_end_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Notes</Label>
                  <Input
                    value={tenderDetails && tenderDetails.services}
                    type="textarea"
                    onChange={handleInputs}
                    name="services"
                  />
                </FormGroup>
              </Col>
                  
            

              <Col md="3">
                <FormGroup>
                  <Label>Enquiry Status</Label>
                  <Input
                    type="select"
                    value={tenderDetails && tenderDetails.status}
                    onChange={handleInputs}
                    name="status"
                  >
                      <option value="">Please Select</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Quotation Sent">Quotation Sent</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="On Hold">On Hold</option>
                    
                    </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}
