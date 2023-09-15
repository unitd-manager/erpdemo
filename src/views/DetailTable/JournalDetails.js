import React from 'react';
import {
  Row,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  CardTitle,Button
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

const JournalDetails = () => {
  const navigate = useNavigate();

  return (
    <>
      <BreadCrumbs heading='' />

      <Row>
        <Col md="12">
          <Card>
            <CardBody className="bg-light">
              <CardTitle tag="h4" className="mb-0">
                Journal Entry
              </CardTitle>
            </CardBody>
            <CardBody>

              <Form>
                <Row>
                  <Col md="4">
                    <FormGroup>
                      <Label>
                        Entry Date <span className="required"> *</span>
                      </Label>
                      <Input type="date" name="entry_date" />
                    </FormGroup>
                  </Col>
                  <Col md="8">
                    <FormGroup>
                      <Label>Narration</Label>
                      <Input type="text" name="website" />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
            </CardBody>
            <CardBody>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr className="bg-light">
                      <th>
                        <Row>
                          <Col md="8">
                             Account
                          </Col>
                          <Col md="2">
                             Debit
                          </Col>
                          <Col md="2">
                             Credit
                          </Col>
                        </Row>
                      </th>
                      <th>
                        {/* Right side cell content */}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <Row>
                          <Col md="8">
                            <FormGroup>
                              <Input type="text" name="account" placeholder="" />
                              <Label></Label>
                              <Input type="text" name="narration" placeholder="Narration" />
                            </FormGroup>
                          </Col>
                          <Col md="2">
                            <FormGroup>
                              <Input type="text" name="debit" placeholder="Debit" />
                            </FormGroup>
                          </Col>
                          <Col md="2">
                            <FormGroup>
                              <Input type="text" name="credit" placeholder="Credit" />
                            </FormGroup>
                          </Col>
                        </Row>
                      </td>
                      <td>
                        {/* Right side cell content */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Row>
                          <Col md="8">
                            <FormGroup>
                              <Input type="text" name="account" placeholder="" />
                              <Label></Label>
                              <Input type="text" name="narration" placeholder="Narration" />
                            </FormGroup>
                          </Col>
                          <Col md="2">
                            <FormGroup>
                              <Input type="text" name="debit" placeholder="Debit" />
                            </FormGroup>
                          </Col>
                          <Col md="2">
                            <FormGroup>
                              <Input type="text" name="credit" placeholder="Credit" />
                            </FormGroup>
                          </Col>
                        </Row>
                      </td>
                      <td>
                        {/* Right side cell content */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
            <CardBody class="pt-0 card-body">
            <FormGroup>
                <Row>
                  <div className="d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                    >
                      Save & Continue
                    </Button>
                    <Button
                      type="button"
                      className="btn btn-dark shadow-none"
                      onClick={() => {
                        navigate('/Journal');
                      }}
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
              </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default JournalDetails;
