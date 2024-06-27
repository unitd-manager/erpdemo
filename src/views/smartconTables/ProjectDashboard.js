import React from 'react';
import { Col, Row } from 'reactstrap';
import TaskSummary from '../../components/dashboard/TaskSummary';
import ProjectSummaryChart from '../../components/dashboard/ProjectSummaryChart';
import LabourSummary from '../../components/dashboard/LabourSummary';
import MaterrialIssueChart from '../../components/dashboard/MaterialIssueChart';
import ProjectChart from '../../components/DashboardProj/ProjectChart';
import QuoteChart from '../../components/DashboardProj/QuoteChart';
import Subcon from '../../components/DashboardProj/SubCon';
import MaterialIssue from '../../components/DashboardProj/MaterialIssue';
import ProjectEnq from '../../components/DashboardProj/ProjectEnq';
import ClientChart from '../../components/dashboard/ClientChart'


const Test = () => {

  return (
    <div >
      <Row>
        <Col lg='12'>
        <ClientChart/>
        <ProjectEnq/>
        <QuoteChart/>
        <ProjectChart/>
        <Subcon/>
        <MaterialIssue/>
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
