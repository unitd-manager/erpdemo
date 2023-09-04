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
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const ChartOfAccounts = () => {
  //Const Variables
  const [chartofaccounts, setChartOfAccounts] = useState(null);
  const [loading, setLoading] = useState(false);

  // get Chart Of Accounts List
  const getChartOfAccounts = () => {
    api
      .get('/chartofaccounts/getChartOfAccounts')
      .then((res) => {
        setChartOfAccounts(res.data.data);
        $('#example').DataTable({
          pagingType: 'full_numbers',
          pageLength: 20,
          processing: true,
          dom: 'Bfrtip',
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getChartOfAccounts();
  }, []);
  //  stucture of Chart Of Accounts list view
  const columns = [
    {
      name: 'Id',
      selector: 'acc_head_id',
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
      name: 'Title',
      selector: 'title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Category',
      selector: 'category_title',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Code',
      selector: 'code',
      sortable: true,
      grow: 0,
    },
    
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title="Chart Of Account List"
          Button={
            <Link to="/ChartOfAccountDetails">
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
            {chartofaccounts &&
              chartofaccounts.map((element, i) => {
                return (
                  <tr key={element.acc_head_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/ChartofACEdit/${element.acc_head_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.title}</td>
                    <td>{element.category}</td>
                    <td>{element.code}</td>
                    </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default ChartOfAccounts;
