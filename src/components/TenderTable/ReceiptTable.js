import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';

export default function CustomerFinanceInvoice({
  receiptDetails,
  
}) {
  CustomerFinanceInvoice.propTypes = {
    receiptDetails: PropTypes.array,
     };

  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: 'Invoice No' },
    { name: 'Receipt No' },
    { name: 'Receipt Date' },
    { name: 'Status' },
    { name: 'Mode of Payment' },
    { name: 'Receipt Amount' },
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
              {receiptDetails &&
                receiptDetails.map((element) => {
                  return (
                    <tr key={element.order_id}>
                      <td>{element.invoice_code}</td>
                      <td>{element.receipt_code}</td>
                      <td>{element.receipt_date}</td>
                      <td>{element.receipt_status}</td>
                      <td>{element.mode_of_payment}</td>
                      <td>{element.amount}</td>
                 
                    
                
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        
        </div>
      </div>
    </Form>
  );
}
