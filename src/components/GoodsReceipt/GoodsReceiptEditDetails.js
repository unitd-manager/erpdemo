import { Row, Col, Form, FormGroup,Input,Label} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import moment from 'moment';
import PropTypes from 'prop-types';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../ComponentCard';
import GoodsReceiptEditButton from './GoodsReceiptEditButton';



//GoodsReceiptEditDetails From Goods Receipt Edit
const GoodsReceiptEditDetails = ({ goodsreceipteditdetails, handleInputs, employee, editGoodsReceiptData, id}) => {
    GoodsReceiptEditDetails.propTypes = {
        goodsreceipteditdetails: PropTypes.bool,
        handleInputs: PropTypes.func,
        employee: PropTypes.any,
        editGoodsReceiptData: PropTypes.any,  
        id: PropTypes.bool     
  };
  
  
  // Navigation and Parameter Constants
  const navigate = useNavigate();

  return (
    <>
    <BreadCrumbs heading={goodsreceipteditdetails && goodsreceipteditdetails.title} />
    <Form>
        <FormGroup>
        <GoodsReceiptEditButton id={id} editGoodsReceiptData={editGoodsReceiptData} navigate={navigate} />
          {/* Content Details Form */}
          <ComponentCard title="Goods Receipt Details" creationModificationDate={goodsreceipteditdetails}>
            <ToastContainer></ToastContainer>
      <Row>
              <Col md="3">
                <FormGroup>
                  <Label> PO Code </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={goodsreceipteditdetails && goodsreceipteditdetails.po_code}
                    name="po_code"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Supplier Name </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={goodsreceipteditdetails && goodsreceipteditdetails.company_name}
                    name="company_name"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Goods Received Date <span className="required"> *</span> </Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    // value={goodsreceipteditdetails && goodsreceipteditdetails.goods_received_date}
                    value={
                      goodsreceipteditdetails && moment(goodsreceipteditdetails.goods_received_date).format('YYYY-MM-DD')
                    }
                    name="goods_received_date"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Received By</Label>
                  <Input
                    type="select"
                    onChange={handleInputs}
                    value={goodsreceipteditdetails && goodsreceipteditdetails.employee_id}
                    name="employee_id"
                  >
                    <option defaultValue="selected">Please Select</option>
                    {employee &&
                      employee.map((e) => {
                        return (
                          <option key={e.employee_id} value={e.employee_id}>
                            {e.first_name}
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
                  <Label> Total Amount </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={goodsreceipteditdetails && goodsreceipteditdetails.total_amount}
                    name="total_amount"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Status </Label>
                  <Input
                    value={goodsreceipteditdetails && goodsreceipteditdetails.status}
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
              </ComponentCard>
              </FormGroup>
              </Form>
    </>
  );
};

export default GoodsReceiptEditDetails;
