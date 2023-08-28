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



const ProjectTask = () => {
  //All state variable
  const [projectTask, setProjectTask] = useState(null);
  const [loading, setLoading] = useState(false)

  //getting data from projectTask
  const getProjectTask = () => {
    setLoading(true)
    api.get('/projecttask/getProjectTask')
      .then((res) => {
        setProjectTask(res.data.data);
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

    getProjectTask();
  }, []);
  //structure of projectTask list view
  const columns = [
    {
      name: '#',
      selector: 'project_task_id',
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
      name: 'Task Title',
      selector: 'task_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Job Order Title',
      selector: 'job_order_title',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Project Name',
      selector: 'title',
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
      name: 'Job Order Code',
      selector: 'job_order_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Staff Name',
      selector: 'first_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Start date',
      selector: 'start_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'End Date',
      selector: 'end_date',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Completion',
      selector: 'completion',
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
          title="Task List"
          Button={
            <Link to="/ProjectTaskDetails">
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
            {projectTask &&
              projectTask.map((element, index) => {
                return (
                  <tr key={element.project_task_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ProjectTaskEdit/${element.project_task_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.task_title}</td>
                    <td>{element.job_order_title}</td>
                    <td>{element.title}</td>
                    <td>{element.company_name}</td>
                    <td>{element.job_order_code}</td>
                    <td>{element.first_name}</td>
                    <td>{element.start_date ? moment(element.start_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{element.end_date ? moment(element.end_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{element.completion}</td>
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

export default ProjectTask;
