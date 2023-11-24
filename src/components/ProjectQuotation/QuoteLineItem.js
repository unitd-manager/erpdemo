import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import * as $ from 'jquery';
import random from 'random';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const QuoteLineItem = ({
  addLineItemModal,
  setAddLineItemModal,
  quoteLine,
  tenderDetails,
  // getLineItem,
}) => {
  QuoteLineItem.propTypes = {
    addLineItemModal: PropTypes.bool,
    setAddLineItemModal: PropTypes.func,
    quoteLine: PropTypes.any,
    tenderDetails: PropTypes.any,
    // getLineItem: PropTypes.any,
  };
  const { loggedInuser } = React.useContext(AppContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [addLineItem, setAddLineItem] = useState([
    {
      id: random.int(1, 99),
      unit: '',
      quantity: '',
      unit_price: '',
      amount: '',
      remarks: '',
      title: '',
      description: '',
    },
  ]);

  //Add new line item
  const AddNewLineItem = () => {
    setAddLineItem([
      ...addLineItem,
      {
        id: new Date().getTime().toString(),
        unit: '',
        quantity: '',
        unit_price: '',
        remarks: '',
        amount: '',
        title: '',
        description: '',
      },
    ]);
  };
  //Insert Invoice Item
  const addLineItemApi = (obj) => {
    const updatedTotalAmount = totalAmount + tenderDetails.quote_amount;
  
    if (updatedTotalAmount > tenderDetails.total_amount) {
      alert('Total amount exceeds the quote total amount!');
      return;
    }
    

    //obj.opportunity_id = projectInfo;
    obj.project_quote_id = quoteLine;
    obj.creation_date = creationdatetime;
    obj.created_by = loggedInuser.first_name;
    api
      .post('/projectquote/insertQuoteItems', obj)
      .then(() => {
        message('Line Item Added Successfully', 'sucess');
        //getLineItem(tenderDetails.project_quote_id);
        //setAddLineItemModal(false);
      
      })
      .catch(() => {
        //message('Cannot Add Line Items', 'error');
      });
  };
  //Invoice item values
 // Invoice item values

 const getAllValues = () => {
  const result = [];
  let submittedTotal = 0;

  addLineItem.forEach((element) => {
    if (element.amount) {
      submittedTotal += parseFloat(element.amount);
    }
    result.push(element);
  });

  if (submittedTotal > tenderDetails.total_amount) {
    alert('Total amount exceeds the quote total amount!');
    return;
  }

  setTotalAmount(0);
  result.forEach((element) => {
    addLineItemApi(element);
  });
  console.log(result);
};



  const [unitdetails, setUnitDetails] = useState();
  // Fetch data from API
    const getUnit = () => {
      api.get('/product/getUnitFromValueList', unitdetails)
        .then((res) => {
          const items = res.data.data
          const finaldat = []
          items.forEach(item => {
            finaldat.push({ value: item.value, label: item.value })
          })
          setUnitDetails(finaldat)
        })
    }
    //onchange function
    const onchangeItem = (selectedValue) => {
      const updatedItems = addLineItem.map((item) => {
        if (item.unit === selectedValue.value) {  // Compare with selectedValue.value
          return {
            ...item,
            unit: selectedValue.value,  // Update the unit with the selected option's value
            value: selectedValue.value  // Update the value with the selected option's value
          };
        }
        return item;
      });
    
      setAddLineItem(updatedItems);
    };

  //Invoice Items Calculation
  const calculateTotal = () => {
    let totalValue = 0;
    const result = [];
    $('.lineitem tbody tr').each(function input() {
      const allValues = {};
      $(this)
        .find('input')
        .each(function output() {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
          allValues.amount = allValues.quantity * allValues.unit_price;
        });
      result.push(allValues);
    });
  
    result.forEach((e) => {
      if (e.amount) {
        totalValue += parseFloat(e.amount);
      }
    });
  
    const remainingAmount = tenderDetails.total_amount - totalValue;
  
    if (remainingAmount < 0) {
      alert('Total amount exceeds the quote total amount!');
      return;
    }
  
    setAddLineItem(result);
    setTotalAmount(totalValue);
  };
  // Clear row value
  const ClearValue = (ind) => {
    setAddLineItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
    if (ind.amount) {
      const finalTotal = totalAmount - parseFloat(ind.amount);
      setTotalAmount(finalTotal);
    }
  };
  React.useEffect(() => {
    // Calculate total amount of existing line items
    let initialTotalAmount = 0;
    addLineItem.forEach((item) => {
      if (item.amount) {
        initialTotalAmount += parseFloat(item.amount);
      }
    });
    setTotalAmount(initialTotalAmount);
    getUnit();
  }, []);
  
  return (
    <>
      <Modal size="xl" isOpen={addLineItemModal}>
        <ModalHeader>
          Add Quote Items
          <Button
            className="shadow-none"
            color="secondary"
            onClick={() => {
              setAddLineItemModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              <Form>
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
                  {/* Invoice Item */}
                  <Card>
                    <table className="lineitem">
                      <thead>
                        <tr>
                          <th scope="col">Title </th>
                          <th scope="col">Description </th>
                          <th scope="col">Unit </th>
                          <th scope="col">Qty</th>
                          <th scope="col">Unit Price</th>
                          <th scope="col">Amount</th>
                          <th scope="col">Remarks</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {addLineItem &&
                          addLineItem.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td data-label="Title">
                                  <Input Value={item.title} type="text" name="title" />
                                </td>
                                <td data-label="Description">
                                  <Input Value={item.description} type="text" name="description" />
                                </td>
                                <td data-label="Unit">
                                  <Select
                                    name="unit"
                                    onChange={(selectedOption) => {
                                      onchangeItem(selectedOption);
                                    }}
                                    options={unitdetails}
                                  />
                                </td>
                                <td data-label="Qty">
                                  <Input Value={item.quantity} type="number" name="quantity" />
                                </td>
                                <td data-label="Unit Price">
                                  <Input
                                    Value={item.unit_price}
                                    onBlur={() => {
                                      calculateTotal();
                                    }}
                                    type="number"
                                    name="unit_price"
                                  />
                                </td>
                                <td data-label="Amount">
                                  <Input Value={item.amount} type="text" name="amount" disabled />
                                </td>
                                <td data-label="Remarks">
                                  <Input Value={item.remarks} type="text" name="remarks" />
                                </td>
                                <td data-label="Action">
                                  <Input type="hidden" name="id" Value={item.id}></Input>
                                  <span
                                    className="addline"
                                    onClick={() => {
                                      ClearValue(item);
                                    }}
                                  >
                                    Clear
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </Card>
                  <ModalFooter>
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        getAllValues();
                        //setAddLineItemModal(false);
                      }}
                    >
                      {' '}
                      Submit{' '}
                    </Button>
                    <Button
                      className="shadow-none"
                      color="secondary"
                      onClick={() => {
                        setAddLineItemModal(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Row>
              </Form>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
};
export default QuoteLineItem;
