import React, {useContext, useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../form-editor/editor.scss';
import moment from 'moment';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import ChangeRequestButton from '../../components/ChangeRequestTable/ChangeRequestButton';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';





const ChangeRequestEdit = () => {
  // All state variables

  const [changerequesteditdetails, setChangeRequestDetails] = useState();
  const [project, setProject] = useState([]);

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  //Get Staff Details
  const { loggedInuser } = useContext(AppContext);

  //Setting data in Change Request Edit Details
  const handleInputs = (e) => {
    setChangeRequestDetails({ ...changerequesteditdetails, [e.target.name]: e.target.value });
  };

  // Get Change Request data By Purchase Id
  const getChangeRequestById = () => {
    api
      .post('/changerequest/getChangeRequestById', { change_request_id : id })
      .then((res) => {
        setChangeRequestDetails(res.data.data[0]);
      })
  };

  //Edit Change Request Data
  const editChangeRequestData = () => {
    if (changerequesteditdetails.change_request_title)
    {
      changerequesteditdetails.modification_date = creationdatetime;
      changerequesteditdetails.modified_by= loggedInuser.first_name; 
      api
        .post('/changerequest/editChangeRequest', changerequesteditdetails)
        .then(() => {
          message('Record edited successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  const getProjectTitle = () => {
    api
      .get('/changerequest/getProjectTitle')
      .then((res) => {
        setProject(res.data.data);
      })
      .catch(() => {
        message('Supplier not found', 'info');
      });
  };

  //useEffect
  useEffect(() => {
    getChangeRequestById();
    getProjectTitle();
  }, [id]);

  return (
    <>
      <BreadCrumbs heading={changerequesteditdetails && changerequesteditdetails.title} />
      <Form>
        <FormGroup>
          <ChangeRequestButton id={id} editChangeRequestData={editChangeRequestData} navigate={navigate} />
          
          {/* Content Details Form */}
          <ComponentCard title="Change request Details" creationModificationDate={changerequesteditdetails}>
            <ToastContainer></ToastContainer>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Title<span className='required'>*</span></Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={changerequesteditdetails && changerequesteditdetails.change_request_title}
                    name="change_request_title"
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label> Project Name </Label>
                    <Input
                          type="select"
                          onChange={handleInputs}
                          value={changerequesteditdetails && changerequesteditdetails.project_id}
                          name="project_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {project &&
                            project.map((e) => {
                              return (
                                <option key={e.project_id} value={e.project_id}>
                                  {e.title}
                                </option>
                              );
                            })}
                     </Input>
              </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label> Submission Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={changerequesteditdetails && moment(changerequesteditdetails.submission_date).format('YYYY-MM-DD')}
                    name="submission_date"
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label> Implementation Date</Label>
                  <Input
                    type="date"
                    onChange={handleInputs}
                    value={changerequesteditdetails && moment(changerequesteditdetails.proposed_implementation_date).format('YYYY-MM-DD')}
                    name="proposed_implementation_date"
                  />
                </FormGroup>
              </Col>
              </Row>
              <Row>
              <Col md="3">
                <FormGroup>
                  <Label> Status </Label>
                  <Input
                    value={changerequesteditdetails && changerequesteditdetails.status}
                    type="select"
                    onChange={handleInputs}
                    name="status"
                  >
                    <option value="">Please Select</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </Input>
                  </FormGroup>
                  </Col>
                  <Col md="3">
                <FormGroup>
                  <Label> Description </Label>
                  <Input
                    value={changerequesteditdetails && changerequesteditdetails.description}
                    type="textarea"
                    onChange={handleInputs}
                    name="description"
                  />
                </FormGroup>
              </Col>
              </Row>
              </ComponentCard>
              </FormGroup>
            </Form>
</>   
  );
};
export default ChangeRequestEdit;
