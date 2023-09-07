import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  Button,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';

export default function InvoiceItem({ editModal, setEditModal, selectedInvoiceItemId }) {
  InvoiceItem.propTypes = {
    editModal: PropTypes.bool,
    setEditModal: PropTypes.func,
    selectedInvoiceItemId: PropTypes.any,
  };
  console.log('selectedInvoiceItemId', selectedInvoiceItemId);
  const [invoiceItem, setInvoiceItem] = useState(null);
  const [lineItems, setLineItems] = useState([]);
  
  const editInvoiceData = () => {
    api
      .post('/invoice/editInvoiceItems', lineItems) // Send lineItems instead of invoiceItem
      .then(() => {
        message('Record edited successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  useEffect(() => {
    if (editModal && selectedInvoiceItemId) {
     
      api
        .get(`/invoice/getInvoiceItemsByItemsId/${selectedInvoiceItemId}`)
        .then((response) => {
          
          setInvoiceItem(response.data.data[0]);
          
         setLineItems([
            {
              id: new Date().getTime().toString(),
              item_title: '',
              description: '',
              unit: '',
              qty: '',
              unit_price: '',
              remarks: '',
            },
          ]);
        })
        .catch((error) => {
          // Handle errors here
          console.error(error);
        });
    }
  }, [editModal, selectedInvoiceItemId]);

  const handleInputChange = (e) => {
    setLineItems({ ...lineItems, [e.target.name]: e.target.value });
  };


  const clearValue = (index) => {
    const updatedLineItems = [...lineItems];
    updatedLineItems.splice(index, 1);
    setLineItems(updatedLineItems);
  };

  return (
    <>
      <Modal size="xl" isOpen={editModal}>
        <ModalHeader>
          Edit Invoice Item
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Row>
                <Col md="12">
                  <Form>
                    <Row>
                    
                   
                      {/* Invoice Detail */}

                      {/* Invoice Item */}
                      <Row>
                        <Col>
                          <table className="lineitem">
                            <thead>
                              <tr>
                                <th scope="col">Item</th>
                                <th scope="col">Description </th>
                                <th scope="col">UoM</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Total Price</th>
                                <th scope="col">Remarks</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {lineItems.map((item, index) => {
                                return (
                                  <tr key={item.id}>
                                    <td data-label="Item">
                                      <Input
                                        value={invoiceItem && invoiceItem.item_title}
                                        type="text"
                                        name="item_title"
                                        onChange={(e) =>
                                          handleInputChange(e)
                                        }
                                      />
                                    </td>
                                    <td data-label="Description">
                                      <Input
                                        value={invoiceItem && invoiceItem.description}
                                        type="text"
                                        name="description"
                                        onChange={(e) =>
                                          handleInputChange(e)
                                        }
                                      />
                                    </td>
                                    <td data-label="UoM">
                                      <Input
                                        value={invoiceItem && invoiceItem.unit}
                                        type="text"
                                        name="unit"
                                        onChange={(e) =>
                                          handleInputChange(e)
                                        }
                                      />
                                    </td>
                                    <td data-label="Qty">
                                      <Input
                                        value={invoiceItem && invoiceItem.qty}
                                        type="number"
                                        name="qty"
                                        onChange={(e) =>
                                          handleInputChange(e)
                                        }
                                      />
                                    </td>
                                    <td data-label="Unit Price">
                                      <Input
                                        value={invoiceItem && invoiceItem.unit_price}
                                        onBlur={() => {
                                          //calculateTotal();
                                        }}
                                        type="number"
                                        name="unit_price"
                                        onChange={(e) =>
                                          handleInputChange(e)
                                        }
                                      />
                                    </td>
                                    <td data-label="Total Price">
                                      <Input
                                        value={invoiceItem && invoiceItem.total_cost}
                                        type="text"
                                        name="total_cost"
                                        disabled
                                      />
                                    </td>
                                    <td data-label="Remarks">
                                      <Input
                                        value={item.remarks}
                                        type="text"
                                        name="remarks"
                                        onChange={(e) =>
                                          handleInputChange(e)
                                        }
                                      />
                                    </td>
                                    <td data-label="Action">
                                      <div className="anchor">
                                        <span
                                          onClick={() => {
                                            clearValue(index);
                                          }}
                                        >
                                          Clear
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </Col>
                      </Row>

                      <ModalFooter>
                        <Button
                          className="shadow-none"
                          color="primary"
                          onClick={() => {
                            editInvoiceData();
                          }}
                        >
                          {' '}
                          Submit{' '}
                        </Button>
                        <Button
                          className="shadow-none"
                          color="secondary"
                          onClick={() => {
                            // setEditInvoiceData(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </ModalFooter>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}
