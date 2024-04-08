import React from 'react';
import { Col, Row } from 'reactstrap';
import TradingSummary from '../../components/dashboard/TradingSummary';
import OrdersStatus from '../../components/dashboard/OrdersStatus';
import EnquirySummary from '../../components/dashboard/EnquirySummary';
import ReturnStats from '../../components/dashboard/ReturnStats';
import DeliveryStats from '../../components/dashboard/DeliveryStats';
import InvoiceSummary from '../../components/dashboard/Invoice Summary';
import SalesStats from '../../components/dashboard/SalesStats'

const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
        <SalesStats />
        <TradingSummary/>
        <OrdersStatus/>
        <EnquirySummary/>
        <ReturnStats/>
        <DeliveryStats/>
        <InvoiceSummary/>
        </Col>
      </Row>
  
    </div>
  );
};

export default Test;
