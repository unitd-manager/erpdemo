import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';

export default function ItemTable({
  returnItemDetails,
  onRemoveItem,
}) {
  ItemTable.propTypes = {
    returnItemDetails: PropTypes.array,
    onRemoveItem: PropTypes.func.isRequired,
     };
  
     
  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: 'Item' },
    { name: 'Quantity' },
    { name: 'Unit Price' },
    { name: 'Total' },
    { name: 'Remove' },
  ];


  return (
    // Invoice Tab

    <Form>
      <div className="MainDiv">
        <div className="container">
          <Table id="example">
            <thead>
              <tr>
                {invoiceTableColumns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
        {Array.isArray(returnItemDetails) && returnItemDetails.length > 0 ? (
          returnItemDetails.map((element) => { // Map only if returnItemDetails is an array
            return (
              <tr key={element.invoice_item_id}>
               <td>{element.item_title}</td>
               <td>{element.qty}</td>
               <td>{element.unit_price}</td>
                <td>{element.total_cost}</td>
                           
            
                <td>
                  <div className="anchor">
                    <span
                        onClick={() => {
                          console.log('Removing item with invoice_id:', element.invoice_item_id);
                      
                          onRemoveItem(element.invoice_item_id);
                        }}
                      >
                      Remove
                    </span>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={invoiceTableColumns.length}>No items available</td>
          </tr>
        )}
      </tbody>
           
          </Table>
        
        </div>
      </div>
     
    </Form>
  );
}