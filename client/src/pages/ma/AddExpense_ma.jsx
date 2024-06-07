import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
const AddExpense_ma = () => {
  const [date,setDate]=useState();
  const [remarks,setRemarks]=useState();
  const [title,setTitle]=useState();
  const navigate=useNavigate();
  const postData=async()=>{
    await fetch("/api/ma/rooms/add-expense",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
       title:title,
       remarks:remarks,
       date:date
      })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      if(data.error){
        toast.error("Error occur while updating a status of a room")
      }
      else{
        toast.success("Expense Added successfully!");
        navigate('/ma/expense')
      }
    })
  }
  return (
   
   
    <div style={{display:'flex',justifyContent:'center',alignContent:'center', margin: '4rem',flexDirection:'column'}}>
      <h1>Add Expense</h1>
       <Card style={{ width: '350px', paddingTop: '15px',marginTop:'20px' }}>
            <Card.Body>
              <Card.Text>
                <input type='text' placeholder='Enter the Remark for Expense' style={{width:"300px",padding:"10px",outline:"none",borderColor:"gray",borderRadius:'5px'}} value={remarks} onChange={(e)=>setRemarks(e.target.value)}/>
                <input type='date' placeholder='Enter the Date' style={{width:"300px",padding:"10px",outline:"none",borderColor:"gray",borderRadius:'5px',marginTop:'20px'}} value={date} onChange={(e)=>setDate(e.target.value)}/>
                <input type='text' placeholder='Enter the price of expenditure' style={{width:"300px",padding:"10px",outline:"none",borderColor:"gray",borderRadius:'5px',marginTop:'20px'}} value={title} onChange={(e)=>setTitle(e.target.value)}/>
              </Card.Text>
              <Button variant="primary" onClick={()=>postData()}>Add</Button>
            </Card.Body>
          </Card>
    </div>
   
  )
}

export default AddExpense_ma;