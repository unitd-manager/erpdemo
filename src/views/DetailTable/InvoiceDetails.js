import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Button, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const BookingDetails = () => {
  
    //all state variables
    const [invoicedetails, setInvoiceDetails] = useState({
      company_id: '',
      source_type: '',
      order_id:'',
      goods_delivery_id:'',
    });
    const [customerdropdown, setCustomerDropdown] = useState();
    const [orderdropdown, setOrderDropdown] = useState();
    const [goodsdeliverydropdown, setGoodsDeliveryDropdown] = useState();
    //navigation and params
    const navigate = useNavigate();
    
    //supplierData in supplier 
    const handleInputs = (e) => {
      setInvoiceDetails({ ...invoicedetails, [e.target.name]: e.target.value });
    };
     //get staff details
     const { loggedInuser } = useContext(AppContext);
    //  const { id } = useParams();
    //inserting supplier data
    const insertSalesInvoice = (code) => {
      if (invoicedetails.company_id !== '' &&
      invoicedetails.source_type !== ''
      )
      {
      invoicedetails.creation_date = creationdatetime;
      invoicedetails.created_by= loggedInuser.first_name;
      invoicedetails.invoice_code=code
        api.post('/invoice/insertInvoice', invoicedetails)
          .then((res) => {
            const insertedDataId = res.data.data.insertId;
            const orderId = invoicedetails.invoice_source_id;
            const goodsdeliveryId = invoicedetails.invoice_source_id;
            const InvoiceSource = invoicedetails.source_type;
            console.log('insertedDataId', insertedDataId);
            //         console.log('orderId', orderId);
            
            if (InvoiceSource === 'Sales_Order') {
              navigate(`/InvoiceEdit/${insertedDataId}/${orderId}?tab=1`);
            } else if (InvoiceSource === 'Goods_Delivery') {
              navigate(`/InvoiceEdit/${insertedDataId}/${goodsdeliveryId}?tab=2`);
            }
      })
          .catch(() => {
            message('Network connection error.', 'error');
          });
      }
      else {
        message('Please fill all required fields.', 'error');
      }
  };
  //Api call for getting customer dropdown
  const getCustomerDropdown = () => {
    api
      .get('/invoice/getCustomerDropdown')
      .then((res) => {
        setCustomerDropdown(res.data.data);
      })
      .catch(() => {
        message('Company not found', 'info');
      });
}

//Api call for getting sales order dropdown
const getSalesOrderDropdown = () => {
  api
    .get('/invoice/getSalesOrderDropdown')
    .then((res) => {
      setOrderDropdown(res.data.data);
    })
    .catch(() => {
      message('Sales Order Data not found', 'info');
    });
}

//Api call for getting customer dropdown
const getGoodsDeliveryDropdown = () => {
  api
    .get('/invoice/getGoodsDeliveryDropdown')
    .then((res) => {
      setGoodsDeliveryDropdown(res.data.data);
    })
    .catch(() => {
      message('Goods Delivery Data not found', 'info');
    });
}
        const generateCode = () => {
              api
                .post('/commonApi/getCodeValue', { type: 'invoice' })
                .then((res) => {
                  insertSalesInvoice(res.data.data);
                })
                .catch(() => {
                  insertSalesInvoice('');
                });
            };
     useEffect(() => {
      getCustomerDropdown();
      getSalesOrderDropdown();
      getGoodsDeliveryDropdown();
       },[] );
      return (
      <div>
         <BreadCrumbs />
        <ToastContainer />
        <Row>
      <Col md="6" xs="12">
          <ComponentCard title="Invoice Details">
            <Form>
              <FormGroup>
                <Row>
                <Col md="12">
            <Label>Customer Name</Label>
            <Input 
            type="select" 
            name="company_id" 
            onChange={handleInputs}>
              <option>Select Customer</option>
              {customerdropdown &&
                customerdropdown.map((e) => {
                  return (
                    <option key={e.company_id} value={e.company_id}>
                      {e.company_name}
                    </option>
                  );
                })}
            </Input>
          </Col>
          </Row>
          <br />
                <Row>
                <Col md="12">
              <FormGroup>
                <Label>Invoice Source</Label>
                <br></br>
                
                <Input
                  name="source_type"
                  value="Sales_Order"
                  type="radio"
                  defaultChecked={invoicedetails && invoicedetails.source_type === 'Sales Order' && true}
                  onChange={handleInputs}
                />
                <Label>Sales Order</Label>
                <Input
                  name="source_type"
                  value="Goods_Delivery"
                  type="radio"
                  defaultChecked={invoicedetails && invoicedetails.source_type === 'Goods Delivery' && true}
                  onChange={handleInputs}
                />
                <Label>Goods Delivery</Label>
              </FormGroup>
              </Col>
              {
invoicedetails && (
  invoicedetails.source_type === 'Sales_Order' )&&
  (
  <>

  <Col md="12">
    <FormGroup>
      <Label>Sales Order</Label>
      <Input 
            type="select" 
            name="invoice_source_id" 
            onChange={handleInputs}>
              <option>Select Order</option>
              {orderdropdown &&
                orderdropdown.map((e) => {
                  return (
                    <option key={e.order_id} value={e.order_id}>
                      {e.order_code}
                    </option>
                  );
                })}
            </Input>
            </FormGroup>
            </Col>
  </>
)}

{invoicedetails && invoicedetails.source_type === 'Goods_Delivery' && (
  <>
    <Col md="12">
      <FormGroup>
        <Label>Goods Delivery</Label>
        <Input 
          type="select" 
          name="invoice_source_id" 
          onChange={handleInputs}
        >
          <option>Select Goods Delivery</option>
          {goodsdeliverydropdown &&
            goodsdeliverydropdown.map((e) => {
              return (
                <option key={e.goods_delivery_id} value={e.goods_delivery_id}>
                  {e.goods_delivery_code}
                </option>
              );
            })}
        </Input>
      </FormGroup>
    </Col>
  </>
)}
        </Row>
           </FormGroup>
                <FormGroup>
                    <Row>
                      <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                       <Button color="primary"
                onClick={() => {
                  generateCode();
                }}
                type="button"
                className="btn mr-2 shadow-none"  >
                Save & Continue
              </Button>
              <Button
                onClick={() => {
                  navigate('/SalesInvoice')
                }}
                type="button"
                className="btn btn-dark shadow-none" >
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

  
//   const [invoicedetails, setInvoiceDetails] = useState({
//     company_id: '',
//     source_type:'',
//     // other fields...
//   });
//   // const [bookingsDetails, setBookingsDetails] = useState({
//   //   order_id:'',
//   // });
//   // const [selectedCompanyBookings, setSelectedCompanyBookings] = useState([]);
//   const { loggedInuser } = useContext(AppContext);
//   //Navigation and Parameter Constants
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [company, setCompany] = useState();
//   // const [bookings, setBookings] = useState([]);

//   const handleBookingInputs = (e) => {
//     const { name, value } = e.target;
//     setInvoiceDetails({ ...invoicedetails, [name]: value });

//     // Fetch bookings for the selected company
//   //   if (name === 'company_id' && value !== 'Select Customer') {
//   //     api
//   //       .get(`/invoice/getOrdersByCompanyId/${value}`)
//   //       .then((res) => {
//   //         console.log('invoice', res.data.data); // Log the booking data
//   //         setSelectedCompanyBookings(res.data?.data || []);
//   //       })
//   //       .catch(() => {
//   //         message('Bookings not found', 'info');
//   //       });    
//   //   } else {
//   //     setSelectedCompanyBookings([]);
//   //   }
//    };
//   // const handleBookingDataInputs = (e) => {
//   //   setBookingsDetails({ ...bookingsDetails, [e.target.name]: e.target.value });
//   // };

//   //Api call for getting company dropdown
//   const getCompany = () => {
//     api
//       .get('/invoice/getCompanyName')
//       .then((res) => {
//         setCompany(res.data.data);
//       })
//       .catch(() => {
//         message('Company not found', 'info');
//       });
// }
//   //Api for insertCompany



//   //Logic for adding Booking in db
//   const insertInvoice = (code) => {
 
//     if (!invoicedetails.company_id) {
//       // Validate that company_id is not empty
//       message('Please select a customer', 'warning');
//       return;
//     }
  
//     if (!bookingsDetails.source_type) {
//       // Validate that order_id is not empty
//       message('Please select an Invoice Source', 'warning');
//       return;
//     }
  
//     // At this point, both company_id and order_id are selected
//     const payload = {
//       ...invoicedetails,
//       order_id: bookingsDetails.order_id,
//       invoice_code: code,
//       };
//       payload.creation_date = creationdatetime;
//       payload.created_by = loggedInuser.first_name;
//     api
//       .post('/finance/insertInvoice', payload)
//       .then((res) => {
//         const insertedDataId = res.data.data.insertId;
//         const orderId = payload.order_id;
//         console.log('insertedDataId', insertedDataId);
//         console.log('orderId', orderId);
//         navigate(`/InvoiceEdit/${insertedDataId}/${orderId}?tab=1`);
//         message('Invoice inserted successfully.', 'success');
//       })
//       .catch(() => {
//         message('Network Connection Error', 'error');
//       });
//   };
//   const generateCode = () => {
//     api
//       .post('/commonApi/getCodeValue', { type: 'invoice' })
//       .then((res) => {
//         insertInvoice(res.data.data);
//       })
//       .catch(() => {
//         insertInvoice('');
//       });
//   };
//   useEffect(() => {
//     getCompany();
//   }, [id]);

//   return (
//     <div>
//       <BreadCrumbs />
//       <ToastContainer></ToastContainer>
//       <Row>
//       <Col md="6" xs="12">
//           <ComponentCard title="Invoice Details">
//             <Form>
//               <FormGroup>
//                 <Row>
//                 <Col md="12">
//             <Label>Customer Name</Label>
//             <Input 
//             type="select" 
//             name="company_id" 
//             onChange={handleBookingInputs}>
//               <option>Select Customer</option>
//               {company &&
//                 company.map((e) => {
//                   return (
//                     <option key={e.company_id} value={e.company_id}>
//                       {e.company_name}
//                     </option>
//                   );
//                 })}
//             </Input>
//           </Col>
//           </Row>
//           <br />
//           {/* <Col md="10">
//             <Label>Orders</Label>
//             <Input type="select" name="order_id" onChange={handleBookingDataInputs}>
//               <option>Select Orders</option>
//               {selectedCompanyBookings.map((e) => (
//                 <option key={e.order_id} value={e.order_id}>
//                   {e.order_code}
//                 </option>
//               ))}
//             </Input>
//           </Col> */}
//                 <Row>
//                 <Col md="12">
//               <FormGroup>
//                 <Label>Invoice Source</Label>
//                 <br></br>
                
//                 <Input
//                   name="source_type"
//                   value="1"
//                   type="radio"
//                   defaultChecked={invoicedetails && invoicedetails.published === 1 && true}
//                   onChange={handleBookingInputs}
//                 />
//                 <Label>Sales Order</Label>
//                 <Input
//                   name="published"
//                   value="0"
//                   type="radio"
//                   defaultChecked={invoicedetails && invoicedetails.published === 0 && true}
//                   onChange={handleBookingInputs}
//                 />
//                 <Label>Goods Delivery</Label>
//               </FormGroup>
//               </Col>
//                 </Row>
//               </FormGroup>
//               <FormGroup>
//                 <Row>
//                   <div className="pt-3 mt-3 d-flex align-items-center gap-2">
//                     <Button
//                       color="primary"
//                       onClick={() => {
//                         generateCode();
//                       }}
//                       type="button"
//                       className="btn mr-2 shadow-none"
//                     >
//                       Save & Continue
//                     </Button>
//                     <Button
//                       onClick={() => {
//                         navigate(-1);
//                       }}
//                       type="button"
//                       className="btn btn-dark shadow-none"
//                     >
//                       Go to List
//                     </Button>
//                   </div>
//                 </Row>
//               </FormGroup>
//             </Form>
//           </ComponentCard>
//         </Col>
//       </Row>
//     </div>
//   );
};
export default BookingDetails;
