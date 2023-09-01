import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';
import api from '../../constants/api';

export default function TenderButtons({ editTenderData, applyChanges, backToList, navigate, quoteId, id }) {
  TenderButtons.propTypes = {
    editTenderData: PropTypes.func,
    navigate: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    quoteId: PropTypes.any,
    id: PropTypes.any,
  };
  
  const generateData = () => {
    api
      .post('/tender/getQuoteLineItemsById', { quote_id: quoteId })
      .then((res) => {
        const quoteItems = res.data.data;

        console.log('Received quote items:', quoteItems); // Check if you're getting the expected quote items

        const orderItemsToInsert = [];

        quoteItems.forEach((quoteItem) => {
          const orderItemData = {
            order_id: id,
            qty: quoteItem.quantity,
            cost_price: quoteItem.amount,
            item_title: quoteItem.title,
            quote_id: quoteItem.quote_id,
            unit: quoteItem.unit,
            unit_price: quoteItem.unit_price,
          };

          orderItemsToInsert.push(orderItemData);
        });

        console.log('Order items to insert:', orderItemsToInsert); // Check the prepared order items data

        api
          .post('/finance/insertorderItems', orderItemsToInsert)
          .then(() => {
            console.log('Quote items inserted into order items successfully');
            // You might want to trigger a UI update here
          })
          .catch(() => {
            console.error('Error inserting quote items into order items');
          });
      })
      .catch((error) => {
        console.error('Error fetching quote items', error);
      });
  };



  return (
    <Form>
      <FormGroup>
        <ComponentCardV2>
          <Row>
          <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  generateData();
                }}
              >
                Generate Data
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  editTenderData();
                  navigate('/Enquiry');
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
                  editTenderData();
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
