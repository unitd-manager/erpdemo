import React, { useEffect, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  ModalBody,
  ModalFooter,
  Modal,
  ModalHeader,
} from 'reactstrap';
import PropTypes from 'prop-types';
import message from '../Message';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '../../views/form-editor/editor.scss';
import AppContext from '../../context/AppContext';
import creationdatetime from '../../constants/creationdatetime';

import api from '../../constants/api';

const ContactEditModal = ({ contactData, editContactEditModal, setEditContactEditModal, formSubmitted, setFormSubmitted }) => {
  ContactEditModal.propTypes = {
    contactData: PropTypes.object,
    editContactEditModal: PropTypes.bool,
    setEditContactEditModal: PropTypes.func,
    formSubmitted: PropTypes.any,
    setFormSubmitted: PropTypes.any,
  };

  const [contactinsert, setContactInsert] = useState(null);

  const handleInputs = (e) => {
    setContactInsert({ ...contactinsert, [e.target.name]: e.target.value });
  };
  const { loggedInuser } = useContext(AppContext);

  //Logic for edit data in db

  const editContactsData = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(contactinsert.email)) {
      message('Invalid email address', 'warning');
    }
    else if (contactinsert.first_name !== '' &&
    contactinsert.email !== ''
    ) {
      contactinsert.modification_date = creationdatetime;
      contactinsert.modified_by = loggedInuser.first_name;
    api
      .post('/clients/editContact', contactinsert)
      .then(() => {
        message('Record editted successfully', 'success');
        window.location.reload();
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
    }  
  };
  const handleSave = () => {
    setFormSubmitted(true);
    editContactsData();

  };
  useEffect(() => {
    setContactInsert(contactData);
  }, [contactData]);

  return (
    <>
      <Modal size="lg" isOpen={editContactEditModal}>
        <ModalHeader>
          Edit Contact
          <Button
            color="secondary"
            onClick={() => {
              setEditContactEditModal(false);
            }}
          >
            X
          </Button>
        </ModalHeader>

        <ModalBody>
          <Row>
            <Col md="3" className="mb-4 d-flex justify-content-between"></Col>
          </Row>
          <Row>
            <Col md="4">
            <FormGroup>
              <Label>Title<span className="required"> *</span> </Label>
              <Input
                type="select"
                onChange={handleInputs}
                value={contactinsert && contactinsert.salutation}
                name="salutation"
              >
                <option value="" selected="selected">
                  Please Select
                </option>
                <option value="Ms">Ms</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
              </Input>
              </FormGroup>              
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Name <span className="required"> *</span></Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.first_name}
                  name="first_name"
                  className={`form-control ${
                    formSubmitted && contactinsert && contactinsert.first_name.trim() === '' ? 'highlight' : ''
                  }`}
                />
                {formSubmitted && contactinsert && contactinsert.first_name.trim() === '' && (
                <div className="error-message">Please Enter</div>
              )}
              </FormGroup>
            </Col>

            <Col md="4">
              <FormGroup>
                <Label>Email <span className="required"> *</span></Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.email}
                  name="email"
                  className={`form-control ${
                    formSubmitted && contactinsert && contactinsert.email.trim() === '' ? 'highlight' : ''
                  }`}
                />
                {formSubmitted && contactinsert && contactinsert.email.trim() === '' && (
                <div className="error-message">Please Enter</div>
              )}
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Position </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.position}
                  name="position"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Dept </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.department}
                  name="department"
                />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
                <Label>Phone(Direct) </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.phone_direct}
                  name="phone_direct"
                />
              </FormGroup>
            </Col>

            <Col md="4">
              <FormGroup>
                <Label>Fax(Direct) </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.fax}
                  name="fax"
                />
              </FormGroup>
            </Col>

            <Col md="4">
              <FormGroup>
                <Label>Mobile </Label>
                <Input
                  type="text"
                  onChange={handleInputs}
                  value={contactinsert && contactinsert.mobile}
                  name="mobile"
                />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>

        <ModalFooter>
        
              <Button
                color="primary"
                onClick={() => {
                  handleSave();
                  setFormSubmitted(true)
                }}
              >
                Submit
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  setEditContactEditModal(false);
                }}
              >
                Cancel
              </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ContactEditModal;
