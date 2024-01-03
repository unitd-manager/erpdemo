import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../components/ComponentCard';
import api from '../../constants/api';
import creationdatetime from '../../constants/creationdatetime';
import AppContext from '../../context/AppContext';
import message from '../../components/Message';
import 'bootstrap/dist/css/bootstrap.min.css';
import TenderCompanyDetails from '../../components/TenderTable/TenderCompanyDetails';

const OpportunityDetails = () => {
  const [company, setCompany] = useState();
  const [allCountries, setallCountries] = useState();
  const [modal, setModal] = useState(false);
  const [categoryLinked, setCategoryLinked] = useState();
  const [formSubmitted, setFormSubmitted] = useState(false);
  //const [addFormSubmitted, setAddFormSubmitted] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const toggle = () => {
    setModal(!modal);
  };
  //get staff details
  const { loggedInuser } = useContext(AppContext);
  //Api call for getting company dropdown
  const getCompany = () => {
    api.get('/company/getCompany').then((res) => {
      setCompany(res.data.data);
    });
  };



  //Logic for adding tender in db
  const [tenderForms, setTenderForms] = useState({
    title: '', // Default value for title
    company_id: '', // Default value for company_id
    category: '', // Default value for category
  });

  const handleInputsTenderForms = (e) => {
    setTenderForms({ ...tenderForms, [e.target.name]: e.target.value });
  };

  //Api for getting all countries
  const getAllCountries = () => {
    api
      .get('/clients/getCountry')
      .then((res) => {
        setallCountries(res.data.data);
      })
      .catch(() => {
        //message('Country Data Not Found', 'info');
      });
  };
  //const[tenderDetails,setTenderDetails]=useState();
  const getTendersById = () => {
    api
      .post('/tender/getTendersById', { opportunity_id: id })
      .then((res) => {
        setTenderForms(res.data.data);
        // getContact(res.data.data.company_id);
      })
      .catch(() => { });
  };
  //console.log(tenderDetails);
  const insertTender = (code) => {
    setFormSubmitted(true);
    tenderForms.created_by = loggedInuser.first_name;
    tenderForms.creation_date = creationdatetime;
    if (tenderForms.title.trim() !== '' && tenderForms.category.trim() !== '')  {
      tenderForms.opportunity_code = code;
      api
        .post('/tender/insertTenders', tenderForms)
        .then((res) => {
          const insertedDataId = res.data.data.insertId;
          getTendersById();
          message('Tender inserted successfully.', 'success');
          setTimeout(() => {
            navigate(`/EnquiryEdit/${insertedDataId}?tab=1`);
          }, 300);
        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields', 'warning');
    }
  };

  //QUTO GENERATED CODE
  const generateCode = () => {
    api
      .post('/tender/getCodeValue', { type: 'enquiry' })
      .then((res) => {
        insertTender(res.data.data);
      })
      .catch(() => {
        insertTender('');
      });
  };
  //Logic for adding company in db
  const [companyInsertData, setCompanyInsertData] = useState({
    company_name: '',
    address_street: '',
    address_town: '',
    address_country: 'Singapore',
    address_po_code: '',
    phone: '',
    fax: '',
    website: '',
    supplier_type: '',
    industry: '',
    company_size: '',
    source: '',
  });

  const handleInputs = (e) => {
    setCompanyInsertData({ ...companyInsertData, [e.target.name]: e.target.value });
  };

  const insertCompany = () => {
    if (
      companyInsertData.company_name !== '' &&
      companyInsertData.address_street !== '' &&
      companyInsertData.address_po_code !== '' &&
      companyInsertData.address_country !== ''
    ) {
      api
        .post('/company/insertCompany', companyInsertData)
        .then((res) => {
          getCompany();
          const newlyAddedCompanyId = res.data.data.insertId;
          setTenderForms({ ...tenderForms, company_id: newlyAddedCompanyId });
          setTenderForms({ ...tenderForms, company_id: res.data.data.insertId }); // Set selected company ID after insertion
          message('Company inserted successfully.', 'success');
           toggle();

        })
        .catch(() => {
          message('Network connection error.', 'error');
        });
    } else {
      message('Please fill all required fields.', 'warning');
    }
  };

  const getCategory = () => {
    api.get('/tender/getCategoryFromValueList', categoryLinked).then((res) => {
      setCategoryLinked(res.data.data);
    });
  };
  useEffect(() => {
    getCompany();
    getCategory();
    getAllCountries();
  }, [id]);

  return (
    <div>
      <BreadCrumbs />
      <Row>
        <ToastContainer></ToastContainer>
        <Col md="6" xs="12">
          <ComponentCard title="New Opportunity">
            <Form>
              <FormGroup>
                <Row>
                  <Col md="9">
                    <Label>
                      {' '}
                      Title <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="text"
                      name="title"
                      value={tenderForms && tenderForms?.title}
                      onChange={handleInputsTenderForms}
                      className={`form-control ${
                        formSubmitted && tenderForms.title.trim() === '' ? 'highlight' : ''
                      }`}
                    />
                    {formSubmitted && tenderForms.title.trim() === '' && (
                      <div className="error-message">Please Enter Title</div>
                    )}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md="9">
                    <Label>
                      Company Name <span className="required"> *</span>{' '}
                    </Label>
                    <Input
                      type="select"
                      name="company_id"
                      value={tenderForms?.company_id || ''}
                      onChange={(e) => {
                        setTenderForms({ ...tenderForms, company_id: e.target.value });
                        handleInputsTenderForms(e);
                      }}
                    // onChange={(e) => {
                    //   handleInputsTenderForms(e);
                    //                     }}
                    //getContact(e.target.value);
                    //value={tenderForms && tenderForms.company_id}
                    >

                      <option >Please Select</option>
                      {company &&
                        company.map((e) => {
                          return (
                            <option key={e.company_id} value={e.company_id}>
                              {' '}
                              {e.company_name}{' '}
                            </option>
                          );
                        })}
                    </Input>
                  </Col>
                  <Col md="3" className="addNew">
                    <Label>Add New Name</Label>
                    <Button color="primary" className="shadow-none" onClick={toggle.bind(null)}>
                      Add New
                    </Button>
                  </Col>
                </Row>
                {/* <FormGroup>
                  <Label>
                    Company Name (OR){' '}
                                     </Label>
                  <Input
                    type="select"
                    onChange={
                      handleInputsTenderForms
                      
                    }
                    value={companyInsertData && companyInsertData.company_name}
                    name="company_id"
                  >
                    <option >Please Select</option>
                    {company &&
                      company.map((e) => {
                        return (
                          <option key={e.company_id} value={e.company_id}>
                            {' '}
                            {e.company_name}{' '}
                          </option>
                        );
                      })}

                   
                  </Input>
                </FormGroup> */}
              </FormGroup>
              <TenderCompanyDetails
                allCountries={allCountries}
                companyInsertData={companyInsertData}
                insertCompany={insertCompany}
                handleInputs={handleInputs}
                toggle={toggle}
                modal={modal}
                setModal={setModal}
              ></TenderCompanyDetails>

              <FormGroup>
                <Col md="9">
                  <Label>
                    Category <span className="required"> *</span>
                  </Label>
                  <Input
                    type="select"
                    onChange={handleInputsTenderForms}
                    value={tenderForms && tenderForms.category}
                    name="category"
                    className={`form-control ${
                      formSubmitted && tenderForms.category.trim() === '' ? 'highlight' : ''
                    }`}
                  >
                    <option value="" selected="selected">
                      Please Select
                    </option>
                    {categoryLinked &&
                      categoryLinked.map((ele) => {
                        return <option value={ele.value}>{ele.value}</option>;
                      })}
                  </Input>
                  {formSubmitted && tenderForms.category.trim() === '' && (
                      <div className="error-message">Please Select Category</div>
                    )}
                </Col>
              </FormGroup>
              <Row>
                <div className="pt-3 mt-3 d-flex align-items-center gap-2">
                  <Button
                    type="button"
                    color="primary"
                    className="btn mr-2 shadow-none"
                    onClick={() => {
                      generateCode();
                    }}
                  >
                    Save & Continue
                  </Button>
                  <Button
                    className="shadow-none"
                    color="dark"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to cancel  \n  \n You will lose any changes made',
                        )
                      ) {
                        navigate(-1);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Row>
            </Form>
          </ComponentCard>
        </Col>
      </Row>
    </div>
  );
};

export default OpportunityDetails;