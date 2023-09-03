import React, { useEffect, useState } from 'react';
import { Button,Card } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.flash';
// import 'datatables.net-buttons/js/buttons.html5';
// import 'datatables.net-buttons/js/buttons.print';
import { useParams,useNavigate } from 'react-router-dom';
import api from '../../constants/api';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import CommonTable from '../../components/CommonTable';

const BillOfMaterials = () => {
  //Const Variables
  const [planning, setPlanning] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  const backToList = () => {
    navigate(-1);
  };
  // get Leave
  const getPlanning = () => {
      api
      .post('/planning/getPlanningBomShortageById', { planning_cpanel_id: id })
      .then((res) => {
        setPlanning(res.data.data);
       setOrder(res.data.data[0])
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
console.log('planning',planning)
  useEffect(() => {
    $('#example').DataTable({
      pagingType: 'full_numbers',
      pageLength: 20,
      processing: true,
      dom: 'Bfrtip',
      // buttons: [
      //   {
      //     extend: 'print',ś
      //     text: 'Print',
      //     className: 'shadow-none btn btn-primary',
      //   },
      // ],
    });
    getPlanning();
  }, []);
  //  stucture of leave list view
  const columns = [
    {
      name: 'id',
    },
    {
      name: 'Item number',
     
    },
    {
      name: 'Product name',
      
    },
    {
      name: 'BOM Unit',
     
    },
    {
      name: 'Qty',
     
    },
    {
      name: 'Inventory Stock',
     
    },
    {
      name: 'Reserve Stock',
     
    },
    {
      name: 'StockUpdatedDate',
     
    },
    {
      name: 'Matrl Shortage Qty',
      
    },
    {
      name: 'Matrl Shortage',
     
    },
    
  ];

  return (
    <div className="MainDiv">
      <div className=" pt-xs-25">
        <BreadCrumbs /> 
       
          
          <Card  className="shadow-none">
                 <div style={{padding:'5px', display:'flex',flex:'row',justifyContent:'space-between'}}> <div><span></span>
                 </div><div><Button
            className="shadow-none"
            style={{display:'flex',justifyContent:'space-between'}}
            color="dark"
            onClick={() => {
              backToList();
            }}
          >
            Back to List
          </Button></div></div>
                </Card>
        <CommonTable
          loading={loading}
          title="Bill Of Materials"
          
          Button={
              
              <Button color="primary" className="shadow-none">
                Export
              </Button>
          
          }
        > <Card  color='blue'>
          <div style={{padding:'5px', display:'flex',flex:'row',justifyContent:'space-between',fontSize:20}}><span>Ordered Qty:    {order && order.ordered_qty}</span></div></Card>
          <thead>
            <tr>
              {columns.map((cell) => {
                return <td key={cell.name}>{cell.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {planning &&
              planning.map((element, i) => {
                return (
                  <tr key={element.planning_cpanel_id}>
                    <td>{i + 1}</td>
                    <td>{element.item_number}</td>
                    <td>{element.product_name}</td>
                    <td>{element.bom_unit}</td>
                    <td>{element.qty}</td>
                    <td>{element.actual_stock}</td>
                    <td>{element.reserve_stock}</td>
                    <td>{element.stock_updated_date}</td>
                    <td>{element.matrl_shortage_qty}</td>
                    <td>{element.matrl_shortage}</td>
                    </tr>
                );
              })}
          </tbody>
        </CommonTable>
      </div>
    </div>
  );
};

export default BillOfMaterials;
