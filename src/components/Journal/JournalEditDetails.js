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
    CardTitle
} from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';


const JournalEditDetails = ({journalData,handleInputs}) => {
    JournalEditDetails.propTypes = {
        journalData: PropTypes.bool,
        handleInputs: PropTypes.func,
  };
  console.log("journalData",journalData)
    return (
        <>
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
                                            <Input type="date" name="entry_date" onChange={handleInputs} 
                                             value={moment.utc(journalData[0]?.entry_date).format('YYYY-MM-DD')}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md="8">
                                        <FormGroup>
                                            <Label>Narration</Label>
                                            <Input type="text" name="website" onChange={handleInputs} defaultValue={journalData?.narration_main}/>
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
                                                            <Input type="text" name="acc_head" placeholder="" onChange={handleInputs} defaultValue={journalData[0]?.acc_head}/>
                                                            <Label></Label>
                                                            <Input type="text" name="narration_main" placeholder="Narration" onChange={handleInputs} defaultValue={journalData[0]?.narration_main}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="2">
                                                        <FormGroup>
                                                            <Input type="text" name="debit" placeholder="Debit" onChange={handleInputs} defaultValue={journalData[0]?.debit}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="2">
                                                        <FormGroup>
                                                            <Input type="text" name="credit" placeholder="Credit" onChange={handleInputs} defaultValue={journalData[0]?.credit}/>
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
                                                            <Input type="text" name="acc_head" placeholder="" defaultValue={journalData[1]?.acc_head}/>
                                                            <Label></Label>
                                                            <Input type="text" name="narration_main" placeholder="Narration" defaultValue={journalData[1]?.narration_main}/>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="2">
                                                        <FormGroup>
                                                            <Input type="text" name="debit" placeholder="Debit" defaultValue={journalData[1]?.debit} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="2">
                                                        <FormGroup>
                                                            <Input type="text" name="credit" placeholder="Credit" defaultValue={journalData[1]?.credit} />
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
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default JournalEditDetails;