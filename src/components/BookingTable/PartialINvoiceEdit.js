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

//partialinvoiceeditmodal From VehicleEdit
const PurchaseRequestItemsEditModal = ({ partialinvoiceeditmodal, setPartialInvoiceEditModal, SalesInvoiceId }) => {
    PurchaseRequestItemsEditModal.propTypes = {
    partialinvoiceeditmodal: PropTypes.bool,
    setPartialInvoiceEditModal: PropTypes.func,
    SalesInvoiceId: PropTypes.any
  };

  // All State Variable
  
    const [partialinvoiceeditdetails, setPartialInvoiceEditDetails] = useState();
    // get staff details
   const { loggedInuser } = useContext(AppContext);

  
    function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...partialinvoiceeditdetails];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    
  const quantity = parseFloat(updatedObject.qty) || 0;
  const unitPrice = parseFloat(updatedObject.unit_price) || 0;
  updatedObject.total_cost = quantity * unitPrice;
  updatedObject.modification_date = creationdatetime;
  updatedObject.modified_by = loggedInuser.first_name;
 const InvoiceQty = updatedObject.qty
 const orderedQty =partialinvoiceeditdetails.qty
 if (InvoiceQty > orderedQty) {
  // Show validation message or handle validation error as needed
  alert('Entered quantity exceeds ordered quantity!');
  // Optionally, you can prevent updating the state if validation fails
  return;
}
  copyDeliverOrderProducts[index] = updatedObject;
    setPartialInvoiceEditDetails(copyDeliverOrderProducts);
  }

  //Api call for getting Vehicle Insurance Data By ID
  const OrderLineItemsById = () => {
      api
        .post('/invoice/getInvoiceByOrderItemId', {invoice_id: SalesInvoiceId})
        .then((res) => {
          setPartialInvoiceEditDetails(res.data.data);
        })
        .catch(() => {
          message('Order Data Not Found', 'info');
        });
    };

  //Api call for Insert Vehicle Insurance Data
  const editSalesInvoice = () => {
    
    partialinvoiceeditdetails.forEach((item) => {
    api
      .post('/invoice/editInvoiceItems', item)
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
  OrderLineItemsById();
  }, [SalesInvoiceId]);

  return (
    <>
      <Modal size="xl" isOpen={partialinvoiceeditmodal}>
        <ModalHeader>
          Invoice Items
          <Button
            color="secondary"
            onClick={() => {
              setPartialInvoiceEditModal(false);
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
                  <th scope="col">Title</th>
                  <th scope="col">Unit</th>
                  <th scope="col">Unit Price</th>
                  {/* <th scope="col">Ordered Quantity</th> */}
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Amount</th>

                </tr>
              </thead>
              <tbody>  
                {partialinvoiceeditdetails &&
                  partialinvoiceeditdetails.map((item, index)  => {
                    return (
                      <tr key={item.id}>                     
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
                        <td data-label="Unit Price">
                          <Input
                            defaultValue={item.unit_price}
                            type="number"
                            name="unit_price"
                            onChange={(e) => updateState(index, 'unit_price', e)}
                          />
                        </td>
                        {/* <td data-label="Ordered Quantity">
                          <Input
                            defaultValue={item.purchase_request_qty}
                            type="number"
                            name="qty"
                            onChange={(e) => updateState(index, 'qty', e)}
                          />
                        </td>   */}
                        <td data-label="Quantity">
                          <Input
                            defaultValue={item.qty}
                            type="number"
                            name="qty"
                            onChange={(e) => updateState(index, 'qty', e)}
                          />
                        </td>   
                       
                        <td data-label="Total Amount">
                          <Input
                            defaultValue={item.total_cost}
                            type="number"
                            name="total_cost"
                            onChange={(e) => updateState(index, 'total_cost', e)}
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
              editSalesInvoice();
              setPartialInvoiceEditModal(false);
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
              setPartialInvoiceEditModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default PurchaseRequestItemsEditModal;
