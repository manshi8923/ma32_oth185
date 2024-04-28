import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Card} from "react-bootstrap";
import {toast} from "react-toastify";
import moment from 'moment';
const GenerateBill_ma = () => {
  let [breakfast,setBreakfast]=useState(0);
  let [lunch,setLunch]=useState(0);
  let [dinner,setDinner]=useState(0);
  const [data,setData]=useState([]);
  const [click,setClick]=useState(false);
  const [params,setParams]=useState("");
  const [bill,setBill]=useState(false);
  const [price,setPrice]=useState(0);
  const [days,setDays]=useState(0);
  useEffect(()=>{
    const id=window.location.pathname.substring(17);
    console.log(id);
    setParams(id);
  },[]);
  
  const getUser=async()=>{
    setBill(true);
    await fetch(`/api/ma/guests/search/${params}`,{
      method:"get",
      headers:{
        "Content-Type": "application/json"
      }
    }).then(res=>{
      console.log(res);
      return res.json();
    }).then(data=>{
      if(data){
        setData(data);
        setPrice(data.price);
        setDays(data.days);
      }
    })
  }
  
  const updateFood=async()=>{
    setClick(true);
    await fetch(`/api/ma/guests/food/${params}`,{
      method:"put",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        bill:parseInt(breakfast)+parseInt(lunch)+parseInt(dinner),
        total:price*days+289+289+parseInt(breakfast)+parseInt(lunch)+parseInt(dinner)
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        toast.error("Error occur while updating a status of a room")
      }
      else{
        toast.success("status of room updated successful!");
      }
    })
  }
  const date=moment().format("DD/MM/YYYY");
  const handlePrint=(divName)=>{
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  }
  return (
    <MainScreen title={"Your bill is here"}>
       <Card style={{margin:10}} >
       <Card.Header style={{display:"flex"}} >
             <span style={{color: "black",textDecoration: "none",flex: 1,cursor: "pointer",alignSelf: "center",fontSize: 18,}}>Breakfast </span>
             <input type='Number' value={breakfast} onChange={(e)=>setBreakfast(e.target.value)}/>
         </Card.Header>
     </Card>
     <Card style={{margin:10}} >
       <Card.Header style={{display:"flex"}} >
             <span style={{color: "black",textDecoration: "none",flex: 1,cursor: "pointer",alignSelf: "center",fontSize: 18,}}>Lunch</span>
             <input type='Number' value={lunch} onChange={(e)=>setLunch(e.target.value)}/>
         </Card.Header>
     </Card>
     <Card style={{margin:10}} >
       <Card.Header style={{display:"flex"}} >
             <span style={{color: "black",textDecoration: "none",flex: 1,cursor: "pointer",alignSelf: "center",fontSize: 18,}}>Dinner</span>
             <input type='Number' value={dinner} onChange={(e)=>setDinner(e.target.value)}/>
         </Card.Header>
     </Card>
     <Button style={{marginLeft:30}} onClick={()=>updateFood()}>Total</Button>
     {click&&<span style={{fontSize:'20px'}}>&nbsp; &nbsp; &nbsp; &nbsp; {parseInt(breakfast)+parseInt(lunch)+parseInt(dinner)}</span>}
     <br/>
     {!bill&&<Button onClick={()=>getUser()} style={{margin:30}} size='lg' variant='danger'>Generate Bill</Button>} 
       {/*  print */}
       {bill&& <>

    <div id='print' style={{marginLeft:'60px',marginBottom:'40px'}}>
    <h1 style={{textAlign:'center',marginTop:'30px'}}>RENT INVOICE</h1>
    <br/>
    <br/>
    <h3>FROM</h3>
    <h5 style={{fontWeight:'bold'}}>CHARANJIT BAJWA (OYO TOWNHOUSE) &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; Date : {date}</h5>
    <h5 style={{fontWeight:'bold'}}>Plot No.32,Moulsari Avenue Rapid Metro Station</h5>
    <h5 style={{fontWeight:'bold'}}>DLF City Phase 3, Gurgram,Haryana-122001</h5>
    <h5 style={{fontWeight:'bold'}}>Ph:- 9149377652</h5>
    <p style={{fontWeight:'bold'}}>GST No: 06AZVPBB205E1ZF</p>
    <h5 style={{marginLeft:'440px',fontWeight:'bold'}}>Invoice No : {date}</h5>
    <h5 style={{fontWeight:'bold'}}>Billing to: {data.name}</h5>
    <br/>
    <table style={{border: '1px solid black',fontWeight:'bold'}}>
      <tr>
      <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Sr. No.</th>
      <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Particulars</th>
      <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Period</th>
      <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Name</th>
      <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Room No.</th>
      <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>SAC Code</th>
      <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Fee Per day</th>
      <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Duration of stay</th>
      <th style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Total</th>
      </tr>
        <tr style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>1</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Accomodation</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{data.arrival} to {data.depart}</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{data.name}</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{data.roomNo}</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{data.price}</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{data.days}</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{data.price*data.days}</td>
        </tr>
        <tr style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>01/04/2024 to 30/04/20224</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>996311</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}><p>@6</p><p>@6</p></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}><p>289</p><p>289</p></td>
        </tr>
        <tr style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{data.price*data.days+289+289}</td>
        </tr>
        <tr style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>2</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Food</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{parseInt(breakfast)+parseInt(lunch)+parseInt(dinner)}</td>
        </tr>
        <tr style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}><p>I.SGST</p><p>II. CGST</p></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}><p>@2.5%</p><p>@2.5%</p></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
        </tr>
        <tr style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
        </tr>
        <tr style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Grand Total</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{data.price*data.days+289+289+parseInt(breakfast)+parseInt(lunch)+parseInt(dinner)}</td>
        </tr>
    </table>
    <h5 style={{fontWeight:'bold',marginTop:'50px'}}>Thank You.</h5>
    <h5 style={{fontWeight:'bold'}}>OYO Townhouse</h5>
    <h5 style={{fontWeight:'bold'}}>Plot No.32,Moulsari Avenue Rapid Metro Station,</h5>
    <h5 style={{fontWeight:'bold'}}>DLF City Phase 3,Gurugram, Haryana- 122001</h5>
    <h5 style={{fontWeight:'bold'}}>RTGS Code: HDFC0001306</h5>
    <h5 style={{fontWeight:'bold'}}>Ph:- 9149377652</h5>
   </div>
   <Button style={{marginLeft:'60px'}} onClick={()=>handlePrint('print')}>Print</Button>
       </>}
    </MainScreen>
  )
}

export default GenerateBill_ma