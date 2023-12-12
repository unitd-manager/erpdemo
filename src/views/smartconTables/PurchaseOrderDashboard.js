import React from 'react';
import { Col, Row } from 'reactstrap';
import PurchaseOrderSummary from '../../components/dashboard/PurchaseOrderSummary';
import PurchaseInvoiceSummary from '../../components/dashboard/PurchaseInvoiceSummary';
import PurchaseOrderPieChart from './PurchaseOrderPieChart';
import PurchaseOrderProduct from './PurchaseOrderdProduct';

const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
        <PurchaseOrderSummary/>
        <PurchaseInvoiceSummary/>
        <PurchaseOrderPieChart/>
        <PurchaseOrderProduct/>
        </Col>
      </Row>
  
    </div>
  );
};

export default Test;
