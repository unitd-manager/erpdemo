import React, { useEffect, useState } from 'react';
import { Col, FormGroup, Label, Input } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';

const PurchaseOrderProduct = () => {
  const [selectedproductid, setSelectedProductId] = useState('');
  const [setSelectedMonth] = useState('');
  const [clientname, setClientName] = useState([]);
  const [productdata, setProductData] = useState([]);

  useEffect(() => {
    // Fetch the list of companies
    api.get('/finance/getDashboardOrders')
      .then((res) => {
        setClientName(res.data.data);
      })
      .catch((error) => {
        console.log('Error fetching companies:', error);
      });
  }, []);

  useEffect(() => {
    // Fetch order details based on the selected company
    if (selectedproductid) {
      api.post('/finance/getOrdersStats', { product_id: selectedproductid })
        .then((response) => {
          setProductData(response.data.data);
        })
        .catch((error) => {
          console.log('Error fetching order data:', error);
        });
    } else {
      // Reset order data when no company is selected
      setProductData([]);
    }
  }, [selectedproductid]);

  const getOrderStatusCounts = (orderId, status) => {
    return productdata
      .filter((order) => order.order_id === orderId && order.order_status === status)
      .length;
  };

  const orderStatuses = ['new', 'paid', 'cancelled'];

  const optionsColumn = {
    xaxis: {
      categories: clientname.map((client) => `${client.company_name}`), // X-axis categories (order_code)
    },
    yaxis: {
      categories: ['new', 'paid', 'cancelled'], // Y-axis categories (new, paid, cancelled)
    },
  };

  const seriesColumn = orderStatuses.map((status) => {
    const data = clientname.map((order) => getOrderStatusCounts(order.order_id, status));
    return {
      name: status, // Y-axis labels (new, paid, cancelled)
      data,
    };
  });

  return (
    <ComponentCard title="Ordered Product">
    <Col md="12">
      <FormGroup>
        <Label for="Select Product">Product</Label>
        <Input
          type="select"
          name="product_id"
          onChange={(e) => {
            const selectedCompany = e.target.value;
            setSelectedProductId(selectedCompany);
          }}
        >
          <option value="">Select Company</option>
          {clientname &&
            clientname.map((element) => (
              <option key={element.product_id} value={element.product_id}>
                {element.title}
              </option>
            ))}
        </Input>
      </FormGroup>

    <FormGroup>
          <Label for="SelectMonth">Month</Label>
        <Input
            type="select"
            name="month"
            onChange={(e) => {
              const selectedMonth = e.target.value;
              setSelectedMonth(selectedMonth);
            }}
          >
            <option value="">Select Month</option>
            {/* Add options for each month */}
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </Input>
    </FormGroup>

      <ComponentCard title="Column Chart">
        <Chart options={optionsColumn} series={seriesColumn} type="bar" height="280" />
      </ComponentCard>
    </Col>
    </ComponentCard>
  );
};

export default PurchaseOrderProduct;