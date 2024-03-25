import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import api from '../../constants/api';


export default function ItemTable({
  returnItemDetails,
  invoiceStatus,
  // onRemoveItem,
}) {
  ItemTable.propTypes = {
    returnItemDetails: PropTypes.array,
    invoiceStatus: PropTypes.array,
    // onRemoveItem: PropTypes.func.isRequired,
  };
  const hasNonZeroQuantity = returnItemDetails?.some((item) => item.qty > 0) || false;
  
  const [returnModal, setReturnModal] = useState(false);
  // const [selectedItem, setSelectedItem] = useState(null);
  // const [returnQuantity, setReturnQuantity] = useState(0);


  const toggleReturnModal = () => setReturnModal(!returnModal);

  // Structure of Invoice table
  const invoiceTableColumns = [
    { name: 'Item' },
    { name: 'Quantity' },
    { name: 'Unit Price' },
    { name: 'Total' },
    { name: 'Qty Returned' },
   
  ];

  const [returnItems, setReturnItems] = useState([]);

  const openReturnModal = () => {
    // Filter out items with qty === 0
    const nonZeroQuantityItems = returnItemDetails.filter((item) => item.qty > 0);
    setReturnItems([...nonZeroQuantityItems]); // Create a copy of the items for editing

    // Check the invoice status before opening the modal
    if (invoiceStatus !== 'Cancelled') {
      toggleReturnModal();
    }
  };


  const handleReturnQuantityChange = (invoiceItemId, event) => {
    const quantity = parseInt(event.target.value, 10);
    setReturnItems((prevReturnItems) => {
      return prevReturnItems.map((item) => {
        if (item.invoice_item_id === invoiceItemId) {
          return { ...item, qty_return: quantity };
        }
        return item;
      });
    });
  };
  
  
  const handleReturn = () => {
    // Filter out items with qty_return === undefined (i.e., not modified)
    const modifiedItems = returnItems.filter((item) => item.qty_return !== undefined);
  
    // Make an API request to insert the sales return history records for modified items
    const promises = modifiedItems.map((item) => {
      const salesReturnItem = {
        qty_return: item.qty_return,
        invoice_item_id: item.invoice_item_id,
        order_id: item.order_id,
        invoice_id: item.invoice_id,
        return_date: new Date(),
        price: item.unit_price,
      };
  
      return api.post('/invoice/insertSalesReturnHistory', salesReturnItem);
    });
  
    Promise.all(promises)
      .then(() => {
        // Handle success (you might want to update the UI or show a message)
        console.log('Sales return history records inserted successfully');
        toggleReturnModal(); // Close the modal
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch((error) => {
        // Handle error (you might want to show an error message)
        console.error('Error inserting sales return history records:', error);
      });
  };
  
  return (
    // Invoice Tab
    <Form>
      {hasNonZeroQuantity && invoiceStatus !== 'Cancelled' && ( // Check invoice status here
              <Button color="primary" onClick={openReturnModal}>
                Sales Return
              </Button>
            )}
      <div className="MainDiv">
        <div className="container">
          <Table id="example">
          

            <thead>
              <tr>
                {invoiceTableColumns.map((cell) => (
                  <td key={cell.name}>{cell.name}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.isArray(returnItemDetails) && returnItemDetails.length > 0 ? (
                returnItemDetails.map((element) => (
                  <tr key={element.invoice_item_id}>
                    <td>{element.item_title}</td>
                    <td>{element.qty}</td>
                    <td>{element.unit_price}</td>
                    <td>{element.total_cost}</td>
                    <td>{element.qty_returned}</td>
                  </tr>
                ))
              ) : ( 
                <tr>
                  <td colSpan={invoiceTableColumns.length}>No items available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Return Modal */}
      <Modal isOpen={returnModal} toggle={toggleReturnModal}>
  <ModalHeader toggle={toggleReturnModal}>Return Quantity</ModalHeader>
  <ModalBody>
    <Table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Current Quantity</th>
          <th>Return Quantity</th>
          <th>Qty Returned</th> {/* New column for displaying qty_returned */}
        </tr>
      </thead>
      <tbody>
        {returnItems.map((item) => (
          <tr key={item.invoice_item_id}>
            <td>{item.item_title}</td>
            <td>{item.qty}</td>
            <td>
              <input
                type="text"
                id={`returnQuantity-${item.invoice_item_id}`}
                value={item.qty_return || ''}
                onChange={(event) => handleReturnQuantityChange(item.invoice_item_id, event)}
              />
            </td>
            <td>{item.qty_returned || 0}</td> {/* Display qty_returned or 0 if undefined */}
          </tr>
        ))}
      </tbody>
    </Table>
    <Button color="primary" onClick={handleReturn}>
      Return
    </Button>{' '}
    <Button color="secondary" onClick={toggleReturnModal}>
      Cancel
    </Button>
  </ModalBody>
</Modal>
    </Form>
  );
}
