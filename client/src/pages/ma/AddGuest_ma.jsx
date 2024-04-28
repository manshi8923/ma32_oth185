import React, { useEffect, useState } from 'react'
import Navbar_ma from '../../components/Navbar_ma'
import MainScreen from '../../components/MainScreen'
import { Button, Card, Form } from "react-bootstrap";
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {toast} from 'react-toastify';
const AddGuest_ma = () => {
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [address,setAddress]=useState("");
  const [phone,setPhone]=useState("");
  const [days,setDays]=useState("");
  const [arrival,setArrival]=useState("");
  const [depart,setDepart]=useState("");
  const [price,setPrice]=useState("");
  const [params,setParams]=useState("");
  const [remarks,setRemarks]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    const id=window.location.pathname.substring(13);
    setParams(id);
    if(arrival!==""){
      var new_date = moment(arrival).add(days, "days").format("YYYY-MM-DD");
      setDepart(new_date);
    }
  },[arrival,days])
  const submitHandler=async()=>{
    setLoading(true);
    await fetch(`/api/ma/guests/addguest/${params}`,{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:name,
        email:email,
        address:address,
        phone:phone,
        days:days,
        arrival:arrival,
        depart:depart,
        price:price,
      })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        toast.error("Error occur while updating a status of a room")
      }
      else{
        setName(data.name);
        console.log(name);
      }
    })
  }
 
  return (
    <>
    <Navbar_ma/>
    <MainScreen title={"Booking of a guest"}> 
    <Card>
        <Card.Header>Booking of a new Guest</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler} action='/ma/rooms'>
            {error && <ErrorMessage variant="danger">Error found in server side.</ErrorMessage>}
            <Form.Group controlId="title" style={{marginTop:10}}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="title"
                value={name}
                placeholder="Enter Guest name"
                onChange={(e)=>setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content" style={{marginTop:10}}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                placeholder="Enter Guest Email"
                onChange={(e)=>setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="Number"
                value={phone}
                placeholder="Enter Guest phone Number"
                onChange={(e)=>setPhone(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="content" style={{marginTop:10}}>
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                value={address}
                placeholder="Enter Guest Adderss"
                rows={3}  
                onChange={(e)=>setAddress(e.target.value)}
              />
            </Form.Group>
             <Form.Group controlId="content" style={{marginTop:10}}>
              <Form.Label>Arrival date</Form.Label>
              <Form.Control
                type="date"
                value={arrival}
                onChange={(e)=>setArrival(e.target.value)}
                placeholder="Arrival date and Time"
              />
            </Form.Group>
            <Form.Group controlId="content" style={{marginTop:10}}>
              <Form.Label>No of days for stay</Form.Label>
              <Form.Control
                type="content"
                value={days}
                onChange={(e)=>setDays(e.target.value)}
                placeholder="Enter the days"
              />                                                                                                                                                                                                                                    
            </Form.Group>

            <Form.Group controlId="content" style={{marginTop:10}}>
              <Form.Label>Departure date</Form.Label>
              <Form.Control
              type="date"
              value={depart}
                placeholder="Departure date and time"
              />
            </Form.Group>
           
            <Form.Group controlId="content" style={{marginTop:10}}>
              <Form.Label>Remarks</Form.Label>
              <Form.Control
              type="date"
              value={remarks}
              onChange={(e)=>setRemarks(e.target.value)}
                placeholder="From where the guest listen about us? "
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>Room Rent of a day</Form.Label>
              <Form.Control
              type="Number"
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
                placeholder="Rent of Room per day"
              />
            </Form.Group>
            {loading && <Loading size={50} />}
            <Button type="submit" variant="primary" style={{marginTop:10}}>
              Done Booking
            </Button>
            <Button className="mx-2" onClick={()=>navigate('/ma/guests')} variant="danger" style={{marginTop:10}}>
              Go to Guests Dashboard
            </Button>
            
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
    </>
  )
}

export default AddGuest_ma