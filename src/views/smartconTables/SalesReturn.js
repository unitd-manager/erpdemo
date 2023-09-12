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

const SalesInvoice = () => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const getOrders = () => {
    api
      .get('/finance/getSalesReturns')
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
      name: 'Invoice No',
    
    },
    {
      name: 'Item',
    
    },
    {
      name: 'Date',
    
    },
    {
      name: 'Status',
    
    },
    {
      name: 'Return Quantity',
     
    },
    {
      name: 'Price',
     
    }, 
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title="Sales Return List"
          Button={
            <Link to="/ReturnDetails">
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
                  <tr key={element.sales_return_history_id }>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ReturnEdit/${element.sales_return_history_id }`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.invoice_code}</td>
                    <td>{element.item_title}</td>
                    <td>{element.return_date}</td>
                    <td>{element.status}</td>
                    <td>{element.qty_return}</td>
                    <td>{element.price}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default SalesInvoice;
