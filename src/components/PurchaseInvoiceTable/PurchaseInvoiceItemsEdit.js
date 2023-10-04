import React, { useContext, useState, useEffect } from 'react';
import {
  FormGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

//invoiceitemseditmodal From VehicleEdit
const PurchaseInvoiceEditModal = ({ invoiceitemseditmodal, setInvoiceItemsEditModal, PurchaseOrderId }) => {
    PurchaseInvoiceEditModal.propTypes = {
    invoiceitemseditmodal: PropTypes.bool,
    setInvoiceItemsEditModal: PropTypes.func,
    PurchaseOrderId: PropTypes.any
  };

  // All State Variable
  
  const [purchaseinvoiceitemseditdetails, setPurchaseInvoiceItemsEditDetails] = useState();
// get staff details
const { loggedInuser } = useContext(AppContext);

  
  function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...purchaseinvoiceitemseditdetails];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    
  const quantity = parseFloat(updatedObject.goods_received_qty) || 0;
  const unitPrice = parseFloat(updatedObject.unit_price) || 0;
  // const totalCost = parseFloat(updatedObject.total_cost);
  updatedObject.total_cost = quantity * unitPrice;
  updatedObject.modification_date = creationdatetime;
  updatedObject.modified_by = loggedInuser.first_name;
    copyDeliverOrderProducts[index] = updatedObject;
    setPurchaseInvoiceItemsEditDetails(copyDeliverOrderProducts);
  }

   

  //Api call for getting Vehicle Insurance Data By ID
  const getPurchaseInvoiceItemsById = () => {
    api
      .post('/purchaseinvoice/getPurchaseInvoiceItemsById', {purchase_order_id: PurchaseOrderId})
      .then((res) => {
        setPurchaseInvoiceItemsEditDetails(res.data.data);
      })
      .catch(() => {
        message('Order Data Not Found', 'info');
      });
  };

  //Api call for Insert Vehicle Insurance Data
  const editPurchaseInvoiceItems = () => {
    
    purchaseinvoiceitemseditdetails.forEach((item) => {
    api
      .post('/purchaseinvoice/editPurchaseInvoiceItems', item)
      .then(() => {
        message('Line Item Edited Successfully', 'sucess');
      })
      .catch(() => {
        message('Cannot Edit Line Items', 'error');
      });
    }) 
  };


 


  // useEffect for Vehicle Insurance
  useEffect(() => {
    getPurchaseInvoiceItemsById();
  }, [PurchaseOrderId]);

  return (
    <>
      <Modal size="xl" isOpen={invoiceitemseditmodal}>
        <ModalHeader>
          Goods Receipt Items
          <Button
            color="secondary"
            onClick={() => {
              setInvoiceItemsEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Table bordered className="lineitem">
              <thead>
                <tr>
                  <th scope="col">PO Code</th>
                  <th scope="col">Title</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Ordered Quantity</th>
                  <th scope="col">Cost Price</th>
                  <th scope="col">Total Cost</th>
                </tr>
              </thead>
              <tbody>  
                {purchaseinvoiceitemseditdetails &&
                  purchaseinvoiceitemseditdetails.map((item, index)  => {
                    return (
                      <tr key={item.id}>
                        <td data-label="PO_Code">
                          <Input
                            defaultValue={item.po_code}
                            type="text"
                            name="po_code"
                            onChange={(e) => updateState(index, 'po_code', e)}
                            disabled
                          />
                        </td>
                        <td data-label="Title">
                          <Input
                            defaultValue={item.item_title}
                            type="text"
                            name="item_title"
                            onChange={(e) => updateState(index, 'item_title', e)}
                            disabled
                          />
                        </td>
                        <td data-label="Unit">
                          <Input
                            defaultValue={item.unit}
                            type="text"
                            name="unit"
                            onChange={(e) => updateState(index, 'unit', e)}
                            disabled
                          />
                        </td>
                        <td data-label="Ordered_Quantity">
                          <Input
                            defaultValue={item.ordered_quantity}
                            type="number"
                            name="ordered_quantity"
                            onChange={(e) => updateState(index, 'ordered_quantity', e)}
                            disabled
                          />
                        </td>
                        <td data-label="Unit Price">
                          <Input
                            defaultValue={item.unit_price}
                            type="number"
                            name="unit_price"
                            onChange={(e) => updateState(index, 'unit_price', e)}
                          />
                        </td>  
                        <td data-label="Total Cost">
                          <Input
                            defaultValue={item.total_cost}
                            type="number"
                            name="total_cost"
                            onChange={(e) => updateState(index, 'total_cost', e)}
                            disabled
                          />
                        </td>                                      
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            type="button"
            onClick={() => {
              editPurchaseInvoiceItems();
              setInvoiceItemsEditModal(false);
              setTimeout(() => {
                window.location.reload()
              }, 100);
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            onClick={() => {
              setInvoiceItemsEditModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PurchaseInvoiceEditModal;
