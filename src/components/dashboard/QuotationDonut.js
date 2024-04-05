import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
//import api from '../../constants/api';
import ComponentCard from '../ComponentCard';

const QuotationDonut = () => {
  const [quotationStats, setQuotationStats] = useState(null);

  // Function to fetch Quotation statistics
  const fetchQuotationStats = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = {
      with_due: 15,
      due: 5,
      over_due: 20,
    };
    setQuotationStats(mockData);
  };

  useEffect(() => {
    fetchQuotationStats(); // Fetch Quotation statistics on component mount
  }, []);

  const optionsDonut = {
    chart: {
      id: 'donut-chart',
      fontFamily: "'Rubik', sans-serif",
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      width: '50px',
      fontFamily: "'Montserrat', sans-serif",
      labels: {
        colors: '#8898aa',
      },
    },
    colors: [
      'rgb(30, 136, 229)',
      'rgb(38, 198, 218)',
      'rgb(116, 90, 242)',
      '#ef5350',
    ],
    tooltip: {
      fillSeriesColor: false,
      theme: 'dark',
    },
    labels: [
      'With Due',
      'Due',
      'Over Due',
    ],
  };

  const seriesDonut = quotationStats
    ? [quotationStats.with_due || 0, quotationStats.due || 0, quotationStats.over_due || 0]
    : [];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Quotation Statistics">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {quotationStats && (
            <Chart options={optionsDonut} series={seriesDonut} type="donut" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default QuotationDonut;
