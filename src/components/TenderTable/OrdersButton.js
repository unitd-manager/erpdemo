import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';
import api from '../../constants/api';

export default function TenderButtons({ editTenderData, applyChanges, backToList, navigate }) {
  TenderButtons.propTypes = {
    editTenderData: PropTypes.func,
    navigate: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
  };
  const generateData = () => {
    api
      .post('/tender/getQuoteLineItemsById')
      .then((res) => {
        const quoteItems = res.data;
        // Handle success (you might want to show a success message)
        console.log('Quote items fetched successfully', res);

        // Insert quote items into order items
        api
          .post('/finance/insertorder_item', quoteItems)
          .then(() => {
            console.log('Quote items inserted into order items successfully');
            // You might want to trigger a UI update here
          })
          .catch(() => {
            console.error('Error inserting quote items into order items');
          });
      })
      .catch((error) => {
        // Handle error (you might want to show an error message)
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
