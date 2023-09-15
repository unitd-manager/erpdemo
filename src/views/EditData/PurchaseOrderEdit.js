import React, { useEffect, useState } from 'react';
import { Row, Col, Button, TabContent, TabPane } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import AddNote from '../../components/Tender/AddNote';
import ViewNote from '../../components/Tender/ViewNote';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import AddPoModal from '../../components/PurchaseOrder/AddPoModal';
import AttachmentTab from '../../components/PurchaseOrder/AttachmentTab';
import PurchaseOrderlineItemEdit from '../../components/PurchaseOrder/PurchaseOrderLineItem';
import ViewHistoryModal from '../../components/PurchaseOrder/ViewHistoryModal';
import PurchaseOrderDetailsPart from '../../components/PurchaseOrder/PurchaseOrderDetailsPart';
import ProductLinkedTable from '../../components/PurchaseOrder/ProductLinkedTable';
import Tab from '../../components/project/Tab';
import ApiButton from '../../components/ApiButton';

const PurchaseOrderEdit = () => {
  //All state variable
  const [purchaseDetails, setPurchaseDetails] = useState();
  const [supplier, setSupplier] = useState([]);
  const [product, setProduct] = useState();
  const [historyProduct, setHistoryProduct] = useState();
  const [addPurchaseOrderModal, setAddPurchaseOrderModal] = useState();
  const [products, setProducts] = useState();
  const [editModal, setEditModal] = useState(false);
  const [attachmentModal, setAttachmentModal] = useState(false);
  const [attachmentData, setDataForAttachment] = useState({
    modelType: '',
  });
  const [pictureData, setDataForPicture] = useState({
    modelType: '',
  });
  const [activeTab, setActiveTab] = useState('1');
  const [viewHistoryModal, setViewHistoryModal] = useState(false);
 const [selectedPoProducts, setSelectedPoProducts] = useState([]);
 const [supplierId, setSupplierId] = useState();
  const [gTotal, setGtotal] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  // const  [request, setRequest] = useState([]);


  //const applyChanges = () => {};
  const backToList = () => {
    navigate('/PurchaseOrder');
  };
  //puchaseOrder data in purchaseDetails
  const handleInputs = (e) => {
    setPurchaseDetails({ ...purchaseDetails, [e.target.name]: e.target.value });
  };
  //getting data from purchaseOrder by Id
  const getPurchaseOrderId = () => {
    api.post('/purchaseorder/getPurchaseOrderById', { purchase_order_id: id }).then((res) => {
      setPurchaseDetails(res.data.data[0]);
      setSupplierId(res.data.data[0].supplier_id);
    });
  };

  // Gettind data from Job By Id
  const getPoProduct = () => {
    api
      .post('/purchaseorder/TabPurchaseOrderLineItemById', { purchase_order_id: id })
      .then((res) => {
        setProducts(res.data.data);
        let grandTotal = 0;
        res.data.data.forEach((elem) => {
          grandTotal += elem.po_value;
        });
        setGtotal(grandTotal);
      })
      .catch(() => {
        message('Products Data Not Found', 'info');
      });
  };
  // Gettind data from Job By Id
  const getSupplier = () => {
    api
      .get('/purchaseorder/getSupplier')
      .then((res) => {
        setSupplier(res.data.data);
      })
      .catch(() => {
        message('Supplier Data Not Found', 'info');
      });
  };

    // Gettind data from Job By Id
    const getRequestForQuote = () => {
      api
        .get('/quote/SupplierQuote')
        .then((res) => {
          setSupplier(res.data.data);
        })
        .catch(() => {
          message('Supplier Data Not Found', 'info');
        });
    };
  
  const handlePOInputs = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  //Add to stocks
  const addQtytoStocks = () => {
    if (selectedPoProducts) {
      selectedPoProducts.forEach((elem) => {
        if (elem.status !== 'Closed') {
          elem.status = 'Closed';
          elem.qty_updated = elem.qty_delivered;
          elem.qty_in_stock += parseFloat(elem.qty_delivered);
          api.post('/product/edit-ProductQty', elem);
          api
            .post('/purchaseorder/editTabPurchaseOrderLineItem', elem)
            .then(() => {
              api
                .post('/inventory/editInventoryStock', elem)
                .then(() => {
                  message('Quantity updated in inventory successfully.', 'success');
                })
                .catch(() => {
                  message('unable to update quantity in inventory.', 'danger');
                });
              message('Quantity added successfully.', 'success');
            })
            .catch(() => {
              message('unable to add quantity.', 'danger');
            });
        } else {
          message('This product is already added', 'danger');
        }
      });
    } else {
      alert('Please select atleast one product');
    }
  };


  //Update Setting
  const editPurchaseData = () => {
    api
      .post('/purchaseorder/editTabPurchaseOrder', purchaseDetails)
      .then(() => {
        message('Record editted successfully', 'success');
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  //Edit poproductdata
  const editPoProductData = () => {
    api
      .post('/purchaseorder/editTabPurchaseOrderLineItem', product)
      .then(() => {
        message('product edited successfully.', 'success');
      })
      .catch(() => {
        message('unable to edit product.', 'danger');
      });
  };

  const deletePoProduct = (poProductId) => {
    Swal.fire({
      title: `Are you sure? `,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post('purchaseorder/deletePoProduct', { po_product_id: poProductId })
          .then(() => {
            Swal.fire('Deleted!', 'PoProduct has been deleted.', 'success');
            setTimeout(() => {
              window.location.reload();
            }, 300);
          })
          .catch(() => {
            message('Unable to Delete PO Product', 'info');
          });
      }
    });
  };

  //checked objects
  const getCheckedPoProducts = (checkboxVal, index, Obj) => {
    if (checkboxVal.target.checked === true) {
      setSelectedPoProducts([...selectedPoProducts, Obj]);
    }
    if (checkboxVal.target.checked !== true) {
      const copyselectedPoProducts = [...selectedPoProducts];
      copyselectedPoProducts.splice(index, 1);
      setSelectedPoProducts(copyselectedPoProducts);
    }
  };
  
  // };

  // Start for tab refresh navigation #Renuka 1-06-23
  const tabs = [
    { id: '1', name: 'Delivery order' },
    { id: '2', name: 'Attachments' },
    { id: '3', name: 'Notes' },
  ];
  const toggle = (tab) => {
    setActiveTab(tab);
  };
  // End for tab refresh navigation #Renuka 1-06-23

  //   //Attachments
  const dataForAttachment = () => {
    setDataForAttachment({
      modelType: 'attachment',
    });
  };
  //Pictures
  const dataForPicture = () => {
    setDataForPicture({
      modelType: 'picture',
    });
  };

  useEffect(() => {
    getSupplier();
    getPoProduct();
    getPurchaseOrderId();
    getRequestForQuote();
  }, [id]);

  return (
    <>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      {/* PurchaseorderButtons */}
      {/* <PurchaseOrderButtons
        applyChanges={applyChanges}
        backToList={backToList}
        editPurchaseData={editPurchaseData}
        purchaseDetails={purchaseDetails}
        products={products}
        product={product}
        navigate={navigate}
      /> */}
      <ApiButton
              editData={editPurchaseData}
              navigate={navigate}
              applyChanges={editPurchaseData}
              backToList={backToList}
              module="PurchaseOrder"
            ></ApiButton>
      {/* PurchaseOrder Details */}
      <PurchaseOrderDetailsPart
        supplier={supplier}
        handleInputs={handleInputs}
        purchaseDetails={purchaseDetails}
      />
      <ComponentCard title="Product Linked">
        <AddPoModal
          PurchaseOrderId={id}
          supplierId={supplierId}
          addPurchaseOrderModal={addPurchaseOrderModal}
          setAddPurchaseOrderModal={setAddPurchaseOrderModal}
        />

        <Row className="mb-4">
          <Col md="2">
            <Button
              color="primary"
              onClick={() => {
                setAddPurchaseOrderModal(true);
              }}
            >
              Add Product
            </Button>
          </Col>
          <Col md="2">
            <Button
              color="success"
              onClick={() => {
                addQtytoStocks();
              }}
            >
              Add all Qty to Stock
            </Button>
          </Col>
       
          <Col md="3">
            <b color="primary">Grand Total:{gTotal}</b>
          </Col>
        </Row>
        <ProductLinkedTable
          products={products}
          setProduct={setProduct}
          getCheckedPoProducts={getCheckedPoProducts}
          setEditModal={setEditModal}
          setViewHistoryModal={setViewHistoryModal}
          deletePoProduct={deletePoProduct}
          setHistoryProduct={setHistoryProduct}
        />
      </ComponentCard>
      {editModal && (
        <PurchaseOrderlineItemEdit
          product={product}
          editModal={editModal}
          editPoProductData={editPoProductData}
          setEditModal={setEditModal}
          handlePOInputs={handlePOInputs}
        ></PurchaseOrderlineItemEdit>
      )}
      {viewHistoryModal && (
        <ViewHistoryModal
          viewHistoryModal={viewHistoryModal}
          setViewHistoryModal={setViewHistoryModal}
          productId={historyProduct}
          supplierId={supplierId}
        />
      )}

     
      <ComponentCard title="More Details">
        <Tab toggle={toggle} tabs={tabs} />
        <TabContent className="p-4" activeTab={activeTab}>
       
          <TabPane tabId="2">
            <Row>
              <AttachmentTab
                dataForPicture={dataForPicture}
                dataForAttachment={dataForAttachment}
                id={id}
                attachmentModal={attachmentModal}
                setAttachmentModal={setAttachmentModal}
                pictureData={pictureData}
                attachmentData={attachmentData}
              />
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <AddNote recordId={id} roomName="PurchaseOrderEdit" />
              <ViewNote recordId={id} roomName="PurchaseOrderEdit" />
            </Row>
          </TabPane>
        </TabContent>
      </ComponentCard>
    </>
  );
};

export default PurchaseOrderEdit;
