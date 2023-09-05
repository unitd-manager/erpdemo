import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import { Link } from 'react-router-dom';
// import moment from 'moment';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const Opportunity = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);

  const getOrders = () => {
    api
      .get('/finance/getFinances')
      .then((res) => {
        setOrders(res.data.data);
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
      selector: 'enquiry_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Quote Code',
      selector: 'quote_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Date',
      selector: 'order_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Customer',
      selector: 'company_name',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Reference',
      selector: 'office_ref_no',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Status',
      selector: 'order_status',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Net Amount',
      selector: 'amount',
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
          title="Sales Order List"
          Button={
            <Link to="/SalesOrderDetails">
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
            {orders &&
              orders.map((element, index) => {
                return (
                  <tr key={element.opportunity_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/OrdersEdit/${element.order_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.order_code}</td>
                    <td>{element.quote_code}</td>
                    <td>{element.order_date}</td>
                    <td>{element.company_name}</td>
                    <td>{element.office_ref_no}</td>
                    <td>{element.order_status }</td>
                    <td>{element.amount}</td>
                  
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Opportunity;