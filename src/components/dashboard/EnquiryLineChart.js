import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
//import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

const EnquiryLineChart = () => {
  const [enquiryStats, setEnquiryStats] = useState(null);

  // Function to fetch Enquiry statistics
  const fetchEnquiryStats = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = {
      monthLabels: ['January', 'February', 'March', 'April', 'May', 'June'],
      enquiryCount: [100, 150, 120, 200, 180, 160],
    };
    setEnquiryStats(mockData);
  };

  useEffect(() => {
    fetchEnquiryStats(); // Fetch Enquiry statistics on component mount
  }, []);

  const optionsLineChart = {
    chart: {
      id: 'line-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'line',
    },
    xaxis: {
      categories: enquiryStats?.monthLabels || [],
      labels: {
        style: {
          colors: '#263238',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Enquiry Count',
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      },
    },
    colors: ['#745af2'],
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesLineChart = [
    {
      name: 'Enquiry Count',
      data: enquiryStats?.enquiryCount || [],
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Enquiry Statistics (Line Chart)">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {enquiryStats && (
            <Chart options={optionsLineChart} series={seriesLineChart} type="line" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default EnquiryLineChart;
