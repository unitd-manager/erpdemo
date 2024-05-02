import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
// import api from '../../constants/api'; // Uncomment and import your API module here
import ComponentCard from '../ComponentCard';

const ProjectChart = () => {
  const [projectData, setProjectData] = useState(null);

  // Function to fetch project data
  const fetchProjectData = () => {
    // Mock data for demonstration (replace with actual API call)
    const mockData = [
      { x: 'Project A', y: 30 }, // Project A data (x: Project name, y: Value for histogram)
      { x: 'Project B', y: 50 }, // Project B data
      { x: 'Project C', y: 40 }, // Project C data
      { x: 'Project D', y: 35 }, // Project D data
      // Add more data as needed
    ];
    setProjectData(mockData);
  };

  useEffect(() => {
    fetchProjectData(); // Fetch project data on component mount
  }, []);

  const optionsHistogramChart = {
    chart: {
      id: 'histogram-chart',
      fontFamily: "'Rubik', sans-serif",
      type: 'bar',
      height: '350',
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'rounded',
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'category',
      categories: projectData?.map((item) => item.x) || [],
      labels: {
        style: {
          colors: '#263238',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Value',
        style: {
          fontSize: '14px',
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
    tooltip: {
      theme: 'dark',
    },
  };

  const seriesHistogramChart = [
    {
      name: 'Project Value',
      data: projectData || [],
    },
  ];

  return (
    <Row>
      <Col md="12">
        <ComponentCard title="Project Data (Histogram Chart)">
          <Form>
            {/* Add any form elements or filters if needed */}
          </Form>
          {projectData && (
            <Chart options={optionsHistogramChart} series={seriesHistogramChart} type="bar" height="350" />
          )}
        </ComponentCard>
      </Col>
    </Row>
  );
};

export default ProjectChart;
