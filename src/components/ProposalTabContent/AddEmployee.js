import React, {useState,useEffect} from 'react';
import { Row, Col, Button } from 'reactstrap';
import { useParams } from 'react-router-dom';
import CommonTable from '../CommonTable';

import ChooseEmployee from '../ProposalModal/ChooseEmployee';
import api from '../../constants/api';


const AddEmployee = () => {

  const { id } = useParams();

  
  const [chooseEmp, setChooseEmp] = useState(false);
  const [getemployeeLinked, setGetEmployeeLinked] = useState([]);
  

    const Employeecolumns = [
        {
          name: '#',
          grow: 0,
          wrap: true,
          width: '4%',
        },
        {
          name: 'Name',
          selector: 'name',
        },
        
      ];

  //getting Employee data by Employee id
  const getLinkedEmployee = () => {
  // eslint-disable-next-line
     api.post('/proposal/getEmployeeById', { proposal_id: parseInt(id) })
      .then((res) => {
        console.log("res.data.data",res.data.data)
        setGetEmployeeLinked(res.data.data)
      })
  }

  


  useEffect(() => {
    getLinkedEmployee();
    
    }, [id])

    // const uniqueEmployeeData = getemployeeLinked?.reduce((acc, curr) => {
    //   const existingEmployee = acc.find((employee) => employee.employee_id === curr.employee_id);
    //     if (!existingEmployee) {
    //     acc.push(curr);
    //   }
    
    //   return acc;
    // }, []) || [];

  return (
    <>
    <Row>
      <Col md='10'>
        <CommonTable title="Add Employee"
          Button={
                <Button color="primary" className="shadow-none" onClick={() => { setChooseEmp(true)
             }}> Choose </Button>
             
            }>
          <thead>
            <tr>
              {Employeecolumns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {getemployeeLinked && getemployeeLinked.map((e,i)=>{
             return (
             <tr>
              <td>{i+1}</td>
              <td>{e.first_name}</td>
              
              
              
           </tr>) 
            })}
          </tbody>
        </CommonTable>
      </Col>
    </Row>
     <ChooseEmployee chooseEmp={chooseEmp} setChooseEmp={setChooseEmp} getemployeeLinked={getemployeeLinked}/>
    
    </>
  );
};

export default AddEmployee;