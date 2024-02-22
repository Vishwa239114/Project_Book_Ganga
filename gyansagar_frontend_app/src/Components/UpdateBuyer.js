import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useReducer } from "react";
import MenuItem from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
let flag = JSON.parse(localStorage.getItem("loggedInUser"))
var init = null;

if (flag != null) {
    init = {
        userid: { value: JSON.parse(localStorage.getItem("loggedInUser")).userid, hasError: false, touched: true, error: "" },
        buyerid: { value: JSON.parse(localStorage.getItem("loggedInUser")).buyerid, hasError: false, touched: true, error: "" },
        buyername: { value: JSON.parse(localStorage.getItem("loggedInUser")).buyername, hasError: true, touched: false, error: "" },
        email: { value: JSON.parse(localStorage.getItem("loggedInUser")).email, hasError: true, touched: false, error: "" },
        buyer_contact: { value: JSON.parse(localStorage.getItem("loggedInUser")).buyer_contact, hasError: true, touched: false, error: "" },
        aadharno: { value: JSON.parse(localStorage.getItem("loggedInUser")).aadharno, hasError: false, touched: true, error: "" },
        address: { value: JSON.parse(localStorage.getItem("loggedInUser")).address, hasError: true, touched: false, error: "" },
        isFormValid: false
    }
}
else {
    init = {
        userid: { value: "", hasError: false, touched: true, error: "" },
        buyerid: { value: "", hasError: false, touched: true, error: "" },
        buyername: { value: "", hasError: true, touched: false, error: "" },
        email: { value: "", hasError: true, touched: false, error: "" },
        buyer_contact: { value: "", hasError: true, touched: false, error: "" },
        aadharno: { value: "", hasError: false, touched: true, error: "" },
        address: { value: "", hasError: true, touched: false, error: "" },
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
const validateData = (name, value) => {
    let hasError = false, error = "";
    switch (name) {
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
            case "address" : 
                let regex6 =  /^[A-Za-z0-9\s,./-]{2,}$/;
                if(!regex6.test(value))
                {
                    hasError = true;
                    error = "Address must not contain any special character";
                }
            break;    
                     
    }
    return { hasError, error }
}


let UpdateBuyer = () => {
    const [buyer, dispatch] = useReducer(reducer, init);
    const [msg, setMsg] = useState("");
    var navigate = useNavigate();
    //on change event
    const onInputChange = (name, value, dispatch) => {
        //validation logic
        const { hasError, error } = validateData(name, value); //form field, latest value

        //which key to be modified - value, hasError, error, touched 
        let isFormValid = true;
        for (const key in buyer) {
            let item = buyer[key];

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
        console.log("Seller" + JSON.stringify(buyer));
        const body = {
                userid: buyer.userid.value,
                buyerid: buyer.buyerid.value,
                buyername: buyer.buyername.value,
                email: buyer.email.value,
                buyer_contact: buyer.buyer_contact.value,
                aadharno: buyer.aadharno.value,
                address: buyer.address.value
        }

       axios.put(`http://localhost:8080/updatebuyer`, body)  // send post req to server
            .then(res => 
                {
                    if(res.status == 200)
                    {
                    alert("Profile Updated Successfully");
                    navigate("/home")
                }
                }
                )  //resp recieved from server           
            .catch(error => {
                setMsg("Error while updating!")
                console.log(error)
            })
    }


    return (
        <div >
            <br/><br/>
        <div  className='container ' style={{ "width": "500px", "height": "500px", "borderRadius": "15px", "margin-top": "50px", "backgroundColor": "black", "opacity": "0.6" }}>
            {/* {JSON.stringify(book)}*/}
            <h1 style={{"textAlign":"center"}} >Update Profile </h1>
            <Form >
                <Form.Group className="mb-3" controlId="formSellerid">

                    <Form.Control type="number"
                        name="userid"
                        readOnly="true"
                        value={buyer.userid.value}
                        hidden="true"
                        onChange={(e) => { onInputChange("userid", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("userid", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: buyer.userid.touched && buyer.userid.hasError ? "block" : "none" }}> {buyer.userid.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBuyerid">

                    <Form.Control type="number"
                        name="buyerid"
                        readOnly="true"
                        value={buyer.buyerid.value}
                        hidden="true"
                        onChange={(e) => { onInputChange("buyerid", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("buyerid", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: buyer.buyerid.touched && buyer.buyerid.hasError ? "block" : "none" }}> {buyer.buyerid.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBuyername">
                    <Form.Label>Buyername</Form.Label>
                    <Form.Control type="text"
                        name="buyername"
                        required
                        value={buyer.buyername.value}
                        onChange={(e) => { onInputChange("buyername", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("buyername", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: buyer.buyername.touched && buyer.buyername.hasError ? "block" : "none" }}> {buyer.buyername.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formAadharNumber">
                   
                    <Form.Control type="text"
                        name="aadharno"
                        hidden='true'
                        disabled='true'
                        value={buyer.aadharno.value}
                        onChange={(e) => { onInputChange("aadharno", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("aadharno", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: buyer.aadharno.touched && buyer.aadharno.hasError ? "block" : "none" }}> {buyer.aadharno.error} </p>

                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text"
                        name="email"
                        value={buyer.email.value}
                        onChange={(e) => { onInputChange("email", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("email", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: buyer.email.touched && buyer.email.hasError ? "block" : "none" }}> {buyer.email.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBuyerContact">
                    <Form.Label>Buyer Contact</Form.Label>
                    <Form.Control type="text"
                        name="buyer_contact"
                        value={buyer.buyer_contact.value}
                        onChange={(e) => { onInputChange("buyer_contact", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("buyer_contact", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: buyer.buyer_contact.touched && buyer.buyer_contact.hasError ? "block" : "none" }}> {buyer.buyer_contact.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text"
                        name="address"
                        value={buyer.address.value}
                        onChange={(e) => { onInputChange("address", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("address", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: buyer.address.touched && buyer.address.hasError ? "block" : "none" }}> {buyer.address.error} </p>
                </Form.Group>

                <Button variant="primary" type="submit"
                    onClick={(e) => { sendData(e) }}
                >  Update Buyer
                </Button>&nbsp; &nbsp;
                <Button style={{"textAlign":"center"}} variant="primary" type="reset"
                    onClick={() => { dispatch({ type: 'reset' }) }} >Clear</Button>
            </Form>
            <p className='text-danger'>{msg}</p>
            {msg}
        </div>
        </div>
    );
}

export default UpdateBuyer;