import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
// import api from '../../constants/api'; // Uncomment and import your API module here
import ComponentCard from '../ComponentCard';

const Subcon = () => {
  const [subconData, setSubconData] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch subcontractor data
  const fetchSubconData = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = [
      { category: 'Category A', count: 15 }, // Subcontractor category and count
      { category: 'Category B', count: 20 },
      { category: 'Category C', count: 10 },
      // Add more data as needed
    ];
    setSubconData(mockData);
    setLoading(false); // Set loading to false after data is fetched (remove in actual implementation)
  };

  useEffect(() => {
    fetchSubconData(); // Fetch subcontractor data on component mount (remove in actual implementation)
  }, []);

  const optionsBarChart = {
    chart: {
      id: 'subcon-bar-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'bar',
      height: '350',
    },
    xaxis: {
      categories: subconData?.map((item) => item.category) || [],
      labels: {
        style: {
          colors: '#263238',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of Subcontractors',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    colors: ['#36a2eb'], // Customize bar color as needed
    legend: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesBarChart = [
    {
      name: 'Subcontractors',
      data: subconData?.map((item) => item.count) || [],
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Subcontractor Categories (Bar Chart)">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Chart options={optionsBarChart} series={seriesBarChart} type="bar" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default Subcon;
