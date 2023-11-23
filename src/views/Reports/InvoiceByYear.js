// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'datatables.net-dt/js/dataTables.dataTables';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';
// import 'datatables.net-buttons/js/buttons.colVis';
// import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
// import { ToastContainer } from 'react-toastify';
// import { Button, Card, CardBody, Col,CardHeader, FormGroup, Input, Label, Row, Table } from 'reactstrap';
// import ReactPaginate from 'react-paginate';
// import api from '../../constants/api';
// import message from '../../components/Message';
// import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
// import ExportReport from '../../components/Report/ExportReport';

// const InvoiceBYYear = () => {
//   //All state variable
//  // const [invoiceReport, setInvoiceReport] = useState(null);
//   const [userSearchData, setUserSearchData] = useState('');
//   const [companyName, setCompanyName] = useState('project');
//   const exportValue="InvoiceByYearReport"

//   const thisYear=new Date().getFullYear();

//   console.log('thisyear',thisYear)
//   //Get data from Training table
 
//   const getTendersById = () => {
//     api
//       .post('/tender/getTendersById', { opportunity_id: id })
//       .then((res) => {
//         const tenderData = res.data.data;
//         setTenderForms({
//           title: tenderData.title || '',
//           company_id: tenderData.company_id || '',
//           category: tenderData.category || '',
//         });
  
//         // Now fetch the yearly invoice amount for the selected category
//         api
//           .get(`/reports/getInvoiceByYearReport?recordType=${tenderData.category}`)
//           .then((invoiceRes) => {
//             // Assuming your API response has a structure like { data: [{ invoice_year, invoice_amount_yearly }] }
//             const yearlyInvoiceAmount = invoiceRes.data.data;
//             console.log('Yearly Invoice Amount:', yearlyInvoiceAmount);
//             // Now you can handle the yearly invoice amount data as needed
//           })
//           .catch(() => {
//             message('Failed to fetch yearly invoice amount for the selected category', 'error');
//           });
//       })
//       .catch(() => {
//         message('Failed to fetch tender details', 'error');
//       });
//   };
//   useEffect(() => {
//     getTendersById();
//   }, []);
//   const [page, setPage] = useState(0);

//   const employeesPerPage = 20;
//   const numberOfEmployeesVistited = page * employeesPerPage;
//   const displayEmployees = userSearchData.slice(
//     numberOfEmployeesVistited,
//     numberOfEmployeesVistited + employeesPerPage,
//   );
//   console.log("displayEmployees",displayEmployees)
//   const totalPages = Math.ceil(userSearchData.length / employeesPerPage);
//   const changePage = ({ selected }) => {
//     setPage(selected);
//   };
//   //structure of Training list view
//   const columns = [
//     {
//       name: 'SN',
//       selector:'s_no'
//     },
//     {
//       name: 'Year',
//       selector:'invoice_year'
//     },
//     {
//       name: 'Amount',
//       selector:'invoice_amount_yearly'
//     },
//     // {
//     //   name: 'Category',
//     //   selector: 'record_type',
//     // },   
//      ];
//   return (
//     <>
//         <BreadCrumbs />
//         <ToastContainer></ToastContainer>
//         <Card>
//           <CardBody>
//             <Row>
//               <Col>
//                 {/* <ExportReport columns={columns} data={userSearchData}/> */}
//               </Col>
//               <Col> 
//               <FormGroup>
//                 <Label>Select Category</Label>
//                 <Input
//                   type="select"
//                   name="record_type"
//                   onChange={(e) => setCompanyName(e.target.value)}
//                 > 
//                 <option defaultValue="selected" value="project">
//                 Project
//                   </option>
//                   <option value="tenancy project">Tenancy Project</option>
//                   <option value="tenancy work">Tenancy Work</option>
//                   <option value="maintenance">Maintenance</option>
//                   <option value="crm">Crm</option>

//                 </Input>
//               </FormGroup>
//             </Col>
//              <Col md="1" className='mt-3'>
//               <Button color="primary" className="shadow-none" onClick={() => handleSearch()}>Go</Button>
//             </Col>
//             </Row>
//           </CardBody>
//         </Card>

//         <Card>
//         <CardHeader className="card p-2 text-center">
//         <b>Summary</b>
//       </CardHeader>
//         <CardBody>
//           <Row>
//             <Col md="3">
//               <Label>
//                 <b>Category:</b> {companyName}
//               </Label>
//             </Col>
//            </Row>
//         </CardBody>
//       </Card>


//      <Card>
//         <CardBody>
//           <Row>
//             <Col>
//               <ExportReport columns={columns} data={userSearchData} exportValue={exportValue} />
//             </Col>
//           </Row>
//         </CardBody>
      
//         <CardBody>
//           <Table>
  
//           <thead>
//             <tr>
//               {columns.map((cell) => {
//                 return <td key={cell.name}>{cell.name}</td>;
//               })}
//             </tr>
//           </thead>
//           <tbody>
//           {displayEmployees &&
//               displayEmployees.map((element,index) => {
//                 return (
//                   <tr key={element.invoice_id}>
//                     <td>{index+1}</td>
//                     <td>{element.invoice_year}</td>
//                     <td>{element.invoice_amount_yearly}</td>
//                     {/* <td>{element.record_type}</td> */}
//                   </tr>
//                 );
//               })} 
//           </tbody>
//         </Table>
//         <ReactPaginate
//             previousLabel="Previous"
//             nextLabel="Next"
//             pageCount={totalPages}
//             onPageChange={changePage}
//             containerClassName="navigationButtons"
//             previousLinkClassName="previousButton"
//             nextLinkClassName="nextButton"
//             disabledClassName="navigationDisabled"
//             activeClassName="navigationActive"
//           />
//                 </CardBody>
//       </Card>
//     </>
//   );
// };
// export default InvoiceBYYear;
