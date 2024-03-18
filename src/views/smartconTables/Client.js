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
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import Flag from '../../components/Flag';
import message from '../../components/Message';

const Clients = () => {
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(false);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

const arb =selectedLanguage === 'Arabic'

  // const eng =selectedLanguage === 'English'

  const [arabic, setArabic] = useState([]);

  const getArabicCompanyName = () => {
    api
    .get('/translation/getTranslationForCompany')
    .then((res) => {
      setArabic(res.data.data);
    })
    .catch(() => {
      // Handle error if needed
    });   
};

console.log('arabic',arabic)
useEffect(() => {
  getArabicCompanyName();
}, []);

let genLabel = '';

if (arb === true) {
  genLabel = 'arb_value';
} else {
  genLabel = 'value';
}

  const columns = [
    {
      name: 'id',
      selector: 'company_id',
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
      name: 'Flag',
      selector: 'flag',
      cell: () => <Icon.Flag />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    {
      name: arabic.find(item => item.key_text === 'mdClient.companyName')?.[genLabel],
      selector: 'company_name',
      sortable: true,
      grow: 0,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdClient.email')?.[genLabel],
      selector: 'email',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: arabic.find(item => item.key_text === 'mdClient.status')?.[genLabel],
      selector: 'status',
      sortable: true,
      grow: 0,
    },
    {
      name: arabic.find(item => item.key_text === 'mdClient.phone')?.[genLabel],
      selector: 'phone',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
  ];

  const getClients = () => {
    api
      .get('/clients/getClients')
      .then((res) => {
        setClients(res.data.data);
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


  const updateFlag = (obj) => {
    obj.flag = !obj.flag;
    api
      .post('/clients/update-flag', obj)
      .then(() => {
        getClients();
        message('Flag updated successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  useEffect(() => {
    getClients();
    
  }, []);

  return (
    <div className="MainDiv">
      <div className="pt-xs-25">
        <BreadCrumbs />
        <ToastContainer></ToastContainer>
        <CommonTable
          loading={loading}
          title="Client List"
          Button={
            <Link to="/ClientDetails">
              <Button color="primary" className="shadow-none">
                Add New
              </Button>
            </Link>
          }
        >
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.selector}>{col.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients &&
              clients.map((element, i) => (
                <tr key={element.company_id}>
                  <td>{i + 1}</td>
                  <td>
                    <Link to={`/ClientEdit/${element.company_id}?tab=1`}>
                      <Icon.Edit2 />
                    </Link>
                  </td>
                  <td>
                    <span
                      onClick={() => {
                        updateFlag(element);
                      }}
                    >
                      <Flag value={element.flag ? 1 : 0} />
                    </span>
                  </td>
                  <td>{arb ? element.company_name_arb : element.company_name}</td>
                  <td>{arb ? element.email_arb : element.email}</td>
                  <td>{element.status}</td>
                  <td>{arb ? element.phone_arb : element.phone}</td>
                </tr>
              ))}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Clients;
