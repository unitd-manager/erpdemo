import React from 'react'
import { Row, Col, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Deductions({
    payroll,
    handleInputs,
    handleDeductions,
    setLoanPaymentHistoryModal,
    totalDeductions
  }) {
    Deductions.propTypes = {
      payroll: PropTypes.object,
      handleDeductions: PropTypes.func,
      handleInputs: PropTypes.func,
      setLoanPaymentHistoryModal: PropTypes.func,
      totalDeductions: PropTypes.any,
    };
  return (
    <div>
        <Row>
                <Col md="9">CPF-Employee</Col>
                <Col md="3">
                  <Input
                    disabled
                    name="cpf_employee"
                    type="text"
                    value={payroll && payroll.cpf_employee}
                    onChange={(e) => {
                      handleInputs(e);
                      handleDeductions(
                        e.target.value,
                        payroll.income_tax_amount,
                        payroll.loan_amount,
                        payroll.deduction1,
                        payroll.deduction2,
                        payroll.deduction3,
                        payroll.deduction4,
                        payroll.sdl,
                        payroll.pay_eucf,
                        payroll.pay_cdac,
                        payroll.pay_mbmf,
                        payroll.pay_sinda
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="9"> SDL</Col>
                <Col md="3">
                  <Input
                    name="sdl"
                    type="text"
                    value={payroll && payroll.sdl}
                    onChange={(e) => {
                      handleInputs(e);
                      handleDeductions(
                        e.target.value,
                        payroll.income_tax_amount,
                        payroll.loan_amount,
                        payroll.deduction1,
                        payroll.deduction2,
                        payroll.deduction3,
                        payroll.deduction4,
                        payroll.cpf_employee,
                        payroll.pay_eucf,
                        payroll.pay_cdac,
                        payroll.pay_mbmf,
                        payroll.pay_sinda
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="9">
                  Advance / Loan{' '}
                  <Link to=""
                    onClick={() => {
                      setLoanPaymentHistoryModal(true);
                    }}
                  >
                    View loan breakup
                  </Link>
                </Col>
                <Col md="3">
                  <Input
                    name="loan_deduction"
                    type="text"
                    value={payroll && payroll.loan_deduction}
                    onChange={(e) => {
                      handleInputs(e);
                      handleDeductions(
                        e.target.value,
                        payroll.income_tax_amount,
                        payroll.cpf_employee,
                        payroll.deduction1,
                        payroll.deduction2,
                        payroll.deduction3,
                        payroll.deduction4,
                        payroll.sdl,
                        payroll.pay_eucf,
                        payroll.pay_cdac,
                        payroll.pay_mbmf,
                        payroll.pay_sinda
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="9">Income Tax</Col>
                <Col md="3">
                  <Input
                    name="income_tax_amount"
                    type="text"
                    value={payroll && payroll.income_tax_amount}
                    onChange={(e) => {
                      handleInputs(e);
                      handleDeductions(
                        e.target.value,
                        payroll.cpf_employee,
                        payroll.loan_amount,
                        payroll.deduction1,
                        payroll.deduction2,
                        payroll.deduction3,
                        payroll.deduction4,
                        payroll.sdl,
                        payroll.pay_eucf,
                        payroll.pay_cdac,
                        payroll.pay_mbmf,
                        payroll.pay_sinda
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="9">Housing</Col>
                <Col md="3">
                  <Input
                    name="deduction1"
                    type="text"
                    value={payroll && payroll.deduction1}
                    onChange={(e) => {
                      handleInputs(e);
                      handleDeductions(
                        e.target.value,
                        payroll.income_tax_amount,
                        payroll.loan_amount,
                        payroll.cpf_employee,
                        payroll.deduction2,
                        payroll.deduction3,
                        payroll.deduction4,
                        payroll.sdl,
                        payroll.pay_eucf,
                        payroll.pay_cdac,
                        payroll.pay_mbmf,
                        payroll.pay_sinda
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="9">Transportation</Col>
                <Col md="3">
                  <Input
                    name="deduction2"
                    type="text"
                    value={payroll && payroll.deduction2}
                    onChange={(e) => {
                      handleInputs(e);
                      handleDeductions(
                        e.target.value,
                        payroll.income_tax_amount,
                        payroll.loan_amount,
                        payroll.deduction1,
                        payroll.cpf_employee,
                        payroll.deduction3,
                        payroll.deduction4,
                        payroll.sdl,
                        payroll.pay_eucf,
                        payroll.pay_cdac,
                        payroll.pay_mbmf,
                        payroll.pay_sinda
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="9">Others</Col>
                <Col md="3">
                  <Input
                    name="deduction3"
                    type="text"
                    value={payroll && payroll.deduction3}
                    onChange={(e) => {
                      handleInputs(e);
                      handleDeductions(
                        e.target.value,
                        payroll.income_tax_amount,
                        payroll.loan_amount,
                        payroll.deduction1,
                        payroll.deduction2,
                        payroll.cpf_employee,
                        payroll.deduction4,
                        payroll.sdl,
                        payroll.pay_eucf,
                        payroll.pay_cdac,
                        payroll.pay_mbmf,
                        payroll.pay_sinda
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="9">Food</Col>
                <Col md="3">
                  <Input
                    name="deduction4"
                    type="text"
                    value={payroll && payroll.deduction4}
                    onChange={(e) => {
                      handleInputs(e);
                      handleDeductions(
                        e.target.value,
                        payroll.income_tax_amount,
                        payroll.loan_amount,
                        payroll.deduction1,
                        payroll.deduction2,
                        payroll.deduction3,
                        payroll.cpf_employee,
                        payroll.sdl,
                        payroll.pay_eucf,
                        payroll.pay_cdac,
                        payroll.pay_mbmf,
                        payroll.pay_sinda
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="9">
                  <br></br>
                </Col>
                <Col md="3"></Col>
              </Row>
              {payroll && payroll.govt_donation ==='pay_eucf' && <Row>
                <Col md="9">Pay EUCF</Col>
                <Col md="3">
                  <Input
                    name="pay_eucf"
                    type="text"
                    value={payroll && payroll.pay_eucf}
                    onChange={(e) => {
                      handleInputs(e);
                      handleDeductions(
                        e.target.value,
                        payroll.income_tax_amount,
                        payroll.loan_amount,
                        payroll.deduction1,
                        payroll.deduction2,
                        payroll.deduction3,
                        payroll.deduction4,
                        payroll.sdl,
                        payroll.cpf_employee,
                      );
                    }}
                  />
                </Col>
              </Row>}
              {payroll && payroll.govt_donation ==='pay_sinda' && <Row>
                <Col md="9">Pay SINDA</Col>
                <Col md="3">
                  <Input
                    name="pay_sinda"
                    type="text"
                    value={payroll && payroll.pay_sinda}
                    onChange={(e) => {
                      handleInputs(e);
                      handleDeductions(
                        e.target.value,
                        payroll.income_tax_amount,
                        payroll.loan_amount,
                        payroll.deduction1,
                        payroll.deduction2,
                        payroll.deduction3,
                        payroll.deduction4,
                        payroll.sdl,
                        payroll.cpf_employee,
                      );
                    }}
                  />
                </Col>
              </Row>}
              {payroll && payroll.govt_donation ==='pay_cdac' && <Row>
                <Col md="9">Pay CDAC</Col>
                <Col md="3">
                  <Input
                    name="pay_cdac"
                    type="text"
                    value={payroll && payroll.pay_cdac}
                    onChange={(e) => {
                      handleInputs(e);
                      handleDeductions(
                        e.target.value,
                        payroll.income_tax_amount,
                        payroll.loan_amount,
                        payroll.deduction1,
                        payroll.deduction2,
                        payroll.deduction3,
                        payroll.deduction4,
                        payroll.sdl,
                        payroll.cpf_employee,
                      );
                    }}
                  />
                </Col>
              </Row>}
              {payroll && payroll.govt_donation ==='pay_mbmf' && <Row>
                <Col md="9">Pay MBMF</Col>
                <Col md="3">
                  <Input
                    name="pay_mbmf"
                    type="text"
                    value={payroll && payroll.pay_mbmf}
                    onChange={(e) => {
                      handleInputs(e);
                      handleDeductions(
                        e.target.value,
                        payroll.income_tax_amount,
                        payroll.loan_amount,
                        payroll.deduction1,
                        payroll.deduction2,
                        payroll.deduction3,
                        payroll.deduction4,
                        payroll.sdl,
                        payroll.cpf_employee,
                      );
                    }}
                  />
                </Col>
              </Row>}
              <Row>
                <Col md="9">
                  <b>Total Deductions</b>
                </Col>
                <Col md="3">
                  <Input
                    disabled
                    name="total_deductions"
                    type="text"
                    value={totalDeductions || payroll.total_deductions}
                    onChange={handleInputs}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="9"></Col>
                <Col md="3"></Col>
              </Row>
              <Row>
                <Col md="9"></Col>
                <Col md="3">
                  <Input name="" type="text" onChange={handleInputs} />
                </Col>
              </Row>
              <Row>
                <Col md="9"></Col>
                <Col md="3">
                  <Input name="" type="text" onChange={handleInputs} />
                </Col>
              </Row>
              <Row>
                <Col md="4">
                  <Input value={payroll && payroll.net_total} disabled />
                </Col>
                <Col md="3"></Col>
              </Row>
    </div>
  )
}

export default Deductions