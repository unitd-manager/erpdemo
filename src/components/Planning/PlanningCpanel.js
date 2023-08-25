import React from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
  CardBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as Icon from 'react-feather';

export default function PlanningCpanel({
   setPlanData,
   setPlanEditModal,
  // deleteRecord,
  planningDetails,
  addContactToggle,
  addContactModal,
  handleAddNewPlanning,
  newPlanningData,
  AddNewPlanning,
  CalculateBillofmaterials,
}) {
  PlanningCpanel.propTypes = {
    setPlanData: PropTypes.func,
    setPlanEditModal: PropTypes.func,
    // deleteRecord: PropTypes.func,
    planningDetails: PropTypes.any,
    addContactToggle: PropTypes.func,
    addContactModal: PropTypes.bool,
    handleAddNewPlanning: PropTypes.func,
    newPlanningData: PropTypes.object,
    AddNewPlanning: PropTypes.func,
    CalculateBillofmaterials: PropTypes.func,
  };
  //  Table Contact
  const columns = [
    {
      name: 'id',
      selector: 'planning_cpanel_id',
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
    // {
    //   name: 'Del',
    //   selector: 'delete',
    //   cell: () => <Icon.Trash />,
    //   grow: 0,
    //   width: 'auto',
    //   wrap: true,
    // },
    {
      name: 'FG Code',
      selector: 'fg_code',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: ' Cpanel Name',
      selector: 'cpanel_name',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Ordered Qty',
      selector: 'ordered_qty',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Start Date',
      selector: 'start_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'End date',
      selector: 'end_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Due Date',
      selector: 'due_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: '',
     
    },
    {
      name: 'Action',
     
    },
    {
      name: '',
     
    },
  ];
  return (
    <Form>
       <Row>
        <Col md="3">
          <FormGroup>
            <Button color="primary" className="shadow-none" onClick={addContactToggle.bind(null)}>
              Add New Cpanel{' '}
            </Button>
            <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
              <ModalHeader toggle={addContactToggle.bind(null)}>New Cpanel </ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                      <CardBody>
                        <Form>
                          <Row>
                           <Col md="4">
                              <FormGroup>
                                <Label>FG Code</Label>
                                <Input
                                  type="text"
                                  name="fg_code"
                                  onChange={handleAddNewPlanning}
                                  value={newPlanningData && newPlanningData.fg_code}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Cpanel Name</Label>
                                <Input
                                  type="text"
                                  name="cpanel_name"
                                  onChange={handleAddNewPlanning}
                                  value={newPlanningData && newPlanningData.cpanel_name}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Ordered Qty</Label>
                                <Input
                                  type="text"
                                  name="ordered_qty"
                                  onChange={handleAddNewPlanning}
                                  value={newPlanningData && newPlanningData.ordered_qty}
                                />
                              </FormGroup>
                            </Col>
                            </Row>
                            <Row>
                            <Col md="4">
                              <FormGroup>
                                <Label>Start Date</Label>
                                <Input
                                  type="date"
                                  name="start_date"
                                  onChange={handleAddNewPlanning}
                                  value={newPlanningData && newPlanningData.start_date}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>End Date</Label>
                                <Input
                                  type="date"
                                  name="end_date"
                                  onChange={handleAddNewPlanning}
                                  value={newPlanningData && newPlanningData.end_date}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Due Date</Label>
                                <Input
                                  type="date"
                                  name="due_date"
                                  onChange={handleAddNewPlanning}
                                  value={newPlanningData && newPlanningData.due_date}
                                />
                              </FormGroup>
                            </Col>
                            </Row>
                           </Form>
                      </CardBody>
                   
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    AddNewPlanning();
                    //addContactModal(false);
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={addContactToggle.bind(null)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {planningDetails &&
              planningDetails.map((element, i) => {
                return (
                  <tr key={element.planning_cpanel_id}>
                    <td>{i + 1}</td>
                     <td>
                      <div className='anchor'>
                        <span
                          onClick={() => {
                            setPlanData(element);
                            setPlanEditModal(true);
                          }}
                        >
                          <Icon.Edit2 />
                        </span>
                      </div>
                    </td>
                    {/* <td>
                      <div color="primary" className='anchor'>
                        <span onClick={() => deleteRecord(element.contact_id)}>
                          <Icon.Trash2 />
                        </span>
                      </div>
                    </td>  */}
                    <td>{element.fg_code}</td>
                    <td>{element.cpanel_name}</td>
                    <td>{element.ordered_qty}</td>
                    <td>{(element.start_date)?moment(element.start_date).format('DD-MM-YYYY'):''}</td>
                    <td>{(element.end_date)?moment(element.end_date).format('DD-MM-YYYY'):''}</td>
                    <td>{(element.due_date)?moment(element.due_date).format('DD-MM-YYYY'):''}</td>
                     <td>
                     <Button className="shadow-none"
                  onClick={() => {
                    // AddNewPlanning();
                    //addContactModal(false);
                  }}>Import</Button>
                     <Link to={`/BillOfMaterials/${element.planning_cpanel_id}`}>
                        <u>Imported Item</u>
                      </Link>
                      </td>
                    <td>
                    <Button className="shadow-none"
                  color="primary"
                  onClick={() => {
                    CalculateBillofmaterials(element.planning_cpanel_id)
                  }}>Generate Shortage List</Button>
                  </td> 
                  <td>
                   
                  </td> 
                   
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
     
    </Form>
  );
}
