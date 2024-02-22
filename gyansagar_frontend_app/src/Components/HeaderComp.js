import './HeaderComp.css';
import { FaUserPlus } from 'react-icons/fa';
import BuyerRegistration from "./BuyerRegistrationComp";
import SellerRegistration from "./SellerRegistrationComp";
import LoginForm from "./LoginForm";
import {  Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
const HeaderComp = ()=>{
  let navigate = useNavigate();
  let cartAccess = () => {
     if (localStorage.getItem("loggedInUser") === null){
      navigate("/login");
    }
    else{
      navigate("/cart");
    }
  }
    return(
        <div>
          <Navbar bg="dark" variant="dark"  fixed="top" style={{"height":"50px"}}>
        <Container>
          <Navbar.Brand id='brand' href="/home">Book-Ganga</Navbar.Brand>
          <Nav className="me-auto">
            {JSON.parse(localStorage.getItem('loggedInUser'))===null &&
              <><FaUserPlus style={{"fontSize":"1rem","height":"30px"}} /><NavDropdown title="Register" id="collasible-nav-dropdown">
              <NavDropdown.Item  href="/sellerregister">Seller Registration</NavDropdown.Item>
              <NavDropdown.Item href="/buyerregister">Buyer Registration</NavDropdown.Item>
            </NavDropdown></> }&nbsp;
            {JSON.parse(localStorage.getItem('loggedInUser'))===null &&
            <Nav.Link href="/login">Login</Nav.Link>
            
            } 
            {(localStorage.getItem('user'))==='admin' &&
            <Nav.Link href="/getallsellers">All Sellers </Nav.Link>
            } 
            {(localStorage.getItem('user'))==='buyer' &&
            <Nav.Link href="/getorderhistory">Order History </Nav.Link>
            } 
            {(localStorage.getItem('user'))==='buyer' &&
            <Nav.Link href="/updatebuyer">Update Profile</Nav.Link>
            } 
            {(localStorage.getItem('user'))==='seller' &&
            <Nav.Link href="/getregisteredbook">View Registered Books</Nav.Link>
            } 
             {(localStorage.getItem('user'))==='seller' &&
            <Nav.Link href="/updateseller">Update Profile</Nav.Link>
            } 
            {(localStorage.getItem('user'))==='seller' &&
            <Nav.Link href="/addnewbook">Register Book</Nav.Link>
            } 
             </Nav>
          <Nav>  
          {(localStorage.getItem('user'))==='buyer' &&
           <Nav.Link  onClick={() => {cartAccess()}} >View cart</Nav.Link>
            }     
            {(localStorage.getItem('user'))===null &&
           <Nav.Link  onClick={() => {cartAccess()}} >View cart</Nav.Link>
            }          
            {JSON.parse(localStorage.getItem('loggedInUser'))!=null &&
            <Nav.Link href="/home" onClick={() => {localStorage.removeItem("loggedInUser");localStorage.removeItem("user");localStorage.removeItem("orderdetails");localStorage.removeItem("carts");}}>Logout</Nav.Link>
            } 
          </Nav>
        </Container>
      </Navbar>
    <Routes>
              <Route path="/buyerregister" element={<BuyerRegistration/>} />  
              <Route path="/sellerregister" element={<SellerRegistration/>} />  
              <Route path="/login" element={<LoginForm/>} />          
    </Routes>     
</div>
    );
}
export default HeaderComp;