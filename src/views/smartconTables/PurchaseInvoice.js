import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const PurchaseInvoice = () => {
  //All state variable
  const [purchaseinvoicedata, setPurchaseInvoiceData] = useState(null);
  const [loading, setLoading] = useState(false);

  //Get data from Training table
  const getPurchaseInvoice= () => {
    api
      .get('/purchaseinvoice/grtPurchaseInvoice')
      .then((res) => {
        setPurchaseInvoiceData(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          // buttons: [
          //   {
          //     extend: 'print',
          //     text: 'Print',
          //     className: 'shadow-none btn btn-primary',
          //   },
          // ],
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPurchaseInvoice();
  }, []);
  //structure of Training list view
  const columns = [
    {
      name: 'id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => (
        <Link to="/">
          <Icon.Edit3 />
        </Link>
      ),
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: 'Invoice Code',
      selector: 'purchase_invoice_code',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
        name: 'Project Title',
        selector: 'title',
        grow: 0,
        wrap: true,
        width: '4%',
      },
      {
        name: 'Client Name',
        selector: 'company_name',
        sortable: true,
        grow: 0,
        wrap: true,
      },
    {
      name: 'Invoice Date',
      selector: 'purchse_invoice_date',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: 'Amount',
      selector: 'invoice_amount',
      sortable: true,
      grow: 0,
      wrap: true,
    },
      {
        name: ' Due Date',
        selector: 'due_date',
        sortable: true,
        grow: 0,
        wrap: true,
      },
      {
        name: 'Status',
        selector: 'status',
        sortable: true,
        grow: 0,
        wrap: true,
      },
    
  ];
  return (
    <div className="container pt-xs-25">
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <CommonTable
        loading={loading}
        title="Purchase Invoice"
        Button={
          <Link to="/PurchaseInvoiceDetails">
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
          {purchaseinvoicedata &&
            purchaseinvoicedata.map((element, index) => {
              return (
                <tr key={element.purchase_invoice_id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/PurchaseInvoiceEdit/${element.purchase_invoice_id }`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>{element.purchase_invoice_code}</td>
                  <td>{element.title}</td>
                  <td>{element.company_name}</td>
                  <td>{moment(element.purchse_invoice_date).format('YYYY-MM-DD')}</td>
                  <td>{element.invoice_amount}</td>
                  <td>{element.due_date}</td>
                  <td>{element.status}</td>
                </tr>
              );
            })}
        </tbody>
      </CommonTable>
    </div>
  );
};
export default PurchaseInvoice;
