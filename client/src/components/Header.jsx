import React from 'react';
import logo from '../img/logo.png';
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
  } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
const Header = ({hotelname}) => {
    const navigate=useNavigate();
    const logoutHandler=()=>{
      localStorage.clear();
      navigate('/');
    }
  return (
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
                  <NavDropdown.Item href='/rooms'>
                    Rooms 
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/guests'>
                   Guests 
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/revenue'>
                  Revenue
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href='/expense'>
                   Expense
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header;