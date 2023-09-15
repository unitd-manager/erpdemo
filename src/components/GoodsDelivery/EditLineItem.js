import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../Message';

const InvoiceModal = ({ editModal, setEditModal, getgoodsLineItemById }) => {
  InvoiceModal.propTypes = {
    editModal: PropTypes.bool,
    setEditModal: PropTypes.func,
    getgoodsLineItemById: PropTypes.func,
  };

  const { id } = useParams();
  //Add Line Item
  const [addLineItem, setAddLineItem] = useState([
    {
      goods_delivery_item_id: id,
    },
  ]);

  function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...addLineItem];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };

    const quantity = parseFloat(updatedObject.qty) || 0;
    const unitPrice = parseFloat(updatedObject.unit_price) || 0;
    // const totalCost = parseFloat(updatedObject.total_cost);
    updatedObject.total_cost = quantity * unitPrice;

    copyDeliverOrderProducts[index] = updatedObject;
    setAddLineItem(copyDeliverOrderProducts);
  }

  const getLineItem = () => {
    api.post('/goodsdelivery/getgoodsdeliveryitemById', { goods_delivery_id: id }).then((res) => {
      setAddLineItem(res.data.data);
    });
  };

  //editlineitem
  const editLineItemApi = () => {
    const editPromises = addLineItem.map((item) => {
      return api.post('/goodsdelivery/edit-goodsdeliveryitem', item);
    });

    Promise.all(editPromises)
      .then(() => {
        getgoodsLineItemById();
        setEditModal(false);
        message('Line Items Edited Successfully', 'success');
      })
      .catch(() => {
        message('Cannot Edit Line Items', 'error');
      });
  };

  useEffect(() => {
    getLineItem();
  }, []);
  return (
    <>
      <Modal size="xl" isOpen={editModal}>
        <ModalHeader>
          Edit Delivery Items
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
            <Row>
              <Col>
                <table className="lineitem">
                  <thead>
                    <tr>
                      <th scope="col">Item</th>
                      <th scope="col">Description </th>
                      <th scope="col">UoM</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {addLineItem &&
                      addLineItem.map((item, index) => {
                        return (
                          <tr key={item.id}>
                            <td data-label="Item">
                              <Input
                                defaultValue={item.title}
                                type="text"
                                name="title"
                                onChange={(e) => updateState(index, 'title', e)}
                                disabled
                              />
                            </td>
                            <td data-label="Description">
                              <Input
                                defaultValue={item.description}
                                type="text"
                                name="description"
                                onChange={(e) => updateState(index, 'description', e)}
                                disabled
                              />
                            </td>
                            <td data-label="UoM">
                              <Input
                                defaultValue={item.unit}
                                type="text"
                                name="unit"
                                onChange={(e) => updateState(index, 'unit', e)}
                                disabled
                              />
                            </td>
                            <td data-label="Qty">
                              <Input
                                defaultValue={item.quantity}
                                type="number"
                                name="quantiy"
                                onChange={(e) => updateState(index, 'quantity', e)}
                              />
                            </td>
                            <td data-label="Amount">
                              <Input
                                defaultValue={item.amount}
                                type="number"
                                name="amount"
                                onChange={(e) => updateState(index, 'amount', e)}
                                disabled
                              />
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
                  editLineItemApi();
                }}
              >
                {' '}
                Submit{' '}
              </Button>
              <Button
                className="shadow-none"
                color="secondary"
                onClick={() => {
                  setEditModal(false);
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default InvoiceModal;
