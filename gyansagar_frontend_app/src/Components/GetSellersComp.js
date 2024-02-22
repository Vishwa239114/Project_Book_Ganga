import axios from 'axios';
import { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

let GetSellersComp= ()=>{
    
    const[state,setState]=useState([]);
   
    let getallsellers = () =>{
        //const sellerId=JSON.parse(localStorage.getItem("loggedInUser")).sellerid;

        axios.get(`http://localhost:8080/getallsellers`)
        .then(res =>{
            console.log(res.deleted);
            const result=res.data.filter(x=> x.userid.deleted == 0)
            console.log(result);
            setState(result)})
            .catch(err=> {
                alert(err.message)
                console.log("Error in getting sellers ", err)
            })
    }

   let deleteHandler=(sellerid)=>{      
    //Use axios here  
       axios.delete(`http://localhost:8080/deleteseller/${sellerid}`)
        .then(res => {
            console.log(res.status)
            if(res.status==200){
                alert("Seller deleted successfully");
                getallsellers();
            }else{
                alert("Error while deleting Seller");
            }
        })
                         
    }    

    useEffect(()=>{
        getallsellers()
        
    },[])

    return(
        <div>
               <h2 style={{"margin-left":"45%","marginTop":"50px","color":"black"}}> List of Sellers </h2> 
    <Table striped bordered hover variant="dark" style={{"width":"80%","margin-left":"130px","textAlign":"center"}}>
      <thead>
        <tr>
        <th>sr. no</th>
          <th>Seller Id</th>
          <th>Publication Name</th>
          <th>Email</th>
          <th>Seller Contact</th>
          <th>Address</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
     { 
     
     state.map((v,i)=>{   
        
                        return (
                            
                            <tr>
                                
                                <td>{++i}</td>
                                <td>{v.sellerid}</td>
                                <td>{v.publication_name}</td>
                                <td>{v.email}</td>
                                <td>{v.seller_contact}</td>  
                                <td>{v.address}</td>                                                         
                                <td><Button onClick={()=>{deleteHandler(v.sellerid)}}>Delete</Button></td>
                                {console.log(v)}
                            </tr>
                        )
                    })
                } 
      </tbody>
    </Table>
    </div>
    
    )

    
}
export default GetSellersComp;