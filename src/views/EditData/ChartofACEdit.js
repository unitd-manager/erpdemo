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
      <ComponentCard title="Chart of AC Edit" creationModificationDate={chartofAC}>
        <Form>
          <FormGroup>
            <Row>
              <Col md="4">
                <FormGroup>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={chartofAC?.title}
                    name="title"
                  />
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup>
                  <Label>Code</Label>
                  <Input
                    type="text"
                    onChange={handleInputs}
                    value={chartofAC && chartofAC?.code}
                    name="code"
                  />
                </FormGroup>
              </Col>

              <Col md="4">
                <FormGroup>
                  <Label>Category</Label>
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

            </Row>
          </FormGroup>
        </Form>
      </ComponentCard>

    </>
  );
};
export default ChartofACEdit;
