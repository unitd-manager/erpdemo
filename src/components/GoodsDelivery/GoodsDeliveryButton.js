import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';
import PdfGoods from '../PDF/PdfGoods';

export default function GoodsDeliveryButton({ editGoodsDelivery, applyChanges, backToList, navigate ,id}) {
    GoodsDeliveryButton.propTypes = {
    editGoodsDelivery: PropTypes.func,
    navigate: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    id: PropTypes.any,
  };
  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
          <Col >
             
             <PdfGoods id={id} quoteId={id}></PdfGoods>
          
         </Col>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                    editGoodsDelivery();
                  navigate('/GoodsDelivery');
                }}
              >
                Save
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editGoodsDelivery();
                  applyChanges();
                }}
              >
                Apply
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="dark"
                onClick={() => {
                  backToList();
                }}
              >
                Back to List
              </Button>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
}
