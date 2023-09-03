import React, { useState, useEffect } from 'react';
import {
  Table,
  FormGroup,
 Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import EditRequestForQuoteLine from './EditRequestForQuoteLine'; 
import message from '../Message';
import api from '../../constants/api';

export default function RequestPurchase({
  PurchaseRequestID,
 
}) {
  RequestPurchase.propTypes = {
    PurchaseRequestID: PropTypes.object,
   
  };

  const [requestPurchase, setRequestPurchase] = useState();
  const [editRequestForQuoteLine, setEditRequestForQuoteLine] = useState(false);
  // const [editRequestForQuoteLineInsert, setEditRequestForQuoteLineInsert] = useState(false);


  const getRequestForQuote = () => {
    api
      .post('/quote/RequestLineItemById', { purchase_quote_id: PurchaseRequestID })
      .then((res) => {
        setRequestPurchase(res.data.data);
      })
      .catch(() => {
        message('Request For Quote Data Not Found', 'info');
      });
  };

  const handleEditButtonClick = () => {
    setEditRequestForQuoteLine(true);
  };

  useEffect(() => {
    getRequestForQuote();
  }, []);

  
  console.log(requestPurchase)

  return (
    <>
 <Button onClick={handleEditButtonClick}>Edit Table</Button>
              <FormGroup>
                <Table bordered className="Request For Quote">
                  <thead>
                    <tr>
                      <th scope="col"> Product Code </th>
                      <th scope="col">Title </th>
                      <th scope="col">Unit </th>
                      <th scope="col">Quantity </th>
                      <th scope="col">Updated By </th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requestPurchase &&
                      requestPurchase.map((e) => {
                        return (
                          <tr key={e.purchase_quote_id}>
                            <td data-label="Product Code">{e.product_code}</td>
                            <td data-label="Title">{e.item_title}</td>
                            <td data-label="Unit">{e.unit}</td>
                            <td data-label="Quantity">{e.purchase_request_qty}</td>
                            <td data-label="Updated By">{e.modified_by}</td>
                            <td data-label="Amount">{e.amount}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
              </FormGroup>
           
      {editRequestForQuoteLine && (
        <EditRequestForQuoteLine
          editRequestForQuoteLine={editRequestForQuoteLine}
          setEditRequestForQuoteLine={setEditRequestForQuoteLine}
          data={requestPurchase}
          PurchaseRequestID={PurchaseRequestID}
        />
      )}
     
      
    </>
  );
}
