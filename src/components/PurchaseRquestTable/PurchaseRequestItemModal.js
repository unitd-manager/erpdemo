import React, { useContext,useState, useEffect } from 'react';
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as $ from 'jquery';
import random from 'random';
import Select from 'react-select';
import api from '../../constants/api';
import message from '../Message'
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';


const AddPoModal = ({
  addPurchaseOrderModal,
  setAddPurchaseOrderModal,
  PurchaseRequestId,
 
}) => {
  AddPoModal.propTypes = {
    addPurchaseOrderModal: PropTypes.bool,
    PurchaseRequestId: PropTypes.any,
    setAddPurchaseOrderModal: PropTypes.func,
  };
  const [addNewProductModal, setAddNewProductModal] = useState(false);
   const [getProductValue, setProductValue] = useState();
  const [productDetail, setProductDetail] = useState({
    category_id: null,
    sub_category_id: null,
    title: '',
    product_code: '',
    qty_in_stock: null,
    price: null,
    published: 0,
  });
   
   //get staff details
   const { loggedInuser } = useContext(AppContext);

  const [addMoreItem, setMoreItem] = useState([
    {
      id: random.int(1, 99).toString(),
      itemId: '',
      unit: '',
      purchase_request_qty: '',
     
    },
    {
      id: random.int(0, 9999).toString(),
      itemId: '',
      unit: '',
      purchase_request_qty: '',
    },
    {
      id: random.int(0, 9999).toString(),
      itemId: '',
      unit: '',
      purchase_request_qty: '',
    },
  ]);

  // const [query, setQuery] = useState('');
  // const [filteredOptions, setFilteredOptions] = useState([]);

  // const handleInputChange = async (event) => {
  //   const inputQuery = event.target.value;
  //   setQuery(inputQuery);

  //   try {
  //     if (inputQuery.trim() === '') {
  //       setFilteredOptions([]);
  //     } else {
  //       api.post('/product/getProductsbySearchFilter',{keyword:inputQuery}).then((res) => {
  //         const items = res.data.data;
  //         const finaldat = [];
  //         items.forEach((item) => {
  //           finaldat.push({ value: item.product_id, label: item.title });
  //         });
  //         console.log('productsearchdata',finaldat)
  //         console.log('finaldat',finaldat)
  //         // setProductValue(finaldat);
  //         setFilteredOptions(finaldat);
  //       });
        
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  // const handleSelectOption = (selectedOption,itemId) => {
  //   setQuery(selectedOption);
  //   const element = addMoreItem.find((el) => el.id === itemId);
  //   element.title = selectedOption.label;
  //   element.item_title = selectedOption.label;
  //   element.product_id = selectedOption.value.toString();
  //   setMoreItem(addMoreItem);
  //   setFilteredOptions([]); // Clear the suggestions when an option is selected
  //   // Additional actions to perform when an option is selected
  //   console.log('selectedoption',selectedOption)
  // };

  const AddNewLineItem = () => {
    setMoreItem([
      ...addMoreItem,
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        unit: '',
        purchase_request_qty: '',
      },
    ]);
  };

  const [insertPurchaseOrderData] = useState({
  });

  const handleNewProductDetails = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value });
  };

  //   Get Products
  // const getProduct = (e) => {
  //   api.post('/product/getProductsbySearchFilter',{keyword:e.target.value}).then((res) => {
  //     const items = res.data.data;
  //     const finaldat = [];
  //     items.forEach((item) => {
  //       finaldat.push({ value: item.product_id, label: item.title });
  //     });
  //     console.log('productsearchdata',finaldat)
  //     setProductValue(finaldat);
  //   });
  // };
 //   Get Products
 const getProduct = () => {
  api.get('/product/getProducts').then((res) => {
    const items = res.data.data;
    const finaldat = [];
    items.forEach((item) => {
      finaldat.push({ value: item.product_id, label: item.title });
    });
    setProductValue(finaldat);
  });
};

