import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import moment from 'moment';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';



const PurchaseRequest = () => {
  //All state variable
  const [purchaserequest, setPurchaseRequest] = useState(null);
  const [loading, setLoading] = useState(false)

  //getting data from purchaserequest
  const getPurchaseRequest = () => {
    setLoading(true)
    api.get('/purchaserequest/getPurchaseRequest')
      .then((res) => {
        setPurchaseRequest(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
          searching: true,
          buttons: [ {
            extend: 'print',
            text: "Print",
            className:"shadow-none btn btn-primary",
        }],
        });
        setLoading(false)
      }).catch(()=>{
        setLoading(false)
      });
    };

  useEffect(() => {

    getPurchaseRequest();
  }, []);
  //structure of purchaserequest list view
  const columns = [
    {
      name: '#',
      selector: 'purchase_request_id',
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
      name: 'Purchase Request Code',
      selector: 'purchase_request_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Purchase Request Date',
      selector: 'purchase_request_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Purchase Delivery Date',
      selector: 'purchase_delivery_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Customer Name',
      selector: 'company_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
        name: 'Department',
        selector: 'department',
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
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs/>

        <CommonTable
                loading={loading}
          title="Purchase Request List"
          Button={
            <Link to="/PurchaseRequestDetails">
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
            {purchaserequest &&
              purchaserequest.map((element, index) => {
                return (
                  <tr key={element.purchase_request_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/PurchaseRequestEdit/${element.purchase_request_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.purchase_request_code}</td>
                    <td>{element.purchase_request_date ? moment(element.purchase_request_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{element.purchase_delivery_date ? moment(element.purchase_delivery_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{element.company_name}</td>
                    <td>{element.department}</td>
                    <td>{element.status}</td>
                  </tr>
                );
              })}
          </tbody>
          </CommonTable>
      </div>
    </div>
  );
};

export default PurchaseRequest;
