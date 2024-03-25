import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';

export default function ItemTable({
  returnInvoiceItemDetails,
  arabic,
  arb
  // onRemoveItem,
}) {
  ItemTable.propTypes = {
    returnInvoiceItemDetails: PropTypes.array,
    arabic: PropTypes.array,
    arb: PropTypes.array,
    // onRemoveItem: PropTypes.func.isRequired,
     };
  
     let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: arabic.find((item) => item.key_text === 'mdPurchaseReturn.Item')?.[genLabel]},
    { name: arabic.find((item) => item.key_text === 'mdPurchaseReturn.Quantity')?.[genLabel]},
   
    { name: arabic.find((item) => item.key_text === 'mdPurchaseReturn.Total')?.[genLabel]},
    // { name: 'Remove' },
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
        {Array.isArray(returnInvoiceItemDetails) && returnInvoiceItemDetails.length > 0 ? (
          returnInvoiceItemDetails.map((element) => { // Map only if returnInvoiceItemDetails is an array
            return (
              <tr key={element.purchase_invoice_items_id}>
               <td>{element.item_title}</td>
               <td>{element.ordered_quantity}</td>
                <td>{element.total_cost}</td>
                           
{/*             
                <td>
                  <div className="anchor">
                    <span
                        onClick={() => {
                          console.log('Removing item with purchase_invoice_id:', element.purchase_invoice_items_id);
                      
                          onRemoveItem(element.purchase_invoice_items_id);
                        }}
                      >
                      Remove
                    </span>
                  </div>
                </td> */}
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={invoiceTableColumns.length}>{arb ?'لا توجد عناصر متاحة':'No items available'}</td>
          </tr>
        )}
      </tbody>
           
          </Table>
        
        </div>
      </div>
     
    </Form>
  );
}