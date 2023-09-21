import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const BookingDetails = () => {

  const [bookingDetails, setBookingDetails] = useState({
    company_id: '',
    // other fields...
  });
  const [bookingsDetails, setBookingsDetails] = useState({
    order_id:'',
  });
  const [selectedCompanyBookings, setSelectedCompanyBookings] = useState([]);
  const { loggedInuser } = useContext(AppContext);
  //Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState();
  // const [bookings, setBookings] = useState([]);

  const handleBookingInputs = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });

    // Fetch bookings for the selected company
    if (name === 'company_id' && value !== 'Select Customer') {
      api
        .get(`/invoice/getOrdersByCompanyId/${value}`)
        .then((res) => {
          console.log('invoice', res.data.data); // Log the booking data
          setSelectedCompanyBookings(res.data?.data || []);
        })
        .catch(() => {
          message('Bookings not found', 'info');
        });    
    } else {
      setSelectedCompanyBookings([]);
    }
  };
  const handleBookingDataInputs = (e) => {
    setBookingsDetails({ ...bookingsDetails, [e.target.name]: e.target.value });
  };

  //Api call for getting company dropdown
  const getCompany = () => {
    api
      .get('/invoice/getCompanyName')
      .then((res) => {
        setCompany(res.data.data);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
}
  //Api for insertCompany



  //Logic for adding Booking in db
  const insertInvoice = (code) => {
 
    if (!bookingDetails.company_id) {
      // Validate that company_id is not empty
      message('Please select a customer', 'warning');
      return;
    }
  
    if (!bookingsDetails.order_id) {
      // Validate that order_id is not empty
      message('Please select an order', 'warning');
      return;
    }
  
    // At this point, both company_id and order_id are selected
    const payload = {
      ...bookingDetails,
      order_id: bookingsDetails.order_id,
      invoice_code: code,
      };
      payload.creation_date = creationdatetime;
      payload.created_by = loggedInuser.first_name;
    api
      .post('/finance/insertInvoice', payload)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        const orderId = payload.order_id;
        console.log('insertedDataId', insertedDataId);
        console.log('orderId', orderId);
        navigate(`/InvoiceEdit/${insertedDataId}/${orderId}`);
        message('Invoice inserted successfully.', 'success');
      })
      .catch(() => {
        message('Network Connection Error', 'error');
      });
  };
  const generateCode = () => {
    api
      .post('/commonApi/getCodeValue', { type: 'invoice' })
      .then((res) => {
        insertInvoice(res.data.data);
      })
      .catch(() => {
        insertInvoice('');
      });
  };
  useEffect(() => {
    getCompany();
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="12">
          <ComponentCard title="Invoice Details">
            <Form>
              <FormGroup>
                <Row>
                <Col md="10">
            <Label>Customer Name</Label>
            <Input type="select" name="company_id" onChange={handleBookingInputs}>
              <option>Select Customer</option>
              {company &&
                company.map((e) => {
                  return (
                    <option key={e.company_id} value={e.company_id}>
                      {e.company_name}
                    </option>
                  );
                })}
            </Input>
          </Col>
          <br />
          <Col md="10">
            <Label>Orders</Label>
            <Input type="select" name="order_id" onChange={handleBookingDataInputs}>
              <option>Select Orders</option>
              {selectedCompanyBookings.map((e) => (
                <option key={e.order_id} value={e.order_id}>
                  {e.order_code}
                </option>
              ))}
            </Input>
          </Col>
              
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      color="primary"
                      onClick={() => {
                        generateCode();
                      }}
                      type="button"
                      className="btn mr-2 shadow-none"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate(-1);
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default BookingDetails;
