import React from 'react';
import { Col, Row } from 'reactstrap';
import PurchaseOrderSummary from '../../components/dashboard/PurchaseOrderSummary';
import PurchaseInvoiceSummary from '../../components/dashboard/PurchaseInvoiceSummary';
import PurchaseOrderPieChart from './PurchaseOrderPieChart';

const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
        <PurchaseOrderSummary/>
        <PurchaseInvoiceSummary/>
        <PurchaseOrderPieChart/>
        </Col>
      </Row>
  
    </div>
  );
};

export default Test;
