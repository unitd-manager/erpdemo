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
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';


const RequestForQuote = () => {
  //All state variable
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  //Getting data from quote
  const getQuote = () => {
    api
      .get('/quote/getTabPurcahseQuote')
      .then((res) => {
        setQuote(res.data.data);
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
    getQuote();
  }, []);
  //Structure of quote list view
  const columns = [
    {
      name: '#',
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
      name: 'Code',
      selector: 'purchase_request_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
   
    {
      name: 'Title',
      selector: 'purchase_request_title',
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
      name: 'Date Issued',
      selector: 'date_issued',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Due Date',
      selector: 'due_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Total Amount',
      selector: 'total_amount',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];
  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title="Quote List"
          Button={
            <Link to="/RequestForQuoteDetails">
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
            {quote &&
              quote.map((element, index) => {
                return (
                  <tr key={element.purchase_quote_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/RequestForQuoteEdit/${element.purchase_quote_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.purchase_request_code}</td>
                    <td>{element.purchase_request_title}</td>
                    <td>{element.status}</td>
                    <td>{element.date_issued}</td>
                    <td>{element.due_date}</td>
                    <td>{element.total_amount}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default RequestForQuote;
