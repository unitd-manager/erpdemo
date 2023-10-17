import React, { useEffect, useState } from 'react';
import { Row, Button, Col, Table, Card, CardBody, Label } from 'reactstrap';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import api from '../../constants/api';
import ExportReport from '../../components/Report/ExportReport';

function Ledger() {

  const columns = [
    {
      name: 'S.No',
      selector: 'journal_id',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
    },
    {
      name: 'Date',
      selector: 'entry_date',
    },
    {
      name: 'Narration',
      selector: 'narration_main',
    },
    {
      name: 'Debit',
      selector: 'debit',
    },
    {
      name: 'Credit',
      selector: 'credit',
    },
    {
      name: 'Balance',
      selector: 'total_cpf',
    },
    {
      name: 'Id',
      selector: 'total_cpf',
    },
  ];

  // New 
  const [journalEntry, setJournalEntry] = useState('');
  const [accountData, setAccountData] = useState('');
  const [totalCredit, setTotalCredit] = useState('');
  const [totalDebit, setTotalDebit] = useState('');
  const [ledgerBal, setLedgerBal] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');

  const getJournalEntry = () => {
    api
      .get('/journal/getAccHeadTitle')
      .then((res) => {
        const options = res.data.data.map(item => ({
          value: item.title,
          label: item.title,
          id: item.acc_head_id,
        }));
        setJournalEntry(options);
      })
  };
  const [journalDetail, setJournalDetail] = useState({});
  const handleSelectChange = (name, selectedOption) => {

    const selectedValue = selectedOption ? selectedOption.id : null;
    const selectedAcc = selectedOption ? selectedOption.value : null;
    setSelectedAccount(selectedAcc)
    setJournalDetail({
      ...journalDetail,
      [name]: selectedValue,
    });
  };

  const getAccountsData = () => {
    api
      .post('/ledger/getAccounts', journalDetail)
      .then((res) => {
        let TotalCreditAmm = 0;
        let TotalDebitAmm = 0;
        setAccountData(res.data.data);
        console.log("getAccounts", res.data.data);
        res.data.data.forEach((el) => {
          TotalCreditAmm += el.credit;
          TotalDebitAmm += el.debit;
        });
        setTotalCredit(TotalCreditAmm);
        setTotalDebit(TotalDebitAmm);
        setLedgerBal(TotalCreditAmm - TotalDebitAmm)
      })
  };

  useEffect(() => {
    getJournalEntry()
  }, []);

  console.log("journalDetail", journalDetail)
  return (
    <div className="">
      <ToastContainer></ToastContainer>
      <div className="card p-2 shadow-none">
        <Row><Label className="p-2 text-center"> Please select account name and click GO</Label></Row>
        <Row>
          <Col></Col>
          <Col md="8">
            <Select
              value={journalDetail.value}
              onChange={(selectedOption) =>
                handleSelectChange('acc_head', selectedOption)
              }
              options={journalEntry}
            />
          </Col>
          <Col md="2">
            <Button
              color="primary"
              className="shadow-none"
              onClick={() => {
                getAccountsData();
              }}
            >
              Go
            </Button>
          </Col>
          <Col></Col>
        </Row>
        <Row className='m-4'>
          <Col md="6">
            <b>Account:</b> &nbsp; <span>{selectedAccount}</span>
          </Col>
          <Col md="6">
            <b>Ledger Bal.:</b> &nbsp; <span>{ledgerBal}</span>
          </Col>
        </Row>
      </div>

      <Card>
        <CardBody>
          <Row>
            <Col>
              <ExportReport columns={columns} data={accountData} exportValue="Ledger" />
            </Col>
          </Row>
        </CardBody>

        <CardBody>
          <Table>
            <thead>
              <tr>
                {columns.map((cell) => {
                  return <td key={cell.name}>{cell.name}</td>;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <b></b>
                </td>
                <td>
                  <b></b>
                </td>
                <td>
                  <b></b>
                </td>
                <td>
                  <b>Total</b>
                </td>
                <td>
                  <b>-{totalDebit}</b>
                </td>
                <td>
                  <b>{totalCredit}</b>
                </td>
                <td>
                  <b></b>
                </td>
                <td>
                  <b></b>
                </td>
              </tr>
              {accountData &&
                accountData.map((element, index) => {
                  return (
                    <tr key={element.journal_id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/JournalEdit/${element.journal_master_id}?tab=1`}>
                          <Icon.Edit2 />
                        </Link>
                      </td>
                      <td>{element.entry_date}</td>
                      <td>{element.narration_main}<br />{element.narration}</td>
                      <td>{element.debit}</td>
                      <td>{element.credit}</td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Ledger