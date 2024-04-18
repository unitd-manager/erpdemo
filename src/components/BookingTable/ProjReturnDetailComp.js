import React from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';

export default function ProjReturnDetailComp({ projreturnDetails, handleInputs,arb }) {
  ProjReturnDetailComp.propTypes = {
    returnDetails: PropTypes.object,
    handleInputs: PropTypes.func,
    arb: PropTypes.any,
   // arabic: PropTypes.any,
    
  };

  return (
    <>
      <Form>
        <FormGroup>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>
                { arb ? 'رمز الفاتورة' : 'Invoice Code' }

                </Label>

                <Input
                  type="text"
                  value={projreturnDetails && projreturnDetails.invoice_code}
                  onChange={handleInputs}
                  name="invoice_code"
                  readOnly
                ></Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>
                { arb ? 'حالة' : 'Status' }
                </Label>
                <Input
                  type="select"
                  onChange={handleInputs}
                  value={projreturnDetails && projreturnDetails.status}
                  name="status"
                >
                  {' '}
                  <option value="" selected="selected">
                  { arb ? 'الرجاء التحديد' : 'Please Select' }
                  </option>
                  <option value="InProgress">{ arb ? 'في تَقَدم' : 'In Progress' }</option>
                  <option value="Return">{ arb ? 'يعود' : 'Return' }</option>
                  <option value="CancelReturn">{ arb ? 'إلغاء العودة' : 'Cancel Return' }</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md="3">
              <FormGroup>
                <Label>
                { arb ? 'تاريخ' : 'Date' }
                </Label>

                <Input
                  type="date"
                  value={projreturnDetails && moment(projreturnDetails.return_date).format('YYYY-MM-DD')}
                  onChange={handleInputs}
                  name="return_date"
                ></Input>
              </FormGroup>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </>
  );
}
