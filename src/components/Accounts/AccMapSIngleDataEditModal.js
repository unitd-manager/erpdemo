import React, { useState, useEffect } from 'react';
// import * as Icon from 'react-feather';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Form,
} from 'reactstrap';
import moment from 'moment';
import message from '../Message';
import api from '../../constants/api';

const AccMapSIngleDataEditModal = ({ editMenuItemModal, setEditMenuItemModal, clickedMenuItem, menuItems }) => {
    AccMapSIngleDataEditModal.propTypes = {
        editMenuItemModal: PropTypes.bool,
        setEditMenuItemModal: PropTypes.func,
        clickedMenuItem: PropTypes.object,
        menuItems: PropTypes.any,
    };

    const [formData, setFormData] = useState({
        title: '',
        code: '',
        modification_date: moment(Date.now()).format('YYYY-MM-DD'),
        parent_id: '',
        category_type: '',
        acc_category_id: ''
    });


    useEffect(() => {
        if (editMenuItemModal && clickedMenuItem) {
            setFormData({
                title: clickedMenuItem.title,
                code: clickedMenuItem.code,
                modification_date: moment(Date.now()).format('YYYY-MM-DD'),
                parent_id: clickedMenuItem?.parent_id,
                category_type: clickedMenuItem.category_type,
                acc_category_id: clickedMenuItem.acc_category_id,
            });
        }
    }, [editMenuItemModal, clickedMenuItem]);

    const handleInputs = (e) => {
        const { name, value } = e.target;
        if (name === "acc_category_id") {
            setFormData({ ...formData, parent_id: value });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const UpdateData = () => {
        api
            .post('/accountsMap/editMenuItems', formData)
            .then(() => {
                message('Record editted successfully', 'success');
                setTimeout(() => {
                    window.location.reload();
                  }, 300);
            })
            .catch(() => {
                message('Unable to edit record.', 'error');
            });
    };

    return (
        <>
            <Modal size="1" isOpen={editMenuItemModal}>
                <ModalHeader>
                    New Menu Item
                    <Button
                        color="secondary"
                        onClick={() => {
                            setEditMenuItemModal(false);
                        }}
                    >
                        X
                    </Button>
                </ModalHeader>

                <ModalBody>
                    <Row>
                        <Col md="12">
                            <Form>
                                <Row>
                                    <Col md="12">

                                        <FormGroup>
                                            <Label>Parent</Label>
                                            <Input type="select" name="acc_category_id" defaultValue={clickedMenuItem ? clickedMenuItem?.parent_id : ''} onChange={handleInputs} >
                                                <option value="">Please Select</option>
                                                {menuItems?.map((item) => (
                                                    <option
                                                        key={item.acc_category_id}
                                                        value={item.acc_category_id}
                                                        selected={item?.acc_category_id === clickedMenuItem?.parent_id}
                                                    >
                                                        {item?.title}
                                                    </option>
                                                ))}
                                            </Input>
                                        </FormGroup>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label>Title</Label>
                                            <Input
                                                type="text"
                                                name="title"
                                                defaultValue={clickedMenuItem ? clickedMenuItem.title : ''}
                                                onChange={handleInputs}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label>Code</Label>
                                            <Input
                                                type="text"
                                                name="code"
                                                defaultValue={clickedMenuItem ? clickedMenuItem.code : ''}
                                                onChange={handleInputs}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <FormGroup>
                                            <Label>Please Select</Label>
                                            <Input type="select" name="category_type"
                                                onChange={handleInputs} >
                                                <option>Select Customer</option>
                                                <option value="Bank Account">Bank Account</option>
                                                <option value="Cash Account">Cash Account</option>
                                                <option value="Sundry Creditor / Debtor">Sundry Creditor / Debtor</option>
                                                <option value="Counter">Counter</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </ModalBody>

                <ModalFooter>
                    <Button
                        className="shadow-none"
                        color="primary"
                        onClick={() => {
                            UpdateData();
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => {
                            setEditMenuItemModal(false);
                        }}
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default AccMapSIngleDataEditModal;
