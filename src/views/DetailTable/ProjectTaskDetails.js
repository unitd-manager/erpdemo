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
    task_title: '',
  });
  //setting data in ProductDetails
  const handleInputs = (e) => {
    setProjectTaskDetails({ ...projecttaskdetails, [e.target.name]: e.target.value });
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);
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
