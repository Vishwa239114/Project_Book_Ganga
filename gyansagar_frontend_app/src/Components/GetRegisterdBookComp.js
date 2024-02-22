import axios from 'axios';
import { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

let GetRegistedBookComp= ()=>{
    
    const[state,setState]=useState([]);
   
    let getbookbysellerid=()=>{
        const sellerId=JSON.parse(localStorage.getItem("loggedInUser")).sellerid;

        axios.get(`http://localhost:8080/getbookbysellerid/${sellerId}`)
        .then(res =>{
            const result=res.data.filter(x=> x.deleted==0)
            setState(result)})
            .catch(err=> {
                alert(err.message)
                console.log("Error in getbookbysellerid ", err)
            })
    }

   let deleteHandler=(bookid)=>{      
    //Use axios here  
       axios.delete("http://localhost:8080/deletebook/"+bookid)
        .then(res => {
            console.log(res.data);
            if(res.status == 200){
                alert("Book deleted successfully");
                getbookbysellerid();
            }else{
                alert("Error while deleting book");
            }
        })    
    }    

    useEffect(()=>{
        getbookbysellerid()
    },[])

    return(
        <div>
               <h4 style={{"margin-left":"45%"}}>List of Books</h4> 
    <Table  striped bordered hover variant="dark" style={{"width":"80%","marginTop":"50px","margin-left":"130px","textAlign":"center"}}>
      <thead>
        <tr>
          <th>Sr.No</th>
          <th>Book Name</th>
          <th>Author</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Delete</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
     { 
     
     state.map((v,i)=>{   
        
                        return (
                            
                            <tr>
                                
                                <td>{++i}</td>
                                <td>{v.bookname}</td>
                                <td>{v.author}</td>
                                <td>{v.price}</td>
                                <td>{v.quantity}</td>  
                                                                                          
                                <td><Button onClick={()=>{deleteHandler(v.bookid)}}>Delete</Button></td>
                                  
                                <td><Button href="/updatebook" onClick={() => localStorage.setItem("book",JSON.stringify(v))}>Update</Button></td>
                            </tr>
                        )
                    })
                } 
      </tbody>
    </Table>
    </div>
    
    )

    
}
export default GetRegistedBookComp;