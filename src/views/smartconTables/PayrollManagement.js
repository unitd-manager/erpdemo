import React, { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import { Row, Col, Button, Card,Badge } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';
import message from '../../components/Message';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';
import TerminatingPayslipModal from '../../components/PayrollManagement/TerminatingPayslipModal';
import UpdateOtModal from '../../components/PayrollManagement/updateOtModal';
import PrintPayslipModal from '../../components/PayrollManagement/PrintPayslipModal';
import { columns } from '../../data/PayrollHR/PayrollColumn';
import PdfPaySlipList from '../../components/PDF/PdfPayslipList';

const Payrollmanagement = () => {
  //state variables
  const [payrollManagementsdata, setPayrollManagementsdata] = useState([]);
  const [jobInformationRecords, setJobInformationRecords] = useState([]);
  const [terminatingPayslipModal, setTerminatingPayslipModal] = useState(false);
  const [updateOtModal, setUpdateOtModal] = useState(false);
  const [terminatingPayslip, setTerminatingPayslip] = useState([]);
  const [printPayslipModal, setPrintPayslipModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [empWithoutJobInfo, setEmpWithoutJobInfo] = useState([]);
  //handleinputs

  const handleInputs = (e) => {
    setPayrollManagementsdata({ ...payrollManagementsdata, [e.target.name]: e.target.value });
  };

  //edit update ot
  //edit payroll
  const editPayrollManagementData = () => {
    const grossPay =
      parseFloat(payrollManagementsdata.basicPay) +
      parseFloat(payrollManagementsdata.allowance1) +
      parseFloat(payrollManagementsdata.allowance2) +
      parseFloat(payrollManagementsdata.allowance3) +
      parseFloat(payrollManagementsdata.allowance4) +
      parseFloat(payrollManagementsdata.allowance5) +
      parseFloat(payrollManagementsdata.allowance6).parseFloat(payrollManagementsdata.ot_amount);
    const totalDeductions =
      parseFloat(payrollManagementsdata.deduction1) +
      parseFloat(payrollManagementsdata.deduction2) +
      parseFloat(payrollManagementsdata.deduction3) +
      parseFloat(payrollManagementsdata.deduction4) +
      parseFloat(payrollManagementsdata.cpf_employee) +
      parseFloat(payrollManagementsdata.loan_deduction) +
      parseFloat(payrollManagementsdata.income_tax_amount) +
      parseFloat(payrollManagementsdata.sdl) +
      parseFloat(payrollManagementsdata.pay_eucf);
    payrollManagementsdata.total_basic_pay_for_month = grossPay;
    payrollManagementsdata.net_total = grossPay - totalDeductions;
    api
      .post('/payrollmanagement/editpayrollmanagementMain', payrollManagementsdata)
      .then(() => {
        message('Record editted successfully', 'success');
        setTimeout(() => {
          window.location.reload()
        }, 300);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //get all records
  const getAllPayrollManagements = () => {
    setLoading(true);
    api
      .get('/payrollmanagement/getpayrollmanagementMain')
      .then((res) => {
        res.data.data.forEach((element)=>{
const totalallowance =element.allowance1?parseFloat(element.allowance1):0+element.allowance2?parseFloat(element.allowance2):0+element.allowance3?parseFloat(element.allowance3):0+element.allowance4?parseFloat(element.allowance4):0+element.allowance5?parseFloat(element.allowance5):0+element.allowance6?parseFloat(element.allowance6):0
element.total_allowance=totalallowance? parseFloat(totalallowance):''  
})
        setPayrollManagementsdata(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        message('Payrollmanagement Data Not Found', 'info');
        setLoading(false);
      });
  };
  //get allarchive employee
  const getArchiveEmployees = () => {
    api
      .get('/payrollmanagement/getJobInformationTerminationPayroll')
      .then((res) => {
        setTerminatingPayslip(res.data.data);
      })
      .catch(() => {
        message('Payrollmanagement Data Not Found', 'info');
      });
  };
  const lastmonthfirst = moment(new Date())
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD');

    const lastmonthlast = moment(new Date())
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD');

console.log('last month first date',lastmonthfirst)
console.log('last month last date',lastmonthlast)
  //create payroll api
  const createPayrollManagements = async(Arr) => {
    const lastmonthfirstdate = moment(new Date())
      .subtract(1, 'months')
      .startOf('month')
      .format('YYYY-MM-DD');

    const lastmonthlastdate = moment(new Date())
      .subtract(1, 'months')
      .endOf('month')
      .format('YYYY-MM-DD');
    const payrollMonth = moment(lastmonthfirstdate).format('MM');
    const payrollYear = moment(lastmonthfirstdate).format('YYYY');
console.log('last month first date',lastmonthfirstdate)
console.log('last month last date',lastmonthlastdate)
    // const filtered = Arr.filter((el) => {
    //   return payrollManagementsdata.indexOf(el) === -1;
    // });

    // await Arr.forEach((obj) => {
    //   obj.payslip_start_date = lastmonthfirstdate;
    //   obj.payslip_end_date = lastmonthlastdate;
    //   obj.payroll_month = payrollMonth;
    //   obj.payroll_year = payrollYear;
    //   obj.status = 'generated';
    // });
    // const result = Arr.filter((ad) =>
    //   payrollManagementsdata.every(
    //     (fd) => fd.employee_id !== ad.employee_id && fd.payroll_month !== ad.payroll_month,
    //   ),
    // );

    console.log('filtered', Arr);
    await Arr.forEach(async(obj) => {
      obj.payslip_start_date = lastmonthfirstdate;
      obj.payslip_end_date = lastmonthlastdate;
      obj.payroll_month = payrollMonth;
      obj.payroll_year = payrollYear;
      obj.status = 'generated';

     await api
        .post('/payrollmanagement/insertpayroll_management', obj)
        .then(() => {
          message('Payrolls created successfully.', 'success');
          // setLoading(false);
        })
        .catch(() => {
          message('Unable to create record', 'info');
        });
    });
  };

  // generate payslip
  const generateTerminatingPayslips = () => {
    api.get('/payrollmanagement/getJobInformationTerminationPayroll').then((res) => {
      setJobInformationRecords(res.data.data);
      createPayrollManagements(res.data.data);
    });
  };

  // generate payslip
  const generatePayslips = () => {
    // setLoading(true);
    api.get('/payrollmanagement/getJobInformationPayroll').then((res) => {
      setJobInformationRecords(res.data.data);
      console.log('jobinformationrecords', res.data.data);
      console.log('jobinformationrecords', jobInformationRecords);
      createPayrollManagements(res.data.data);
    });
  };


 //getting employee list not having jobinformation record
 const getEmployeesWithoutJobInformation = () => {
  api
    .get('/payrollmanagement/getEmployeeWithoutJobinfo')
    .then((res) => {
      setEmpWithoutJobInfo(res.data.data);
    
    })
    .catch(() => {
      
    });
};

  useEffect(() => {
    setTimeout(() => {
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        // // buttons: [
        // //   {
        // //     extend: 'print',
        // //     text: 'Print',
        // //     className: 'shadow-none btn btn-primary',
        // //   },
        // ],

        searching: true,
      });
    }, 1000);

    getAllPayrollManagements();
    getArchiveEmployees();
    getEmployeesWithoutJobInformation();
  }, []);


  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs />
        <Card style={{padding:'10px'}}>
          <div>
            <h5>Please create Job information records for the below employees to make them appear in payroll.</h5>
          {
            empWithoutJobInfo.map((el)=>{
              return(
                <span style={{marginRight:'5px'}}><Badge> {el.first_name}</Badge></span>
              )
            })
          }
          </div>
        </Card>
        <Card className="p-2">
          <Row>
            <Col md="2">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => {
                  if (window.confirm('Are you sure you want to generate Payslips?')) {
                    generatePayslips();
                    // setTimeout(() => {
                    //   window.location.reload();
                    // }, 1500);
                  }
                }}
              >
                Generate Payslips
              </Button>
            </Col>
            <Col md="2">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => {
                  setPrintPayslipModal(true);
                }}
              >
                 All Payslip
              </Button>
            </Col>
            <Col md="3">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => setTerminatingPayslipModal(true)}
              >
                Generate Terminating Payslip
              </Button>
            </Col>
            <Col md="3">
              <Button
                type="submit"
                className="border btn-dark rounded"
                onClick={() => setUpdateOtModal(true)}
              >
                Update OT
              </Button>
            </Col>
          </Row>
        </Card>
        {terminatingPayslipModal && (
          <TerminatingPayslipModal
            terminatingPayslipModal={terminatingPayslipModal}
            setTerminatingPayslipModal={setTerminatingPayslipModal}
            terminatingPayslip={terminatingPayslip}
            generateTerminatingPayslips={generateTerminatingPayslips}
          />
        )}
        {updateOtModal && (
          <UpdateOtModal
            updateOtModal={updateOtModal}
            setUpdateOtModal={setUpdateOtModal}
            payrollManagementsData={payrollManagementsdata}
            handleInputs={handleInputs}
            editPayrollManagementData={editPayrollManagementData}
          />
        )}
        {printPayslipModal && (
          <PrintPayslipModal
            printPayslipModal={printPayslipModal}
            setPrintPayslipModal={setPrintPayslipModal}
            payrollManagementsdata={payrollManagementsdata}
          />
        )}
        <CommonTable
          loading={loading}
          title="Payroll Management List"
          Button={
            <div>
              <Row>
                <Col md="6">
                  <Link to="">
                    <Button color="primary" className="shadow-none">
                      Import
                    </Button>
                  </Link>
                </Col>
                <Col md="6">
                  <a
                    href="http://43.228.126.245/smartco-api/storage/excelsheets/PayrollManagement.xlsx"
                    download
                  >
                    <Button color="primary" className="shadow-none">
                      Sample
                    </Button>
                  </a>
                </Col>
              </Row>
            </div>
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
            {payrollManagementsdata &&
              payrollManagementsdata.map((element, index) => {
                return (
                  <tr key={element.payroll_management_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/PayrollManagementDetails/${element.payroll_management_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.first_name}</td>
                    <td>
                 <PdfPaySlipList payroll={element}></PdfPaySlipList>
                    </td>
                    <td>{element.payroll_month}</td>
                    <td>{element.payroll_year}</td>
                    <td>{element.basic_pay}</td>
                    <td>{element.ot_amount}</td>
                    <td>{element.cpf_employer}</td>
                    <td>{element.cpf_employee}</td>
                    <td>{element.total_allowance}</td>
                    <td>{element.total_deductions}</td>
                    <td>{element.net_total}</td>
                    <td>{element.status}</td>
                    <td>{element.payroll_management_id}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default Payrollmanagement;
