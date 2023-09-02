import React, { useState } from 'react';
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

  //Logic for adding Planning in db
  const [chartOfAccountForms, setChartOfAccountForms] = useState({
    title: '',
  });

  //setting data in PlanningForms
  const handleChartOfAccountForms = (e) => {
    setChartOfAccountForms({ ...chartOfAccountForms, [e.target.name]: e.target.value });
  };

  //Api for insertPlanning
  const insertChartOfAccount = () => {
    if (chartOfAccountForms.title !== '') {
      chartOfAccountForms.creation_date = creationdatetime;
      api
        .post('/planing/insertProjectPlanning', chartOfAccountForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Record inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/ChartOfAccountEdit/${insertedDataId}`);
          }, 300);
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
                      value={chartOfAccountForms && chartOfAccountForms.title}
                    ></Input>
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
