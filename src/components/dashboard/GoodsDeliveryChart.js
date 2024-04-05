import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
//import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

const GoodsDeliveryChart = () => {
  const [deliveryStats, setDeliveryStats] = useState(null);

  // Function to fetch Goods Delivery statistics
  const fetchDeliveryStats = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = {
      statuses: ['On Time', 'Delayed', 'Cancelled'],
      deliveryCount: [80, 15, 5],
    };
    setDeliveryStats(mockData);
  };

  useEffect(() => {
    fetchDeliveryStats(); // Fetch Goods Delivery statistics on component mount
  }, []);

  const optionsDonutChart = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'donut',
    },
    labels: deliveryStats?.statuses || [],
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      fontFamily: "'Montserrat', sans-serif",
      labels: {
        colors: '#8898aa',
      },
    },
    colors: ['#36a2eb', '#ff6384', '#ffce56'],
    tooltip: {
      fillSeriesColor: false,
      theme: 'dark',
    },
  };

  const seriesDonutChart = deliveryStats
    ? deliveryStats.deliveryCount || []
    : [];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Goods Delivery Statistics (Donut Chart)">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {deliveryStats && (
            <Chart options={optionsDonutChart} series={seriesDonutChart} type="donut" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default GoodsDeliveryChart;
