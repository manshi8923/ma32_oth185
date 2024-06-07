import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Button, Card} from "react-bootstrap";
import {toast} from "react-toastify";
import moment from 'moment';
const GenerateBill_oth = () => {
  let [breakfast,setBreakfast]=useState(0);
  let [lunch,setLunch]=useState(0);
  let [dinner,setDinner]=useState(0);
  const [data,setData]=useState([]);
  const [click,setClick]=useState(false);
  const [params,setParams]=useState("");
  const [bill,setBill]=useState(false);
  const [price,setPrice]=useState(0);
  const [days,setDays]=useState(0);
  const [add,setAdd]=useState(0);
  useEffect(()=>{
    const id=window.location.pathname.substring(18);
    setParams(id);
  },[]);
  
  const getUser=async()=>{
    setBill(true);
    await fetch(`/api/oth/guests/search/${params}`,{
      method:"get",
      headers:{
        "Content-Type": "application/json"
      }
    }).then(res=>{
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
    await fetch(`/api/oth/guests/food/${params}`,{
      method:"put",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        bill:parseInt(breakfast)+parseInt(lunch)+parseInt(dinner),
        total:parseInt(breakfast)+parseInt(lunch)+parseInt(dinner)+parseInt(add)+(parseInt(breakfast)+parseInt(lunch)+parseInt(dinner))*0.05
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
    var originalContents = document.body.innerHTML
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }
  let room_gst="";
  let food_gst="";
  
  room_gst=parseInt((data.price*data.days)*0.12);
  let to=room_gst;
  food_gst=parseInt((parseInt(lunch)+parseInt(breakfast)+parseInt(dinner))*0.05);
  let fo=food_gst;
  if(data.type!=="igst"){
    room_gst/=2;
    food_gst/=2;
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
  <Card style={{margin:10}} >
    <Card.Header style={{display:"flex"}} >
          <span style={{color: "black",textDecoration: "none",flex: 1,cursor: "pointer",alignSelf: "center",fontSize: 18,}}>Convenience Fee</span>
          <input type='Number' value={add} onChange={(e)=>setAdd(e.target.value)}/>
      </Card.Header>
  </Card>
  <Button style={{marginLeft:30}} onClick={()=>updateFood()}>Total</Button>
  {click&&<span style={{fontSize:'20px'}}>&nbsp; &nbsp; &nbsp; &nbsp; {parseInt(breakfast)+parseInt(lunch)+parseInt(dinner)+parseInt(add)}</span>}
  <br/>
  {!bill&&<Button onClick={()=>getUser()} style={{margin:30}} size='lg' variant='danger'>Generate Bill</Button>} 
    {/*  print */}
    {bill&& <>

 <div id='print' style={{marginLeft:'60px',marginBottom:'40px'}}>
 <h1 style={{textAlign:'center',marginTop:'30px'}}>HOTEL ACCOMMODATION INVOICE</h1>
 <br/>
 <br/>
 <h3>FROM</h3>
 <h5 style={{fontWeight:'bold'}}>PARTAP SINGH BAJWA HUF (OYO TOWNHOUSE) &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; Date : {date}</h5>
    <h5 style={{fontWeight:'bold'}}>Plot No.557 Golf</h5>
    <h5 style={{fontWeight:'bold'}}>DLF City Phase 3, Gurgram,Haryana-122001</h5>
    <h5 style={{fontWeight:'bold'}}>Ph:- 9149377652</h5>
    <p style={{fontWeight:'bold'}}>GST No: 06AAIHP7660R1ZA</p>
    <h5 style={{marginLeft:'440px',fontWeight:'bold'}}>Invoice No : 2024-2025/{data.size}</h5>
    <h5 style={{fontWeight:'bold'}}>Billing to: {data.name}</h5>
    <h5 style={{fontWeight:'bold'}}>{data.address}</h5>
    <h5 style={{fontWeight:'bold'}}>GST NO . {data.gst}</h5>
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
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}><p>{data.type==="igst"?"I. IGST":"I .SGST"}</p><p>{data.type==="igst"?"":"II. CGST"}</p></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>996311</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}><p>{data.type==="igst"?"@12%":"@6%"}</p><p>{data.type=="igst"?"":"@6%"}</p></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}><p>{room_gst}</p><p>{data.type==="igst"?"":room_gst}</p></td>
        </tr>
        <tr style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Total</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{data.price*data.days+to}</td>
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
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}><p>{data.type==="igst"?"I. IGST":"I .SGST"}</p><p>{data.type==="igst"?"":"II. CGST"}</p></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}><p>{data.type==="igst"?"@5%":"@2.5%"}</p><p>{data.type=="igst"?"":"@2.5%"}</p></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}><p>{food_gst}</p><p>{data.type==="igst"?"":food_gst}</p></td>
        </tr>
        <tr style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Total</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{parseInt(breakfast)+parseInt(lunch)+parseInt(dinner)+parseInt(food_gst)}</td>
        </tr>
        <tr style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>3</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>Convenience Fee</td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}></td>
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{add}</td>
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
          <td style={{padding:'10px',border: '1px solid black',fontWeight:'bold'}}>{data.price*data.days+to+fo+parseInt(breakfast)+parseInt(lunch)+parseInt(dinner)+parseInt(add)}</td>
        </tr>
    </table>
 <h5 style={{fontWeight:'bold',marginTop:'50px'}}>Thank You.</h5>
 <h5 style={{fontWeight:'bold'}}>Plot No.557 Golf Course Road</h5>
 <h5 style={{fontWeight:'bold'}}>Sector 27 Gurgaon - 122009</h5>
 <h5 style={{fontWeight:'bold'}}>Ph:- 9149377652</h5>
</div>
<Button style={{marginLeft:'60px'}} onClick={()=>handlePrint('print')}>Print</Button>
    </>}
 </MainScreen>
  )
}

export default GenerateBill_oth