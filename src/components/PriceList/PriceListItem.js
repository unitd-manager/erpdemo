import React, { useState, useEffect } from 'react';
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
//import Select from 'react-select';
import random from 'random';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
//import moment from 'moment';
import * as Icon from 'react-feather';
import api from '../../constants/api';


export default function PlanningCpanel({
   setPlanData,
   setPlanEditModal,
  // deleteRecord,
  planningDetails,
  addContactToggle,
  addContactModal,
 // handleAddNewPlanning,
  //newPlanningData,
  setNewPlanningData,
  AddNewPlanning,
}) {
  PlanningCpanel.propTypes = {
    setPlanData: PropTypes.func,
    setPlanEditModal: PropTypes.func,
    setNewPlanningData: PropTypes.func,
    // deleteRecord: PropTypes.func,
    planningDetails: PropTypes.any,
    addContactToggle: PropTypes.func,
    addContactModal: PropTypes.bool,
   // handleAddNewPlanning: PropTypes.func,
    //newPlanningData: PropTypes.object,
    AddNewPlanning: PropTypes.func,
  };


 
// ...

const [addMoreItem, setMoreItem] = useState([
  {
    id: random.int(1, 99).toString(),
    unit: '',
    price: '',
    product_id: '', // Initialize product_id here
    title: '', // Initialize title here
  },
]);


const onchangeItem = (selectedProduct, itemId) => {
  const updatedItems = addMoreItem.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        product_id: selectedProduct.value.toString(),
        title: selectedProduct.label, 
        price: selectedProduct.price, // Set the selected title
        unit: selectedProduct.unit,
      };
    }
    return item;
  });
  setMoreItem(updatedItems);
  setNewPlanningData((prevData) => ({
    ...prevData,
    product_id: selectedProduct.value,
    title: selectedProduct.label,
    price: selectedProduct.price, // Set the selected title in newPlanningData
    unit: selectedProduct.unit,
  }));
};



const loadOptions = (inputValue, callback) => {
  api.get(`/product/getProductsbySearchFilter`, { params: { keyword: inputValue } })
.then((res) => {
    const items = res.data.data;
    const options = items.map((item) => ({
      value: item.product_id,
      label: item.title,
      price: item.price,
      unit: item.unit,
    }));
    callback(options);
  });
};
  useEffect(() => {
 }, []);
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
      name: 'Name',
      selector: 'title',
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
                          {addMoreItem.map((item) => (
  <Col md="4" key={item.id}>
    <FormGroup>
      <Label>Product Name</Label>
      <AsyncSelect
        key={item.id}
        defaultValue={{
          value: item.product_id,
          label: item.title,
          price: item.price,
          unit: item.unit,
        }}
        onChange={(e) => {
          onchangeItem(e, item.id);
        }}
        loadOptions={loadOptions}
      />
      <Input value={item.product_id} type="hidden" name="product_id"></Input>
      <Input value={item.title} type="text" name="title" ></Input>
    </FormGroup>
  </Col>
))}
                       
                      
                       {addMoreItem.map((item) => (
    <Col md="4" key={item.id}>
         <FormGroup>
        <Label>Price</Label>
        <Input
          type="text"
          name="price"
          key={item.id}
          defaultValue={{ value: item.product_id, label: item.title ,price: item.price}}
          onChange={(e) => {
            onchangeItem(e, item.id);
          }}
          value={item.price}
        />
      </FormGroup>
    </Col>
     
  ))}

{addMoreItem.map((item) => (
    <Col md="4" key={item.id}>
         <FormGroup>
        <Label>Unit</Label>
        <Input
          type="text"
          name="unit"
          key={item.id}
          defaultValue={{ value: item.product_id, label: item.title ,price: item.price,unit: item.unit}}
          onChange={(e) => {
            onchangeItem(e, item.id);
          }}
          value={item.unit}
        />
      </FormGroup>
    </Col>
     
  ))}
 
 

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
                    <td>{element.title}</td>
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
