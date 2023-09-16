import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';

export default function CustomerFinanceInvoice({
  invoiceDetails,
  
}) {
  CustomerFinanceInvoice.propTypes = {
    invoiceDetails: PropTypes.array,
     };

  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: 'Invoice No' },
    { name: 'Invoice Date' },
    { name: 'Status' },
    { name: 'Amount' },
    { name: 'Due Date' },
   
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
              {invoiceDetails &&
                invoiceDetails.map((element) => {
                  return (
                    <tr key={element.order_id}>
                      <td>{element.invoice_code}</td>
                      <td>{element.invoice_date}</td>
                      <td>{element.status}</td>
                      <td>{element.InvoiceAmount}</td>
                      <td>{element.invoice_due_date}</td>
                 
                    
                
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
