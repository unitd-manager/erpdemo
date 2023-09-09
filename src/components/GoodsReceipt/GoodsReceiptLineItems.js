import React, { useState, useEffect } from 'react';
import {
 Table,
  FormGroup
} from 'reactstrap';
import PropTypes from 'prop-types';
import message from '../Message';
import api from '../../constants/api';

//Goods Receipt Items Get Function
export default function GoodsReceiptItemsGetFunction({PurchaseOrderId}) {
  GoodsReceiptItemsGetFunction.propTypes =   {  
    PurchaseOrderId: PropTypes.object,
  };
  
  const [orderdetails, setOrderDetails] = useState();
  
  //Api call for getting Goods Receipt Items 
  
  const getGoodsReceiptItemsById = () => {
    api
      .post('/goodsreceipt/getGoodsReceiptItemsById',{purchase_order_id: PurchaseOrderId})
      .then((res) => {
        setOrderDetails(res.data.data);
      })
      .catch(() => {
        message('Receipt Data Not Found', 'info');
      });
  };

  useEffect(() => {
    getGoodsReceiptItemsById();
  }, [PurchaseOrderId]);
  
  return (
  <FormGroup>
    <Table bordered className="lineitem">
      <thead>
        <tr>
        <th scope="col"> S.No </th>
        <th scope="col"> PO Code </th>
        <th scope="col">Title </th>
        <th scope="col">Unit </th>
        <th scope="col">Ordered Quantity </th>
        <th scope="col">Received Date </th>
        <th scope="col">Received Quantity</th>
        <th scope="col"> Unit Price</th>
        <th scope="col"> Total Cost </th>
        </tr>
        </thead>
        <tbody>
        {orderdetails &&
        orderdetails.map((e, index) => {
          return (
            <tr>
              <td>{index+1}</td>
              <td >{e.po_code}</td>
              <td >{e.item_title}</td>
              <td >{e.unit}</td>
              <td >{e.ordered_quantity}</td>
              <td >{e.goods_received_date}</td>
              <td >{e.goods_received_qty}</td>
              <td >{e.unit_price}</td>
              <td >{e.total_cost}</td>
            </tr>
          );
          })}
          </tbody>
           </Table>
            </FormGroup>                 
);
}