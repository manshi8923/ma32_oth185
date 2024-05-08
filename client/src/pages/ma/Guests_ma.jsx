import React, { useEffect, useState } from 'react'
import moment from 'moment';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {Button, Card } from "react-bootstrap"
import Navbar_ma from '../../components/Navbar_ma';
import MainScreen from '../../components/MainScreen';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import { Link } from 'react-router-dom';

const Guests_ma = () => {
  const [error, setError] = useState("");
  const [errfound,setErrFound]=useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [guests,setGuests]=useState([]);
  const [done,setDone]=useState(false);
  const [dat,setDat]=useState();
    useEffect(()=>{
      setLoading(true);
      fetch("/api/ma/guests/",{
          method:"get",
          headers:{
            "Content-Type":"application/json"
          },
        }).then(res=>res.json())
        .then(data=>{
          if(data.error){
           setError(true);
           console.log("error");
          }
          else{
            setLoading(false);
            setDone(true);
            setError("All the list of guests are here");
            setGuests(data);
            setUsers(data);
          }
        })
  },[]);

  const filterBooking=(data)=>{
    const date=moment().format("YYYY-MM-DD");
    date.toString();
    const newData=data.filter(a=>a.arrival==date);
    setGuests(newData);
  }
  const anyDate=(dat,data)=>{
    const newData=data.filter(a=>a.arrival==dat);
    setGuests(newData);
  }
  const AllBooking=()=>{
    setGuests(users);
  }
  return (
    <>
       <Navbar_ma/>
       <MainScreen title={'All the guests details here'} >
        <InputGroup className="mb-3"  style={{border:'1px solid black',borderRadius:'10px'}}>
        <Form.Control
        type='date'
          value={dat}
          onChange={(e)=>setDat(e.target.value)}
        />
        <Button onClick={()=>anyDate(dat,users)} >
          Search By date
        </Button>
      </InputGroup>
            <Link to={'/ma/rooms'}>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg'>
                    Book a room 
                </Button>
            </Link>
            <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg' variant='danger' onClick={()=>filterBooking(guests)}>
              Today Bookings
            </Button>
            <Button style={{ marginLeft: 10, marginBottom: 6 }} size='lg' variant='success' onClick={()=>AllBooking()}>
              All Bookings
            </Button>
            {errfound&& <ErrorMessage></ErrorMessage>}
            <br/>
            <br/>
            {done && <ErrorMessage>{error}</ErrorMessage>}
            {loading && <Loading></Loading>}
            <div className='guests'>
            {
               guests.map((guest) => {
                return   <Card style={{width:'16rem',margin:10,background:`${guest.color}`}} key={guest._id}>
                <Card.Body>
                  <Card.Title style={{fontSize:'23px',color:'#0000FF'}}>{guest.name.toUpperCase()}</Card.Title>
                  <span className='mb-2' style={{fontSize:'20px'}}>Room Rent : </span>
                  <span style={{fontSize:'23px',color:'#0000FF'}}>{guest.price*guest.days}</span>
                  <br/>
                  <span className='mb-2' style={{fontSize:'20px'}}>Address : </span>
                  <span style={{fontSize:'23px',color:'#0000FF'}}>{guest.address}</span>
                  <br/>
                  <span style={{fontSize:'15px',color:'#0000FF'}}>{guest.email}</span>
                  <br/>
                  <span className='mb-2' style={{fontSize:'20px'}}>Phone : </span>
                  <span style={{fontSize:'15px',color:'#0000FF'}}>{guest.phone}</span>
                  <br/>
                  <span className='mb-2' style={{fontSize:'20px'}}>Arrival Date : </span>
                  <span style={{fontSize:'15px',color:'#0000FF'}}>{guest.arrival}</span>
                  <br/>
                  <span className='mb-2' style={{fontSize:'20px'}}>Days of stay : </span>
                  <span style={{fontSize:'15px',color:'#0000FF'}}>{guest.days}</span>
                  <br/>
                  <span className='mb-2' style={{fontSize:'20px'}}>Depart Date : </span>
                  <span style={{fontSize:'15px',color:'#0000FF'}}>{guest.depart}</span>
                  <br/>
                  <span className='mb-2' style={{fontSize:'20px'}}>Allocated Room : </span>
                  <span style={{fontSize:'15px',color:'#0000FF'}}>{guest.roomNo}</span>
                  <br/>
                  <span className='mb-2' style={{fontSize:'20px'}}>GST No : </span>
                  <span style={{fontSize:'15px',color:'#0000FF'}}>{guest.gst}</span>
                  <br/>
                  <span className='mb-2' style={{fontSize:'20px'}}>Food Bill : </span>
                  <span style={{fontSize:'15px',color:'#0000FF'}}>{guest.bill===undefined?'Not Done':guest.bill}</span>
                  <br/>
                  <span className='mb-2' style={{fontSize:'20px'}}>Total Bill : </span>
                  <span style={{fontSize:'15px',color:'#0000FF'}}>{guest.total===undefined?'Not Done':guest.total}</span>
                </Card.Body>
                </Card>
             })
         }
            </div>
     </MainScreen>
     </>
  )
}

export default Guests_ma