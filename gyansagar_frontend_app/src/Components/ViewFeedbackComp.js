import axios from 'axios';
import { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

let ViewFeedbackComp= ()=>{
    const[state,setState] = useState([]);
    let bookid = localStorage.getItem("bookid");
    let getordersbybuyerid=()=>{ 
        axios.get(`http://localhost:8080/getfeedbackbybookid/${bookid}`)  
        .then(res =>{
            const result=res.data
            setState(result)})
            .catch(err=> {
                alert(err.message)
                console.log("Error in Getting Orders ", err)
            })
        }   
    

    useEffect(()=>{
        getordersbybuyerid()
        
    },[])

    return(
        <div  >
                <h2 style={{"marginTop":"50px","text-align":"center"}} className='text text-primary'>Feedback</h2>
     { 
     state.map((v)=>{   
        
                        return (
                            
                            <div>
                                {/* <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>{v.subject}</ControlLabel>
                                <Form.Control componentClass="textarea" placeholder="textarea" >{v.feedback_desc}</FormControl>
                            </FormGroup> */}
                            <ul>
                                <li> <h4 style={{"color":"orange"}}><u>{v.subject}</u></h4></li>
                                <h5  style={{"color":"black"}}>{v.feedback_desc}</h5>
                            </ul>
                           
                            
                            
                            </div>
                        )
                    })
                } 
     
    </div>
    
)

            }
export default ViewFeedbackComp;