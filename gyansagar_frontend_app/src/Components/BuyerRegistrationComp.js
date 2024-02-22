import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useReducer } from "react";
import { Toast } from 'bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
const init={
       username:{value:"", hasError: true,touched: false, error:""},
       password:{value:"", hasError: true,touched: false, error:""}, 
       buyername:{value:"", hasError: true,touched: false, error:""},
       email:{value:"", hasError: true,touched: false, error:""},
       buyer_contact:{value:"", hasError: true,touched: false, error:""},
       aadharno:{value:"", hasError: true,touched: false, error:""},
       address:{value:"", hasError: true,touched: false, error:""},
       isFormValid: false
    }
    const reducer = (buyer,action) => {
   
        switch(action.type){
            case 'update' : {
                const {name,value,hasError, error, touched, isFormValid} = action.data;
                return { 
                    ...buyer,
                    [name]: { ...buyer[name],value, hasError, error, touched},
                    isFormValid
                }   
            }
            case 'reset' : {
                return init;
            }
        }
    }
    const validateData = (name,value) => {
        let hasError = false, error= "";
        switch(name){
            case "username" : 
                let regex = /^[A-Z]{1}[a-z0-9]{2,10}$/;
                if(!regex.test(value))
                {
                    hasError = true;
                    error = "Username must contain First letter capital follwed by small letter and digits"
                }
            break;
            case "password" :
                let regex1 = /^[A-Z]{1}[a-z 0-9 @ _ $ ]{4,8}$/;
                if(!regex1.test(value))
                {
                    hasError = true;
                    error = "Password must contain first letter capital follwed by 4-8 small letter,speical characters and digits "
                }
            break;    
            case "buyername" : 
                let regex2 = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;
                if(!regex2.test(value))
                {
                    hasError = true;
                    error = "Buyer Name must contain First & Last Name separated by space having first letter capital followed by small letters";
                }
            break;   
            case "email" : 
                let regex3 = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
                if(!regex3.test(value))
                {
                    hasError = true;
                    error = "Email must be valid";
                }
            break;
            case "buyer_contact" : 
                let regex4 = /^[0-9]{10}$/;
                if(!regex4.test(value))
                {
                    hasError = true;
                    error = "Contact must be 10 digits";
                }
            break;
            case "aadharno" : 
                let regex5 = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/;
                if(!regex5.test(value))
                {
                    hasError = true;
                    error = "Adhar no should contain 12 digits, 4 digit formatseparated by space";
                }
            break;   
            case "address" : 
                let regex6 = /^[A-Z\sa-z0-9,./-]{2,}$/;
                if(!regex6.test(value))
                {
                    hasError = true;
                    error = "Address may contain  special characters";
                }
            break;    
                     
        }
        return {hasError, error}    
    } 

