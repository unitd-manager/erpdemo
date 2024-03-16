import React, { useEffect, useState } from 'react';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import message from '../../components/Message';
import creationdatetime from '../../constants/creationdatetime';
import api from '../../constants/api';
import AccountMapButton from '../../components/Accounts/AccountMapButton';
import ComponentCard from '../../components/ComponentCard';

const ChartofACEdit = () => {
  //Const Variables
  const [chartofAC, setChartofAC] = useState();
  const [menuItems, setMenuItems] = useState([]);

  // Navigation and Parameter Constants
  const { id } = useParams();
  const navigate = useNavigate();

  // Button Save Apply Back List
  const applyChanges = () => { };
  const backToList = () => {
    navigate('/ChartOfAccounts');
  };

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };
  
const selectedLanguage = getSelectedLanguageFromLocalStorage();

// Use the selected language value as needed
console.log('Selected language from localStorage:', selectedLanguage);

  // Get Leaves By Id
  const ChartofACById = () => {
    api
      .post('/chartofaccounts/getChartofACById', { acc_head_id: id })
      .then((res) => {
        setChartofAC(res.data.data[0]);
      })
      .catch(() => {
        message('Unable to edit record.', 'error');
      });
  };

  const getGroup = () => {
    api.get('/accountsMap/getParentItem').then((res) => {
      setMenuItems(res.data.data);
    });
  };
  const [arabic, setArabic] = useState([]);


  const arb =selectedLanguage === 'Arabic'

  const eng =selectedLanguage === 'English'
  

  const getArabicCompanyName = () => {
    if(selectedLanguage === 'Arabic'){
      api
      .get('/translation/getTranslationForCompany')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
    }else{
      api
      .get('/translation/getTranslationEnglish')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
    }
   
  };
  console.log('arabic',arabic)
  useEffect(() => {
    getArabicCompanyName();
  }, []);

  // Handle Data
  const handleInputs = (e) => {
    setChartofAC({ ...chartofAC, [e.target.name]: e.target.value });
  };

  //Logic for edit data in db
  const editChartOfAcc = () => {
    chartofAC.modification_date = creationdatetime;
      api
        .post('/chartofaccounts/editChartAc', chartofAC)
        .then(() => {
          message('Record editted successfully', 'success');
          ChartofACById();
        })
        .catch(() => {
          message('Unable to edit record.', 'error');
        });
  };

  useEffect(() => {
    ChartofACById();
    getGroup();
  }, [id]);

  return (
    <>
      {/* BreadCrumbs */}
      <BreadCrumbs />
      <ToastContainer></ToastContainer>
    
      {/* Button */}
      <AccountMapButton
        editData={editChartOfAcc}
        navigate={navigate}
        applyChanges={applyChanges}
        backToList={backToList}
      ></AccountMapButton>

      {/* Main Details */}
      {arb===true &&
      <ComponentCard title= 'Chart of Account Edit'  creationModificationDate={chartofAC}>
        <Form>
          <FormGroup>
            <Row>
             { eng === true &&
        <Col md="4">
      <FormGroup>
        <Label dir="rtl" style={{ textAlign: 'right' }}>
       
        {arabic.find(item => item.key_text === 'cm.websiteClient')?.english_value}  {/*Access the value property */}
         <span className="required"> *</span>
        </Label>
        <Input
          type="text"
          onChange={handleInputs}
          value={chartofAC?.title}
          name="title"
        />
      </FormGroup>
    </Col>
       }

    {arb===true &&
        <Col md="4">
      <FormGroup>
        <Label dir="rtl" style={{ textAlign: 'right' }}>
        
        {arabic.find(item => item.key_text === 'cm.websiteClient')?.value}   {/*Access the value property */}
         <span className="required">*</span> 
        </Label>
        <Input
          type="text"
          onChange={handleInputs}
          value={chartofAC?.title_arb}
          name="title_arb"
        />
      </FormGroup>
    </Col>
       }


            { eng === true &&
              <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
       
                  {arabic.find(item => item.key_text === 'cm.chartAccCode')?.english_value}  {/*Access the value property */}
                    <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={chartofAC && chartofAC?.code}
                    name="code"
                  />
                </FormGroup>
              </Col>
            }


          { arb === true &&
              <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
       
                  {arabic.find(item => item.key_text === 'cm.chartAccCode')?.value}  {/*Access the value property */}
                    <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={chartofAC && chartofAC?.code}
                    name="code"
                  />
                </FormGroup>
              </Col>
            }
             { arb === true &&

              <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
       
                {arabic.find(item => item.key_text === 'cm.chartAccCategory')?.value}  {/*Access the value property */}
                  <span className="required"> *</span>
                </Label>
                  <Input 
                    type="select"
                    name="acc_category_id"
                    value={chartofAC?.acc_category_id}
                    onChange={handleInputs}
                  >
                    <option value="selected">Please Select</option>
                    {menuItems?.map((item) => (
                      <option
                        key={item.acc_category_id}
                        value={item.acc_category_id}
                      >
                        {item.title}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              }

{ eng === true &&

<Col md="4">
  <FormGroup>
  <Label dir="rtl" style={{ textAlign: 'right' }}>

  {arabic.find(item => item.key_text === 'cm.chartAccCategory')?.english_value}  {/*Access the value property */}
    <span className="required"> *</span>
  </Label>
    <Input 
      type="select"
      name="acc_category_id"
      value={chartofAC?.acc_category_id}
      onChange={handleInputs}
    >
      <option value="selected">Please Select</option>
      {menuItems?.map((item) => (
        <option
          key={item.acc_category_id}
          value={item.acc_category_id}
        >
          {item.title}
        </option>
      ))}
    </Input>
  </FormGroup>
</Col>
}
            </Row>
          </FormGroup>
        </Form>
      </ComponentCard>
}
{eng===true &&
      <ComponentCard title='Chart of Account Edit' creationModificationDate={chartofAC}>
        <Form>
          <FormGroup>
            <Row>
             { eng === true &&
        <Col md="4">
      <FormGroup>
        <Label dir="rtl" style={{ textAlign: 'right' }}>
       
        {arabic.find(item => item.key_text === 'cm.websiteClient')?.english_value}  {/*Access the value property */}
         <span className="required"> *</span>
        </Label>
        <Input
          type="text"
          onChange={handleInputs}
          value={chartofAC?.title}
          name="title"
        />
      </FormGroup>
    </Col>
       }

    {arb===true &&
        <Col md="4">
      <FormGroup>
        <Label dir="rtl" style={{ textAlign: 'right' }}>
        
        {arabic.find(item => item.key_text === 'cm.websiteClient')?.value}   {/*Access the value property */}
         <span className="required">*</span> 
        </Label>
        <Input
          type="text"
          onChange={handleInputs}
          value={chartofAC?.title_arb}
          name="title_arb"
        />
      </FormGroup>
    </Col>
       }


            { eng === true &&
              <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
       
                  {arabic.find(item => item.key_text === 'cm.chartAccCode')?.english_value}  {/*Access the value property */}
                    <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={chartofAC && chartofAC?.code}
                    name="code"
                  />
                </FormGroup>
              </Col>
            }


          { arb === true &&
              <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
       
                  {arabic.find(item => item.key_text === 'cm.chartAccCode')?.value}  {/*Access the value property */}
                    <span className="required"> *</span>
                  </Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={chartofAC && chartofAC?.code}
                    name="code"
                  />
                </FormGroup>
              </Col>
            }
             { arb === true &&

              <Col md="4">
                <FormGroup>
                <Label dir="rtl" style={{ textAlign: 'right' }}>
       
                {arabic.find(item => item.key_text === 'cm.chartAccCategory')?.value}  {/*Access the value property */}
                  <span className="required"> *</span>
                </Label>
                  <Input 
                    type="select"
                    name="acc_category_id"
                    value={chartofAC?.acc_category_id}
                    onChange={handleInputs}
                  >
                    <option value="selected">Please Select</option>
                    {menuItems?.map((item) => (
                      <option
                        key={item.acc_category_id}
                        value={item.acc_category_id}
                      >
                        {item.title}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              }

{ eng === true &&

<Col md="4">
  <FormGroup>
  <Label dir="rtl" style={{ textAlign: 'right' }}>

  {arabic.find(item => item.key_text === 'cm.chartAccCategory')?.english_value}  {/*Access the value property */}
    <span className="required"> *</span>
  </Label>
    <Input 
      type="select"
      name="acc_category_id"
      value={chartofAC?.acc_category_id}
      onChange={handleInputs}
    >
      <option value="selected">Please Select</option>
      {menuItems?.map((item) => (
        <option
          key={item.acc_category_id}
          value={item.acc_category_id}
        >
          {item.title}
        </option>
      ))}
    </Input>
  </FormGroup>
</Col>
}
            </Row>
          </FormGroup>
        </Form>
      </ComponentCard>
}
    </>
  );
};
export default ChartofACEdit;
