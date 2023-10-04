import React, { useState, useEffect } from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Input,
  Col,
  Card,
  FormGroup,
  Button,
} from 'reactstrap';
// import {  useParams } from 'react-router-dom';
//import Select from 'react-select';
import random from 'random';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
//import { Link } from 'react-router-dom';
//import moment from 'moment';
import message from '../Message';
import api from '../../constants/api';


export default function PlanningCpanel({
   setPlanData,
   setPlanEditModal,
  planningDetails,
  addContactToggle,
  addContactModal,
 // handleAddNewPlanning,
  //newPlanningData,
  setNewPlanningData,
  quoteLine,
}) {
  PlanningCpanel.propTypes = {
    setPlanData: PropTypes.func,
    setPlanEditModal: PropTypes.func,
    setNewPlanningData: PropTypes.func,
    planningDetails: PropTypes.any,
    addContactToggle: PropTypes.func,
    addContactModal: PropTypes.bool,
   // handleAddNewPlanning: PropTypes.func,
    //newPlanningData: PropTypes.object,
    quoteLine: PropTypes.any,
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
const deleteRecord = (deleteID) => {
  Swal.fire({
    title: `Are you sure? ${deleteID}`,
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      api.post('/pricelistitem/deletePriceListItem', { price_list_item_id: deleteID }).then(() => {
        Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
        window.location.reload();
      });
    }
  });
};

const AddNewPlanning = () => {
  // Iterate over addMoreItem to submit all line items
  addMoreItem.forEach((item) => {
    item.price_list_id = quoteLine;

    api
      .post('/pricelistitem/insertPriceListItem', item)
      .then(() => {
        message('Contact inserted successfully.', 'success');
       window.location.reload();
      })
      .catch(() => {
        message('Network connection error.', 'error');
      });
  });
};


const AddNewLineItem = () => {
  setMoreItem((prevItems) => [
    ...prevItems,
    {
      id: new Date().getTime().toString(),
      unit: '',
      price: '',
      product_id: '', // Initialize product_id here
      title: '', // Initialize title here
    },
  ]);
};

const onchangeItem = (selectedProduct, itemId) => {
  const updatedItems = addMoreItem.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        product_id: selectedProduct.value.toString(),
        title: selectedProduct.label,
        price: selectedProduct.price || '',
        unit: selectedProduct.unit || '',
      };
    }
    return item;
  });
  setMoreItem(updatedItems);
};


const handleUnitChange = (itemId, newUnit) => {
  const updatedItems = addMoreItem.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        unit: newUnit,
      };
    }
    return item;
  });
  
  setMoreItem(updatedItems);

  setNewPlanningData((prevData) => ({
    ...prevData,
    unit: newUnit,
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
    {
      name: 'Action',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
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
                <Row>
                    <Col md="3">
                      <Button
                        className="shadow-none"
                        color="primary"
                        type="button"
                        onClick={() => {
                          AddNewLineItem();
                        }}
                      >
                        Add Line Item
                      </Button>
                    </Col>
                  </Row>
                  <Card>
                    <table className="lineitem">
                      <thead>
                        <tr>
                          <th scope="col">Title </th>
                          <th scope="col">Price</th>
                          <th scope="col">Unit </th>
                         
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                      {addMoreItem.map((item) => (
  <tr key={item.id}>
    <td>
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
      <Input value={item.title} type="hidden" name="title"></Input>
    </td>
    <td>
      <Input
        type="text"
        name="price"
        key={item.id}
        onChange={(e) => {
          onchangeItem(e, item.id);
        }}
        value={item.price}
      />
    </td>
    <td>
      <Input
        type="select"
        onChange={(e) => {
          const newUnit = e.target.value;
          handleUnitChange(item.id, newUnit);
        }}
        value={item.unit}
        name="unit"
      >
        <option defaultValue="selected">Please Select</option>
        <option value="KGS">KGS</option>
        <option value="PCS">PCS</option>
        <option value="EA">EA</option>
        <option value="NOS">NOS</option>
        <option value="BOX">BOX</option>
      </Input>
    </td>
  </tr>
))}

                      </tbody>
                    </table>
                  </Card>
                 
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
                        <span
                                className="addline"
                                onClick={() => {
                                  deleteRecord(element.price_list_item_id);
                                }}
                              >
                                <Icon.Trash2 />
                              </span>
                      </div>
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
