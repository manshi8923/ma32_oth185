import React from 'react'
import {Card,Button} from 'react-bootstrap';
import logo from '../img/logo.png';
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
} from "react-bootstrap";

import img1 from '../img/bg.jpeg';
import img2 from '../img/bg2.jpeg';
import {useNavigate} from "react-router-dom";


const Hotels = () => {
  const navigate=useNavigate();
  const logoutHandler=()=>{
    localStorage.clear();
    navigate('/');
  }
  return (
    <>
     <Navbar collapseOnSelect expand="lg" bg="primary" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <img src={logo} height={'50'} alt='logo' />
          </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
          </Nav>
          <Nav>
                <NavDropdown
                  title={"Dashboard"}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='revenue'>
          <Card style={{ width: '18rem' ,margin:'2rem'}}>
        <Card.Img variant="top" src={img1} />
        <Card.Body>
         
          <Card.Text>
          <h2 style={{color:'red'}}>MA32</h2>
          </Card.Text>
          <Button variant="primary" onClick={()=>navigate('/ma/dashboard')} >Go to Dashboard</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '18rem' ,margin:'2rem'}}>
        <Card.Img variant="top" src={img2} height={'190px'} />
        <Card.Body>
          
          <Card.Text>
          <h2 style={{color:'red'}}>OTH185</h2>
          </Card.Text>
          <Button variant="primary" onClick={()=>navigate('/oth/dashboard')} >Go to Dashboard</Button>
        </Card.Body>
      </Card>
      </div>
    </>
  )
}

export default Hotels