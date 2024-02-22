import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

let OrderHistoryComp = () => {

    const [state, setState] = useState([]);

    let getordersbybuyerid = () => {
        const buyerid = JSON.parse(localStorage.getItem("loggedInUser")).buyerid;

        axios.get(`http://localhost:8080/getorderdetailsbybuyerid/${buyerid}`)
            .then(res => {
                const result = res.data
                setState(result)
            })
            .catch(err => {
                alert(err.message)
                console.log("Error in Getting Orders ", err)
            })
    }


    useEffect(() => {
        getordersbybuyerid()

    }, [])

    return (
        <div style={{ "marginTop": "50px", "text-align": "center" }}>
            <h2 className='text text-primary'>Order History</h2>
            <Button style={{ "float": "left" }} className='btn btn-primary' href="/cart">Go Back to Cart</Button>
            <Table striped bordered hover variant="dark" style={{ "width": "80%", "marginTop": "50px", "margin-left": "130px", "textAlign": "center" }}>
                <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Order id</th>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {

                        state.map((v, i) => {
                            return (

                                <tr>

                                    <td>{++i}</td>
                                    <td>{v.orderid}</td>
                                    <td>{v.bookname}</td>
                                    <td>{v.author}</td>
                                    <td>{v.itemprice}</td>
                                    <td>{v.order_qty}</td>
                                    <td><Button variant="outline-warning" onClick={() => { localStorage.setItem("bookid_feedback", v.bookid) }} href='/givefeedback'>Give Feedback</Button></td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>

    )

}
export default OrderHistoryComp;