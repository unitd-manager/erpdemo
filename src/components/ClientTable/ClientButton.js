import React from 'react';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCardV2 from '../ComponentCardV2';
import CommonTranslationEdit from '../CommonTranslationEdit';

export default function ClientButton({clientsDetails,navigate,editClientsData, applyChanges, backToList , setFormSubmitted,arb,id,tablevalue,whereCondition}) {
  ClientButton.propTypes = {
    editClientsData: PropTypes.any,
    applyChanges: PropTypes.func,
    backToList: PropTypes.func,
    setFormSubmitted: PropTypes.any,
    clientsDetails: PropTypes.any,
    navigate: PropTypes.any,
    arb: PropTypes.any,
    id: PropTypes.any,
    tablevalue: PropTypes.any,
    whereCondition: PropTypes.any,
  
  };
  const handleSave = () => {
    console.log('Handling Save...');
  
    // Logging the clientsDetails object
    console.log('clientsDetails:', clientsDetails);
  
    // Validate company name
    const trimmedCompanyName = clientsDetails?.company_name?.trim();
    if (!trimmedCompanyName) {
      // If validation fails, show an error message or take appropriate action
      console.error('Company name cannot be empty. Current value:', trimmedCompanyName);
      // You can also show an error message to the user using a toast or other UI element
      return;
    }
  
    // If validation passes, proceed with setting formSubmitted to true
    setFormSubmitted(true);
    editClientsData();

  // Now navigate to the '/Client' route
  navigate('/Client');
  };
  return (
    <Form>
      <FormGroup>
        {/* Button */}
        <ComponentCardV2>
          <Row>
          <CommonTranslationEdit tablevalue = {tablevalue} id = {id} whereCondition = {whereCondition} ></CommonTranslationEdit>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  console.log('Clicked Save');
                  handleSave();
                  // console.log('formSubmitted:', formSubmitted);
                  setFormSubmitted(true);
                  // editClientsData();
                   // navigate('/Client')
                  }}
              >
             {arb ?'يحفظ':'Save'}  
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="primary"
                onClick={() => {
                  setFormSubmitted(true);
                  editClientsData();
                  applyChanges();
                }}
              >
                {arb ?'يتقدم':'Apply'}  
              </Button>
            </Col>
            <Col>
              <Button
                className="shadow-none"
                color="dark"
                onClick={() => {
                  backToList();
                }}
              >
                   {arb ?'الرجوع للقائمة':'Back to List'}  

              </Button>
            </Col>
          </Row>
        </ComponentCardV2>
      </FormGroup>
    </Form>
  );
}
