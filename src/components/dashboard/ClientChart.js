import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
// import api from '../../constants/api'; // Uncomment and import your API module here
import ComponentCard from '../ComponentCard';

const ClientChart = () => {
  const [clientData, setClientData] = useState(null);

  // Function to fetch client data
  const fetchClientData = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], // Months or time periods
      series: [
        {
          name: 'Client A',
          data: [30, 40, 35, 50, 49, 60, 70], // Client A data for each month
        },
        {
          name: 'Client B',
          data: [45, 35, 40, 55, 60, 50, 65], // Client B data for each month
        },
        {
            name: 'Client C',
            data: [50, 30, 25, 40, 55, 70, 75], // Client C data for each month
          },
      ],
    };
    setClientData(mockData);
  };

  useEffect(() => {
    fetchClientData(); // Fetch client data on component mount
  }, []);

  const optionsAreaChart = {
    chart: {
      id: 'area-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'area',
      stacked: false,
      height: '350',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: clientData?.categories || [],
      labels: {
        style: {
          colors: '#263238',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of Clients',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    colors: ['#36a2eb', '#ff6384', '#ffce56'],
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      fontFamily: "'Montserrat', sans-serif",
      labels: {
        colors: '#8898aa',
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesAreaChart = clientData?.series || [];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Customer Statistics">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {clientData && (
            <Chart options={optionsAreaChart} series={seriesAreaChart} type="area" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default ClientChart;
