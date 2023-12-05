import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import api from '../../constants/api';
import message from '../Message';

export default function BookingDetailComp({ bookingDetails, handleInputs }) {
  BookingDetailComp.propTypes = {
    bookingDetails: PropTypes.object,
    handleInputs: PropTypes.func,
   
  };
  const [orderdropdown, setOrderDropdown] = useState();
  const [goodsdeliverydropdown, setGoodsDeliveryDropdown] = useState();
  const getSalesOrderDropdown = () => {
    api
      .get('/invoice/getSalesOrderDropdown')
      .then((res) => {
        setOrderDropdown(res.data.data);
      })
      .catch(() => {
        message('Sales Order Data not found', 'info');
      });
  }
  
  //Api call for getting customer dropdown
  const getGoodsDeliveryDropdown = () => {
    api
      .get('/invoice/getGoodsDeliveryDropdown')
      .then((res) => {
        setGoodsDeliveryDropdown(res.data.data);
      })
      .catch(() => {
        message('Goods Delivery Data not found', 'info');
      });
  }

  useEffect(() => {
    getSalesOrderDropdown();
    getGoodsDeliveryDropdown();
     },[] );

  return (
    <>
      <Form>
        <FormGroup>
        <Row>
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
                <Label>Invoice Source</Label>
                <Input
                    type="text"
                    value={bookingDetails && bookingDetails.source_type}
                    onChange={handleInputs}
                    name="source_type"
                    readOnly
                  >
                    </Input>
              </FormGroup>
              </Col>
              {
bookingDetails && (
  bookingDetails.source_type === 'Sales_Order' )&&
  (
  <>

  <Col md="3">
    <FormGroup>
      <Label>Sales Order</Label>
      <Input 
            type="select" 
            name="invoice_source_id" 
            onChange={handleInputs}
              value={bookingDetails && bookingDetails.invoice_source_id}
              >
              <option>Select Order</option>
              {orderdropdown &&
                orderdropdown.map((e) => {
                  return (
                    <option key={e.order_id} value={e.order_id}>
                      {e.order_code}
                    </option>
                  );
                })}
            </Input>
            </FormGroup>
            </Col>
  </>
)}

{bookingDetails && bookingDetails.source_type === 'Goods_Delivery' && (
  <>
    <Col md="3">
      <FormGroup>
        <Label>Goods Delivery</Label>
        <Input 
          type="select" 
          name="invoice_source_id" 
          onChange={handleInputs}
          value={bookingDetails && bookingDetails.invoice_source_id}
        >
          <option>Select Goods Delivery</option>
          {goodsdeliverydropdown &&
            goodsdeliverydropdown.map((e) => {
              return (
                <option key={e.goods_delivery_id} value={e.goods_delivery_id}>
                  {e.goods_delivery_code}
                </option>
              );
            })}
        </Input>
      </FormGroup>
    </Col>
  </>
)}
    
                
              
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
