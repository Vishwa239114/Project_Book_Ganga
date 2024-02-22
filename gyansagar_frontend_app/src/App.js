import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import BuyerRegistration from './Components/BuyerRegistrationComp';
import SellerRegistration from './Components/SellerRegistrationComp';
import LoginForm from './Components/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainHomeComp from './Components/MainHomePage';
import SellerComp from './Components/SellerHome';
import { Route, Routes } from 'react-router-dom';
import AdminComponent from './Components/AdminHome';
import AddBookComp from './Components/AddBookComp';
import GetRegistedBookComp from './Components/GetRegisterdBookComp';
import HeaderComp from './Components/HeaderComp';
import UpdateBookComp from './Components/UpdateBookComp';
import GetSellersComp from './Components/GetSellersComp';
import BookCardComp from './Components/BookCardComp';
import FeedbackComp from './Components/FeedbackComp';
import CartComp from './Components/CartComp';
import PlaceOrderComponent from './Components/PlaceOrderComp';
import OrderHistoryComp from './Components/OrderHistoryComp';
import ViewFeedbackComp from './Components/ViewFeedbackComp';
import UpdateSeller from './Components/UpdateSeller';
import UpdateBuyer from './Components/UpdateBuyer';
import Aboutus from './Components/Aboutus';


function App() {
  return (
    
    <div className="bg_image  container-fluid">
      <div className='content'>
       
        <HeaderComp/>
        {/*<br/><br/><br/><br/>
       <FeedbackComp/>*/}
     
        <Routes>
              <Route path="/home" element={<MainHomeComp/>} />
              <Route path="/sellerhome" element={<SellerComp/>} />
              <Route path="/adminhome" element={<AdminComponent/>} />
              <Route path="/addnewbook" element={<AddBookComp/>} />
              <Route path="/getregisteredbook" element={<GetRegistedBookComp/>} />
              <Route path="/updatebook" element={<UpdateBookComp/>} />
              <Route path="/getallsellers" element={<GetSellersComp/>} />
              <Route path="/cart" element={<CartComp/>} />
              <Route path="/placeorder" element={<PlaceOrderComponent/>} />
              <Route path="/getorderhistory" element={<OrderHistoryComp/>} />
              <Route path="/givefeedback" element={<FeedbackComp/>} />
              <Route path="/viewfeedback" element={<ViewFeedbackComp />} />
              <Route path="/updateseller" element={<UpdateSeller />} />
              <Route path="/updatebuyer" element={<UpdateBuyer />} />
              <Route path="/aboutus" element={<Aboutus/>} />

        </Routes>
       
        
      </div>
    </div>
  );
}

export default App;
