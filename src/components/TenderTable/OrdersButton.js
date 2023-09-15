import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';
import api from '../../constants/api';
//import message from '../Message';


export default function TenderButtons({ editTenderData, applyChanges, backToList, quoteId, id }) {
  TenderButtons.propTypes = {
    editTenderData: PropTypes.func,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    quoteId: PropTypes.any,
    id: PropTypes.any,
  };
  console.log('id',id);
  const generateData = () => {
    // Step 1: Delete old order items by quote_id
    api
      .delete(`/finance/deleteorder_item/${quoteId}`)
      .then(() => {
        api
          .post('/tender/getQuoteLineItemsById', { quote_id: quoteId })
          .then((res) => {
            const quoteItems = res.data.data;
    
            console.log('Received quote items:', quoteItems);
    
            if (quoteItems.length === 0) {
              console.warn('No quote items to insert');
              return;
            }
    
            // Step 3: Insert new order items based on quote items
            const insertOrderItems = (index) => {
              if (index < quoteItems.length) {
                const quoteItem = quoteItems[index];
    
                // Insert the order item
                const orderItemData = {
                  order_id: id,
                  qty: quoteItem.quantity,
                  cost_price: quoteItem.amount,
                  item_title: quoteItem.title,
                  quote_id: quoteItem.quote_id,
                  unit: quoteItem.unit,
                  unit_price: quoteItem.unit_price,
                  quote_items_id: quoteItem.quote_items_id,
                };
    
                console.log(`Inserting order item ${index + 1}:`, orderItemData);
    
                // Send a POST request to your /finance/insertorder_item API with the current order item
                api
                  .post('/finance/insertorder_item', orderItemData)
                  .then((result) => {
                    if (result.data.msg === 'Success') {
                      console.log(`Order item ${index + 1} inserted successfully`);
                    } else {
                      console.error(`Failed to insert order item ${index + 1}`);
                    }
                    // Continue to the next item
                    insertOrderItems(index + 1);
                  })
                  .catch((error) => {
                    console.error(`Error inserting order item ${index + 1}`, error);
                    // Continue to the next item
                    insertOrderItems(index + 1);
                  });
              } else {
                console.log('All order items inserted successfully');
                // You might want to trigger a UI update here
              }
            };
    
            // Start inserting order items from index 0
            insertOrderItems(0);
          })
          .catch((error) => {
            console.error('Error fetching quote items', error);
          });
      })
      .catch((error) => {
        console.error('Error deleting old order items', error);
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
                  window.location.reload();
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
      editTenderData(true); // Call editTenderData with navigation
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
      editTenderData(false); // Call editTenderData without navigation
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
