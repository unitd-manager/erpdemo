import React,{useState,useEffect} from 'react';
import * as Icon from 'react-feather';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import api from '../../constants/api';

const Journal = () => {

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

const [arabic, setArabic] = useState([]);

const arb =selectedLanguage === 'Arabic'

const getArabicCompanyName = () => {
  api
  .get('/translation/getTranslationForCompanyJournal')
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

// let genLabel = '';

// if (arb === true) {
//   genLabel = 'arb_value';
// } else {
//   genLabel = 'value';
// }



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

  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(false);

  const getJournal = () => {
    api
      .get('/journal/getJournal')
      .then((res) => {
        setJournal(res.data.data);
        console.log("getJournal",res.data.data)
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
    getJournal();
  }, []);

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
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
            {journal &&
              journal.map((element, index) => {
                return (
                  <tr key={element.journal_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/JournalEdit/${element.journal_master_id}?tab=1`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.entry_date}</td>
                    <td>{element.acc_head}</td>
                    <td>
                      {arb ? (element.narrationarb_main + <br/> + element.narration_arb) : (element.narration_main + <br/> + element.narration)}
                    </td>
                    <td>{element.debit}</td>


                    <td>{element.credit}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Journal