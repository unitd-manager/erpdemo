import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ComponentCard from '../ComponentCard';
import TenderContactDetails from './TenderContactDetails';


export default function TradingQuoteMoreDetails({
  tenderDetails,
  handleInputs,
  handleAddNewContact,
  company,
  contact,
  AddNewContact,
  addContactModal,
  addContactToggle,
  getContact,
}) {
  TradingQuoteMoreDetails.propTypes = {
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
                  <Label>Enquiry Code</Label>
                  <br />
                <td>
                  {' '}
                  <Link to={`/EnquiryEdit/${tenderDetails && tenderDetails.opportunity_id}`}>
                    {tenderDetails && tenderDetails.opportunity_code}
                  </Link>
                </td>
                  {/* <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.opportunity_code}
                    name="opportunity_code"
                    disabled
                  /> */}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Quotation Code <span className="required"> *</span>
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
                  <Label>Company Name</Label>

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
                    value={tenderDetails && tenderDetails.office_ref_no}
                    name="office_ref_no"
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
            
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}
