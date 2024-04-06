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
//import GoodsDeliveryChart from '../../components/dashboard/GoodsDeliveryStackedBarChart';


const Classic = () => {
  return (
    <>
      <Row>
        <Col lg="12">
          {/* <TestChart/> */}
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
