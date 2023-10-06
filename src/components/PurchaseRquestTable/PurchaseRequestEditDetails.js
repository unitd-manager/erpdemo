import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import ComponentCard from '../ComponentCard';



function PurchaseRequestEditDetails ({ purchaserequesteditdetails, handleInputs, customername}) {
    PurchaseRequestEditDetails.propTypes = {
        purchaserequesteditdetails: PropTypes.bool,
        handleInputs: PropTypes.func,
        customername: PropTypes.bool,
  };
  return (
    <div>   
      <Form>
        <FormGroup>
        <ComponentCard title="Purchase Request Details" creationModificationDate={purchaserequesteditdetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Purchase Request code </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaserequesteditdetails && purchaserequesteditdetails.purchase_request_code}
                    name="purchase_request_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Purchase Request Date <span className="required"> *</span> </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={purchaserequesteditdetails && moment(purchaserequesteditdetails.purchase_request_date).format('YYYY-MM-DD')}
                    name="purchase_request_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Purchase Delivery Date <span className="required"> *</span> </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    min={purchaserequesteditdetails && moment(purchaserequesteditdetails.purchase_request_date).format('YYYY-MM-DD')}
                    value={purchaserequesteditdetails && moment(purchaserequesteditdetails.purchase_delivery_date).format('YYYY-MM-DD')}
                    name="purchase_delivery_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Department <span className="required"> *</span> </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaserequesteditdetails && purchaserequesteditdetails.department}
                    name="department"
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Customer Name</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={purchaserequesteditdetails && purchaserequesteditdetails.company_id}
                    name="company_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {customername &&
                      customername.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {e.company_name}
                          </option>
                        );               
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Status </Label>
                  <Input
                    value={purchaserequesteditdetails && purchaserequesteditdetails.status}
                    type="select"
                    onChange={handleInputs}
                    name="status"
                  >
                    <option value="">Please Select</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Priority </Label>
                  <Input
                    value={purchaserequesteditdetails && purchaserequesteditdetails.priority}
                    type="select"
                    onChange={handleInputs}
                    name="priority"
                  >
                    <option value="">Please Select</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
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

export default PurchaseRequestEditDetails;
