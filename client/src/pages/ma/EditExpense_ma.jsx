import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditExpense_ma = () => {
  const [date,setDate]=useState("");
  const [remarks,setRemarks]=useState("");
  const [title,setTitle]=useState("");
  const navigate=useNavigate();
  const [params,setParams]=useState("");
  useEffect(()=>{
    const id=window.location.pathname.substring(17);
    setParams(id);
  },[]);


  const postData=async()=>{
    await fetch(`/api/ma/rooms/expense/edit/${params}`,{
      method:"put",
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
        toast.success("Expense Added successfully!");
        navigate('/ma/expense')
    })
  }
  return (
    <div style={{display:'flex',justifyContent:'center',alignContent:'center', margin: '4rem',flexDirection:'column'}}>
      <h1>Edit Expense</h1>
       <Card style={{ width: '350px', paddingTop: '15px',marginTop:'20px' }}>
            <Card.Body>
              <Card.Text>
                <input type='text' required placeholder='Enter the Remark for Expense' style={{width:"300px",padding:"10px",outline:"none",borderColor:"gray",borderRadius:'5px'}} value={remarks} onChange={(e)=>setRemarks(e.target.value)}/>
                <input type='date' required placeholder='Enter the Date' style={{width:"300px",padding:"10px",outline:"none",borderColor:"gray",borderRadius:'5px',marginTop:'20px'}} value={date} onChange={(e)=>setDate(e.target.value)}/>
                <input type='text' required placeholder='Enter the price of expenditure' style={{width:"300px",padding:"10px",outline:"none",borderColor:"gray",borderRadius:'5px',marginTop:'20px'}} value={title} onChange={(e)=>setTitle(e.target.value)}/>
              </Card.Text>
              <Button variant="primary" onClick={()=>{postData();navigate('/ma/expense')}}>Done</Button>
            </Card.Body>
          </Card>
    </div>
  )
}

export default EditExpense_ma