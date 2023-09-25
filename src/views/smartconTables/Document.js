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

const Document = () => {
  //All state variable
  const [documentdata, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(false);

  //Get data from Training table
  const getDocument= () => {
    api
      .get('/document/getDocument')
      .then((res) => {
        setDocumentData(res.data.data);
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
    getDocument();
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
      name: 'DOC Code',
      selector: 'document_code',
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
        name: 'Project Start Date',
        selector: 'start_date',
        sortable: true,
        grow: 0,
        wrap: true,
      },
    {
      name: 'Quote Status',
      selector: 'quote_status',
      grow: 0,
      wrap: true,
      width: '4%',
    },

    {
      name: 'Budget',
      selector: 'budget_inhouse 	',
      sortable: true,
      grow: 0,
      wrap: true,
    },
      {
        name: 'Project End Date',
        selector: 'estimated_finish_date',
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
        title="Document"
        Button={
          <Link to="/DocumentDetails">
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
          {documentdata &&
            documentdata.map((element, index) => {
              return (
                <tr key={element.document_id}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={`/DocumentEdit/${element.document_id}`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>{element.document_code}</td>
                  <td>{element.title}</td>
                  <td>{moment(element.start_date).format('YYYY-MM-DD')}</td>
                  <td>{element.quote_status}</td>
                  <td>{element.budget_inhouse}</td>
                  <td>{moment(element.estimated_finish_date).format('YYYY-MM-DD')}</td>
                </tr>
              );
            })}
        </tbody>
      </CommonTable>
    </div>
  );
};
export default Document;
