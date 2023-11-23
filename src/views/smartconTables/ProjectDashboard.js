import React from 'react';
import { Col, Row } from 'reactstrap';

import TaskSummary from '../../components/dashboard/TaskSummary';
import ProjectSummaryChart from '../../components/dashboard/ProjectSummaryChart';
import LabourSummary from '../../components/dashboard/LabourSummary';
import MaterrialIssueChart from '../../components/dashboard/MaterialIssueChart';


const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
        <ProjectSummaryChart/>
        <TaskSummary/>
        <LabourSummary/>
        <MaterrialIssueChart/>
        
        </Col>
      </Row>
  
    </div>
  );
};

export default Test;
