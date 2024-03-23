import React from 'react';
import { Row, Col, Input, Form, FormGroup, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';

function PurchaseOrderDetailsPart({ purchaseDetails, handleInputs, supplier, request,arabic,arb }) {
  PurchaseOrderDetailsPart.propTypes = {
    purchaseDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    supplier: PropTypes.array,
    request: PropTypes.array,
    arabic: PropTypes.any,
    arb: PropTypes.any,
  };
  

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  return (
    <div>
      <Form>
        <FormGroup>
          <ComponentCard
            title="PurchaseOrder Details"
            righttitle={
              <Row>
                <Col className="fs-10 small">
                  <small>Creation :</small>
                  <small>
                    {purchaseDetails && purchaseDetails.created_by}
                    {purchaseDetails && purchaseDetails.creation_date}
                  </small>
                </Col>

                <Col className="fs-10 small">
                  <small>Modification :</small>

                  <small>
                    {purchaseDetails && purchaseDetails.modified_by}
                    {purchaseDetails && purchaseDetails.modification_date}
                  </small>
                </Col>
              </Row>
            }
          >
            <Row>
              <Col md="3">
                <FormGroup>
                  
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.PO Code')?.[genLabel]}
              </Label>
                  <br></br>
                  <span>{purchaseDetails && purchaseDetails.po_code}</span>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                   
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.Title')?.[genLabel]}
              </Label>
                
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaseDetails && purchaseDetails.title}
                    name="title"
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.Status')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    value={purchaseDetails && purchaseDetails.status}
                    name="status"
                    onChange={handleInputs}
                  >
                    <option defaultValue="selected">Please Select</option>
                    <option value="in progress">in progress</option>
                    <option value="sent to supplier">sent to supplier</option>
                    <option value="order acknowledged">order acknowledged</option>
                    <option value="partially received">partially received</option>
                    <option value="closed">closed</option>
                    <option value="on hold">on hold</option>
                    <option value="cancelled">cancelled</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.Supplier Name')?.[genLabel]}
              </Label>
                
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={purchaseDetails && purchaseDetails.supplier_id}
                    name="supplier_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {supplier &&
                      supplier.map((e) => {
                        return (
                          <option key={e.supplier_id} value={e.supplier_id}>
                            {e.company_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
  <FormGroup>
   
    <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.RQ CODE')?.[genLabel]}
              </Label>
    <Input
      type="select"
      value={purchaseDetails && purchaseDetails.purchase_quote_id}
      name="purchase_quote_id"
      onChange={handleInputs}
    >
      <option defaultValue="selected">Please Select</option>
      {request &&
        request.map((e) => {
          return (
            <option key={e.supplier_id} value={e.purchase_quote_id}>
              {e.rq_code}
            </option>
          );
        })}
    </Input>
  </FormGroup>
</Col>

            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.Priority')?.[genLabel]}
              </Label>
                
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={purchaseDetails && purchaseDetails.prirority}
                  >
                    <option defaultValue="selected">Please Select</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.PO Date')?.[genLabel]}
              </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      purchaseDetails &&
                      moment(purchaseDetails.purchase_order_date).format('YYYY-MM-DD')
                    }
                    name="purchase_order_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.Follow Up Date')?.[genLabel]}
              </Label>
                 
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      purchaseDetails && moment(purchaseDetails.follow_up_date).format('YYYY-MM-DD')
                    }
                    name="follow_up_date"
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.Notes To Supplier')?.[genLabel]}
              </Label>
                  <Input
                    type="textarea"
                    value={purchaseDetails && purchaseDetails.notes}
                    name="notes"
                    onChange={handleInputs}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.Delivery Terms')?.[genLabel]}
              </Label>
                   <Input
                    type="textarea"
                    value={purchaseDetails && purchaseDetails.delivery_terms}
                    name="delivery_terms"
                    onChange={handleInputs}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.Payment Terms')?.[genLabel]}
              </Label>
                  <Input
                    type="textarea"
                    value={purchaseDetails && purchaseDetails.payment_terms}
                    name="payment_terms"
                    onChange={handleInputs}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                 <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.Payment Status')?.[genLabel]}
              </Label>
                  <Input
                    type="select"
                    value={purchaseDetails && purchaseDetails.payment_status}
                    name="payment_status"
                    onChange={handleInputs}
                  >
                    <option value=""> Please Select</option>
                    <option value="Due">Due</option>
                    <option value="Partially Paid">Partially Paid</option>
                    <option value="Paid">Paid</option>
                    <option value="Cancelled">Cancelled</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                 <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdPurchaseOrder.supplier Invoice Code')?.[genLabel]}
              </Label>
                  <Input
                    type="text"
                    value={purchaseDetails && purchaseDetails.supplier_inv_code}
                    name="supplier_inv_code"
                    onChange={handleInputs}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}

export default PurchaseOrderDetailsPart;
