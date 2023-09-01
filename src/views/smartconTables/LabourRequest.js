import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import moment from 'moment';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { Link } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const LabourRequest = () => {
  //Const Variables
  const [planning, setPlanning] = useState(null);
  const [loading, setLoading] = useState(false);

  // get Leave
  const getPlanning = () => {
    api
      .get('/labourrequest/getLabourRequest')
      .then((res) => {
        setPlanning(res.data.data);
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
    getPlanning();
  }, []);
  //  stucture of leave list view
  const columns = [
    {
      name: 'id',
      selector: 'labour_request_id',
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
      name: 'Project Name',
      selector: 'project_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Project Code',
      selector: 'project_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Requested Date',
      selector: 'request_date',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Start Date',
      selector: 'request_start_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'End Date',
      selector: 'request_end_date',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <CommonTable
          loading={loading}
          title="Labour Request"
          Button={
            <Link to="/LabourRequestDetails">
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
            {planning &&
              planning.map((element, i) => {
                return (
                  <tr key={element.labour_request_id}>
                    <td>{i + 1}</td>
                    <td>
                      <Link to={`/LabourRequestEdit/${element.labour_request_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.proj_title}</td>
                    <td>{element.project_code}</td>
                    <td>{(element.request_date)?moment(element.request_date).format('DD-MM-YYYY'):''}</td>
                    <td>{(element.request_start_date)?moment(element.request_start_date).format('DD-MM-YYYY'):''}</td>
                    <td>{(element.request_end_date)?moment(element.request_end_date).format('DD-MM-YYYY'):''}</td>

                    </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default LabourRequest;
