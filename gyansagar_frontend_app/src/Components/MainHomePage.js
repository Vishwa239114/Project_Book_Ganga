import c5 from '../images/c5.jpg';
import c6 from '../images/c6.jpg';
import c7 from '../images/c3.jpg';
import c8 from '../images/c8.jpg';

import axios from 'axios';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Footer from './Footer';
import './MainHomeComp.css';

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));


let MainHomeComp = ({data}) => {
  const [state, setState] = useState([]);
  const [index, setIndex] = useState(0);
  const [product] = useState([]);
  const [cart,setCart] = useState([]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  let cartList ;
  useEffect(() => {
    getallbooks();
  }, [])
  useEffect(() => {
    //localStorage.setItem('carts',cartList);
  }, [cart])
  
  let getallbooks = () => {
    axios.get(`http://localhost:8080/getallbooks`)
      .then(res => { setState(res.data) })
      .catch(err => {
        alert(err.message)
        console.log("Error in getting Books ", err)
      })
  }

  const addToCart = (data) => {
      {/*let itemsFromLocalStorage = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): [];
      cartList =setCart([...cart,data]);
      localStorage.setItem('carts',cart);
      console.log(cart);*/}
      let itemsFromLocalStorage = localStorage.getItem('carts')? JSON.parse(localStorage.getItem('carts')): [];
      let index = itemsFromLocalStorage.findIndex(book => book.bookid == data.bookid);
      if(index != -1){
       itemsFromLocalStorage[index].count = itemsFromLocalStorage[index].count + 1;
      }
      else{
        itemsFromLocalStorage.push({...data,count:1});
      }
      localStorage.setItem("carts",JSON.stringify(itemsFromLocalStorage));
      console.log(itemsFromLocalStorage);
  }
  return (
    <div className='maincomp' style={{ "marginTop": "50px" }}>
      <div style={{ "marginTop": "50px", "width": "1000px", "height": "500px", "marginLeft": "12%" }}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={c5}
              style={{"height":"500px","width":"100%"}}
              alt="First slide"
             
            />
            <Carousel.Caption>
              <h3>Rabindranath Tagore</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={c6}
              style={{"height":"500px","width":"100%"}}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Sahir Ludhianvi</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={c8}
              style={{"height":"500px","width":"100%"}}
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>V. P. Kale</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block "
              style={{"height":"500px","width":"100%"}}
              src={c7}
              alt="Third slide"
            />

            <Carousel.Caption>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <br /><br /><br />
      <div   style={{ "marginTop": "50px" }}>
        <Row md={4} className="g-5">
          {state.map((v) => (
            <Col >
              <Card id='bookcard' style={{ "borderRadius": "10px" }} >
                <Card.Img style={{ "borderRadius": "10px","height": "300px","width": "300px" }} className='img-thumbnail' variant="top" src={images[v.book_img_url]} />
             
                <Card.Body style={{ "color": "black" }}>
                  <Card.Title style={{ "textAlign": "center" }}>{v.bookname}</Card.Title>
                  <hr />
                  <Card.Subtitle className="mb-2 text-muted">Author&nbsp;-&nbsp;{v.author}</Card.Subtitle>
                  <Card.Text>&#8377;&nbsp;{v.price}</Card.Text>
                  <Card.Text style={{"height":"30px"}}>
                    {v.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer style={{ "textAlign": "center" }}>

                  <Button className='button' variant="outline-warning" onClick={() => addToCart(v)}>Add to cart</Button> &nbsp;&nbsp;
                  <Button className='button' variant="outline-primary" onClick={() => {localStorage.setItem("bookid",v.bookid)}} href='/viewfeedback'> Feedbacks</Button>&nbsp;
                  {/* <Button variant="outline-warning">Buy now</Button> */}
                </Card.Footer>
              </Card> &nbsp;  &nbsp;
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </div>
  );
}

export default MainHomeComp;