let BuyerRegistration=()=> {
    const[buyer,dispatch]=useReducer(reducer,init);
    const[msg,setMsg]=useState("");    
  const navigate = useNavigate();
    //on change event
    const onInputChange = (name,value,dispatch) => {
        //validation logic
        const {hasError, error} = validateData(name,value); //form field, latest value

        //which key to be modified - value, hasError, error, touched 
        let isFormValid = true;
        for(const key in buyer)
        {
            let item = buyer[key];
            
            if(item.hasError)
            {
                isFormValid = false;
                break;
            }
        }       

        //sending action object
        dispatch({type: 'update', data: {name,value,hasError,error, touched: true, isFormValid }})
    }
    const onFocusOut = (name, value, dispatch) => {
        const { hasError, error } = validateData(name, value)
        let isFormValid = true
        for (const key in buyer) {
          const item = buyer[key]
          if (key === name && hasError) {
            isFormValid = false
            break
          } else if (key !== name && item.hasError) {
            isFormValid = false
            break
          }
        }
        dispatch({
          type: "update",
          data: { name, value, hasError, error, touched: true, isFormValid },
        })
      }  

  const sendData = (e) => {
    e.preventDefault();
    //console.log("buyer"+JSON.stringify(seller));   

    const reqData={
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            username:buyer.username.value,
            password:buyer.password.value, 
            buyername:buyer.buyername.value,
            email:buyer.email.value,
            buyer_contact:buyer.buyer_contact.value,
            aadharno:buyer.aadharno.value,
            address:buyer.address.value
            
        })
    }

    fetch("http://localhost:8080/registerbuyer",reqData)  // send post req to server
    .then(res => res.text())  //resp recieved from server
    .then(data =>{
        alert("Registration Success");
       navigate("/login");
        // setMsg(data)
    }).catch((err)=>{console.log(err)
            setMsg("User exists")
           // Toast.error("User exists")
            
    });   
        
    
  } 
  
  return (
    <div>
        <br/>
            <div className='container ' style={{"width":"400px", "margin-top":"100px","height":"800px","borderRadius":"15px" , "backgroundColor":"black","opacity":"0.6"}}>
        {/*{JSON.stringify(buyer)}*/}
        <h1 >Buyer Registration Form</h1>
    <Form >
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text"
              name="username"
              placeholder="Username"
              value={buyer.username.value}
              onChange={ (e)=> {onInputChange("username",e.target.value, dispatch)}} 
             onBlur={(e)=> {onFocusOut("username",e.target.value, dispatch)}} />       
            <p className="text-danger" style={{display: buyer.username.touched && buyer.username.hasError ?"block":"none"}}> {buyer.username.error} </p>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
              name="password"
              placeholder="Password"
              value={buyer.password.value}
              onChange={ (e)=> {onInputChange("password",e.target.value, dispatch)}} 
             onBlur={(e)=> {onFocusOut("password",e.target.value, dispatch)}} />       
            <p className="text-danger" style={{display: buyer.password.touched && buyer.password.hasError ?"block":"none"}}> {buyer.password.error} </p>
             
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBuyername">
        <Form.Label>Buyer Name</Form.Label>
        <Form.Control type="text"
              name="buyername" value={buyer.buyername.value}
              onChange={ (e)=> {onInputChange("buyername",e.target.value, dispatch)}} 
             onBlur={(e)=> {onFocusOut("buyername",e.target.value, dispatch)}} />       
            <p className="text-danger" style={{display: buyer.buyername.touched && buyer.buyername.hasError ?"block":"none"}}> {buyer.buyername.error} </p>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" 
                       name="email"
                        value={buyer.email.value}
                        onChange={ (e)=> {onInputChange("email",e.target.value, dispatch)}} 
                       onBlur={(e)=> {onFocusOut("email",e.target.value, dispatch)}} />       
                      <p className="text-danger" style={{display: buyer.email.touched && buyer.email.hasError ?"block":"none"}}> {buyer.email.error} </p>      
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBuyerContact">
        <Form.Label>Buyer Contact</Form.Label>
        <Form.Control type="text"
               name="buyer_contact" 
               value={buyer.buyer_contact.value}
                        onChange={ (e)=> {onInputChange("buyer_contact",e.target.value, dispatch)}} 
                       onBlur={(e)=> {onFocusOut("buyer_contact",e.target.value, dispatch)}} />       
                      <p className="text-danger" style={{display: buyer.buyer_contact.touched && buyer.buyer_contact.hasError ?"block":"none"}}> {buyer.buyer_contact.error} </p>       
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAadharno">
        <Form.Label>Aadharno</Form.Label>
        <Form.Control type="text"
               name="aadharno" 
               value={buyer.aadharno.value}
               onChange={ (e)=> {onInputChange("aadharno",e.target.value, dispatch)}} 
              onBlur={(e)=> {onFocusOut("aadharno",e.target.value, dispatch)}} />       
             <p className="text-danger" style={{display: buyer.aadharno.touched && buyer.aadharno.hasError ?"block":"none"}}> {buyer.aadharno.error} </p>       
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text"
              name="address" 
              value={buyer.address.value}
              onChange={ (e)=> {onInputChange("address",e.target.value, dispatch)}} 
             onBlur={(e)=> {onFocusOut("address",e.target.value, dispatch)}} />       
            <p className="text-danger" style={{display: buyer.address.touched && buyer.address.hasError ?"block":"none"}}> {buyer.address.error} </p>        
       
      </Form.Group>
     
      <Button variant="primary" type="submit" disabled={buyer.isFormValid?false:true}
      onClick={(e)=>{sendData(e)}}
      >  Register Buyer
      </Button>&nbsp; &nbsp;
      <Button variant="primary" type="reset" 
                    onClick={()=>{ dispatch({type: 'reset'})}} >Clear</Button>
    </Form>
    <a href="/home">Go to Home Page</a>
    {msg}
        

        
        
    </div>

    </div>
  );
      }
    
export default BuyerRegistration;