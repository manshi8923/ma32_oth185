import React, { useEffect, useState } from 'react'
import {Button} from "react-bootstrap"
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import Navbar_oth from '../../components/Navbar_oth';
const Expense_oth = () => {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  useEffect(()=>{
    setLoading(true);
    fetch("/api/oth/rooms/all-expense",{
      method:"get",
      headers:{
        "Content-Type":"application/json"
      },
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        console.log("error");
      }
      else{
        setLoading(false);
        setData(data);
      }
    })
  })
  return (
   <>
   <Navbar_oth/>
   <div className='expense'>
     
     <h1>Daily Expense</h1>
     <Button size='lg' style={{marginBottom:'30px'}} onClick={()=>navigate('/oth/add-expense')} >Add Expense</Button>
     <table style={{border: '1px solid black',fontWeight:'bold'}}>
     <tr>
     <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Date</th>
     <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Remarks</th>
     <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Expenditure</th>
     </tr>
    {
     data.map((expense)=>{
       return <tr>
          <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{expense.date}</th>
          <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{expense.remarks}</th>
          <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{expense.title}</th>
       </tr>
     })
    }
 </table>
   </div>
   </>
  )
}

export default Expense_oth