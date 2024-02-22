import { useReducer, useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Navigate, useNavigate } from "react-router-dom";
const init = {
    subject: "",
    feedback_desc: "",
    userid: JSON.parse(localStorage.getItem("loggedInUser")) ? JSON.parse(localStorage.getItem("loggedInUser")).userid.userid : [],
    bookid: localStorage.getItem("bookid_feedback")
}



const reducer = (state, action) => {
    switch (action.typee) {
        case 'update':
            return { ...state, [action.field]: action.val };

        case 'clear':
            return init;
    }
}

let FeedbackComp = () => {
    const [feedback, dispatch] = useReducer(reducer, init);
    const [msg, setMsg] = useState("");
    let navigate = useNavigate();

    let sendData = (e) => {
        e.preventDefault();
        const body = {
            subject: feedback.subject,
            feedback_desc: feedback.feedback_desc,
            userid: feedback.userid,
            bookid: feedback.bookid
        }
        // axios.post(`http://localhost:8080/getfeedbackbybookid/${feedback.bookid}`,body)    
        axios.post(`http://localhost:8080/givefeedback`, body)  // send post req to server
            .then(res => {
                const data = res.data;
                setMsg(JSON.stringify(data));
                //console.log(data); 
                alert("Feedback submitted successfully");
                localStorage.removeItem("bookid_feedback");
                navigate("/home");

            })
            .catch(error => {
                setMsg(error?.response?.data?.error || error.message)
                console.log(error);
            })
    }
    return (
        <div style={{ "margin-top": "50px" }}>
            <br />
            <div className='container ' style={{ "width": "500px", "height": "300px", "borderRadius": "15px", "backgroundColor": "black", "opacity": "0.6", "textAlign": "center" }}>
            <h2 style={{ "color": "Orange","textAlign":"center" }}>Feedback Form</h2>

                <Form>

                    <Form.Group className="mb-3" controlId="formIsbn">
                        <Form.Label>Enter Feedback Subject:</Form.Label>
                        <Form.Control type="text"
                            name="subject"
                            value={feedback.subject}
                            onChange={(e) => { dispatch({ typee: 'update', field: "subject", val: e.target.value }) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formIsbn">
                        <Form.Label>Enter feedback Description:</Form.Label>
                        <Form.Control type="text"
                            name="feedback_desc"
                            value={feedback.feedback_desc}
                            onChange={(e) => { dispatch({ typee: 'update', field: "feedback_desc", val: e.target.value }) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formIsbn">
                       
                        <Form.Control type="text"
                            name="userid"
                            hidden = 'true'
                            disabled="true"
                            value={feedback.userid}
                            onChange={(e) => dispatch({ typee: "update", field: "userid", val: e.target.value })} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formIsbn">
                   
                        <Form.Control
                            disabled="true" type="number" name="bookid"
                            hidden = 'true'
                            value={feedback.bookid}
                            onChange={(e) => dispatch({ typee: "update", field: "bookid", val: e.target.value })} />
                    </Form.Group>

                    <Button variant="primary" type="submit" value="SEND"
                        onClick={(e) => { sendData(e) }} > Give Feedback </Button>&nbsp; &nbsp;

                    <Button variant="primary" type="reset" value="Clear"
                        onClick={() => { dispatch({ typee: "clear" }) }} > clear </Button>&nbsp; &nbsp;
                </Form>

            </div>
        </div>
    );
}

export default FeedbackComp;