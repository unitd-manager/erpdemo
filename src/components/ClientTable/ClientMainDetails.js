import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import api from '../../constants/api';

export default function ClientMainDetails({ handleInputs, clientsDetails, allCountries , formSubmitted}) {
  ClientMainDetails.propTypes = {
    handleInputs: PropTypes.func,
    clientsDetails: PropTypes.any,
    allCountries: PropTypes.any,
    formSubmitted: PropTypes.any,
  };
  const [arabic, setArabic] = useState([]);

  const getArabicCompanyName = () => {
    api
      .get('/translation/getTranslationForCompany')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };
  console.log('arabic',arabic)
  useEffect(() => {
    getArabicCompanyName();
  }, []);
  return (
    <Form>
      <FormGroup>
        <Row>
        <Col md="3">
      <FormGroup>
        <Label dir="rtl" style={{ textAlign: 'right' }}><span className="required"> *</span>
          {arabic.length > 0 && arabic[0].value} {/* Access the value property */}
           Company Name 
        </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={clientsDetails && clientsDetails.company_name}
                name="company_name"
                className={`form-control ${
                  formSubmitted && clientsDetails && clientsDetails.company_name.trim() === '' ? 'highlight' : ''
                }`}
                />
                {formSubmitted && clientsDetails && clientsDetails.company_name.trim() === '' && (
                <div className="error-message">Please Enter</div>
              )}
      </FormGroup>
    </Col>
          <Col md="3">
            <FormGroup>
              <Label>Phone</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={clientsDetails && clientsDetails.phone}
                name="phone"
              />
            </FormGroup>
          </Col>
          <Col md="3">
          <FormGroup>
  <Label dir="rtl" style={{ textAlign: 'right' }}>
    {arabic.find(item => item.key_text === 'cm.website')?.value} Website
  </Label>
  <Input
    type="text"
    onChange={handleInputs}
    value={clientsDetails && clientsDetails.website}
    name="website"
  />
</FormGroup>
          </Col>
          <Col md="3">
          <FormGroup>
          <Label dir="rtl" style={{ textAlign: 'right' }}><span className="required"> *</span>
    Email
  </Label>
  <Input
    type="text"
    onChange={handleInputs}
    value={clientsDetails && clientsDetails.email}
    name="email"
    className={`form-control ${
      formSubmitted && clientsDetails && clientsDetails.email.trim() === '' ? 'highlight' : ''
    }`}
    />
    {formSubmitted && clientsDetails && clientsDetails.email.trim() === '' && (
    <div className="error-message">Please Enter</div>
  )}
</FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Fax</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={clientsDetails && clientsDetails.fax}
                name="fax"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Address 1 </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={clientsDetails && clientsDetails.address_flat}
                name="address_flat"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Address 2 </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={clientsDetails && clientsDetails.address_street}
                name="address_street"
              />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              {' '}
              <Label>Country</Label>
              <Input
                type="select"
                name="address_country"
                onChange={handleInputs}
                value={clientsDetails && clientsDetails.address_country}
              >
                <option defaultValue="selected" value="">
                  Please Select
                </option>
                {allCountries &&
                  allCountries.map((country) => (
                    <option key={country.country_code} value={country.country_code}>
                      {country.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <Label>Postal Code</Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={clientsDetails && clientsDetails.address_po_code}
                name="address_po_code"
              />
            </FormGroup>
          </Col>
          {/* <Col md="3">
            <FormGroup>
              <Label>Retention </Label>
              <Input
                type="text"
                onChange={handleInputs}
                value={clientsDetails && clientsDetails.retention}
                name="retention"
              />
            </FormGroup>
          </Col> */}
        </Row>
      </FormGroup>
    </Form>
  );
}
