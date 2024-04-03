import React, { useEffect, useState } from 'react';
import {
  Row,
  Form,
  Card,
  Table,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
  CardBody,
  Modal,
  ModalFooter,
  ModalBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import moment from 'moment';
import api from '../../constants/api';


export default function ProjectTimeSheet({
  id,
  
}) {
  ProjectTimeSheet.propTypes = {
    id: PropTypes.any,

  };
  const [addContactModalss, setAddContactModalss] = useState(false);

  const [StaffDetail, setstaffDetail] = useState([]);
  const getEmployee = () => {
    api
      .get('/projecttask/getEmployeeName')
      .then((res) => {
        console.log(res.data.data);
        setstaffDetail(res.data.data);
      })
      .catch(() => {});
  };

  // Gettind data from Job By Id
  const editJobById = () => {
    api
      .get('/jobinformation/getEmployee')
      .then((res) => {
        console.log(res.data.data);
        //setEmployee(res.data.data);
      })
      .catch(() => { });
  };
  const [insertTimeSheet, setInsertTimesheet] = useState({
   
  });

  const inserttimeSheets = () => {
    const newContactWithCompany = insertTimeSheet;
    newContactWithCompany.project_task_id = id;

    api
      .post('/projecttask/insertProjectTimesheet', newContactWithCompany)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        console.log(insertedDataId);
        setTimeout(() => {
          setAddContactModalss(false);
        }, 300);
        window.location.reload();
      })
      .catch(() => {
      });
  };
  
  const handleInputsTime = (e) => {
    setInsertTimesheet({ ...insertTimeSheet, [e.target.name]: e.target.value });
  };
  // Api call for getting milestone dropdown based on project ID
 
  useEffect(() => {
    editJobById();
    getEmployee()
  }, [id]);  

  //Structure of timeSheetById list view
  const Projecttimesheetcolumn = [
    {
      name: '#',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
    },
    {
      name: 'Title',
    },
    {
      name: 'Staff',
    },
    {
      name: 'Date',
    },
    {
      name: 'Hours',
    },
    {
      name: 'Total Hours',
    },
    {
      name: 'Status',
    },
    {
      name: 'Description',
    },

  ];
  return (
    <>
    <div className="MainDiv">
    <div className=" pt-xs-25">
          <br />
           <Form>
        
           <Button color="primary" className="shadow-none" onClick={() => setAddContactModalss(true)}>
  Add New
</Button>
            <Modal size="lg" isOpen={addContactModalss} >
              <ModalBody>
                <Row>
                  <Col md="12">
                    <Card>
                      <CardBody>
                        <Form>
                          <Row>
                          
                            <Col md="4">
                              <FormGroup>
                                <Label> Staff Name</Label>
                                <Input
                                  type="select"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.employee_id}
                                  name="employee_id"
                                >
                                  <option value="" selected>
                                    Please Select
                                  </option>
                                  {StaffDetail &&
                                    StaffDetail.map((e) => {
                                      return (
                                        <option key={e.employee_id} value={e.employee_id}>
                                          {e.first_name}
                                        </option>
                                      );
                                    })}
                                </Input>
                              </FormGroup>
                            </Col>
                            {/* <Col md="4">
                              <FormGroup>
                                <Label>Staff Name</Label>
                                <Input
                                  type="select"
                                  name="employee_id"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.employee_id} // Set the default employee name
                                > */}
                            {/* {insertTimeSheet && insertTimeSheet.employee_id ? ( // Render default employee name if it's set
                                    <option value={insertTimeSheet.employee_id}>
                                      {insertTimeSheet.employee_id}
                                    </option>
                                  ) : (
                                    <option  disabled>
                                      Select Staff Name
                                    </option>
                                  )} */}
                            {/* {StaffDetail &&
                                    StaffDetail.map((e) => (
                                      <option key={e.project_task_id} value={e.employee_id}>
                                        {e.first_name}
                                      </option>
                                    ))}
                                </Input>
                              </FormGroup>
                            </Col> */}
                            <Col md="4">
                              <FormGroup>
                                <Label>Date</Label>
                                <Input
                                  type="date"
                                  onChange={handleInputsTime}
                                  value={
                                    insertTimeSheet &&
                                    moment(insertTimeSheet.date).format('YYYY-MM-DD')
                                  }
                                  name="date"
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Hours</Label>
                                <Input
                                  type="number"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.hours}
                                  name="hours"
                                />
                              </FormGroup>
                            </Col>

                            <Col md="4">
                              <FormGroup>
                                <Label>Status</Label>
                                <Input
                                  type="select"
                                  name="status"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.status}
                                >
                                  {' '}
                                  <option value="" selected="selected">
                                    Please Select
                                  </option>
                                  <option value="Pending">Pending</option>
                                  <option value="InProgress">InProgress</option>
                                  <option value="Completed">Completed</option>
                                  <option value="OnHold">OnHold</option>
                                </Input>
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Description</Label>
                                <Input
                                  type="textarea"
                                  onChange={handleInputsTime}
                                  value={insertTimeSheet && insertTimeSheet.description}
                                  name="description"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Form>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    inserttimeSheets();
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={() => setAddContactModalss(false)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
      <Table id="example" className="display border border-secondary rounded">
        <thead>
          <tr>
            {Projecttimesheetcolumn.map((cell) => {
              return <td key={cell.name}>{cell.name}</td>;
            })}
          </tr>
        </thead>
      
      </Table>
      
      </Form>
      </div>
      </div>
      </>
  );
}
