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
//import { Link } from 'react-router-dom';
//import moment from 'moment';
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
  };
  //  Table Contact
  const columns = [
    {
      name: 'id',
      selector: 'price_list_item_id',
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
      name: 'Nmae',
      selector: 'product_name',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: 'Price',
      selector: 'price',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Unit',
      selector: 'unit',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
   
    
  ];
  return (
    <Form>
       <Row>
        <Col md="3">
          <FormGroup>
            <Button color="primary" className="shadow-none" onClick={addContactToggle.bind(null)}>
              Add New Item{' '}
            </Button>
            <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
              <ModalHeader toggle={addContactToggle.bind(null)}>New Item </ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                      <CardBody>
                        <Form>
                          <Row>
                           <Col md="4">
                              <FormGroup>
                                <Label>Product Name</Label>
                                <Input
                                  type="text"
                                  name="product_name"
                                  onChange={handleAddNewPlanning}
                                  value={newPlanningData && newPlanningData.product_name}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Price</Label>
                                <Input
                                  type="text"
                                  name="price"
                                  onChange={handleAddNewPlanning}
                                  value={newPlanningData && newPlanningData.price}
                                />
                              </FormGroup>
                            </Col>
                            <Col md="4">
                              <FormGroup>
                                <Label>Unit</Label>
                                <Input
                                  type="text"
                                  name="unit"
                                  onChange={handleAddNewPlanning}
                                  value={newPlanningData && newPlanningData.unit}
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
                  <tr key={element.price_list_item_id}>
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
                    <td>{element.product_name}</td>
                    <td>{element.price}</td>
                    <td>{element.unit}</td>
                 
                  
                   
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
     
    </Form>
  );
}
