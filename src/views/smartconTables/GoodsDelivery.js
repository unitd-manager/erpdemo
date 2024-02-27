import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import moment from 'moment';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const GoodsDelivery = () => {
  const [gdelivery, setGDelivery] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTenders = () => {
    api
      .get('/goodsdelivery/getgoodsdelivery')
      .then((res) => {
        setGDelivery(res.data.data);
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
    getTenders();
  }, []);

  const columns = [
    {
      name: '#',
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
      name: 'Delivery Code',
    },
    {
      name: 'Date',
    },
    {
      name: 'Order Code',
    },
    {
      name: 'Customer',
    },
    {
      name: 'department',
    },
    {
      name: 'salesman',
    },
    {
      name: 'Reference',
    },
    {
      name: 'PO Code',
    },
    {
      name: 'Status',
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title="Goods Delivery List"
          Button={
            <Link to="/GoodsDeliveryDetails">
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
            {gdelivery &&
              gdelivery.map((element, index) => {
                return (
                  <tr key={element.goods_delivery_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/GoodsDeliveryEdit/${element.goods_delivery_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.goods_delivery_code}</td>
                    <td>
                      {element.goods_delivery_date
                        ? moment(element.goods_delivery_date).format('DD-MM-YYYY')
                        : ''}
                    </td>
                    <td>{element.order_code}</td>
                    <td>{element.company_name}</td>
                    <td>{element.department}</td>
                    <td>{element.sales_man}</td>
                    <td>{element.office_ref_no}</td>
                    <td>{element.po_no}</td>
                    <td>{element.goods_delivery_status}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default GoodsDelivery;
