import React, { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Input, Button, Row, Col,FormGroup } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.print';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import * as XLSX from 'xlsx';
import axios from 'axios'
import api from '../../constants/api';
import message from '../../components/Message';
import { columns } from '../../data/Tender/InventoryData';
import ViewAdjustStockHistoryModal from '../../components/Inventory/ViewAdjustStockHistoryModal';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';


axios.defaults.baseURL = 'http://43.228.126.245:5001';

function Inventory() {
  //statevariables
  const [stockinputOpen, setStockinputOpen] = useState(false);
  const [inventories, setInventories] = useState([]);
  const [modalId, setModalId] = useState(null);
  const [adjustStockHistoryModal, setAdjustStockHistoryModal] = useState(false);
  const [stockChangeId, setStockChangeId] = useState();
  const [inventoryStock, setInventoryStock] = useState({
    inventory_id: null,
    stock: null,
  });
  const [loading, setLoading] = useState(false);

  const [adjuststockDetails, setAdjuststockDetails] = useState({
    inventory_id: null,
    product_id: null,
    adjust_stock: 0,
    modified_by: '',
    created_by: '',
    current_stock: null,
  });
  //navigate
  const navigate = useNavigate();
  // Get All inventories
  const getAllinventories = () => {
    setLoading(false);
    api
      .get('/inventory/getinventoryMain')
      .then((res) => {
        setLoading(false);
        setInventories(res.data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  //handle change
  const handleStockinput = (e, element) => {
    setInventoryStock({
      inventory_id: element.inventory_id,
      stock: e.target.value,
    });
  
    const adjustedStockValue = parseFloat(e.target.value);
    const currentStockValue = parseFloat(element.stock) || 0; // If element.stock is null, set it to 0
  
    const adjustStock = adjustedStockValue - currentStockValue;
  
    setAdjuststockDetails({
      inventory_id: element.inventory_id,
      product_id: element.productId,
      adjust_stock: adjustStock,
      modified_by: '',
      created_by: '',
      current_stock: currentStockValue,
    });
  };
  
  //adjust stock
  const adjuststock = () => {
    api
      .post('/inventory/insertadjust_stock_log', adjuststockDetails)
      .then(() => {
        message('Stock updated successfully', 'success');
        getAllinventories();
        navigate('/inventory');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };
  //update stock
  const updateStockinInventory = () => {
    api
      .post('/inventory/updateInventoryStock', inventoryStock)
      .then(() => {
        message('Stock updated successfully', 'success');
        getAllinventories();
        navigate('/inventory');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const [selectedFile, setSelectedFile] = useState({
    title: '', 
    item_code:'',
    product_type:'',
    qty_in_stock:'',
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
  const handleFileUpload = async () => {
    try {
      if (!selectedFile || selectedFile.length === 0) {
        // Handle no file selected
        console.error('No file selected.');
        return;
      }
  
      const formData = new FormData();
  
      // Convert the selectedFile to JSON string
      const jsonData = JSON.stringify(selectedFile);
      const arr = JSON.parse(jsonData);
  
      // Append the JSON data to the FormData object
      formData.append('json', jsonData);
  
      console.log('formData', formData);
      console.log('arr', arr);
  
      arr.forEach(async (element) => {
        console.log('element', element);
  
        // Extract the actual_stock value from the element
        const actualStock = element.actual_stock;
        const searchName = element.search_name;
  
       console.log('actualStock',actualStock)
       console.log('searchName',searchName)
        // Create the product first
        const productCodeRes = await api.post('/product/getCodeValue', {
          type: 'ProductCode',
        });
         const productCode = productCodeRes.data.data
        console.log('productCode',productCode)
        const productResponse = await api.post('/product/insertProduct', {
          ...element,
          product_code: productCode,
        });
        const insertedProductId = productResponse.data.data.insertId;
       
  
        // Get the Inventory Code
        const inventoryCodeResponse = await api.post('/product/getCodeValue', {
          type: 'InventoryCode',
        });
        const inventoryCode = inventoryCodeResponse.data.data;
  
        // Create the inventory record including the actual_stock
        await api.post('/inventory/insertinventory', {
          product_id: insertedProductId,
          inventory_code: inventoryCode,
          actual_stock: element.actual_stock,
          search_name: element.search_name
        });
  
       
      });
  
      // Reload the inventories list or perform any other necessary actions
      getAllinventories();
    } catch (error) {
      message('Error uploading file and inserting data:', error);
      // You may want to add code to handle the error here
    }
  };
  
  const generateCode = () => {
    api
      .post('/product/getCodeValue', { type: 'ProductCode' })
      .then((res) => {
        const ProductCode = res.data.data
      api
      .post('/product/getCodeValue', { type: 'ItemCode' })
      .then((response) => {
        const ItemCode = response.data.data
        handleFileUpload(ProductCode, ItemCode);
      })
      })
      .catch(() => {
        handleFileUpload('');
      });
  };
  useEffect(() => {
    setTimeout(() => {
      $('#example').DataTable({
        pagingType: 'full_numbers',
        pageLength: 20,
        processing: true,
        dom: 'Bfrtip',
        buttons: [
          {
            extend: 'print',
            text: 'Print',
            className: 'shadow-none btn btn-primary',
          },
        ],
        searching: true,
      });
    }, 1000);
  }, []);
  useEffect(() => {
    getAllinventories();
  }, []);

  return (
    <div className="MainDiv">
      <ToastContainer></ToastContainer>
      <div className=" pt-xs-25">
        <BreadCrumbs />

        <CommonTable
          loading={loading}
          title="Inventory List"
          Button={
            <>
              <Row>
              <Col md="12">
                <FormGroup>
              <Input
                        type="file"
                        name="file"
                        accept=".xlsx, .xls" // Specify allowed file types
                        onChange={handleFileChange}
                      />
                      </FormGroup>
                      </Col>
                <Col md="3">
                <FormGroup>
                  <Link to="">
                    <Button color="primary" className="shadow-none mr-2"
                    onClick={() => {
                      generateCode();
                    }}>
                      Import
                    </Button>
                  </Link>
                  </FormGroup>
                </Col>
                <Col md="6">
                <FormGroup>
                  <a
                    href="http://43.228.126.245/smartco-api/storage/excelsheets/Inventory.xlsx"
                    download
                  >
                    <Button color="primary" className="shadow-none">
                      Sample
                    </Button>
                  </a>
                  </FormGroup>
                </Col>
              </Row>
            </>
          }
        >
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.id}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {inventories &&
              inventories.map((element,index) => {
                return (
                  <tr key={element.inventory_id}>
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/inventoryEdit/${element.inventory_id}`}>
                        <Icon.Edit2 />
                      </Link>
                    </td>
                    <td>{element.inventory_code}</td>
                    <td>{element.product_name}</td>
                    <td>{element.product_type}</td>
                    <td>{element.item_code}</td>
                    <td>{element.unit}</td>
                    <td>{element.stock}</td>
                    {stockinputOpen && stockChangeId === element.inventory_id ? (
                      <td>
                        {' '}
                        <Input
                          type="text"
                          defaultValue={element.stock}
                          onChange={(e) => handleStockinput(e, element)}
                        />
                        <Button
                          color="primary"
                          className="shadow-none"
                          onClick={() => {
                            adjuststock(element);
                            updateStockinInventory();
                            setStockinputOpen(false);
                          }}
                        >
                          save
                        </Button>
                      </td>
                    ) : (
                      <td>
                        <span
                          onClick={() => {
                            setStockChangeId(element.inventory_id);
                            setStockinputOpen(true);
                          }}
                        >
                          <Link to="">Adjust Stock</Link>
                        </span>
                      </td>
                    )}
                    <td>
                      <span
                        onClick={() => {
                          setAdjustStockHistoryModal(true);
                          setModalId(element.inventory_id);
                        }}
                      >
                        <Link to="">view</Link>
                      </span>
                    </td>
                    <ViewAdjustStockHistoryModal
                      adjustStockHistoryModal={adjustStockHistoryModal}
                      setAdjustStockHistoryModal={setAdjustStockHistoryModal}
                      inventoryId={modalId}
                    />
                    <td>{element.minimum_order_level}</td>
                  </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
}

export default Inventory;