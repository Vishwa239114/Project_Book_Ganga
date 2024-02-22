import { useState } from "react";
import { Form } from "react-bootstrap";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { Navigate, useNavigate } from "react-router-dom";
let deladdress = {deli_address : ""};
let PlaceOrderComponent=()=>{
   let orderdetails =  JSON.parse(localStorage.getItem('orderdetails'));
   let loggedInUser =  JSON.parse(localStorage.getItem('loggedInUser'));
   let orderItems = JSON.parse(localStorage.getItem('carts'));
   const current = new Date();
   const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
   const[state,setState] = useState([]);
   const[err,setErr] = useState([]);
  const navigate = useNavigate();
   let init = {
    buyerid : loggedInUser.buyerid,
    total_price : orderdetails.total_price,
    discounted_price : orderdetails.discounted_price,
    deli_address : state.deli_address,
    order_date : date    
   }
   
    if(orderItems){
       let items =  orderItems.map(x =>  {
            return{ 
                bookid : x.bookid,
                order_qty : x.count,
                itemPrice : x.price
          } 
    });
    init = {...init,items};    
    }

    useEffect(() => {
      setState(state);
      setErr(err);
     // console.log(state);
  },[state,err]);

    //console.log(init)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({...state, [name] : value}); 
        //console.log(state);
      };

      const handlePayment = (e) => {
        e.preventDefault();

        let paymentdetails = {buyerid : state.data.buyerid , orderid : state.data.orderid , paymentmode : state.paymentmode }
        console.log("inside handlepayment:"+ JSON.stringify(paymentdetails))
        axios.post("http://localhost:8080/makepayment",paymentdetails)  // send post req to server
        .then(res =>
            {           
                const data2=res.data;
                console.log(JSON.stringify(data2)); 
                alert("Order Placed Successfully with Transaction number :"+data2.transaction_number);
                localStorage.removeItem("carts");
                localStorage.removeItem("orderdetails");
                navigate("/home");

            })
        .catch(error=>{
            console.log(error);        
                })
      
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Inside handlesubmit"+init);
        axios.post("http://localhost:8080/placeorder",init)  // send post req to server
        .then(res =>
            {           
                const data=res.data;
                setState({...state, data : data})
                alert("Address Added");

                console.log("data"+JSON.stringify(state));
                console.log("state"+data); 
            })
        .catch(error=>{
            console.log(error);        
                })           
      };

    return(
        <div style={{ "marginTop": "50px","marginLeft":"300px","color":"black"}}>
           <section>  
        <div style={{"width":"350px"}} class="card-body">
          
         <Form style={{"textAlign":"center"}}  onSubmit={handleSubmit} >
        <Form.Group className="mb-3"  controlId="formUsername">
          <Form.Label style={{"fontSize":"25px"}} >Delivery Address</Form.Label>
          <Form.Control className="opacity-100 "   type="text"
                name="deli_address"
                placeholder="Address"
                value = {state.deli_address}
                onChange={handleChange} />
        </Form.Group>
        <Button style={{"float":"left"}} onClick={() => {localStorage.removeItem("carts")}} variant="outline-primary" href="/home">Cancel Order</Button>
        <Button variant="outline-primary"  type="submit">
        Confirm Address
      </Button>
      </Form>
      <form onSubmit={handlePayment}>
         <hr class="my-4" />
           <h3 class="mb-4">Payment</h3>

            <div class="form-check">
              <input class="form-check-input" type="radio" name = "paymentmode" value = "creditcard"
                onChange={handleChange}  id="checkoutForm3"
                 />
              <label class="form-check-label" for="checkoutForm3">
                Credit card
              </label>
            </div>

            <div class="form-check mb-4">
              <input class="form-check-input" type="radio" name = "paymentmode" value = "debitCard"
                onChange={handleChange}  id="checkoutForm4" />
              <label class="form-check-label" for="checkoutForm4">
                Debit card
              </label>
            </div>

            {/* <div class="form-check mb-4">
              <input class="form-check-input"  type="radio" name = "paymentmode" value = "upi"
                onChange={handleChange}   id="checkoutForm5" />
              <label class="form-check-label" for="checkoutForm5">
                UPI
              </label>
            </div> */}

            <div class="row mb-4">
              <div class="col">
                <div class="form-outline">
                  <input type="text" id="formNameOnCard" class="form-control" />
                  <label class="form-label" for="formNameOnCard">Name on card</label>
                </div>
              </div>
              <div class="col">
                <div class="form-outline">
                  <input type="text" id="formCardNumber" class="form-control" />
                  <label class="form-label" for="formCardNumber">Credit card number</label>
                </div>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-3">
                <div class="form-outline">
                  <input type="text" id="formExpiration" class="form-control" />
                  <label class="form-label" for="formExpiration">Expiration</label>
                </div>
              </div>
              <div class="col-3">
                <div class="form-outline">
                  <input type="text" id="formCVV" class="form-control" />
                  <label class="form-label" for="formCVV">CVV</label>
                </div>
              </div>
            </div>

            <button class="btn btn-outline-success  btn-lg btn-block" type="submit">
              Make Payment
            </button>
          </form>
        </div>
    
  
</section>
        </div>

    )
}

export default PlaceOrderComponent;

