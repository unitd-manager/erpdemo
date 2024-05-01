import React from 'react';
import { Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
import ComponentCard from '../ComponentCard';

const ProjectEnq = () => {
  // Static data for project enquiries
  const enquiryData = [
    { enquiryName: 'Enquiry A', actual: 60, target: 80 }, // Enquiry name, actual progress, and target progress
    { enquiryName: 'Enquiry B', actual: 80, target: 90 },
    { enquiryName: 'Enquiry C', actual: 40, target: 70 },
    // Add more data as needed
  ];

  const optionsDonutChart = {
    chart: {
      id: 'project-enquiry-donut-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'donut',
      height: '350',
    },
    labels: enquiryData.map((enquiry) => enquiry.enquiryName),
    colors: ['#36a2eb', '#ff6384', '#ffce56'], // Colors for each segment of the donut chart
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesDonutChart = enquiryData.map((enquiry) => enquiry.actual);

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Project Enquiry (Donut Chart)">
          {enquiryData.length > 0 ? (
            <Chart options={optionsDonutChart} series={seriesDonutChart} type="donut" height="350" />
          ) : (
            <p>No data available for the chart.</p>
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default ProjectEnq;
