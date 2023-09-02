import React, {useContext, useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const PurchaseRequestDetails = () => {
  //All const variables
  const navigate = useNavigate();
  const [projecttaskdetails, setProjectTaskDetails] = useState({
    job_order_id:'',
    task_title: '',
  });
  const [joborder, setJobOrder] = useState('');
  //setting data in ProductDetails
  const handleInputs = (e) => {
    setProjectTaskDetails({ ...projecttaskdetails, [e.target.name]: e.target.value });
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);
  const getJobOrderTitle = () => {
    api
      .get('/projecttask/getJobOrderTitle')
      .then((res) => {
        setJobOrder(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
  };

  //Insert Product Data
  const insertPurchaseRequestData = () => {
    if (projecttaskdetails.task_title !== '')
    {
      projecttaskdetails.creation_date = creationdatetime;
      projecttaskdetails.created_by= loggedInuser.first_name;   
      api
        .post('/projecttask/insertProjectTask', projecttaskdetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('PurchaseRequest inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/ProjectTaskEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to insert record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };




  //useeffect
  useEffect(() => {
    getJobOrderTitle();
    
  }, []);

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
                      <FormGroup>
                        <Label>Job Order Title</Label>
                        <Input
                          type="select"
                          onChange={handleInputs}
                          value={projecttaskdetails && projecttaskdetails.job_order_id}
                          name="job_order_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {joborder &&
                            joborder.map((e) => {
                              return (
                                <option key={e.job_order_id} value={e.job_order_id}>
                                  {e.job_order_title}
                                </option>
                              );
                            })}
                        </Input>
                      </FormGroup>
                    </Col>
                  <Col md="12">
                    <Label>Task Title <span className="required"> *</span> </Label>
                    <Input
                      type="text"
                      onChange={handleInputs}
                      value={projecttaskdetails && projecttaskdetails.purchase_request_date}
                      name="task_title"
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        insertPurchaseRequestData();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/ProjectTask');
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
export default PurchaseRequestDetails;
