import { Row, Col, Form, FormGroup,Input,Label} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import PropTypes from 'prop-types';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../ComponentCard';
import PurchaseInvoiceEditButton from './PurchaseInvoiceEditButton';

//purchaseinvoiceeditdetails From PO Product Edit
const PurchaseInvoiceEditDetails = ({ purchaseinvoiceeditdetails, handleInputs, editPurchaseInvoiceData, id, arb, arabic}) => {
    PurchaseInvoiceEditDetails.propTypes = {
        purchaseinvoiceeditdetails: PropTypes.bool,
        handleInputs: PropTypes.func,
        editPurchaseInvoiceData: PropTypes.any,  
        id: PropTypes.bool,
        arabic: PropTypes.any,
        arb: PropTypes.any,
  };
  
  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }
  // Navigation and Parameter Constants
  const navigate = useNavigate();

  return (
    <> 
     <BreadCrumbs/>
      <Form>
        <FormGroup>
          <PurchaseInvoiceEditButton id={id}  editPurchaseInvoiceData={editPurchaseInvoiceData} navigate={navigate} />
          {/* Content Details Form */}
          <ComponentCard title="Purchase Invoice Details" creationModificationDate={purchaseinvoiceeditdetails}>
            <ToastContainer></ToastContainer>
             <Row>
              <Col md="3">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdProjectQuote.Purchase Invoice Code')?.[genLabel]}
              </Label>
                 
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaseinvoiceeditdetails && purchaseinvoiceeditdetails. purchase_invoice_code }
                    name=" purchase_invoice_code "
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>   Project Name </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.title}
                    name="title"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>   Supplier Name </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.company_name}
                    name="company_name"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Invoice Date <span className="required"> *</span> </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      purchaseinvoiceeditdetails && moment(purchaseinvoiceeditdetails.purchase_invoice_date).format('YYYY-MM-DD')
                    }
                    name="purchase_invoice_date"
                  />
                </FormGroup>
              </Col> 
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Due Date </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={
                      purchaseinvoiceeditdetails && moment(purchaseinvoiceeditdetails.due_date).format('YYYY-MM-DD')
                    }
                    name="due_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Total Amount </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.invoice_amount}
                    name="invoice_amount"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Mode of Payment </Label>
                  <Input
                    value={purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.mode_of_payment}
                    type="select"
                    onChange={handleInputs}
                    name="mode_of_payment"
                  >
                    <option value="">Please Select</option>
                    <option value="Pending">Cheque</option>
                    <option value="Approved">Cash</option>
                    <option value="Rejected">Online Transaction</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Status </Label>
                  <Input
                    value={purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.status}
                    type="select"
                    onChange={handleInputs}
                    name="status"
                  >
                    <option value="">Please Select</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </Input>
                </FormGroup>
              </Col>            
              </Row>
              <Col md="3">
                <FormGroup>
                  <Label> Terms and Condition </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={purchaseinvoiceeditdetails && purchaseinvoiceeditdetails.terms_and_condition}
                    name="terms_and_condition"
                  />
                </FormGroup>
              </Col>
              </ComponentCard>
              </FormGroup>
              </Form>
  </>
  );
};

export default PurchaseInvoiceEditDetails;
