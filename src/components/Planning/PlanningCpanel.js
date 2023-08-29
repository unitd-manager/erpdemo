import React, { useState } from 'react';
import {
  Row,
  Form,
  ModalFooter,
  Modal,
  ModalHeader,
  ModalBody,
  Table,
  Label,
  Input,
  Col,
  FormGroup,
  Button,
  CardBody,
} from 'reactstrap';
import PropTypes from 'prop-types';
 import * as XLSX from 'xlsx';
import axios from 'axios'
import { Link } from 'react-router-dom';
import moment from 'moment';
import * as Icon from 'react-feather';

axios.defaults.baseURL = 'http://43.228.126.245:5001';

export default function PlanningCpanel({
  setPlanData,
  setPlanEditModal,
  // deleteRecord,
  planningDetails,
  addContactToggle,
  addContactModal,
  handleAddNewPlanning,
  newPlanningData,
  AddNewPlanning,
  CalculateBillofmaterials,
}) {
  PlanningCpanel.propTypes = {
    setPlanData: PropTypes.func,
    setPlanEditModal: PropTypes.func,
    // deleteRecord: PropTypes.func,
    planningDetails: PropTypes.any,
    addContactToggle: PropTypes.func,
    addContactModal: PropTypes.bool,
    handleAddNewPlanning: PropTypes.func,
    newPlanningData: PropTypes.object,
    AddNewPlanning: PropTypes.func,
    CalculateBillofmaterials: PropTypes.func,
  };

console.log('planningDetails',planningDetails)

//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setSelectedFile(file);
//   };
// console.log('excel',selectedFile)
//   const handleFileUpload = () => {
//     if (!selectedFile) {
//       console.log('No file selected.');
//       return;
//     }

//     const reader = new FileReader();

// reader.onload = (e) => {
//   const data = new Uint8Array(e.target.result);
//   const workbook = XLSX.read(data, { type: 'array' });

//   // Assuming there is only one sheet in the Excel file
//   const sheetName = workbook.SheetNames[0];
//   const sheet = workbook.Sheets[sheetName];

//   // Parse the sheet into JSON format
//   const jsonData = XLSX.utils.sheet_to_json(sheet);
//   console.log('Excel Data:', jsonData);

//   // Send jsonData to the server for database insertion
// };

// reader.readAsArrayBuffer(selectedFile);
//     const formData = new FormData();
//     formData.append('file', selectedFile);

//   // Send formData to the server for processing
// fetch('http://43.228.126.245:5001/planning/upload-excel', {
//   method: 'POST',
//   body: formData,
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data.message);
//     // Handle success or error messages
//   })
//   .catch((error) => {
//     console.error(error);
//     // Handle error
//   });
//   };



  const [selectedFile, setSelectedFile] = useState({
    project_planning_id:'',
    planning_cpanel_id:'',
    item_number: '', 
          product_name:'',
          bom_unit:'',
          qty:''
  });
  
  const handleFileChange = (e) => {
   
    const file = e.target.files[0];
    if (!file) return; // No file selected
  
    const reader = new FileReader();
  
    reader.onload = () => {
      const data = new Uint8Array(reader.result);
      const workbook = XLSX.read(data, { type: 'array' });
  
      // Assuming there is only one sheet in the Excel file
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
  
      // Convert the sheet data to an array of objects
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
      // Assuming the first row contains headers, skip it
      const headers = jsonData[0];
      const rows = jsonData.slice(1);
  
      // Map each row to an object using headers
      const mappedData = rows.map((row) => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = row[index];
        });
        return obj;
      });
  
      setSelectedFile(mappedData);
    };
  
    reader.readAsArrayBuffer(file);
  };
  
  console.log('exel',selectedFile)
  const handleFileUpload = async (cPanId,plaid) => {
    console.log('cPanId',cPanId)
    console.log('plaid',plaid)
    try {
      if (!selectedFile || selectedFile.length === 0) {
        // Handle no file selected
        console.error('No file selected.');
        return;
      }
  
      const formData = new FormData();

    // Convert the selectedFile to JSON string
    const jsonData = JSON.stringify(selectedFile);
const arr=JSON.parse(jsonData);

    // Append the JSON data to the FormData object
    formData.append('json', jsonData);

    console.log('eeee',formData)
    console.log('arr',arr)
    arr.forEach(async(element) => { 
      element.project_planning_id = plaid
      element.planning_cpanel_id = cPanId
      console.log('elem',element)

      const response = await axios.post('http://43.228.126.245:5001/planning/insertPlanningBom', element, {
        headers: {
          item_number: 1, 
          product_name:2,
          bom_unit:3,
          qty:4// Set the content type to 'multipart/form-data'
        },
      });
  
      if (response.status === 200) {
        console.log('File uploaded and data inserted successfully.');
        // You may want to add code to handle success here
      } else {
        console.error('File upload and data insertion failed.');
        // You may want to add code to handle failure here
      }
    });
     
    } catch (error) {
      console.error('Error uploading file and inserting data:', error);
      // You may want to add code to handle the error here
    }
  };
  
  
  

  // const [excelData, setExcelData] = useState(null);

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return; // No file selected

  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     const data = new Uint8Array(e.target.result);
  //     const workbook = XLSX.read(data, { type: 'array' });

  //     // Assuming there is only one sheet in the Excel file
  //     const sheetName = workbook.SheetNames[0];
  //     const sheet = workbook.Sheets[sheetName];

  //     // Parse the sheet into JSON format
  //     const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  //     console.log('Excel',jsonData)
  //     setExcelData(jsonData);
  //   };

  //   reader.readAsArrayBuffer(file);
  // };

  //  Table Contact
  const columns = [
    {
      name: 'id',
      selector: 'planning_cpanel_id',
      grow: 0,
      wrap: true,
      width: '4%',
    },
    {
      name: 'Edit',
      selector: 'edit',
      cell: () => <Icon.Edit2 />,
      grow: 0,
      width: 'auto',
      button: true,
      sortable: false,
    },
    // {
    //   name: 'Del',
    //   selector: 'delete',
    //   cell: () => <Icon.Trash />,
    //   grow: 0,
    //   width: 'auto',
    //   wrap: true,
    // },
    {
      name: 'FG Code',
      selector: 'fg_code',
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: ' Cpanel Name',
      selector: 'cpanel_name',
      sortable: true,
      grow: 0,
    },
    {
      name: 'Ordered Qty',
      selector: 'ordered_qty',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Start Date',
      selector: 'start_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'End date',
      selector: 'end_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: 'Due Date',
      selector: 'due_date',
      sortable: true,
      width: 'auto',
      grow: 3,
    },
    {
      name: '',
    },
    {
      name: 'Action',
    },
    {
      name: '',
    },
  ];
  return (
    <Form>
      <Row>
        <Col md="3">
          <FormGroup>
            <Button color="primary" className="shadow-none" onClick={addContactToggle.bind(null)}>
              Add New Cpanel{' '}
            </Button>
            <Modal size="lg" isOpen={addContactModal} toggle={addContactToggle.bind(null)}>
              <ModalHeader toggle={addContactToggle.bind(null)}>New Cpanel </ModalHeader>
              <ModalBody>
                <Row>
                  <Col md="12">
                    <CardBody>
                      <Form>
                        <Row>
                          <Col md="4">
                            <FormGroup>
                              <Label>FG Code</Label>
                              <Input
                                type="text"
                                name="fg_code"
                                onChange={handleAddNewPlanning}
                                value={newPlanningData && newPlanningData.fg_code}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Cpanel Name</Label>
                              <Input
                                type="text"
                                name="cpanel_name"
                                onChange={handleAddNewPlanning}
                                value={newPlanningData && newPlanningData.cpanel_name}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Ordered Qty</Label>
                              <Input
                                type="text"
                                name="ordered_qty"
                                onChange={handleAddNewPlanning}
                                value={newPlanningData && newPlanningData.ordered_qty}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col md="4">
                            <FormGroup>
                              <Label>Start Date</Label>
                              <Input
                                type="date"
                                name="start_date"
                                onChange={handleAddNewPlanning}
                                value={newPlanningData && newPlanningData.start_date}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>End Date</Label>
                              <Input
                                type="date"
                                name="end_date"
                                onChange={handleAddNewPlanning}
                                value={newPlanningData && newPlanningData.end_date}
                              />
                            </FormGroup>
                          </Col>
                          <Col md="4">
                            <FormGroup>
                              <Label>Due Date</Label>
                              <Input
                                type="date"
                                name="due_date"
                                onChange={handleAddNewPlanning}
                                value={newPlanningData && newPlanningData.due_date}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </Form>
                    </CardBody>
                  </Col>
                </Row>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="shadow-none"
                  color="primary"
                  onClick={() => {
                    AddNewPlanning();
                    //addContactModal(false);
                  }}
                >
                  Submit
                </Button>
                <Button
                  color="secondary"
                  className="shadow-none"
                  onClick={addContactToggle.bind(null)}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Table id="example" className="display border border-secondary rounded">
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {planningDetails &&
              planningDetails.map((element, i) => {
                return (
                  <tr key={element.planning_cpanel_id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="anchor">
                        <span
                          onClick={() => {
                            setPlanData(element);
                            setPlanEditModal(true);
                          }}
                        >
                          <Icon.Edit2 />
                        </span>
                      </div>
                    </td>
                    {/* <td>
                      <div color="primary" className='anchor'>
                        <span onClick={() => deleteRecord(element.contact_id)}>
                          <Icon.Trash2 />
                        </span>
                      </div>
                    </td>  */}
                    <td>{element.fg_code}</td>
                    <td>{element.cpanel_name}</td>
                    <td>{element.ordered_qty}</td>
                    <td>
                      {element.start_date ? moment(element.start_date).format('DD-MM-YYYY') : ''}
                    </td>
                    <td>{element.end_date ? moment(element.end_date).format('DD-MM-YYYY') : ''}</td>
                    <td>{element.due_date ? moment(element.due_date).format('DD-MM-YYYY') : ''}</td>
                    <td>
                      <Input
                        type="file"
                        name="file"
                        accept=".xlsx, .xls" // Specify allowed file types
                        onChange={handleFileChange}
                      />

                      {/* Button to trigger file upload */}
                      <Button color="primary" className="shadow-none" onClick={()=>handleFileUpload(element.planning_cpanel_id,element.project_planning_id)}>
                        Import
                      </Button>
                      {/* <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      {excelData && (
        <div>
          <h2>Imported Data:</h2>
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </div> */}
                      <Link to={`/BillOfMaterials/${element.planning_cpanel_id}`}>
                        <u>Imported Item</u>
                      </Link>
                      <br></br>
                      <Link to={`/BillOfMaterialsShortage/${element.planning_cpanel_id}`}>
                        <u>Shortage List</u>
                      </Link>
                    </td>
                    <td>
                      <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                          CalculateBillofmaterials(element.planning_cpanel_id);
                        }}
                      >
                        Generate Shortage List
                      </Button>
                    </td>
                    <td></td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Row>
    </Form>
  );
}
