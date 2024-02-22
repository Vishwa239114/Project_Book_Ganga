import React from "react"
import c7 from '../images/gyansagarlogopng.png';

const Footer = () => 
<footer style={{"backgroundColor":"black"}} className="page-footer font-small blue pt-4">
    <div className="container-fluid text-center text-md-left">
        <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase" style={{"color":"gold"}}>Book-Ganga </h5>
                <p>On this site you will find many books which you are interested in.</p>
                <img style={{"height":"150px","width":"400px"}} src={c7}/>

            </div>

            <hr className="clearfix w-100 d-md-none pb-0"/>

            <div className="col-md-3 mb-md-0 mb-3">
                <h5  className="text-uppercase">Links</h5>
                <ul style={{"fontFamily":"cursive"}} className="list-unstyled">
                    <li><a href="/aboutus" >About Us</a></li>
                    <li><a href="/sellerregister">Seller Registration</a></li>
                    <li><a href="buyerregister">Buyer Registration</a></li>
                    <li><h5>Contact Us</h5>+919637615156&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+918010343274&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+919575821436</li>
                </ul>
            </div>

        </div>
    </div>

    <div className="footer-copyright text-center py-3">© 2024 Copyright:
        <a href="/home"> Book-Ganga.com</a>
    </div>

</footer>

export default Footer