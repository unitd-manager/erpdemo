import React, { useState,useEffect } from 'react'
import { Card, CardBody,Row,Col,Button,Modal,ModalHeader,ModalBody, ModalFooter, Table} from 'reactstrap';
import PropTypes from 'prop-types'
// import moment from 'moment';
import api from '../../constants/api';
// import message from '../Message';


function ViewReturnHistoryModal({returnHistoryModal,SetReturnHistoryModal,PoProductId}) {

    ViewReturnHistoryModal.propTypes = {
        returnHistoryModal: PropTypes.bool,
        SetReturnHistoryModal: PropTypes.func,
        PoProductId:PropTypes.any
      }

      const [returnQty,SetReturnQty]=useState([]);

      const getPurchaseReturmItemsById = () => {
        api.post('/purchasereturn/getPurchaseReturmItemsById',{po_product_id:PoProductId})
          .then((res) => {
            SetReturnQty(res.data.data); 
          })
          .catch(() => {
            // message('adjuststock logs Data Not Found', 'info');
          });
      };
     
      const alcolumns = [      
        {
          name: "Returned Qty",
         
        },
        {
            name: "Created By",
            
          },
          {
            name: "Creation Date",
            
          }
      ]
    useEffect(()=>{
        getPurchaseReturmItemsById();
    },[PoProductId])

  return (
    <>
    <Modal isOpen={returnHistoryModal}>
    <ModalHeader>Returned Quantity History</ModalHeader>
    <ModalBody>
        <Row>
        <Col md="12">
        <Card>
            
            <CardBody>
            <Table id="example" className="display">
          <thead>
              <tr >
                  {alcolumns.map(cell=>{
                    return (<td key={cell.name}>{cell.name}</td>)
                  })}
              </tr>
          </thead>
          <tbody>
             {returnQty && returnQty.map(element=>{
                return (<tr key={element.po_product_id}>
                <td>{element.purchase_return_qty}</td>
                
                <td>{element.created_by}</td>
                <td>{element.creation_date}</td>
                {/* <td>{element.modified_by}{element.modification_date}</td> */}
            
                </tr>
                )
            })}

</tbody> 
          </Table>
            </CardBody>
        </Card>
        </Col>
        </Row>  
    </ModalBody>
    <ModalFooter>
        <Button color="secondary" onClick={()=>{SetReturnHistoryModal(false)}}> Cancel </Button>
    </ModalFooter>
</Modal> 
</>
  )
}

export default ViewReturnHistoryModal