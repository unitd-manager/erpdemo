import React from 'react';
import { Col, Row } from 'reactstrap';
import TradingSummary from '../../components/dashboard/TradingSummary';
import OrdersStatus from '../../components/dashboard/OrdersStatus';

const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
        <TradingSummary/>
        <OrdersStatus/>
        </Col>
      </Row>
  
    </div>
  );
};

export default Test;
