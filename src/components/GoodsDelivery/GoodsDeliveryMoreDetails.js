import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

export default function GoodsDeliveryMoreDetails({ tenderDetails, handleInputs, company }) {
  GoodsDeliveryMoreDetails.propTypes = {
    tenderDetails: PropTypes.object,
    handleInputs: PropTypes.object,
    company: PropTypes.object,
  };
  return (
    <div>
      {' '}
      <Form>
        <FormGroup>
          <ComponentCard title="Goods Delivery Details" creationModificationDate={tenderDetails}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>
                    Delivery Number <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.goods_delivery_code}
                    name="goods_delivery_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.goods_delivery_date}
                    name="goods_delivery_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Order No</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.order_code}
                    name="order_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                <Label>
                    company Name 
                  </Label>
                  <Input
                    type="select"
                    onChange={(e) => {
                      handleInputs(e);
                    }}
                    value={tenderDetails && tenderDetails.company_id}
                    name="company_id"
                  >
                    <option value="selected">Please Select</option>
                    {company &&
                      company.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {' '}
                            {e.company_name}{' '}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Department</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.department}
                    name="department"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Salesman</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.sales_man}
                    name="sales_man"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Reference</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.goods_ref_no}
                    name="goods_ref_no"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>PO Number</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={tenderDetails && tenderDetails.po_no}
                    name="po_no"
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Status</Label>
                  <Input
                    type="select"
                    value={tenderDetails && tenderDetails.goods_delivery_status}
                    onChange={handleInputs}
                    name="goods_delivery_status"
                  >
                    <option selected="selected" value="New">
                      New
                    </option>
                    <option value="Invoiced">Invoiced</option>
                    <option value="Delivered">Delivered</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </div>
  );
}
