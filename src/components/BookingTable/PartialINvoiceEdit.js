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
const PartialInvoiceEditModal = ({ partialinvoiceeditmodal, setPartialInvoiceEditModal, SalesInvoiceId }) => {
    PartialInvoiceEditModal.propTypes = {
    partialinvoiceeditmodal: PropTypes.bool,
    setPartialInvoiceEditModal: PropTypes.func,
    SalesInvoiceId: PropTypes.any
  };

  // All State Variable
  
    const [partialinvoiceeditdetails, setPartialInvoiceEditDetails] = useState();
    // get staff details
   const { loggedInuser } = useContext(AppContext);

   const [totalAmount, setTotalAmount] = useState(0);

const handleCalc = (Qty, UnitPrice) => {
    if (!Qty) Qty = 0;
    if (!UnitPrice) UnitPrice = 0;

    const calculatedTotalAmount = parseFloat(Qty) * parseFloat(UnitPrice);
    setTotalAmount(calculatedTotalAmount);
    // Do something with calculatedTotalAmount if needed.
};
   function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...partialinvoiceeditdetails];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    
    const quantity = parseFloat(updatedObject.invoice_qty) || 0;
    const unitPrice = parseFloat(updatedObject.unit_price) || 0;
    updatedObject.total_cost = quantity * unitPrice;
    updatedObject.modification_date = creationdatetime;
    updatedObject.modified_by = loggedInuser.first_name;
    updatedObject.invoice_qty = e.target.value; // Set invoice_qty to the entered value
  
    const InvoiceQty = updatedObject.invoice_qty;
    const orderedQty = updatedObject.qty;
  
    if (InvoiceQty > orderedQty) {
      alert('Entered quantity exceeds ordered quantity!');
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
      console.log('API Request Payload:', item);
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
                  <th scope="col">ordered Quantity</th>
                  <th scope="col">invoice Quantity</th>
                  <th scope="col">Total Amount</th>
                  <th scope="col"> Updated By</th>


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
                            disabled
                          />
                        </td>
                        <td data-label="Unit">
                          <Input
                            defaultValue={item.unit}
                            type="text"
                            name="unit"
                            disabled
                          />
                        </td>
                        <td data-label="Unit Price">
                          <Input
                            defaultValue={item.unit_price}
                            type="text"
                            name="unit_price"
                            onChange={(e) => {
                              updateState(index, 'unit_price', e);
                              
                            }}
                            disabled
                          />
                        </td>
                        <td data-label="Ordered Quantity">
                          <Input
                            defaultValue={item.qty}
                            type="text"
                            name="qty"
                            disabled
                            />
                        </td>   
                        <td data-label="Invoice Quantity">
  <Input
    defaultValue={item.invoice_qty}
    type="text"
    name="invoice_qty"
    onChange={(e) => {
      updateState(index, 'invoice_qty', e);
    }}
  />
</td>  
                        <td data-label="Total Amount">
                        <Input
              type="text"
              name="total_cost"
              value={totalAmount || item && item.total_cost}
              onChange={(e) => {
                updateState(index, 'total_cost', e);
                handleCalc(item.invoice_qty, item.unit_price);
              }}
              disabled
            />
                         
                        </td> 
                        <td>{item.modification_date  ? `${item.modified_by} (Modified on ${item.modification_date})` : `${item.created_by} (Created on ${item.creation_date})`}</td>              
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

export default PartialInvoiceEditModal;
