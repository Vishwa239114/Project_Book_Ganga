import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useReducer } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const init={
       username:{value:"", hasError: true,touched: false, error:""},
       password:{value:"", hasError: true,touched: false, error:""}, 
       publication_name:{value:"", hasError: true,touched: false, error:""},
       email:{value:"", hasError: true,touched: false, error:""},
       seller_contact:{value:"", hasError: true,touched: false, error:""},
      // book_img_url:{value:"", hasError: true,touched: false, error:""},
       address:{value:"", hasError: true,touched: false, error:""},
       isFormValid: false
    }
    const reducer = (seller,action) => {
   
        switch(action.type){
            case 'update' : {
                const {name,value,hasError, error, touched, isFormValid} = action.data;
                return { 
                    ...seller,
                    [name]: { ...seller[name],value, hasError, error, touched},
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
            // case "publication_name" : 
            //     let regex2 = /[]{1,}$/;
            //     if(regex2.test(value))
            //     {
            //         hasError = true;
            //         error = "Publication Name must not be empty";
            //     }
            // break;   
            case "email" : 
                let regex3 = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
                if(!regex3.test(value))
                {
                    hasError = true;
                    error = "Email must be valid";
                }
            break;
            case "seller_contact" : 
                let regex4 = /^[0-9]{10}$/;
                if(!regex4.test(value))
                {
                    hasError = true;
                    error = "Contact must be 10 digits";
                }
            break;
            case "address" : 
                let regex5 =  /^[A-Z\sa-z0-9,./-]{2,}$/;
                if(!regex5.test(value))
                {
                    hasError = true;
                    error = "Address may contain  special characters";
                }
            break;    
                     
        }
        return {hasError, error}    
    } 

let SellerComp=()=> {
    const[seller,dispatch]=useReducer(reducer,init);
    const[msg,setMsg]=useState("");    
    const navigate = useNavigate();
    //on change event
    const onInputChange = (name,value,dispatch) => {
        //validation logic
        const {hasError, error} = validateData(name,value); //form field, latest value

        //which key to be modified - value, hasError, error, touched 
        let isFormValid = true;
        for(const key in seller)
        {
            let item = seller[key];
            
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
        for (const key in seller) {
          const item = seller[key]
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
    console.log("Seller"+JSON.stringify(seller));   

    const body={
        username:seller.username.value,
        password:seller.password.value, 
        publication_name:seller.publication_name.value,
        email:seller.email.value,
        seller_contact:seller.seller_contact.value,
        //book_img_url:seller.book_img_url.value,
        address:seller.address.value
        
    }

    axios.post("http://localhost:8080/registerseller",body)  // send post req to server
    .then(res =>
        {           
            const data=res.data;
            //console.log(data); 
            alert("Registered Successfully");
            navigate("/login");
        })
    .catch(error=>{setMsg(error?.response?.data?.error|| error.message)
    console.log(error);        
            })
  } 
  
  return (
    <div>
        <br/>
    <div className='container ' style={{"width":"400px","height":"800px", "margin-top":"100px","borderRadius":"15px" , "backgroundColor":"black","opacity":"0.6"}}>
          {/*{JSON.stringify(seller)}*/}
        <h1 >Seller Registration Form</h1>
    <Form >
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text"
              name="username"
              placeholder="Username"
              value={seller.username.value}
              onChange={ (e)=> {onInputChange("username",e.target.value, dispatch)}} 
             onBlur={(e)=> {onFocusOut("username",e.target.value, dispatch)}} />       
            <p className="text-danger" style={{display: seller.username.touched && seller.username.hasError ?"block":"none"}}> {seller.username.error} </p>

      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password"
              name="password"
              placeholder="Password"
              value={seller.password.value}
              onChange={ (e)=> {onInputChange("password",e.target.value, dispatch)}} 
             onBlur={(e)=> {onFocusOut("password",e.target.value, dispatch)}} />       
            <p className="text-danger" style={{display: seller.password.touched && seller.password.hasError ?"block":"none"}}> {seller.password.error} </p>
             
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPublication">
        <Form.Label>Publication name</Form.Label>
        <Form.Control type="text"
              name="publication_name" value={seller.publication_name.value}
              onChange={ (e)=> {onInputChange("publication_name",e.target.value, dispatch)}} 
             onBlur={(e)=> {onFocusOut("publication_name",e.target.value, dispatch)}} />       
            <p className="text-danger" style={{display: seller.publication_name.touched && seller.publication_name.hasError ?"block":"none"}}> {seller.publication_name.error} </p>
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" 
                       name="email"
                        value={seller.email.value}
                        onChange={ (e)=> {onInputChange("email",e.target.value, dispatch)}} 
                       onBlur={(e)=> {onFocusOut("email",e.target.value, dispatch)}} />       
                      <p className="text-danger" style={{display: seller.email.touched && seller.email.hasError ?"block":"none"}}> {seller.email.error} </p>      
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSellerContact">
        <Form.Label>Seller Contact</Form.Label>
        <Form.Control type="text"
               name="seller_contact" 
               value={seller.seller_contact.value}
                        onChange={ (e)=> {onInputChange("seller_contact",e.target.value, dispatch)}} 
                       onBlur={(e)=> {onFocusOut("seller_contact",e.target.value, dispatch)}} />       
                      <p className="text-danger" style={{display: seller.seller_contact.touched && seller.seller_contact.hasError ?"block":"none"}}> {seller.seller_contact.error} </p>       
        
      </Form.Group>
   { /*
      <Form.Group className="mb-3" controlId="formBookImgUrl">
        <Form.Label>Book Img Url</Form.Label>
        <Form.Control type="text"
               name="book_img_url" 
               value={seller.book_img_url.value}
               onChange={ (e)=> {onInputChange("book_img_url",e.target.value, dispatch)}} 
              onBlur={(e)=> {onFocusOut("book_img_url",e.target.value, dispatch)}} />       
             <p className="text-danger" style={{display: seller.book_img_url.touched && seller.book_img_url.hasError ?"block":"none"}}> {seller.book_img_url.error} </p>       
        
      </Form.Group>
  */}
      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text"
              name="address" 
              value={seller.address.value}
              onChange={ (e)=> {onInputChange("address",e.target.value, dispatch)}} 
             onBlur={(e)=> {onFocusOut("address",e.target.value, dispatch)}} />       
            <p className="text-danger" style={{display: seller.address.touched && seller.address.hasError ?"block":"none"}}> {seller.address.error} </p>        
       
      </Form.Group>
     
      <Button variant="primary" type="submit" disabled={seller.isFormValid?false:true}
      onClick={(e)=>{sendData(e)}}
      >  Register Seller
      </Button>&nbsp; &nbsp;
      <Button variant="primary" type="reset" 
                    onClick={()=>{ dispatch({type: 'reset'})}} >Clear</Button>
    </Form>
    <a href="/home">Go to Home Page</a>
        <p className='text-danger'>{msg}</p>
    
    </div>
    </div>
  );
      }
    
export default SellerComp;