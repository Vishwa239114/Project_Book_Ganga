import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    const initialValues = { username: "",  password: "",buyer:{},seller:{},admin:{} };
    
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const[user,setUser]=useState("");
  const[message,setMessage]=useState("");

    let navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    setFormErrors(validate(formValues));
    setIsSubmit(true);

    const reqData={
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            username:formValues.username,
            password:formValues.password 
            
        })
    }

    fetch("http://localhost:8080/logincheck",reqData)  // send post req to server
    .then(res => res.text())  //resp recieved from server
    .then(data =>       
        {//console.log(data);
            const json=JSON.parse(data)
            if(!json.error)
        {               
            //console.log("Json data="+JSON.stringify(json))
            if(json.userid.role=="buyer")
           {
            setUser({buyer:json});            
            localStorage.setItem("loggedInUser",data);
            localStorage.setItem("user","buyer");             
            //console.log("Json userbuyer="+JSON.stringify(user.buyer))
                navigate("/home")
           } 
            else if(json.userid.role=="seller")
            {
                setUser({seller:json});
                localStorage.setItem("loggedInUser",data);
                localStorage.setItem("user","seller");  
                navigate("/sellerhome");

            }
            else
            {                
                setUser({admin:json});
                //console.log(JSON.stringify(json.userid.role));
                localStorage.setItem("loggedInUser",data);
                localStorage.setItem("user","admin");  
                navigate("/adminhome");
                
            }              
        }
        else
        {
            setMessage(json.error);
            console.log(json.error,"errorcase")
        }        
    }).catch(error=>{console.log("Invalid Credentials",error)
            setMessage(error.message);
            });
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  
  const validate = (values) => {
    const errors = {};
    //const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };
  return (
    <div><br/>
    <div className='container ' style={{"width":"400px", "margin-top":"100px","backgroundColor":"#797676","height":"350px","borderRadius":"15px" , "backgroundColor":"black","opacity":"0.6", "box-shadow":" 0 4px 8px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.8)"}}>
        
    <Form style={{"textAlign":"center"}} onSubmit={handleSubmit}>
      <Form.Group className="mb-3"  controlId="formUsername">
        <Form.Label style={{"fontSize":"25px"}} >Username</Form.Label>
        <Form.Control className="opacity-100 "   type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange} />       
        <p className="text-danger" style={{"fontWeight":"bold"}}>{formErrors.username}</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label style={{"fontSize":"25px"}}>Password</Form.Label>
        <Form.Control type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}/>
              <p  style={{"fontWeight":"bold"}} className= "text-danger">{formErrors.password}</p>
      </Form.Group>
     
      <Button variant="outline-primary"  type="submit">
        Login
      </Button><br/><br/>New to us?&nbsp;&nbsp;<a href='/buyerregister'>Register as a buyer</a><br/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='/sellerregister'> Register as a seller</a>
    </Form>
    <div >
         {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div  style={{"fontWeight":"bold"}} className=" text-danger ui message danger">{message}</div>
      ) : (
        <pre></pre>
      )}
      </div>
    </div>
    </div>
  );
      }

export default LoginForm;