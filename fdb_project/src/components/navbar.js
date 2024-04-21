// Navbar.js
import React,{useState,useEffect} from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
// import '../styling/navbar.css';
import "bootstrap/dist/css/bootstrap.min.css";
const NavBar = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    // Check if the item is present in local storage
    if (localStorage.getItem("admin_id")) {
      setAdmin(true);
    }
  }, []);
  return (
    <Navbar bg="dark" variant="dark" >
      <Container>
        <Navbar.Brand href="#">Click2Learn</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto">
            {admin&&(<>
          <Nav.Link href="courses">Courses</Nav.Link>
          <Nav.Link href="dashboard">Dashboard</Nav.Link>
          <Nav.Link href="notifications">Notifications</Nav.Link></>)}
          </Nav>
          <Nav className="mr-auto">
            
            {admin &&(<>  
          <Nav.Link href="calendar">Shopping cart</Nav.Link>
            <Nav.Link href="profile">Profile</Nav.Link></>)}
        {!admin && (<><Nav.Link href="login">Login</Nav.Link>
        <Nav.Link href="professor_register">Teach on Click2Learn</Nav.Link>
          <Nav.Link href="student_register">Sign Up to learn</Nav.Link>
          </>)
          }
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
