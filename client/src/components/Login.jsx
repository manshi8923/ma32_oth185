import React, { useState } from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from '../components/MainScreen';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../img/logo.png';
import {
    Container,
    Navbar,
  } from "react-bootstrap";
const Login = () => {
  const [UserName,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const navigate=useNavigate();
  const submitHandler=()=>{
    if(UserName=='admin'&&password=='12345'){
      localStorage.setItem("name", JSON.stringify("admin"));
      toast.success("login successfully");
      navigate('/hotels');
    }
    else{
      toast.error("Invalid credentials");
    }
  }
  return (
    <>
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="light">
    <Container>
      <Navbar.Brand href="/">
        <img src={logo} height={'50'} alt='logo' />
        </Navbar.Brand>
    </Container>
  </Navbar>
    <MainScreen title="LOGIN">
    <div className='big'>
    <div id='login'>
    </div>
    <div className='loginContainer'>
      <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control
              type="text"
              value={UserName}
              placeholder="Enter email"
              onChange={(e)=>setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary"  style={{marginTop:'15px',marginLeft:'15px'}} onClick={submitHandler}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
    </MainScreen>
    </>
  )
}

export default Login;