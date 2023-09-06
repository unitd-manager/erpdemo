import React, {useState,useEffect} from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import message from '../../components/Message';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';

const ChartOfAccountDetails = () => {
  //Navigation and Parameter Constants
  const navigate = useNavigate();

  const [category, setCategory] = useState();

  const getGroup = () => {
    api.get('/accountsMap/getParentItem').then((res) => {
      setCategory(res.data.data);
    });
  };

  useEffect(() => {
    getGroup();
  }, []);

  //Logic for adding Planning in db
  const [chartOfAccountForms, setChartOfAccountForms] = useState({
    title: '',
    acc_category_id: '',
    opening_balance_credit: '0.0000',
    opening_balance_debit:'0.0000',
    opening_balance_credit_base:'0.0000',
    opening_balance_debit_base:'0.0000',
  });

  //setting data in PlanningForms
  const handleChartOfAccountForms = (e) => {
    setChartOfAccountForms({ ...chartOfAccountForms, [e.target.name]: e.target.value });
  };

  //Api for insertPlanning
  const insertChartOfAccount = () => {

    console.log(chartOfAccountForms)

    if (chartOfAccountForms.title !== '' && chartOfAccountForms.acc_category_id !== '') {
      chartOfAccountForms.creation_date = creationdatetime;
      api
        .post('/chartOfAccounts/insertChartAc', chartOfAccountForms)
        .then(() => {
          message('Record inserted successfully.', 'success');
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Title<span className="required"> *</span>
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      onChange={handleChartOfAccountForms} 
                    />
                  </Col>
                </Row>
                </FormGroup>
                <FormGroup>
                <Row>
                  <Col md="12">
                    <Label>
                      Category
                    </Label>
                    <Input type="select" name="acc_category_id" onChange={handleChartOfAccountForms} >
                        <option value="">Please Select</option>

                        {category?.map((option) => (
                          <option key={option.acc_category_id} value={`${option.acc_category_id}`}>
                            {option.title}
                          </option>
                        ))}
                      </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        insertChartOfAccount();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate(-1);
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Go to List
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
export default ChartOfAccountDetails;
