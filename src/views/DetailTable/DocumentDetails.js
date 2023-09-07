import React, {useContext, useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import message from '../../components/Message';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';

const ProductDetails = () => {
  //All const variables
  const navigate = useNavigate();
  const [documentdetails, setDocumentDetails] = useState({
    document_title: '',
    project_id: '',
  });
  const [projectgetdetails, setProjectDetails] = useState();
  const [projecttitle, setProjectTitle] = useState();
  //setting data in ProductDetails
  const handleInputs = (e) => {
    setDocumentDetails({ ...documentdetails, [e.target.name]: e.target.value });
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);
  
  //Insert Product Data
  const insertDocument = (DocumentCode) => {
    if (documentdetails.document_title !== '' &&
      documentdetails.project_id!=='') 
      {
      documentdetails.document_code = DocumentCode;
      documentdetails.creation_date = creationdatetime;
      documentdetails.created_by= loggedInuser.first_name;   
      api
        .post('/document/insertDocument', documentdetails)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          message('Product inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/DocumentEdit/${insertedDataId}`);
          }, 300);
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };


  //Auto generation code
  const generateCode = () => {
    api
      .post('/document/getCodeValue', { type: 'DocumentCode' })
      .then((res) => {
        const DocumentCode = res.data.data
        insertDocument(DocumentCode);
      })
      .catch(() => {
        insertDocument('');
      });
  };

  const getProjectId = () => {
    api
      .get('/document/getProjectTitle')
      .then((res) => {
        setProjectTitle(res.data.data);
        console.log(res.data.data[0]);
      })
      .catch(() => {
        message('Document not found', 'info');
      });
  };

  // Get Project data By Project Id
  const getProjectDataById = () => {
    api
      .post('/project/getProjectById', { project_id: documentdetails.project_id })
      .then((res) => {
        setProjectDetails(res.data.data);
        console.log(res.data.data[0]);
      })
  };

  const editDocumentData = () => {
    
    documentdetails.quote_id= projectgetdetails.quote_id; 
    documentdetails.contact_id = projectgetdetails.contact_id;
    documentdetails.company_id= projectgetdetails.company_id; 

      api
        .post('/document/editDocument', documentdetails)
        .then(() => {
          message('Record edited successfully', 'success');
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
    
  };

  //useeffect
  useEffect(() => {
    getProjectDataById();
    getProjectId();
  }, []);

  return (
    <div>
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
      <Row>
        <Col md="6">
          <ComponentCard title="Key Details">
            <Form>
              <FormGroup>
                <Row>
                <Col md="12">
                    <Label>Doc Title <span className="required"> *</span> </Label>
                    <Input
                          type="text"
                          onChange={handleInputs}
                          value={documentdetails && documentdetails.document_title}
                          name="document_title"
                        >
                        </Input>
                  </Col>
                  <Col md="12">
                    <Label>Product Name <span className="required"> *</span> </Label>
                    <Input
                          type="select"
                          onChange={handleInputs}
                          value={documentdetails && documentdetails.project_id}
                          name="project_id"
                        >
                          <option defaultValue="selected">Please Select</option>
                          {projecttitle &&
                            projecttitle.map((e) => {
                              return (
                                <option key={e.project_id} value={e.project_id}>
                                  {e.title}
                                </option>
                              );
                            })}
                        </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                    <Button
                      className="shadow-none"
                      color="primary"
                      onClick={() => {
                        generateCode();
                        editDocumentData();
                      }}
                    >
                      Save & Continue
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/Document');
                      }}
                      type="button"
                      className="btn btn-dark shadow-none"
                    >
                      Go to List
                    </Button>
                  </div>
                </Row>
              </FormGroup>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};
export default ProductDetails;
