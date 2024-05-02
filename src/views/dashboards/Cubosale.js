import { Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SalesOrderStats from '../../components/dashboard/SalesOrderStats';
import GoodsDeliveryChart from '../../components/dashboard/GoodsDeliveryChart';
import QuotationDonut from '../../components/dashboard/QuotationDonut';
import SalesInvoicePieChart from '../../components/dashboard/SalesInvoivePieChart';
import EnquiryLineChart from '../../components/dashboard/EnquiryLineChart';
import SalesReturnChart from '../../components/dashboard/SalesReturnChart';
import ClientChart from '../../components/dashboard/ClientChart';
import SalesOverview from '../../components/dashboard/classicDashboard/ProjectOverview';
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
import MaterialPurchaseSummary from '../../components/dashboard/MaterialPurchaseSummary';
import MaterialIssueChart from '../../components/dashboard/MaterialIssueChart';
import RequestForQuotePie from '../../components/dashboard/RequestForQuotePie';
 //import QuotationChart from '../../components/dashboard/QuotationChart';
 //import CustomerChart from '../../components/dashboard/CustomerChart';

 /*project*/
import ProjectChart from '../../components/DashboardProj/ProjectChart';
import QuoteChart from '../../components/DashboardProj/QuoteChart';
import CustoChart from '../../components/DashboardProj/CustoChart';
import Subcon from '../../components/DashboardProj/SubCon';
import MaterialIssue from '../../components/DashboardProj/MaterialIssue';
import ProjectEnq from '../../components/DashboardProj/ProjectEnq';

/*HR*/
import Leave from '../../components/DashboardHR/Leave';
import Loan from '../../components/DashboardHR/Loan';
import Training from '../../components/DashboardHR/Training';
import Employee from '../../components/DashboardHR/Employee';
import JobInfo from '../../components/DashboardHR/JobInfo';
import Payroll from '../../components/DashboardHR/Payroll';


const Classic = () => {
  return (
    <>
      <Row>
        <Col lg="12"> 
          {/* <TestChart/> */}
          <QuoteChart/>
          <ProjectChart/>
          <CustoChart/>
          <Subcon/>
          <MaterialIssue/>
          <ProjectEnq/>
          <Leave/>
          <Loan/>
          <Training/>
          <Employee/>
          <JobInfo/>
          <Payroll/>
          <ClientChart/>
          <SalesOrderStats/>
          <GoodsDeliveryChart/>
          <QuotationDonut/>
          <SalesInvoicePieChart/>
          <EnquiryLineChart/>
          <SalesReturnChart/>
           <TenderSummaryCard />
          <ProjectSummaryChart />
          <TaskSummary/>
          <LabourSummary/>
          <TenderSummary />
          <InvoiceSummary />
          <InvoiceSummaryChart />
          <EmployeeSummary />
          <PasspotExpirySummary />
          <WorkpermitExpirySummary/>
          <MaterialPurchaseSummary/>
          <MaterialIssueChart/>
          <RequestForQuotePie/>
         {/* < QuotationChart/> 
         <CustomerChart/> */}
           <SalesOverview /> 
        </Col>
      </Row>
    </>
  );
};

export default Classic;
