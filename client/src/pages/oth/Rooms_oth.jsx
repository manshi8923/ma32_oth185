import React, { useEffect, useState } from 'react'
import Navbar_oth from '../../components/Navbar_oth'
import MainScreen from '../../components/MainScreen'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {Button, Card } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';

const Rooms_oth = () => {
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);
  const [rooms,setRooms]=useState([]);
  const [occupied,setOccupied]=useState(0);
  const [unoccupied,setUnoccupied]=useState(0);
  const [count,setCount]=useState(0);
  const navigate=useNavigate();
   useEffect(()=>{
        setLoading(true);
        fetch("/api/oth/rooms/",{
            headers:{
                "Content-Type": "application/json"
            }
        }).then(res=>res.json())
        .then(data=>{
            if(data.err){
                setError(true);
                toast.error("Error occur in server side!");
            }
            else{
                setLoading(false);
                setRooms(data);
                const unoccupy = data.filter(item => item.book === 'Vacant');
                setUnoccupied(unoccupy.length);
                const occupy=data.filter(item=>item.book==="Booked");
                setOccupied(occupy.length);
                toast.success("Updated status of room",{
                  toastId:'success1'
                })
            }
        })
    },[Button]);
    const handleClick=()=>{
      window.location.reload(true);
    }
  return (
   <>
   <Navbar_oth/>
   <Button onClick={handleClick} style={{marginLeft:50,marginTop:30,marginBottom:10}} >Confirm Booking</Button>
   <MainScreen title={'All the status of Rooms are here'}>
   <Card style={{ margin:10}}>
          <ListGroup variant="flush">
            <ListGroup.Item variant='success'>{occupied} Booked Rooms</ListGroup.Item>
            <ListGroup.Item variant='danger'>{unoccupied} Vacant Rooms</ListGroup.Item>
          </ListGroup>
        </Card>
        {error&&<ErrorMessage>Error found in server side</ErrorMessage>}
        {loading && <Loading></Loading>}
        <div className='guests'>
        {
          rooms.map((room) => {
            return <Card style={{width:'16rem',margin:10,background:`${room.color}`}} key={room._id}>
              <Card.Body>
                <Card.Title style={{fontSize:'23px',color:'#0000FF'}}>{room.roomNo}</Card.Title>
                <span className='mb-2' style={{fontSize:'20px'}}>CleaningStatus : </span>
                <span style={{fontSize:'20px',color:'#0000FF'}}>{room.cleaningStatus}</span>
                <br/>
                {room.guests.length>=1 && room.book=="Booked"&&
                <span style={{fontSize:'18px'}}>Checkedin : </span>}
                {room.guests.length>=1 && room.book=="Booked"&&
                <span style={{color:'#0000FF',fontSize:'15px'}}>{room.guests[room.guests.length-1].arrival} &nbsp;</span>}
                {room.guests.length>=1 && room.book=="Booked"&&
                <span style={{color:'#0000FF',fontSize:'18px'}}>Booked on {" " +room.guests[room.guests.length-1].bookedOn + " "}  by {room.guests[room.guests.length-1].name}</span>}
              </Card.Body>
              <Button  onClick={()=>{navigate(`/oth/room/${room._id}`);handleClick()}} style={{margin:10}} >Update</Button>
              {room.book==="Vacant"&& <Button variant='danger' onClick={()=>{navigate(`/oth/addguest/${room._id}`);handleClick()}}  style={{marginLeft:10,marginRight:10,marginBottom:10}} >Book a room</Button>}
               {room.book==="Booked"&&room.guests.length>=1&&<Button variant='success' href={`/oth/generateBill/${room.guests[room.guests.length-1]._id}`}style={{marginLeft:10,marginRight:10,marginBottom:10}} >Generate Bill</Button>}
              </Card>
             
          })
        }
        </div>
   </MainScreen>
   </>
  )
}


export default Rooms_oth