const insertProduct = (ProductCode, ItemCode) => {
  if (productDetail.title !== '') {
    productDetail.product_code = ProductCode;
    productDetail.item_code = ItemCode;
    productDetail.creation_date = creationdatetime;
    productDetail.created_by = loggedInuser.first_name;
    api
      .post('/purchaserequest/insertPurchaseProduct', productDetail)
      .then((res) => {
        const insertedDataId = res.data.data.insertId;
        message('Product inserted successfully.', 'success');
        api
          .post('/product/getCodeValue', { type: 'InventoryCode' })
          .then((res1) => {
            const InventoryCode = res1.data.data;
            message('inventory created successfully.', 'success');
            api
            .post('/inventory/insertinventory', { product_id: insertedDataId, inventory_code:InventoryCode  })
          
          .then(() => {
            message('inventory created successfully.', 'success');
             getProduct();
          })
          })
          .catch(() => {
            message('Unable to create inventory.', 'error');
          });
      })
      .catch(() => {
        message('Unable to insert product.', 'error');
      });
    } else {
      message('Please fill the Product Name ', 'warning');
    }
  };

  //Auto generation code
  const generateCode = () => {
    api
      .post('/product/getCodeValue', { type: 'ProductCode' })
      .then((res) => {
        const ProductCode = res.data.data
      api
      .post('/product/getCodeValue', { type: 'ItemCode' })
      .then((response) => {
        const ItemCode = response.data.data
        insertProduct(ProductCode, ItemCode);
      })
      })
      .catch(() => {
        insertProduct('');
      });
  };

  // Materials Purchased
  const TabMaterialsPurchased = () => {
    api
      .get('/purchaserequest/PurchaseRequestLineItem')
      .then((res) => {
        const items = res.data.data;
        const finaldat = [];
        items.forEach((item) => {
          finaldat.push({ value: item.product_id, label: item.title });
        });
      })
      .catch(() => {
        message('Tab Purchase Order not found', 'info');
      });
  };
  const poProduct = (itemObj) => {
    api
      .post('/purchaserequest/insertPurchaseRequestLineItem', {
        purchase_request_id:PurchaseRequestId,
          product_id: itemObj.product_id,
          purchase_request_qty: itemObj.purchase_request_qty,
          unit: itemObj.unit
      })
      .then(() => {
        message('Purchase Request Item Added!', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 300);
      })
      .catch(() => {
        message('Unable to add Product!', 'error');
      });
  };

  //     const insertlineItem = () => {
  //        addMoreItem.forEach(pItems=>{
  //         if(pItems.item !== ''){
  //             poProduct(pItems)
  //         }

  //        })
  //    }

  const getAllValues = () => {
    const result = [];
    const oldArray = addMoreItem;
    $('.lineitem tbody tr').each(() => {
      const allValues = {};
      $(this)
        .find('input')
        .each(() => {
          const fieldName = $(this).attr('name');
          allValues[fieldName] = $(this).val();
        });
      result.push(allValues);
    });
    oldArray.forEach((obj) => {
      if (obj.id) {
        /* eslint-disable */
        // const objId = parseInt(obj.id)
        const foundObj = oldArray.find((el) => el.id === obj.id);
        if (foundObj) {
          obj.product_id = foundObj.product_id;
          obj.title = foundObj.title;
          obj.item_title = foundObj.item_title;
        }
        if(obj.unit){
          poProduct(foundObj);
          }
      }
    });

  };

  function updateState(index, property, e) {
    const copyDeliverOrderProducts = [...addMoreItem];
    const updatedObject = { ...copyDeliverOrderProducts[index], [property]: e.target.value };
    copyDeliverOrderProducts[index] = updatedObject;
    setMoreItem(copyDeliverOrderProducts);
  }

  useEffect(() => {
     getProduct();
    TabMaterialsPurchased();
  }, []);
  useEffect(() => {
    setMoreItem([
      {
        id: random.int(1, 99).toString(),
        itemId: '',
        unit: '',
        purchase_request_qty: '',
      },
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        unit: '',
        purchase_request_qty: '',
      },
      {
        id: random.int(0, 9999).toString(),
        itemId: '',
        unit: '',
        purchase_request_qty: '',
      },
    ]);
  }, [addPurchaseOrderModal]);

  const onchangeItem = (str, itemId) => {
    const element = addMoreItem.find((el) => el.id === itemId);
    element.title = str.label;
    element.item_title = str.label;
    element.product_id = str.value.toString();
    setMoreItem(addMoreItem);
  };

  // Clear row value
  const ClearValue = (ind) => {
    setMoreItem((current) =>
      current.filter((obj) => {
        return obj.id !== ind.id;
      }),
    );
  };

  return (
    <>
      <Modal size="xl" isOpen={addPurchaseOrderModal}>
        <ModalHeader>Add Product</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  <Col md="3">
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={() => {
                        setAddNewProductModal(true);
                      }}
                    >
                      Add New Product
                    </Button>
                  </Col>
                  <Col md="3">
                    <Button
                      color="primary"
                      className="shadow-none"
                      onClick={() => {
                        AddNewLineItem();
                      }}
                    >
                      Add Item
                    </Button>
                  </Col>
                </Row>
                <br />
              </Col>
            </Row>

            <table className="lineitem">
              <thead>
                <tr className="">
                  <th width="20%" scope="col">
                    Item
                  </th>
                  <th scope="col">Unit</th>
                  <th scope="col">Quantity</th>
                  
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {addMoreItem.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td data-label="title">
                        <Select
                          key={item.id}
                          defaultValue={{ value: item.product_id, label: item.title }}
                          onChange={(e) => {
                            onchangeItem(e, item.id);
                          }}
                          options={getProductValue}
                        />
                        <Input value={item.product_id} type="hidden" name="product_id"></Input>
                        <Input value={item.title} type="hidden" name="title"></Input>
                      </td>

                      <td data-label="Unit">
                        <Input
                          defaultValue={item.uom}
                          type="text"
                          name="unit"
                          onChange={(e) => updateState(index, 'unit', e)}
                          value={insertPurchaseOrderData && insertPurchaseOrderData.unit}
                        />
                      </td>
                      <td data-label="Qty">
                        <Input
                          defaultValue={item.qty}
                          type="number"
                          name="purchase_request_qty"
                          onChange={(e) => updateState(index, 'purchase_request_qty', e)}
                          value={insertPurchaseOrderData && insertPurchaseOrderData.purchase_request_qty}
                        />
                      </td>
                      <td data-label="Action">
                        {' '}
                        <Input defaultValue={item.id} type="hidden" name="id"></Input>
                          <div className="anchor">
                            <span
                              onClick={() => {
                                ClearValue(item);
                              }}
                            >
                              Clear
                            </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              getAllValues();
              getProduct();
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddPurchaseOrderModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Add New Product Modal */}
      <Modal isOpen={addNewProductModal}>
        <ModalHeader>Add New Products</ModalHeader>

        <ModalBody>
          <FormGroup>
            <Row>
              <Col md="12" className="mb-4">
                <Row>
                  <FormGroup>
                    <Row>
                      <Label sm="3">
                        Product Name <span className="required"> *</span>
                      </Label>
                      <Col sm="8">
                        <Input
                          type="text"
                          name="title"
                          onChange={handleNewProductDetails}
                          value={productDetail.title}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                </Row>
              </Col>
            </Row>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="shadow-none"
            onClick={() => {
              setAddNewProductModal(false);
              generateCode();
              getProduct();
              // setTimeout(() => {
              //   window;
              // }, 300);
            }}
          >
            Submit
          </Button>
          <Button
            color="secondary"
            className="shadow-none"
            onClick={() => {
              setAddNewProductModal(false);
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddPoModal;
