import React,{useEffect,useState} from 'react';
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import moment from 'moment';
import ComponentCard from '../ComponentCard';
import api from '../../constants/api';

function EmployeePart({ employeeDetails, handleInputChange, allCountries, companies, team }) {
  EmployeePart.propTypes = {
    employeeDetails: PropTypes.object,
    handleInputChange: PropTypes.func,
    allCountries: PropTypes.array,
    companies: PropTypes.array,
    team: PropTypes.array,
  };

  // Use localStorage to get the initial value or set it to 0 by default
  const initialProjectManagerValue = localStorage.getItem('project_manager') || '0';
  const initialTeamLeaderValue = localStorage.getItem('team_leader') || '0';

  // Set the initial state based on localStorage
  const [projectManager, setProjectManager] = React.useState(initialProjectManagerValue);
  const [teamLeader, setTeamLeader] = React.useState(initialTeamLeaderValue);
  React.useEffect(() => {
    // Save the current value to localStorage whenever it changes
    localStorage.setItem('project_manager', projectManager);
    localStorage.setItem('team_leader', teamLeader);
  }, [projectManager, teamLeader]);

  const calculateTotalExperience = (dateJoined) => {
    if (!dateJoined) {
      return '';
    }

    const joinDateTime = new Date(dateJoined);

    const currentDate = new Date();

    const difference = currentDate - joinDateTime;

    const totalYears = difference / (1000 * 60 * 60 * 24 * 365.25);

    const totalMonths = totalYears * 12;

    const years = Math.floor(totalYears);
    const months = Math.floor(totalMonths % 12);

    let experienceString = '';
    if (years > 0) {
      experienceString += `${years} year${years > 1 ? 's' : ''}`;
    }
    if (months > 0) {
      if (experienceString) {
        experienceString += ' ';
      }
      experienceString += `${months} month${months > 1 ? 's' : ''}`;
    }
    return experienceString;
  };

  const totalExperience = calculateTotalExperience(employeeDetails.act_join_date);

  console.log('all countries', allCountries);

  const getSelectedLanguageFromLocalStorage = () => {
    return localStorage.getItem('selectedLanguage') || '';
  };

  const selectedLanguage = getSelectedLanguageFromLocalStorage();

  const [arabic, setArabic] = useState([]);

  const arb = selectedLanguage === 'Arabic';

  //const eng = selectedLanguage === 'English';

  const getArabicCompanyName = () => {
    api
      .get('/purchaserequest/getTranslationForPurchaseRequest')
      .then((res) => {
        setArabic(res.data.data);
      })
      .catch(() => {
        // Handle error if needed
      });
  };

  let genLabel = '';

  if (arb === true) {
    genLabel = 'arb_value';
  } else {
    genLabel = 'value';
  }

  useEffect(() => {
     getArabicCompanyName();
  }, []);

  return (
    <div>
      <FormGroup>
        <ComponentCard title="Personal Information">
          <Row>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Code')?.[genLabel]}</Label>
                <Input
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.emp_code_arb ? employeeDetails.emp_code_arb :
                          (employeeDetails && employeeDetails.emp_code_arb !== null ? '' : employeeDetails && employeeDetails.emp_code)
                        )
                      : (employeeDetails && employeeDetails.emp_code)
                  }
                  name={arb ? 'emp_code_arb' : 'emp_code'}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Full Name')?.[genLabel]}
                   <span style={{ color: 'red' }}>*</span>
                </Label>
                <Input
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.employee_name_arb ? employeeDetails.employee_name_arb :
                          (employeeDetails && employeeDetails.employee_name_arb !== null ? '' : employeeDetails && employeeDetails.employee_name)
                        )
                      : (employeeDetails && employeeDetails.employee_name)
                  }
                  name={arb ? 'employee_name_arb' : 'employee_name'}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Salutation')?.[genLabel]}</Label>
                <Input
                name={arb ? 'salutation_arb' : 'salutation'}
                  
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.salutation_arb ? employeeDetails.salutation_arb :
                          (employeeDetails && employeeDetails.salutation_arb !== null ? '' : employeeDetails && employeeDetails.salutation)
                        )
                      : (employeeDetails && employeeDetails.salutation)
                  }
                  
                  onChange={handleInputChange}
                  type="select"
                >
                  <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
                  <option value="Mr">{arb ?'السيد':'Mr'}</option>
                  <option value="Mrs">{arb ?'السّيدة':'Mrs'}</option>
                  <option value="Ms">{arb ?'آنسة':'Ms'}</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
              <Label dir="rtl" style={{ textAlign: 'right' }}>
                {arabic.find((item) => item.key_text === 'mdEmployee.Gender')?.[genLabel]}
                   <span style={{ color: 'red' }}>*</span>
                </Label>
                <Input
                  
                  name={arb ? 'gender_arb' : 'gender'}
                  value={
                    arb
                      ? (
                        employeeDetails && employeeDetails.gender_arb ? employeeDetails.gender_arb :
                          (employeeDetails && employeeDetails.gender_arb !== null ? '' : employeeDetails && employeeDetails.gender)
                        )
                      : (employeeDetails && employeeDetails.gender)
                  }
                  
                  onChange={handleInputChange}
                  type="select"
                >
                  <option defaultValue="selected">{arb ?'الرجاء التحديد':'Please Select'}</option>
                  <option value="Female">{arb ?'أنثى':'Female'}</option>
                  <option value="Male">{arb ?'ذكر':'Male'}</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>{arb ?'حالة':'Status'}</Label>
                <Input
                  name="status"
                  value={employeeDetails && employeeDetails.status}
                  onChange={handleInputChange}
                  type="select"
                >
                  <option defaultValue="selected" value="Current">
                  {arb ?'حاضِر':'Current'} 
                  </option>
                  <option value="Archive">{arb ?'أرشيف':'Archive'} </option>
                  <option value="Cancel">{arb ?'يلغي':'Cancel'}</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>
                {arb ?'تاريخ الميلاد':'Date of Birth'} <span style={{ color: 'red' }}>*</span>
                </Label>
                <Input
                  type="date"
                  onChange={handleInputChange}
                  name="date_of_birth"
                  value={
                    employeeDetails && moment(employeeDetails.date_of_birth).format('YYYY-MM-DD')
                  }
                  max={moment().format('YYYY-MM-DD')}
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>{arb ?'رقم جواز السفر':'Passport No'}</Label>
                <Input
                  name="passport"
                  value={employeeDetails && employeeDetails.passport}
                  onChange={handleInputChange}
                  type="text"
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Passport Expiry</Label>
                <Input
                  type="date"
                  onChange={handleInputChange}
                  name="date_of_expiry"
                  value={
                    employeeDetails && moment(employeeDetails.date_of_expiry).format('YYYY-MM-DD')
                  }
                  min={moment().format('YYYY-MM-DD')}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>Marital Status</Label>
                <Input
                  name="marital_status"
                  value={employeeDetails && employeeDetails.marital_status}
                  onChange={handleInputChange}
                  type="select"
                >
                  <option>Please Select</option>
                  <option defaultValue="selected" value="Married">
                    Married
                  </option>
                  <option value="Single">Single</option>
                </Input>
              </FormGroup>
            </Col>

            <Col md="3">
              <FormGroup>
                <Label>
                  {/* Nationality */}
                  Nationality <span style={{ color: 'red' }}>*</span>
                </Label>
                {/* <Input
                  name="nationality"
                  value={employeeDetails && employeeDetails.nationality}
                  onChange={handleInputChange}
                  type="select"
                >
                  <option value="">Please Select</option>
                  {allCountries &&
                    allCountries.map((ele) => {
                      return (
                        <option key={ele.country_code} value={parseFloat(ele.country_code)}>
                          {ele.name}
                        </option>
                      );
                    })}
                </Input> */}
                <Input
                  name="nationality"
                  value={employeeDetails && employeeDetails.nationality}
                  onChange={handleInputChange}
                  type="select"
                >
                  <option value="">Please Select</option>
                  {allCountries &&
                    allCountries.map((ele) => {
                      return (
                        <option key={ele.country_code} value={ele.name}>
                          {ele.name}
                        </option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col>

            <Col md="3">
              <FormGroup>
                <Label>Race</Label>
                <Input
                  name="race"
                  value={employeeDetails && employeeDetails.race}
                  onChange={handleInputChange}
                  type="select"
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="Singaporean">Singaporean</option>
                  <option value="Malaysian">Malaysian</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Indian">Indian</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Religion</Label>
                <Input
                  name="religion"
                  value={employeeDetails && employeeDetails.religion}
                  onChange={handleInputChange}
                  type="select"
                >
                  <option defaultValue="selected">Please Select</option>
                  <option value="BUDDHIST">BUDDHIST</option>
                  <option value="CHRISTIAN">CHRISTIAN</option>
                  <option value="HINDU">HINDU</option>
                  <option value="MUSLIM">MUSLIM</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <FormGroup>
                <Label>Project Designation</Label>
                <Input
                  name="project_designation"
                  value={employeeDetails && employeeDetails.project_designation}
                  onChange={handleInputChange}
                  type="select"
                >
                  <option>Please Select</option>
                  <option defaultValue="selected" value="Employee">
                    Employee
                  </option>
                  <option value="Manager">Manager</option>
                  <option value="Supervisor">Supervisor</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Team</Label>
                <Input
                  name="team"
                  value={employeeDetails && employeeDetails.team}
                  onChange={handleInputChange}
                  type="select"
                >
                  <option defaultValue="selected">Please Select</option>
                  {team &&
                    team.map((ele) => (
                      <option key={ele.project_team_id} value={ele.project_team_id}>
                        {ele.team_title}
                      </option>
                    ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Pay</Label>
                <Input
                  name="pay"
                  value={employeeDetails && employeeDetails.pay}
                  onChange={handleInputChange}
                  type="select"
                >
                  <option>Please Select</option>
                  <option defaultValue="selected" value="GroupPay">
                    Group Pay
                  </option>
                  <option value="HourlyPay">Hourly Pay</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Company</Label>
                <Input
                  name="company_id"
                  value={employeeDetails && employeeDetails.company_id}
                  onChange={handleInputChange}
                  type="select"
                >
                  <option value="">Please Select</option>
                  {companies &&
                    companies.map((ele) => {
                      return (
                        <option key={ele.company_id} value={ele.company_id}>
                          {ele.company_name}
                        </option>
                      );
                    })}
                </Input>
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Experience</Label>
                <Input
                  name="totalexperience"
                  value={totalExperience}
                  onChange={handleInputChange}
                  type="text"
                  disabled
                />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <Label>Project manager</Label>
                <br />
                <Label>Yes</Label>
                &nbsp;
                <Input
                  name="project_manager"
                  value="1"
                  type="radio"
                  checked={projectManager === '1'}
                  onChange={(e) => setProjectManager(e.target.value)}
                />
                &nbsp; &nbsp;
                <Label>No</Label>
                &nbsp;
                <Input
                  name="project_manager"
                  value="0"
                  type="radio"
                  checked={projectManager === '0'}
                  onChange={(e) => setProjectManager(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col md="3">
              <FormGroup>
                <Label>Team Leader</Label>
                <br />
                <Label>Yes</Label>
                &nbsp;
                <Input
                  name="team_leader"
                  value="1"
                  type="radio"
                  checked={teamLeader === '1'}
                  onChange={(e) => setTeamLeader(e.target.value)}
                />
                &nbsp; &nbsp;
                <Label>No</Label>
                &nbsp;
                <Input
                  name="team_leader"
                  value="0"
                  type="radio"
                  checked={teamLeader === '0'}
                  onChange={(e) => setTeamLeader(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
        </ComponentCard>
      </FormGroup>
    </div>
  );
}

export default EmployeePart;
