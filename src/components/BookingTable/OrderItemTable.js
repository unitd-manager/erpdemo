import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';

export default function ItemTable({
  orderitemDetails,
 
}) {
  ItemTable.propTypes = {
    orderitemDetails: PropTypes.array,
   
     };

     
  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: 'Item' },
    { name: 'Quantity' },
    { name: 'Unit Price' },
    { name: 'Total' },
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
        {Array.isArray(orderitemDetails) && orderitemDetails.length > 0 ? (
          orderitemDetails.map((element) => { // Map only if orderitemDetails is an array
            return (
              <tr key={element.invoice_id}>
               <td>{element.item_title}</td>
               <td>{element.qty}</td>
               <td>{element.unit_price}</td>
                <td>{element.total_cost}</td>
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