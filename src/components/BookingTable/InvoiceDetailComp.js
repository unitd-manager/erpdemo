import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function BookingDetailComp({ bookingDetails, handleInputs }) {
  BookingDetailComp.propTypes = {
    bookingDetails: PropTypes.object,
    handleInputs: PropTypes.func,
   
  };

  return (
    <>
      <Form>
        <FormGroup>
            <Row>
             <Col md="3">
                <FormGroup>
                  <Label>Order Code</Label>

                  <Input
                    type="text"
                    value={bookingDetails && bookingDetails.order_code}
                    onChange={handleInputs}
                    name="order_code"
                    readOnly
                  >
                  
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Invoice Code</Label>

                  <Input
                    type="text"
                    value={bookingDetails && bookingDetails.invoice_code}
                    onChange={handleInputs}
                    name="invoice_code"
                    readOnly
                  >
                  
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={bookingDetails && bookingDetails.status}
                    name="status"
                    readOnly
                  >
                   
                  </Input>
                </FormGroup>
              </Col>
              
              <Col md="3">
                <FormGroup>
                  <Label>Invoice Date</Label>

                  <Input
                    type="date"
                    value={
                      bookingDetails &&
                      moment(bookingDetails.invoice_date).format('YYYY-MM-DD')
                    }
                    onChange={handleInputs}
                    name="invoice_date"
                   
                  >
                  
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Invoice Terms</Label>

                  <Input
                    type="text"
                    value={bookingDetails && bookingDetails.invoice_terms}
                    onChange={handleInputs}
                    name="invoice_terms"
                  >
                 
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Invoice Amount</Label>

                  <Input
                    type="text"
                    value={bookingDetails && bookingDetails.invoice_amount}
                    onChange={handleInputs}
                    name="invoice_amount"
                    readOnly
                  >
                 
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row></Row>
        </FormGroup>
      </Form>
    </>
  );
}
