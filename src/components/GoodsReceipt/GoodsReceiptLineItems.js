import React, { useState, useEffect } from 'react';
import {
 Table,
  FormGroup
} from 'reactstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-feather';
import Swal from 'sweetalert2';
import message from '../Message';
import api from '../../constants/api';
// import AppContext from '../../context/AppContext';
// import creationdatetime from '../../constants/creationdatetime';

export default function TenderQuotation({
   
    quote,
    project,
    PurchaseOrderId,
   

  }) {
    TenderQuotation.propTypes = {
      
      project: PropTypes.object,
      quote: PropTypes.object,
      PurchaseOrderId: PropTypes.object,
    
    };

    const [orderdetails, setOrderDetails] = useState();
    // const [isRecordCreated, setIsRecordCreated] = useState(false);
    //get staff details
  // const { loggedInuser } = useContext(AppContext);
// const [editLineModelItem, setEditLineModelItem] = useState(null);
// const [editLineModal, setEditLineModal] = useState(false);
// const CreateRecord = (GoodsReceivedID, ProductId) => {
//     const payload = {
//         goods_receipt_id: GoodsReceivedID,
//         product_id: ProductId,
//         created_by: loggedInuser.first_name,
//         creation_date: creationdatetime
//         // Add other fields you need for the record here
//       };

//       api.post('/goodsreceipt/insertGoodsreceiptItems', payload)
//         .then(() => {
//         //   const insertedDataId = res.data.data.insertId;
//           message('Goods Receipt inserted successfully.', 'success');
//           setIsRecordCreated(true);
//         })
//         .catch(() => {
//           message('Network connection error.', 'error');
//         });
//     };

    // Your code to create the record goes here
    // For example, you can make an API call or update a database

    // Once the record is created, set the state to hide the button
    


const QuoteProject = project.find((element) => {
    return element.purchase_request_id === PurchaseOrderId;
  });
  const deleteRecord = (deleteID) => {
    Swal.fire({
      title: `Are you sure? ${deleteID}`,
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        api.post('/goodsreceipt/deleteEditItem', { goods_received_items_id: deleteID }).then(() => {
          Swal.fire('Deleted!', 'Your Line Items has been deleted.', 'success');
          window.location.reload();
        });
      }
    });
  };
//Api call for getting Vehicle Insurance Data By ID
const getPurchaseOrderedById = () => {
    api
      .post('/goodsreceipt/getPurchaseOrderedById',{purchase_order_id: PurchaseOrderId})
      .then((res) => {
        setOrderDetails(res.data.data);
      })
      .catch(() => {
        message('Order Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getPurchaseOrderedById();
  }, [PurchaseOrderId]);

return (
    

<FormGroup>
<Table bordered className="lineitem">
                      <thead>
                        <tr>
                          <th scope="col"> Product Code </th>
                          <th scope="col">Title </th>
                          <th scope="col">Unit </th>
                          <th scope="col">Ordered Quantity </th>
                          <th scope="col">Received Date </th>
                          <th scope="col">Received Quantity</th>
                          <th scope="col"> Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderdetails &&
                          orderdetails.map((e) => {
                            return (
                              <tr>
                                <td >{e.product_code}</td>
                                <td >{e.item_title}</td>
                                <td >{e.unit}</td>
                                <td >{e.quantity}</td>
                                <td data-label="Received">{e.modified_by}</td>
                                <td data-label="Received Quantity">{e.modified_by}</td>
                                {quote && QuoteProject === undefined && (
                                  <td data-label="Actions">
                                    {/* {!isRecordCreated && ( // Only show the button if record is not created
                  <Button
                    className="shadow-none"
                    color="primary"
                    onClick={() => {
                      CreateRecord(e.goods_receipt_id,e.product_id);
                    }}
                  >
                    Create Receipt Items
                  </Button>
                                    )} */}
                                    <span
                                      className="addline"
                                      onClick={() => {
                                        // setEditLineModelItem(e);
                                        // setEditLineModal(true);
                                      }}
                                    >
                                      <Icon.Edit2 />
                                    </span>
                                    <span
                                      className="addline"
                                      onClick={() => {
                                        deleteRecord(e.goods_received_items_id);
                                      }}
                                    >
                                      <Icon.Trash2 />
                                    </span>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </FormGroup>
                  
);
}