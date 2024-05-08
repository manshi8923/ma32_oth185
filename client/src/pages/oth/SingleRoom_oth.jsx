import React, { useEffect, useState } from "react";
import MainScreen from '../../components/MainScreen'
import { Button, Card, Form } from "react-bootstrap";
import Loading from '../../components/Loading';
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Navbar_oth from "../../components/Navbar_oth";


const SingleRoom_oth = () => {
  const [book,setBook]=useState("");
    const [cleaningStatus,setCleaningStatus]=useState("");
    const [params,setParams]=useState("");
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
      const id=window.location.pathname.substring(10);
      console.log(id);
      setParams(id);
    },[])
    const updateHandler=async()=>{
      setLoading(true);
      await fetch(`/api/oth/rooms/${params}`,{
        method:"put",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          book:book,
          cleaningStatus:cleaningStatus
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error){
          toast.error("Error occur while updating a status of a room")
        }
        else{
          toast.success("status of room updated successful!");
          navigate('/oth/rooms');
        }
      })
    }
  return (
    <>
    <Navbar_oth/>
    <MainScreen title={"Update the Status of Room"}>
         <Card>
        <Card.Header>Edit The Room Status</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler} action="/oth/rooms">
            {loading && <Loading />}
            <Form.Group controlId="content">
            <Form.Label>Checked in status</Form.Label>
            <Form.Control
              as="select"
              value={book}
              onChange={e => {
                setBook(e.target.value);
              }}>
              <option value="">Select the room status</option>
              <option value="Booked">Booked</option>
              <option value="Vacant">Vacant</option>
            </Form.Control>
            </Form.Group>

          <Form.Group controlId="content" style={{marginTop:10}}>
          <Form.Label>cleaningStatus</Form.Label>
            <Form.Control
              as="select"
              value={cleaningStatus}
              onChange={e => {
                setCleaningStatus(e.target.value);
              }}>
              <option value="">Select the cleaning status</option>
              <option value="Dirty">Dirty</option>
              <option value="Clean">Clean</option>
            </Form.Control>
          </Form.Group>
            {loading && <Loading size={50} />}
            <Button variant="primary" type="submit" style={{marginTop:15}}>
              Update Room status
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              onClick={() => navigate('/ma/rooms')}
              style={{marginTop:15}}>
             Go to the Dashboard
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on -  {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
    </>
  )
}


export default SingleRoom_oth