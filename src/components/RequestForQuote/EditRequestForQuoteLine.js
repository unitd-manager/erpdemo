import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';
// import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';

const EditRequestForQuoteLine = ({ editRequestForQuoteLine, setEditRequestForQuoteLine, orderDetails }) => {
  EditRequestForQuoteLine.propTypes = {
    editRequestForQuoteLine: PropTypes.bool,
    setEditRequestForQuoteLine: PropTypes.func,
    orderDetails: PropTypes.array,
  };

  // Initialize state with data from props
  const [addLineItem, setAddLineItem] = useState([]);

  // Function to update state
  function updateState(index, property, e) {
    // Create a copy of addLineItem
    const updatedLineItems = [...addLineItem];

    // Ensure the item at the given index exists
    if (!updatedLineItems[index]) {
      updatedLineItems[index] = {};
    }

    // Update the specific property for the item at the given index
    updatedLineItems[index] = {
      ...updatedLineItems[index],
      [property]: e.target.value,
    };

    // Recalculate total_cost if needed
    if (property === 'amount' || property === 'purchase_request_qty') {
      const quantity = parseFloat(updatedLineItems[index].purchase_request_qty) || 0;
      const amount = parseFloat(updatedLineItems[index].amount) || 0;
      updatedLineItems[index].total_cost = quantity * amount;
    }

    // Update the state with the new line items
    setAddLineItem(updatedLineItems);
  }


  // Function to edit line items
  const editLineItemApi = () => {
    addLineItem.forEach((item) => {
      console.log('Item to be updated:', item);
      api
        .post('quote/editTabQuoteLineItems', {
          amount: item.amount, 
          description: item.description,
          purchase_quote_items_id: item.purchase_quote_items_id,
          purchase_request_id: item.purchase_request_id,
          purchase_quote_id: item.purchase_quote_id,
          total_cost: item.total_cost,
        })
        .then((res) => {
          console.log('API Response:', res.data.data); // Log the API response
          setAddLineItem()
        })
        .catch((error) => {
          console.error('Error updating item:', error);
          message('Cannot Edit Line Items', 'error');
        });
    });
  };
  
  useEffect(() => {
    console.log('addLineItem:', addLineItem);
  }, [ editRequestForQuoteLine,orderDetails]);

  return (
    <>
      <Modal size="xl" isOpen={editRequestForQuoteLine}>
        <ModalHeader>Edit PO Line Items</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  <Col md="3">
                    <Label>Supplier</Label>
                    <Input
                      disabled
                      type="text"
                      name="supplier"
                      value={addLineItem && addLineItem.company_name}
                    />
                  </Col>
                  <Col md="3">
                    <Label>PR No.</Label>
                    <Input
                      disabled
                      type="text"
                      name="purchase_request_code"
                      value={addLineItem && addLineItem.purchase_request_code}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <table className="lineitem">
              <thead>
                <tr>
                  <th scope="col">Product Name</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {addLineItem &&
                  addLineItem.map((el, index) => {
                    return (
                      <tr key={el.purchase_quote_items_id}>
                        <td data-label="ProductName">
                          <Input
                            disabled
                            type="text"
                            name="title"
                            value={el.title}
                          />
                        </td>
                        <td data-label="unit">
                          <Input
                            disabled
                            type="text"
                            name="unit"
                            value={el.unit}
                          />
                        </td>
                        <td data-label="purchase_request_qty">
                          <Input
                            disabled
                            type="text"
                            name="purchase_request_qty"
                            value={el.purchase_request_qty}
                          />
                        </td>
                        <td data-label="Amount">
                          <Input
                            type="text"
                            name="amount"
                            value={el.amount}
                            onChange={(e) => updateState(index, 'amount', e)}
                          />
                        </td>
                        <td data-label="Total Price">
                          <Input
                            value={el.total_cost}
                            type="text"
                            name="total_cost"
                            onChange={(e) => updateState(index, 'total_cost', e)}
                          />
                        </td>
                        <td data-label="Remarks">
                          <Input
                            type="textarea"
                            name="description"
                            value={el.description}
                            onChange={(e) => updateState(index, 'description', e)}
                          />
                        </td>
                        <td data-label="Action">
                          <div className="anchor">
                            <span>Clear</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              editLineItemApi();
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setEditRequestForQuoteLine(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditRequestForQuoteLine;
