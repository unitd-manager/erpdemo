import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import ComponentCard from '../ComponentCard';

function DocumentEditDetails ({ documenteditdetails, handleInputs }) {
    DocumentEditDetails.propTypes = {
        documenteditdetails: PropTypes.bool,
        handleInputs: PropTypes.func,
  };
  return (
    <div>
        
      <Form>
        <FormGroup>
          
      <ComponentCard title="Document Details" creationModificationDate={documenteditdetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>DOC Code</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.document_code}
                    name="document_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>DOC Title<span className='required'>*</span></Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.document_title}
                    name="document_title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Project Name </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.title}
                          name="title"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Project Start Date </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && moment(documenteditdetails.start_date).format('YYYY-MM-DD')}
                          name="start_date"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Budget </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.budget_inhouse}
                          name="budget_inhouse"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Company Name</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.company_name}
                    name="company_name"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Contact Name</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.contact_name}
                    name="contact_name"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Quote Status </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.quote_status}
                          name="quote_status"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Project End Date </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && moment(documenteditdetails.estimated_finish_date).format('YYYY-MM-DD')}
                          name="estimated_finish_date"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              </Row>
          </ComponentCard>
              </FormGroup>
            </Form>
            <Form>
            <ComponentCard title="Client Details">
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Company Name</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.company_name}
                    name="company_name"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Website</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.website}
                    name="website"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Email</Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.email}
                          name="email"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Address</Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.company_address}
                          name="company_address"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.phone}
                    name="phone"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>PO Code</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.address_po_code}
                    name="address_po_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> State </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.address_state}
                          name="address_state"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Country</Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.address_country}
                          name="address_country"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              </Row>
              </ComponentCard>
            </Form>
            <Form>
            <ComponentCard title="Contact Details">
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Contact Name</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.contact_name}
                    name="contact_name"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Position</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.position}
                    name="position"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Email</Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.contact_email}
                          name="contact_email"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Address</Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.contact_address}
                          name="contact_address"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.contact_phone}
                    name="contact_phone"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>PO Code</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={documenteditdetails && documenteditdetails.contact_address_po_code}
                    name="contact_address_po_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> State </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.contact_address_state}
                          name="contact_address_state"
                          disabled>
                     </Input>
              </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Country</Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documenteditdetails && documenteditdetails.contact_address_country}
                          name="contact_address_country"
                          disabled>
                     </Input>
        </FormGroup>
              </Col>
              </Row>
              </ComponentCard>
            </Form>
    </div>
  );
}

export default DocumentEditDetails;
