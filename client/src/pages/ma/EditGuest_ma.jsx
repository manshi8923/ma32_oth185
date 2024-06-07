import React, { useEffect, useState } from 'react'
import Navbar_ma from '../../components/Navbar_ma'
import MainScreen from '../../components/MainScreen'
import { Button, Card, Form } from "react-bootstrap";
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import {toast} from 'react-toastify';

const EditGuest_ma = () => {
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const [days,setDays]=useState("");
  const [arrival,setArrival]=useState("");
  const [depart,setDepart]=useState("");
  const [price,setPrice]=useState("");
  const [params,setParams]=useState("");
  const navigate=useNavigate();
  useEffect(()=>{
    const id=window.location.pathname.substring(9);
    setParams(id);
    if(arrival!==""){
      var new_date = moment(arrival).add(days, "days").format("YYYY-MM-DD");
      setDepart(new_date);
    }
  },[arrival,days])
  const submitHandler=async()=>{
    setLoading(true);
    await fetch(`/api/ma/guests/edit/${params}`,{
      method:"put",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
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
        toast.success("Done Changes");
        navigate('/ma/guests');
      }
    })
  }
 
  return (
    <>
    <Navbar_ma/>
    <MainScreen title={"Edit the status of Guest"}> 
    <Card>
        <Card.Header>Edit</Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler} action='/ma/guests'>
            {error && <ErrorMessage variant="danger">Error found in server side.</ErrorMessage>}
             <Form.Group controlId="content" style={{marginTop:10}}>
              <Form.Label>Arrival date</Form.Label>
              <Form.Control
                type="date"
                value={arrival}
                required
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
                required
              />                                                                                                                                                                                                                                    
            </Form.Group>

            <Form.Group controlId="content" style={{marginTop:10}}>
              <Form.Label>Departure date</Form.Label>
              <Form.Control
              type="date"
              value={depart}
                placeholder="Departure date and time"
                required
              />
            </Form.Group>
           
          
            <Form.Group controlId="content">
              <Form.Label>Room Rent of a day</Form.Label>
              <Form.Control
              type="Number"
              value={price}
              required
              onChange={(e)=>setPrice(e.target.value)}
                placeholder="Rent of Room per day"
              />
            </Form.Group>
            <br/>
            <Button type="submit" variant="primary" style={{marginTop:10}} >
              Done Changes
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
export default EditGuest_ma