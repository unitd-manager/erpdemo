import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import ProposalCompanyEditDetails from './ProposalCompanyEditDetails';
import ProposalContactDetails from './ProposalContactDetails';

export default function ProposalMoreDetails({
  proposalDetails,
  handleInputs,
  handleAddNewContact,
  company,
  //contact,
  getContact,
  addCompanyToggle,
  addContactModal,
  addContactToggle,
  AddNewContact,
  insertCompany,
  companyhandleInputs,
  
  //setAddContactModal,
  allCountries,
}) {
  ProposalMoreDetails.propTypes = {
    proposalDetails: PropTypes.object,
    handleInputs: PropTypes.object,
    handleAddNewContact: PropTypes.object,
    //contact: PropTypes.object,
    company: PropTypes.object,
    addCompanyToggle: PropTypes.object,
    addContactModal: PropTypes.object,
    addContactToggle: PropTypes.object,
    AddNewContact: PropTypes.object,
    insertCompany: PropTypes.object,
    companyhandleInputs: PropTypes.object,
    
    getContact: PropTypes.object,
    allCountries: PropTypes.object,
  };
  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Proposal Details"  creationModificationDate={proposalDetails}
          >
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Quote Code <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={proposalDetails && proposalDetails.quote_code}
                    name="quote_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                  <Label>Proposal Code</Label>
                  <Input
                    value={proposalDetails && proposalDetails.proposal_code}
                    type="text"
                    onChange={handleInputs}
                    name="proposal_code"
                  />
                </FormGroup>
              </Col>
              
              <Col md="3">
                <FormGroup>
                  <Label>
                    Title <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={proposalDetails && proposalDetails.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              
              <Col md="3">
                <FormGroup>
                  <Label>
                    Company Name 
                    
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) => {
                      handleInputs(e);
                      getContact(e.target.value);
                    }}
                    value={proposalDetails && proposalDetails.company_id}
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

                <ProposalCompanyEditDetails
                  
                  addCompanyToggle={addCompanyToggle}
                  insertCompany={insertCompany}
                  allCountries={allCountries}
                  companyhandleInputs={companyhandleInputs}
                ></ProposalCompanyEditDetails>
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
                    type="text"
                    onChange={(e) => {
                      handleInputs(e);
                      
                    }}
                    value={proposalDetails && proposalDetails.first_name}
                    name="first_name"
                  >
                    {/* <option value="selected" >
                      Please Select
                    </option>
                    {contact &&
                      contact.map((e) => {
                        return (
                          <option key={e.contact_id} value={e.contact_id}>
                            {e.first_name}
                          </option>
                        );
                      })} */}
                    <ProposalContactDetails
                      addContactModal={addContactModal}
                      addContactToggle={addContactToggle}
                      AddNewContact={AddNewContact}
                      handleAddNewContact={handleAddNewContact}
                    ></ProposalContactDetails>
                  </Input>
                </FormGroup>
              </Col>
              
              <Col md="3">
              <FormGroup>
                  <Label>Est Start_Date</Label>
                  <Input
                    type="date"
                    value={proposalDetails && proposalDetails.est_start_date}
                    onChange={handleInputs}
                    name="est_start_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                  <Label>Est End_Date</Label>
                  <Input
                    type="date"
                    value={proposalDetails && proposalDetails.est_end_date}
                    onChange={handleInputs}
                    name="est_end_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                  <Label>Budget</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={proposalDetails && proposalDetails.budget}
                    name="budget"
                  />
                </FormGroup>
              </Col>
              
            </Row>
            <Row>
            <Col md="3">
            <FormGroup>
                  <Label>Project Manager</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={proposalDetails && proposalDetails.project_manager}
                    name="project_manager"
                  />
                </FormGroup>
              </Col>
            <Col md="3">
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    value={proposalDetails && proposalDetails.description}
                    type="text"
                    onChange={handleInputs}
                    name="description"
                  />
                </FormGroup>
              </Col>
              
              
              <Col md="3">
                <FormGroup>
                  <Label>
                    {' '}
                    Status 
                  </Label>
                  <Input
                    value={proposalDetails && proposalDetails.status}
                    type="select"
                    onChange={handleInputs}
                    name="status"
                  >
                    <option value="">Please Select</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Waiting for Approval">Waiting for Approval</option>
                    <option value="Submitted">Submitted</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Awarded">Awarded</option>
                    <option value="Not Awarded">Not Awarded</option>
                    <option value="Enquiry">Enquiry</option>
                    <option value="Cancelled">Cancelled</option>
                    <option selected="selected" value="Converted to Project">
                      Converted to Project
                    </option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
              <FormGroup>
                  <Label>No of Employees</Label>
                  <Input
                    value={proposalDetails && proposalDetails.no_of_employees}
                    type="text"
                    onChange={handleInputs}
                    name="no_of_employees"
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
            <Col md="3">
            <FormGroup>
                  <Label>
                    Date 
                  </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={proposalDetails && proposalDetails.proposal_date}
                    name="proposal_date"
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
