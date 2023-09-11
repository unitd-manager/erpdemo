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
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';

const EditRequestForQuoteLine = ({ editRequestForQuoteLine, setEditRequestForQuoteLine }) => {
  EditRequestForQuoteLine.propTypes = {
    editRequestForQuoteLine: PropTypes.bool,
    setEditRequestForQuoteLine: PropTypes.func,
  };
  const { id } = useParams();


  // Initialize state with data from props
  const [addLineItem, setAddLineItem] = useState([
    {
    purchase_quote_items_id : id
    }
]);

  // Function to update state
  function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...addLineItem];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    
  const quantitys = parseFloat(updatedObject.quantity) || 0;
  const unitPrice = parseFloat(updatedObject.amount) || 0;
  // const totalCost = parseFloat(updatedObject.total_cost);
  updatedObject.total_cost = quantitys * unitPrice;

    copyDeliverOrderProducts[index] = updatedObject;
    setAddLineItem(copyDeliverOrderProducts);
  }

  const getOrdersByOrderId = () => {
    api.post('/quote/RequestLineItemById', { purchase_quote_id : id }).then((res) => {
      setAddLineItem(res.data.data);
    
    });
  };
  
  // Function to edit line items
  const editLineItemApi = () => {
    addLineItem.forEach((item) => {
    
      api
        .post('quote/editTabQuoteLineItems',item )
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
    getOrdersByOrderId();
  }, []);

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
                      <tr key={el.id}>
                        <td data-label="ProductName">
                          <Input
                           type="text"
                            name="title"
                            defaultValue={el.title}
                            onChange={(e) => updateState(index, 'title', e)}
                          />
                        </td>
                        <td data-label="unit">
                          <Input
                            type="text"
                            name="unit"
                            defaultValue={el.unit}
                            onChange={(e) => updateState(index, 'unit', e)}
                          />
                        </td>
                        <td data-label="quantity">
                          <Input
                            type="text"
                            name="quantity"
                            defaultValue={el.quantity}
                            onChange={(e) => updateState(index, 'quantity', e)}

                          />
                        </td>
                        <td data-label="Amount">
                          <Input
                            type="text"
                            name="amount"
                            defaultValue={el.amount}
                            onChange={(e) => updateState(index, 'amount', e)}
                            
                          />
                        </td>
                        <td data-label="Total Price">
                          <Input
                            defaultValue={el.total_cost}
                            type="text"
                            name="total_cost"
                            onChange={(e) => updateState(index, 'total_cost', e)}
                          />
                        </td>
                        <td data-label="Remarks">
                          <Input
                            type="textarea"
                            name="description"
                            defaultValue={el.description}
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
