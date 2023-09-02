import React, { useState , useEffect } from 'react';
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
import PropTypes from 'prop-types';
// import random from 'random';
import api from '../../constants/api';
import message from '../Message';

const EditRequestForQuoteLine = ({ editRequestForQuoteLine, setEditRequestForQuoteLine, data ,PurchaseRequestID}) => {
  EditRequestForQuoteLine.propTypes = {
    editRequestForQuoteLine: PropTypes.bool,
    setEditRequestForQuoteLine: PropTypes.func,
    data: PropTypes.array,
    PurchaseRequestID: PropTypes.array,
  };

  const [newItems, setNewItems] = useState([]);
  const [purchase, setPurchase] = useState(data);
  const [items, setItems] = useState(data)
  const [addMoreItem, setMoreItem] = useState(0);

  const AddMoreItem = () => {
    setMoreItem(addMoreItem + 1);
  };
console.log('po',data)

function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...items];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    copyDeliverOrderProducts[index] = updatedObject;
    setItems(copyDeliverOrderProducts);
  }

  function updateNewItemState(index, property, e) {
    const copyDeliverOrderProducts = [...newItems];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    copyDeliverOrderProducts[index] = updatedObject;
    setNewItems(copyDeliverOrderProducts);
  }



  //edit purchase
  const editPurchase = () => {
    const purchaseRecord={
      purchase_request_code:purchase.purchase_request_code,
      purchase_request_id:purchase.purchase_request_id,
      purchase_quote_id:purchase.purchase_quote_id,
      purchase_request_qty:purchase.purchase_request_qty,
      amount:purchase.amount,

    }
    api.post('/quote/RequestLineItemById',{  purchaseRecord })
    .then((res) => {
        setPurchase(res.data.data[0]);
    })
    .catch(() => {
      message('Unable to edit record.', 'error');
    });
  };

  const editPurchaseQuoteLineItem = (quoteId, lineItemId) => {
    api
      .post('/quote/editTabQuoteLineItems', {
        purchase_quote_id: quoteId,
        purchase_quote_line_items: lineItemId,
        /* other data for editing */
      })
      .then((response) => {
        // Update the state with the updated data for this item
        const updatedItems = [...items];
        const index = updatedItems.findIndex((item) => item.purchase_quote_id === lineItemId);
        if (index !== -1) {
          updatedItems[index] = response.data.updatedItem; // replace 'updatedItem' with the actual field name in your API response
          setItems(updatedItems);
        }
        message('Record edited successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  

  const getTotalOfPurchase = () => {
    let total = 0;
    items.forEach((a) => {
      total += parseInt(a.purchase_request_qty, 10) * parseFloat(a.amount, 10);
    });
    return total;
  };

useEffect(() => {
    editPurchase();
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
                    <Button color="primary" className="shadow-none" onClick={AddMoreItem}>
                      Add More Items
                    </Button>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md="3">
                    <Label>Supplier</Label>
                    <Input
                      disabled
                      type="text"
                      name="supplier"
                      value={purchase && purchase.company_name}
                    />
                  </Col>      
                  <Col md="3">
                    <Label>PR No.</Label>
                    <Input
                      disabled
                      type="text"
                      name="purchase_request_code"
                      value={purchase && purchase.purchase_request_code}
                    />
                  </Col>
                </Row>
                <Row>
                  <FormGroup className="mt-3"> Total Amount :{getTotalOfPurchase()}</FormGroup>
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
                {items && items.map((el, index) => {
                  return (
                    <tr key={el.purchase_quote_id}>
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
                      <td data-label="Total Price">{el.amount * el.purchase_request_qty}</td>
                      <td data-label="Remarks">
                        <Input
                          type="textarea"
                          name="description"
                          value={el.description}
                          onChange={(e) => updateState(index, 'description', e)}
                        />
                      </td>
                      <td data-label="Action">
                        <div className='anchor'>
                          <span>Clear</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {[...Array(addMoreItem)].map((elem, index) => {
                  return (
                    <tr key={addMoreItem}>
                      <td data-label="ProductName">
                      <Input
                      disabled
                          type="text"
                          name="title"
                          value={elem && elem.title}
                          
                        />
                      </td>
                      <td data-label="UoM">
                      <Input
                      disabled
                          type="text"
                          name="unit"
                          value={elem && elem.unit}
                          
                        />
                      </td>
                      <td data-label="Qty">
                      <Input
                      disabled
                          type="text"
                          name="purchase_request_qty"
                          value={elem && elem.purchase_request_qty}
                        />
                      </td>
                      <td data-label="Unit Price">
                        <Input
                          type="text"
                          name="amount"
                          value={elem && elem.amount}
                          onChange={(e) => updateNewItemState(index, 'amount', e)}
                        />
                      </td>
                      <td data-label="Total Price">{elem && elem.amount * elem && elem.purchase_request_qty}</td>
                      <td data-label="Remarks">
                        <Input
                          type="textarea"
                          name="description"
                          value={elem && elem.description}
                          onChange={(e) => updateNewItemState(index, 'description', e)}
                        />
                      </td>
                      <td data-label="Action">
                        <div className='anchor'>
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
            onClick={async() => {
              await editPurchaseQuoteLineItem((PurchaseRequestID));
              await setEditRequestForQuoteLine(false);
              setTimeout(()=>{
              },1500)
              
            }}
          >
            Submit
          </Button>
          <Button
            color="secondar"
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