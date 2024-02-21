import React, { useState } from 'react';
import { Row, NavLink, TabPane, Nav, NavItem, TabContent, Form, FormGroup,} from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';
import InvoiceTable from './InvoiceTable';
import ReceiptTable from './ReceiptTable';
import OrderItemsTable from './OrderItemsTable';

//VehicleDetails From VehicleEdit
export default function VehicleMoreDetails({
  invoiceDetails,
  receiptDetails,
  ordersDetails,
}) {
  VehicleMoreDetails.propTypes = {
    invoiceDetails: PropTypes.array,
    receiptDetails: PropTypes.array,
    ordersDetails: PropTypes.array,
  };

  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <Form>
      <FormGroup>
        <ComponentCard title="More Details">
          <Nav tabs>
          <NavItem>
              <NavLink
                className={activeTab === '1' ? 'active' : ''}
                onClick={() => {
                  toggle('1');
                }}
              >
                Order Items
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className={activeTab === '2' ? 'active' : ''}
                onClick={() => {
                  toggle('2');
                }}
              >
                Invoice
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={activeTab === '3' ? 'active' : ''}
                onClick={() => {
                  toggle('3');
                }}
              >
                Receipt
              </NavLink>
            </NavItem>
            
          </Nav>
          <TabContent className="p-4" activeTab={activeTab}>
            {/* ADD NODE */}
            <TabPane tabId="1">
            <OrderItemsTable ordersDetails={ordersDetails}></OrderItemsTable>
            </TabPane>
            {/* Description form */}
            <TabPane tabId="2">
              <Row className="border-bottom mb-3">
               <InvoiceTable
               invoiceDetails={invoiceDetails}
               ></InvoiceTable>
              </Row>
            </TabPane>

            {/* attachments */}
            <TabPane tabId="3">
            <ReceiptTable receiptDetails={receiptDetails}></ReceiptTable>
            </TabPane>
            
          </TabContent>
        </ComponentCard>
      </FormGroup>
    </Form>
  );
}
