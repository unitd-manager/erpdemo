import React, { useState } from 'react';
import {
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  Button,
  ModalFooter,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import api from '../../constants/api';
import message from '../Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';


const EditMaterialLineItemModal = ({ editMaterialModal, setEditMaterialModal, FetchMaterialItemData ,}) => {
    EditMaterialLineItemModal.propTypes = {
    editMaterialModal: PropTypes.bool,
    setEditMaterialModal: PropTypes.func,
    FetchMaterialItemData: PropTypes.object,
    //tenderDetails: PropTypes.any,
  };
const {id}=useParams();
  const [lineItemData, setLineItemData] = useState(null);
  const [totalAmount, setTotalAmount] = useState();
  const { loggedInuser } = React.useContext(AppContext);

  const handleData = (e) => {
    setLineItemData({ ...lineItemData, [e.target.name]: e.target.value });
  };
  const handleCalc = (Qty, UnitPrice, TotalPrice) => {
    if (!Qty) Qty = 0;
    if (!UnitPrice) UnitPrice = 0;
    if (!TotalPrice) TotalPrice = 0;

    setTotalAmount(parseFloat(Qty) * parseFloat(UnitPrice));
  };

  const UpdateData = () => {
  
    lineItemData.project_quote_id=id;
    lineItemData.modification_date = creationdatetime;
    lineItemData.modified_by = loggedInuser.first_name;
    //lineItemData.amount=totalAmount;
    lineItemData.amount = parseFloat(lineItemData.quantity) * parseFloat(lineItemData.unit_price) 
    //const updatedTotalAmount = lineItemData.amount;
  
    //if (updatedTotalAmount < tenderDetails.total_amount) {
      api
      .post('/projectquote/edit-QuoteLine', lineItemData)
      .then((res) => {
        console.log('edit Line Item', res.data.data);
        message('Edit Line Item Udated Successfully.', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to edit quote. please fill all fields', 'error');
      });
    // }else {
    //   window.alert('Total amount exceeds the quote total amount!');
    //   setTimeout(() => {
    //     window.location.reload();
    //   }, 300);
    //     }
  
  };
  const [unitdetails, setUnitDetails] = useState();
 //Api call for getting Unit From Valuelist
 const getUnit = () => {
  api
    .get('/product/getUnitFromValueList')
    .then((res) => {
      setUnitDetails(res.data.data);
    })
    .catch(() => {
      message('Staff Data Not Found', 'info');
    });
};
  React.useEffect(() => {
    getUnit();
  }, []);

  React.useEffect(() => {
    setLineItemData(FetchMaterialItemData);
  }, [FetchMaterialItemData]);

  return (
    <>
      <Modal isOpen={editMaterialModal}>
        <ModalHeader>Material Items</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Row>
              <Label sm="2">Title</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="title"
                  defaultValue={lineItemData && lineItemData.title}
                  onChange={handleData}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Description</Label>
              <Col sm="10">
                <Input
                  type="textarea"
                  name="description"
                  defaultValue={lineItemData && lineItemData.description}
                  onChange={handleData}
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Qty</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="quantity"
                  defaultValue={lineItemData && lineItemData.quantity}
                  onChange={(e)=>{handleData(e);
                    handleCalc(e.target.value, lineItemData.unit_price,lineItemData.amount
                      )}}
                 
                />
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">UOM</Label>
              <Col sm="10">
                <Input
                  type="select"
                  name="unit"
                  defaultValue={lineItemData && lineItemData.unit}
                  onChange={handleData}
                >
                <option defaultValue="selected">Please Select</option>
                  {unitdetails &&
                    unitdetails.map((ele) => {
                      return (
                        <option key={ele.value} value={ele.value}>
                          {ele.value}
                        </option>
                      );
                    })}
                </Input>
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Unit Price</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="unit_price"
                  defaultValue={lineItemData && lineItemData.unit_price}
                  onChange={(e)=>{handleData(e);
                    handleCalc(lineItemData.quantity,e.target.value,lineItemData.amount)
                  }}
                />
                 
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label sm="2">Amount</Label>
              <Col sm="10">
                <Input
                  type="text"
                  name="amount"
                  value={totalAmount || lineItemData && lineItemData.amount}
                  onChange={(e)=>{handleData(e);
                    handleCalc(lineItemData.quantity,lineItemData.unit_price,e.target.value)
                  }}
                  disabled
                />
              </Col>
            </Row>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            type="button"
            onClick={() => {
              UpdateData();
              setEditMaterialModal(false);
            }}
          >
            Save & Continue
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setEditMaterialModal(false);
            }}
          >
            {' '}
            Cancel{' '}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditMaterialLineItemModal;
