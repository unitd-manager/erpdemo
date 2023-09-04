import React, {useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import DocumentButton from '../../components/DocumentTable/DocumentButton';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';





const DocumentEdit = () => {
  // All state variables

  const [documenteditdetails, setDocumentEditDetails] = useState();

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  //Get Staff Details
  const { loggedInuser } = useContext(AppContext);

  //Setting data in Change Request Edit Details
  const handleInputs = (e) => {
    setDocumentEditDetails({ ...documenteditdetails, [e.target.name]: e.target.value });
  };

  // Get Change Request data By Purchase Id
  const getDocumentById = () => {
    api
      .post('/document/getDocumentById', { document_id : id })
      .then((res) => {
        setDocumentEditDetails(res.data.data[0]);
      })
  };

  //Edit Change Request Data
  const editDocumentData = () => {
    if (documenteditdetails.document_title !== '')
    {
      documenteditdetails.modification_date = creationdatetime;
      documenteditdetails.modified_by= loggedInuser.first_name; 
      api
        .post('/document/editDocument', documenteditdetails)
        .then(() => {
          message('Record edited successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };


  //useEffect
  useEffect(() => {
    getDocumentById();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={documenteditdetails && documenteditdetails.title} />
      <Form>
        <FormGroup>
          <DocumentButton id={id} editDocumentData={editDocumentData} navigate={navigate} />
          
          {/* Content Details Form */}
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

</>   
  );
};
export default DocumentEdit;
