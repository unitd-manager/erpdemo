import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';

const LoanDetails = () => {
  //state variable
  const [employee, setEmployee] = useState();

  //Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate(); 

  // Get Employee By Id
  const getEmployee = () => {
    api
      .get('/loan/TabEmployee')
      .then((res) => {
        setEmployee(res.data.data);
      })
      .catch(() => {});
  };

  const [loanForms, setLoanForms] = useState({
    employee_id: '',
    amount: '',
    month_amount: '',
  });

  //setting data in loanForms
  const handleLoanForms = (e) => {
    setLoanForms({ ...loanForms, [e.target.name]: e.target.value });
  };

  //Logic for adding Loan in db
  const insertLoan = () => {
    if (loanForms.employee_id !== '' && loanForms.amount !== '' && loanForms.month_amount !== '') {
      loanForms.date = moment();
      api
        .post('/loan/insertLoan', loanForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Loan inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/LoanEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'error');
    }
  };

  useEffect(() => {
    getEmployee();
  }, [id]);
  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  // Use the selected language value as needed
  console.log('Selected language from localStorage:', selectedLanguage);
 

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  // const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/loan/getTranslationforHRLoan')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };
console.log('arabic', arabic);
  useEffect(() => {
    getArabicCompanyName();
  }, []);

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else { 
    genLabel = 'value';
  }

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer />
      <Row>
        <Col md="6">
          <ComponentCard title={arb?'تفاصيل القرض': 'Loan Details'}>
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <FormGroup>
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRLoan.Employee Name')?.[genLabel]}{' '}                   
              </Label>
                      <Input
                        type="select"
                        onChange={handleLoanForms}
                        value={
                        arb
                ? loanForms && loanForms.employee_id_arb
                  ? loanForms.employee_id_arb
                  : loanForms && loanForms.employee_id_arb !== null
                  ? ''
                  : loanForms && loanForms.employee_id
                : loanForms && loanForms.employee_id
            }
            name={arb ? 'employee_id_arb' : 'employee_id'}
             />
                  
                        <option value="" selected>
                          {arb?'الرجاء التحديد':  'Please Select'}
                        </option>
                        {employee &&
                          employee.map((ele) => {
                            return <option value={ele.employee_id}>
                               {' '}
                            {arb?ele.employee_name_arb:ele.employee_name}{' '}
                         
                              </option>;
                          })}
                      
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRLoan.Total Loan Amount')?.[genLabel]}{' '}                   
              </Label>
                    
                      <Input
                        type="number"
                        onChange={handleLoanForms}
                        value={
                          arb
                  ? loanForms && loanForms.amount_arb
                    ? loanForms.amount_arb
                    : loanForms && loanForms.amount_arb !== null
                    ? ''
                    : loanForms && loanForms.amount
                  : loanForms && loanForms.amount
              }
              name={arb ? 'amount_arb' : 'amount'}
               />
                    </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                    <Label dir="rtl" style={{ textAlign: 'right' }}>
                    {arabic.find((item) => item.key_text === 'mdHRLoan.Amount Payable(per month)')?.[genLabel]}{' '}                   
                   <span className="required"> *</span>
                      </Label>
                      <Input
                        type="number"
                        onChange={handleLoanForms}
                        value={
                          arb
                  ? loanForms && loanForms.month_amount_arb
                    ? loanForms.month_amount_arb
                    : loanForms && loanForms.month_amount_arb !== null
                    ? ''
                    : loanForms && loanForms.month_amount
                  : loanForms && loanForms.month_amount
              }
              name={arb ? 'month_amount_arb' : 'month_amount'}
               />
                    </FormGroup>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
              <Row>
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertLoan();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      {arb?'حفظ ومتابعة':  'Save & Continue'}
                    </Button>
                    <Button
                      className="shadow-none"
                      color="dark"
                      onClick={() => {
                        if (
                          window.confirm(
                            arb?'هل أنت متأكد من رغبتك في الإلغاء \n \n سوف تفقد أية تغييرات تم إجراؤها': 'Are you sure you want to cancel  \n  \n You will lose any changes made',
                          )
                        ) {
                          navigate(-1);
                        }
                      }}
                    >
                     {arb?'يلغي':'Cancel'} 
                    </Button>
                  </div>
                </Row>
              </FormGroup>
               
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default LoanDetails;
