import { Row, Col } from 'reactstrap';
// import SalesOverview from '../../components/dashboard/classicDashboard/ProjectOverview';
import TenderSummaryCard from '../../components/dashboard/TenderSummaryCard';
import ProjectSummaryChart from '../../components/dashboard/ProjectSummaryChart';
import TenderSummary from '../../components/dashboard/TenderSummary';
import InvoiceSummary from '../../components/dashboard/InvoiceSummary';
import InvoiceSummaryChart from '../../components/dashboard/InvoiceSummaryChart';
import EmployeeSummary from '../../components/dashboard/ecommerceDashboard/EmployeeSummary';
import PasspotExpirySummary from '../../components/dashboard/PasspotExpirySummary';
import WorkpermitExpirySummary from '../../components/dashboard/WorkpermitExpirySummary';
import TaskSummary from '../../components/dashboard/TaskSummary';
import LabourSummary from '../../components/dashboard/LabourSummary';

const Classic = () => {
  return (
    <>
      <Row>
        <Col lg="12">
          {/* <TestChart/> */}
          <TenderSummaryCard />
          <ProjectSummaryChart/>
          <TaskSummary/>
          <LabourSummary/>
          <TenderSummary />
          <InvoiceSummary/>
          <InvoiceSummaryChart/>
          <EmployeeSummary/>
          <PasspotExpirySummary />
          <WorkpermitExpirySummary/>
          
          {/* <SalesOverview /> */}
        </Col>
      </Row>
    </>
  );
};

export default Classic;
