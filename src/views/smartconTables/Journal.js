import React from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';

const Journal = () => {

  const columns = [
    {
      name: 'id',
      selector: 'journal_id',
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
      name: 'Date',
      selector: 'date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Account',
      selector: 'account',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Narration',
      selector: 'narration',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Debit',
      selector: 'debit',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Credit',
      selector: 'credit',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          title="Journal List"
          Button={
            <Link to="/JournalDetails">
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
            
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Journal;