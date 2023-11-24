import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import TenderContactDetails from './TenderContactDetails';

export default function ProjectQuoteMoreDetails({
  tenderDetails,
  handleInputs,
  handleAddNewContact,
  company,
  contact,
  AddNewContact,
  addContactModal,
  addContactToggle,
  getContact
}) {
  ProjectQuoteMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
    company: PropTypes.object,
    contact: PropTypes.any,
    addContactModal: PropTypes.any,
    addContactToggle: PropTypes.any,
    AddNewContact: PropTypes.any,
    handleAddNewContact: PropTypes.any,
    getContact: PropTypes.any,
  };
  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Quotation Details" creationModificationDate={tenderDetails}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Quotation Number <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.quote_code}
                    name="quote_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.quote_date}
                    name="quote_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Customer</Label>
                  <Input
                    type="select"
                    onChange={(e) => {
                      handleInputs(e);
                      getContact(e.target.value);
                    }}
                    value={tenderDetails && tenderDetails.company_id}
                    name="company_id"
                    disabled
                  >
                    <option value="selected">Please Select</option>
                    {company &&
                      company.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {' '}
                            {e.company_name}{' '}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Contact (OR){' '}
                    <span className="anchor" onClick={addContactToggle.bind(null)}>
                      <b>
                        <u>Add New Contact</u>
                      </b>
                    </span>
                  </Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.contact_id}
                    name="contact_id"
                  >
                    <option value="" selected>
                      Please Select
                    </option>
                    {contact &&
                      contact.map((e) => {
                        return (
                          <option key={e.contact_id} value={e.contact_id}>
                            {e.first_name}
                          </option>
                        );
                      })}

<TenderContactDetails
                    addContactModal={addContactModal}
                    addContactToggle={addContactToggle}
                    AddNewContact={AddNewContact}
                    handleAddNewContact={handleAddNewContact}
                  ></TenderContactDetails>
                  </Input>
                  
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Reference</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.ref_no_quote}
                    name="ref_no_quote"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Enquiry Number</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.enquiry_code}
                    name="enquiry_code"
                    disabled
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="select"
                    value={tenderDetails && tenderDetails.quote_status}
                    onChange={handleInputs}
                    name="quote_status"
                  >
                    <option selected="selected" value="New">
                      New
                    </option>
                    <option value="Quoted">Quoted</option>
                    <option value="Awarded">Awarded</option>
                    <option value="Not Awarded">Not Awarded</option>
                    <option value="Cancelled">Cancelled</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Net Total</Label>
                  <Input
                    type="text"
                    value={tenderDetails && tenderDetails.total_amount}
                    onChange={handleInputs}
                    name="total_amount"
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
