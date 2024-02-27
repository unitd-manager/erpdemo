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

const ProjectQuotation = () => {
  const [tenders, setTenders] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTenders = () => {
    api
      .get('/projectquote/getProjectquote')
      .then((res) => {
        setTenders(res.data.data);
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
    getTenders();
  }, []);

  const columns = [
    {
      name: '#',
      selector: 'project_quote_id',
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
      name: 'Quotation Code',
      selector: 'quote_code',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: 'Date',
      selector: 'quote_date',
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
      selector: 'ref_no_quote',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Enquiry Code',
      selector: 'enquiry_code',
      sortable: true,
      grow: 2,
      width: 'auto',
    },
    {
      name: 'Status',
      selector: 'quote_status',
      sortable: true,
      width: 'auto',
    },
    {
        name: 'Net Amount',
        selector: 'total_amount',
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
          title="QuotationList"
          Button={
            <Link to="/ProjectQuotationDetails">
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
            {tenders &&
              tenders.map((element, index) => {
                return (
                  <tr key={element.project_quote_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/ProjectQuotationEdit/${element.project_quote_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.quote_code}</td>
                    <td>{element.quote_date}</td>
                    <td>{element.company_name}</td>
                    <td>{element.ref_no_quote}</td>
                    <td>{element.enquiry_code}</td>
                    <td>{element.quote_status}</td>
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

export default ProjectQuotation;
