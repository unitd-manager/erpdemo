import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'reactstrap';
// import PdfSalesOrder from '../PDF/PdfSalesOrder';

export default function CustomerFinanceInvoice({ ordersDetails }) {
  CustomerFinanceInvoice.propTypes = {
    ordersDetails: PropTypes.array,
  };

  //Structure of Invoice table
  const invoiceTableColumns = [
    { name: 'Order No' },
    { name: 'Item Title' },
    { name: 'Unit' },
    { name: 'Price' },
    { name: 'Quantity' },
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
              {ordersDetails &&
                ordersDetails.map((element) => {
                  return (
                    <tr key={element.order_id}>
                      <td>{element.order_code}</td>
                      <td>{element.item_title}</td>
                      <td>{element.unit}</td>
                      <td>{element.cost_price}</td>
                      <td>{element.qty}</td>
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
