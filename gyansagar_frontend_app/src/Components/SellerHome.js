
import c7 from '../images/sellerhome.jpg';

let SellerComp=()=>{

    return(
        <div ><br/>
        <div style={{"backgroundColor":"black","opacity":"0.6","marginTop":"40px"}}>       
                <h1>Welcome  {JSON.parse(localStorage.getItem("loggedInUser")).publication_name} publication&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h1>
        </div>
        <img class="rounded mx-auto d-block" src={c7} />
 
        </div>
       
    )

}

export default SellerComp;