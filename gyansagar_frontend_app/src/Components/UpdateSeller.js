import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useReducer } from "react";
import MenuItem from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
let flag = JSON.parse(localStorage.getItem("loggedInUser"))
var init = null;

if(flag != null){
init = {
        userid: { value: JSON.parse(localStorage.getItem("loggedInUser")).userid, hasError: false, touched: true, error: "" },
        sellerid: { value: JSON.parse(localStorage.getItem("loggedInUser")).sellerid, hasError: false, touched: true, error: "" },
        username:{value:JSON.parse(localStorage.getItem("loggedInUser")).userid.username, hasError: true,touched: false, error:""},
       publication_name:{value:JSON.parse(localStorage.getItem("loggedInUser")).publication_name, hasError: true,touched: false, error:""},
       email:{value:JSON.parse(localStorage.getItem("loggedInUser")).email, hasError: true,touched: false, error:""},
       seller_contact:{value:JSON.parse(localStorage.getItem("loggedInUser")).seller_contact, hasError: true,touched: false, error:""},
       address:{value:JSON.parse(localStorage.getItem("loggedInUser")).address, hasError: true,touched: false, error:""},
       isFormValid: false
}
}
else{
    init = {
       userid: { value:"", hasError: false, touched: true, error: "" },
       sellerid: { value:"", hasError: false, touched: true, error: "" },
       username:{value:"", hasError: true,touched: false, error:""},
       publication_name:{value:"", hasError: true,touched: false, error:""},
       email:{value:"", hasError: true,touched: false, error:""},
       seller_contact:{value:"", hasError: true,touched: false, error:""},
       address:{value:"", hasError: true,touched: false, error:""},
       isFormValid: false
}
}
const reducer = (seller, action) => {
    
    switch (action.type) {
        case 'update': {
            const { name, value, hasError, error, touched, isFormValid } = action.data;
            return {
                ...seller,
                [name]: { ...seller[name], value, hasError, error, touched },
                isFormValid
            }
        }
        case 'reset': {
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
        case "publication_name" : 
          
            if(value.length < 3)
            {
                hasError = true;
                error = "Publication Name must contain atleast 3 characters";
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
        case "seller_contact" : 
            let regex4 = /^[0-9]{10}$/;
            if(!regex4.test(value))
            {
                hasError = true;
                error = "Contact must be 10 digits";
            }
        break;
        case "address" : 
            let regex5 =  /^[A-Za-z0-9\s, . - /]{2,}$/;
            if(!regex5.test(value))
            {
                hasError = true;
                error = "Address must not contain any special character";
            }
        break;    
                 
    }
    return {hasError, error}    
} 


let UpdateSeller = () => {
    const [seller, dispatch] = useReducer(reducer, init);
    const [msg, setMsg] = useState("");
    var navigate = useNavigate();
    //on change event
    const onInputChange = (name, value, dispatch) => {
        //validation logic
        const { hasError, error } = validateData(name, value); //form field, latest value

        //which key to be modified - value, hasError, error, touched 
        let isFormValid = true;
        for (const key in seller) {
            let item = seller[key];

            if (item.hasError) {
                isFormValid = false;
                break;
            }
        }

        //sending action object
        dispatch({ type: 'update', data: { name, value, hasError, error, touched: true, isFormValid } })
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
        console.log("Seller" + JSON.stringify(seller));
        const reqData = {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({

                userid: seller.userid.value,
                sellerid: seller.sellerid.value,
                publication_name: seller.publication_name.value,
                email: seller.email.value,
                seller_contact: seller.seller_contact.value,
                address: seller.address.value               
            })
        }

        fetch(`http://localhost:8080/updateseller`, reqData)  // send post req to server
            .then(res => res.text())  //resp recieved from server
            .then(data => {
                    alert("Profile Updated Successfully");
                    navigate("/sellerhome")
            })
            .catch(error => {
                setMsg("Book already exists!")
                console.log(error)
            })
    }


    return (
        <div style={{"marginTop":"50px"}}><br/>
        <div className='container ' style={{ "width": "500px", "height": "550px", "borderRadius": "15px", "backgroundColor": "black", "opacity": "0.6" }}>
            {/* {JSON.stringify(book)}*/}
            <h1 >Update Seller </h1>
            <Form >
            <Form.Group className="mb-3" controlId="formSellerid">
                   
                    <Form.Control type="number"
                        name="userid"
                        readOnly="true"
                        value={seller.userid.value}
                        hidden="true"
                        onChange={(e) => { onInputChange("userid", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("userid", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: seller.userid.touched && seller.userid.hasError ? "block" : "none" }}> {seller.userid.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formSellerid">
                   
                   <Form.Control type="number"
                       name="sellerid"
                       readOnly="true"
                       value={seller.sellerid.value}
                       hidden="true"
                       onChange={(e) => { onInputChange("sellerid", e.target.value, dispatch) }}
                       onBlur={(e) => { onFocusOut("sellerid", e.target.value, dispatch) }} />
                   <p className="text-danger" style={{ display: seller.sellerid.touched && seller.sellerid.hasError ? "block" : "none" }}> {seller.sellerid.error} </p>

               </Form.Group>

                <Form.Group className="mb-3" controlId="formusername">
                    <Form.Label>username</Form.Label>
                    <Form.Control type="text"
                        name="username"
                        required
                        value={seller.username.value}
                        onChange={(e) => { onInputChange("username", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("username", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: seller.username.touched && seller.username.hasError ? "block" : "none" }}> {seller.username.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formPublication_name">
                    <Form.Label>publication_name</Form.Label>
                    <Form.Control type="text"
                        name="publication_name"
                        value={seller.publication_name.value}
                        onChange={(e) => { onInputChange("publication_name", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("publication_name", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: seller.publication_name.touched && seller.publication_name.hasError ? "block" : "none" }}> {seller.publication_name.error} </p>

                </Form.Group>
                
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"
                        name="email"
                        value={seller.email.value}
                        onChange={(e) => { onInputChange("email", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("email", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: seller.email.touched && seller.email.hasError ? "block" : "none" }}> {seller.email.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formSellerContact">
                    <Form.Label>Seller Contact</Form.Label>
                    <Form.Control type="text"
                        name="seller_contact"
                        value={seller.seller_contact.value}
                        onChange={(e) => { onInputChange("seller_contact", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("seller_contact", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: seller.seller_contact.touched && seller.seller_contact.hasError ? "block" : "none" }}> {seller.seller_contact.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text"
                        name="address"
                        value={seller.address.value}
                        onChange={(e) => { onInputChange("address", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("address", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: seller.address.touched && seller.address.hasError ? "block" : "none" }}> {seller.address.error} </p>
                </Form.Group>

                <Button variant="primary" type="submit" 
                    onClick={(e) => { sendData(e) }}
                >  Update Seller
                </Button>&nbsp; &nbsp;
                <Button variant="primary" type="reset"
                    onClick={() => { dispatch({ type: 'reset' }) }} >Clear</Button>
            </Form>
            <p className='text-danger'>{msg}</p>
            {msg}
        </div>
        </div>
    );
}

export default UpdateSeller;