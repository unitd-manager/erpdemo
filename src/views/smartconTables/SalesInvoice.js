import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Invoice = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const getOrders = () => {
    api
      .get('/finance/getInvoices')
      .then((res) => {
        setInvoice(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getOrders();
  }, []);

  const columns = [
    {
      name: '#',
      selector: '',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Order No',
      selector: 'order_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Invoice No',
      selector: 'invoice_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Customer',
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Status',
      selector: 'status',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'date',
      selector: 'invoice_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Amount',
      selector: 'InvoiceAmount',
      sortable: true,
      width: 'auto',
    },
    {
      name: 'Due Date',
      selector: 'invoice_due_date',
      sortable: true,
      width: 'auto',
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title="Sales Invoice List"
          Button={
            <Link to="/InvoiceDetails">
              <Button color="primary" className="shadow-none">
                Add New
              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {invoice &&
              invoice.map((element, index) => {
                return (
                  <tr key={element.invoice_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/InvoiceEdit/${element.invoice_id}/${element.order_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.order_code}</td>
                    <td>{element.invoice_code}</td>
                    <td>{element.company_name}</td>
                    <td>{element.status}</td>
                    <td>{element.invoice_date }</td>
                    <td>{element.invoice_amount}</td>
                    <td>{element.invoice_due_date}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Invoice;
