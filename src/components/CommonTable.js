/*eslint-disable*/
import { Card, CardBody, CardTitle, CardSubtitle, Table, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import LottieComponent from './LottieComponent';
import { HasAccess ,usePermify} from '@permify/react-role';

const CommonTable = (props) => {
  CommonTable.propTypes = {
    children: PropTypes.node,
    title: PropTypes.any,
    subtitle: PropTypes.any,
    Button: PropTypes.node,
    additionalClasses: PropTypes.string,
    loading: PropTypes.bool,
    module: PropTypes.string,
  };
  const { isAuthorized, isLoading } = usePermify();

  
  const fetchData = async (type) => {
    // Pass roles and permissions accordingly
    // You can send empty array or null for first param to check permissions only
    if (await isAuthorized(null, `${module}-${type}`)) {
       return true
    }else{
      return false
    }
};
  return (
    <div>
      <Card>
        <CardBody>
          <Row className="mb-2 title_border">
            <Col>
              <CardTitle tag="h5">{props.title}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                {props.subtitle}
              </CardSubtitle>
            </Col>
                {/* <HasAccess
                roles={null}
                permissions={`${module}-new`}
                renderAuthFailed={<p></p>}
        >  */}
            <Col className="d-flex" style={{ justifyContent: 'flex-end' }} xl={3} sm={12}>
              {props.Button}
            </Col>
            {/* </HasAccess> */}
          </Row>
          {props.loading ? (
             <LottieComponent />
            
          ) : (
            <Table
              id="example"
              className={`no-wrap mt-3 align-middle example ${props.additionalClasses}`}
              striped
              responsive
              borderless
            >
              {props.children}
            </Table>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CommonTable;
