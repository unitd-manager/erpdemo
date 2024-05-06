import React from 'react';
import { Col, Row } from 'reactstrap';
import ProductChart from './ProductChart';
import StockChart from './StockChart';
import LowStockChart from './LowStockChart';
import InventoryChart from './InventoryChart';
import DebitNoteChart from './DebitNoteChart';


const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
        <ProductChart/>
        <StockChart/>
        <LowStockChart/>
        <InventoryChart/>
        <DebitNoteChart/>
       
        </Col>
      </Row>
  
    </div>
  );
};

export default Test;
