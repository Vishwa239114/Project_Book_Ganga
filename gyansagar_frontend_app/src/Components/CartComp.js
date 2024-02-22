import { useState } from "react";
import Card from 'react-bootstrap/Card';
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './CartComp.css';
import './navbar.css';
import bk1 from '../bk1.jpg';
import PlaceOrderComponent from "./PlaceOrderComp";
import OrderHistoryComp from "./OrderHistoryComp";
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import { Col } from "react-bootstrap";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
  

let CartComp = () => {

    let itemsFromLocalStorage = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : [];

    const [price, setPrice] = useState(0);
    const [totalcount, setTotalCount] = useState(0);
    const [discountedprice, setDiscountedPrice] = useState(0);

    const [cart, setCart] = useState(itemsFromLocalStorage);
    const handleRemove = (bookid) => {
        const arr = cart.filter((item) => item.bookid !== bookid);
        setCart(arr);
        localStorage.setItem("carts",JSON.stringify(arr));
        handlePrice();
    };


    const handlePrice = () => {
        let total_price = 0;
        let order_qty = 0;
        let discounted_price = 0;
        cart.map((item) => {
            total_price += item.count * item.price;
            order_qty += item.count;
            
        });
        setTotalCount(order_qty);
        setPrice(total_price);
        if(order_qty>=5 && order_qty<10){
            discounted_price += (total_price - total_price*0.1);
        }
        else if(order_qty>=10 && order_qty<20){
            discounted_price += (total_price - total_price*0.2);
        }
        else if(order_qty>=20 && order_qty<50){
            discounted_price += (total_price - total_price*0.3);
        }
        else if(order_qty>=50 ){
            discounted_price += (total_price - total_price*0.4);
        }
        else{
            discounted_price = total_price;
        }
        setDiscountedPrice(discounted_price);
        let orderdetails = {discounted_price: discounted_price , order_qty: order_qty, total_price: total_price };
        localStorage.setItem("orderdetails",JSON.stringify(orderdetails));
        console.log(orderdetails);
    };

    const addToCart = (data) => {
        {/*let itemsFromLocalStorage = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): [];
        cartList =setCart([...cart,data]);
        localStorage.setItem('carts',cart);
        console.log(cart);*/}
        let index = cart.findIndex(book => book.bookid == data.bookid);
        if (cart.includes(data)) {
            //cart[index].count = cart[index].count + 1;
            setCart([...cart, cart[index].count + 1]);
        }
        localStorage.setItem("carts", JSON.stringify(cart));
        console.log(cart);
    }

    const handleChange = (item, d) => {
        const ind = cart.indexOf(item);
        const arr = cart;
        arr[ind].count += d;

        if (arr[ind].count === 0) arr[ind].count = 1;
        setCart([...arr]);
        addToCart(arr);
    };

    useEffect(() => {
        handlePrice();
    });

    return (
        <div className="container" >
            <br/>
            <article>
            <div  style={{ "marginTop": "60px" }} className="row justify-content-center  " >
                {cart.map((item) => {
                    return (
                       
                            <div style={{"borderRadius":"10px"}} className="col-9 outer">
                                <div style={{"backgroundColor":"black","opacity":"0.8","borderRadius":"15px"}}  className="row  resbox">
                                    <div className="col-3 inner">
                                        <img src={images[item.book_img_url]} style={{ "height": "190px","borderRadius":"15px","width": "160px","marginTop":"11px" }} alt='Book image'></img>
                                    </div>

                                    <div className="col-8 text-center">

                                        <div className="row">
                                            <h3 style={{ "color": "white","height":"20px"}}>{item.bookname}</h3>
                                            <p>{item.author}</p>
                                            <div className="col-4 text-start" style={{ "marginTop": "50px" }}>
                                                {/* <b style={{ "color": "#008009" }}>{item.description}</b><br></br> */}
                                            </div>
                                            <div className="col-4  PriceBtnCol" >
                                                <div className="price">
                                                    <h2>&#8377; {item.price}</h2>
                                                </div>
                                                <div>
                                                    <Button  variant="outline-warning" onClick={() => handleChange(item, -1)}>-</Button>
                                                    <Button  variant="dark">{item.count}</Button>
                                                    <Button  variant="outline-warning" onClick={() => handleChange(item, 1)}>+</Button>
                                                </div>
                                                <div>
                                                    <br/>
                                                    <Button bordered hover variant="danger" onClick={() => handleRemove(item.bookid)}>Remove</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               <br/>
                            </div>   
                    )
                })
            }
                  
    <Table  striped bordered hover variant="dark" style={{"fontSize":"16px" ,"width":"80%","marginTop":"50px","backgroundColor":"rgb(64, 64, 64)"}}>
                <tr  className="total">
                    <td>Total Price of your Cart</td>
                    <td style={{"textAlign":"center"}}>&#8377;&nbsp;{price}</td>
                </tr>
                <tr className="total">
                    <td>Discounted Price of your Cart</td>
                    <td style={{"textAlign":"center"}}>  &#8377;&nbsp;{discountedprice}</td>
                </tr>
                <tr className="total">
                    <td>Total Items in your Cart</td>
                    <td style={{"textAlign":"center"}}>TotalCount : {totalcount}</td>
                </tr>
                </Table>
               <div className="col-3">
                        {(totalcount > 0) &&
                            <Button className="button" style={{ "marginLeft": "80px" }} href="/placeorder" >Place Order</Button>
                        } 
                        {(totalcount === 0) &&
                            <h3 style={{"color":"red","fontWeight":"bold"}}>Your Cart Is Empty!!</h3>
                        }    
                    <br/><br/>
               </div>
                </div>
            </article>
        </div>
      
    )
}
export default CartComp;