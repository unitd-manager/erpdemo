import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import ComponentCard from '../ComponentCard';

const ProjectEditForm = ({ projectDetail, setProjectDetail, contact, incharge,formSubmitted }) => {
  ProjectEditForm.propTypes = {
    projectDetail: PropTypes.any,
    setProjectDetail: PropTypes.any,
    contact: PropTypes.any,
    incharge: PropTypes.any,
    formSubmitted:PropTypes.any,
  };
  // Edit Project
  const handleInputs = (e) => {
    setProjectDetail({ ...projectDetail, [e.target.name]: e.target.value });
  };


  return (
    <>
      <Form>
        <FormGroup>
          <ComponentCard title="Project Details">
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    name="title"
                    defaultValue={projectDetail && projectDetail.title}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>
                    Category <span className="required"> *</span>{' '}
                  </Label>
                  <Input
                    type="select"
                    name="category"
                    value={projectDetail && projectDetail.category}
                    onChange={handleInputs}
                    className={`form-control ${
                      formSubmitted && projectDetail.category.trim() === '' ? 'highlight' : ''
                    }`}
                  >
                    <option value="">Please Select</option>
                    <option value="Project">Project</option>
                    <option defaultValue="selected" value="Maintenance">
                      Maintenance
                    </option>
                    <option value="Tenancy Project">Tenancy Project</option>
                    <option value="Tenancy Work">Tenancy Work</option>
                  </Input>
                  {formSubmitted && projectDetail.category.trim() === '' && (
                      <div className="error-message">Please Select Category</div>
                    )}
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Status </Label>
                  <Input
                    type="select"
                    name="status"
                    value={projectDetail && projectDetail.status}
                    onChange={handleInputs}
                  >
                    <option value="">Please Select</option>
                    <option defaultValue="selected" value="WIP">
                      WIP
                    </option>
                    <option value="Billable">Billable</option>
                    <option value="Billed">Billed</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Latest">Latest</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Company</Label>
                  <Input
                    type="text"
                    disabled
                    name="company_name"
                    defaultValue={projectDetail && projectDetail.company_name}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Contact</Label>
                  <Input
                    type="select"
                    name="contact_id"
                    onChange={handleInputs}
                    value={projectDetail && projectDetail.contact_id}
                  >
                    <option value="selected">Please Select</option>
                    {contact &&
                      contact.map((ele) => {
                        return (
                          <option key={ele.contact_id} value={ele.contact_id}>
                            {ele.first_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>

              <Col md="3">
                <FormGroup>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    name="start_date"
                    defaultValue={projectDetail && projectDetail.start_date}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Estimated Finish Date</Label>
                  <Input
                    type="date"
                    name="estimated_finish_date"
                    defaultValue={projectDetail && projectDetail.estimated_finish_date}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Description</Label>
                  <Input
                    type="text"
                    name="description"
                    defaultValue={projectDetail && projectDetail.description}
                    onChange={handleInputs}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>Project Manager</Label>
                  <Input
                    type="select"
                    name="project_manager_id"
                    onChange={handleInputs}
                    value={projectDetail && projectDetail.project_manager_id}
                  >
                    <option value="selected">Please Select</option>
                    {incharge &&
                      incharge.map((ele) => {
                        return (
                          <option value={ele.employee_id} key={ele.first_name}>
                            {ele.first_name}
                          </option>
                        );
                      })}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </ComponentCard>
        </FormGroup>
      </Form>
    </>
  );
};

export default ProjectEditForm;
