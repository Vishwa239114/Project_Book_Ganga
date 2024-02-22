import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useReducer } from "react";
import MenuItem from 'react-bootstrap/Dropdown';
import { DropdownButton } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

let flag = JSON.parse(localStorage.getItem("book"))
var init = null;
if(flag != null){
init = {
        bookid: { value: JSON.parse(localStorage.getItem("book")).bookid, hasError: true, touched: true, error: "" },
        isbn: { value: JSON.parse(localStorage.getItem("book")).isbn, hasError: true, touched: true, error: "" },
        sellerid: { value:  JSON.parse(localStorage.getItem("book")).sellerid, hasError: false, touched: true, error: "" },
        category_id: { value: JSON.parse(localStorage.getItem("book")).category_id, hasError: false, touched: false, error: "" },
        author: { value: JSON.parse(localStorage.getItem("book")).author, hasError: true, touched: false, error: "" },
        bookname: { value: JSON.parse(localStorage.getItem("book")).bookname, hasError: true, touched: false, error: "" },
        description: { value: JSON.parse(localStorage.getItem("book")).description, hasError: true, touched: false, error: "" },
        price: { value: JSON.parse(localStorage.getItem("book")).price, hasError: true, touched: false, error: "" },
        quantity: { value: JSON.parse(localStorage.getItem("book")).quantity, hasError: true, touched: false, error: "" },
        book_img_url: { value: JSON.parse(localStorage.getItem("book")).book_img_url, hasError: true, touched: false, error: "" },
        isFormValid: false
    
}
}
else{
    init = {
        bookid: { value: "", hasError: true, touched: true, error: "" },
        isbn: { value: "", hasError: true, touched: true, error: "" },
        sellerid: { value: "", hasError: false, touched: false, error: "" },
        category_id:{value:"", hasError: false, touched: false, error: "" },
        author: {value:"", hasError: true, touched: false, error: "" },
        bookname: { value: "", hasError: true, touched: false, error: "" },
        description: { value:"", hasError: true, touched: false, error: "" },
        price: { value:"", hasError: true, touched: false, error: "" },
        quantity: { value:"", hasError: true, touched: false, error: "" },
        book_img_url: { value:"", hasError: true, touched: false, error: "" },
        isFormValid: false
    
}
}
const reducer = (book, action) => {
    
    switch (action.type) {
        case 'update': {
            const { name, value, hasError, error, touched, isFormValid } = action.data;
            return {
                ...book,
                [name]: { ...book[name], value, hasError, error, touched },
                isFormValid
            }
        }
        case 'reset': {
            return init;
        }
    }
}
const validateData = (name, value) => {
    let hasError = false, error = "";
    switch (name) {
        case "isbn" : 
                let regex = /^[0-9]{13}$/;
                if(!regex.test(value))
                {
                    hasError = true;
                    error = "ISBN must be 13 digits"
                }
            break;
            case "category_id" :                
                if(value.trim()=="")
                {
                    hasError = true;
                    error = "Category must be selected "
                }
            break;    
            case "author" : 
                //let regex2 = /^[A-Z]{1}[a-z A-Z \s .]{2,}$/;
                if(value.length<3)
                {
                    hasError = true;
                    error = "Author Name must be greater than three characters.";
                }
            break;   
            case "bookname" : 
               // let regex3 = /^[.*]{1,}$/;
                if(value.length<3)
                {
                    hasError = true;
                    error = "Bookname must be greater than three characters.";
                }
            break;
            case "description" : 
                if(value.length<3)
                {
                    hasError = true;
                    error = "Description must be greater than three characters.";
                }
            break;
            case "price" : 
                let regex5 =  /^[0-9 .]{1,}$/;
                if(!regex5.test(value))
                {
                    hasError = true;
                    error = "Price must not be empty";
                }
            break; 
            case "quantity" : 
                let regex6 =  /^[0-9 ]{1,}$/;
                if(!regex6.test(value))
                {
                    hasError = true;
                    error = "Quantity must not be empty";
                }
            break; 
    }
    return { hasError, error }
}


let UpdateBookComp = () => {
    const [book, dispatch] = useReducer(reducer, init);
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    //on change event
    const onInputChange = (name, value, dispatch) => {
        //validation logic
        const { hasError, error } = validateData(name, value); //form field, latest value

        //which key to be modified - value, hasError, error, touched 
        let isFormValid = true;
        for (const key in book) {
            let item = book[key];

            if (item.hasError) {
                isFormValid = false;
                break;
            }
        }

        //sending action object
        dispatch({ type: 'update', data: { name, value, hasError, error, touched: true, isFormValid } })
    }
    const onFocusOut = (name, value, dispatch) => {
        const { hasError, error } = validateData(name, value)
        let isFormValid = true
        for (const key in book) {
            const item = book[key]
            if (key === name && hasError) {
                isFormValid = false
                break
            } else if (key !== name && item.hasError) {
                isFormValid = false
                break
            }
        }
        dispatch({
            type: "update",
            data: { name, value, hasError, error, touched: true, isFormValid },
        })
    }

    const sendData = (e) => {
        e.preventDefault();
        console.log("Seller" + JSON.stringify(book));
        localStorage.removeItem("book");
        const reqData = {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                bookid: book.bookid.value,
                isbn: book.isbn.value,
                sellerid: book.sellerid.value,
                category_id: book.category_id.value,
                author: book.author.value,
                bookname: book.bookname.value,
                book_img_url:book.book_img_url.value,
                description: book.description.value,
                price: book.price.value,
                quantity: book.quantity.value
            })
        }

        fetch("http://localhost:8080/updatebook", reqData)  // send post req to server
            .then(res => res.text())  //resp recieved from server
            .then(data => {
                    //setMsg(data);
                    alert("Book Updated Successfully");
                    localStorage.removeItem("book");
                    navigate("/getregisteredbook");
            })
            .catch(error => {
                setMsg("Book already exists!")
                console.log(error)
            })
    }


    return (
       <div><br/>
        <div className='container ' style={{ "width": "500px", "height": "800px", "borderRadius": "15px", "margin-top": "100px", "backgroundColor": "black", "opacity": "0.6" }}>
            {/* {JSON.stringify(book)}*/}
            <h1 >Update Book </h1>
            <Form >
            <Form.Group className="mb-3" controlId="formSellerid">
                   
                    <Form.Control type="number"
                        name="bookid"
                        readOnly="true"
                        value={book.bookid.value}
                        hidden="true"
                        onChange={(e) => { onInputChange("bookid", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("bookid", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: book.bookid.touched && book.bookid.hasError ? "block" : "none" }}> {book.bookid.error} </p>

                </Form.Group>
                <Form.Group className="mb-3" controlId="formIsbn">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control type="text"
                        name="isbn"
                        required
                        value={book.isbn.value}
                        onChange={(e) => { onInputChange("isbn", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("isbn", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: book.isbn.touched && book.isbn.hasError ? "block" : "none" }}> {book.isbn.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formSellerid">
                    <Form.Control type="number"
                        name="sellerid"
                        hidden='true'
                        readOnly="true"
                        value={book.sellerid.value}
                        onChange={(e) => { onInputChange("sellerid", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("sellerid", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: book.sellerid.touched && book.sellerid.hasError ? "block" : "none" }}> {book.sellerid.error} </p>

                </Form.Group>
                

                <label for="category_id">Choose a Book Category:</label>
                <Form.Select id="category_id" name="category_id"
                    onChange={(e) => { onInputChange("category_id", e.target.value, dispatch) }}
                    onBlur={(e) => { onFocusOut("category_id", e.target.value, dispatch) }}>
                    <option value="1">Novel</option>
                    <option value="2">Poetry</option>
                    <option value="3">Science fiction</option>
                    <option value="4">Historical</option>
                    <option value="5">Devotional</option>
                </Form.Select>
                {/*}  <MenuItem>
      <DropdownButton variant="success" id="category_id" name="category_id"
              onChange={ (e)=> {onInputChange("category_id",e.target.value, dispatch)}} 
             onBlur={(e)=> {onFocusOut("category_id",e.target.value, dispatch)}} >
       <MenuItem eventKey="1">Novel</MenuItem>
        <MenuItem eventKey="2">Poetry</MenuItem>
        <MenuItem eventKey="3">Science fiction</MenuItem>
        <MenuItem eventKey="4">Historical</MenuItem>
        <MenuItem eventKey="5">Devotional</MenuItem>
      </DropdownButton>
      
    </MenuItem>
*/}
                <Form.Group controlId="formEmail">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text"
                        name="author"
                        value={book.author.value}
                        onChange={(e) => { onInputChange("author", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("author", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: book.author.touched && book.author.hasError ? "block" : "none" }}> {book.author.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formSellerContact">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text"
                        name="bookname"
                        value={book.bookname.value}
                        onChange={(e) => { onInputChange("bookname", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("bookname", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: book.bookname.touched && book.bookname.hasError ? "block" : "none" }}> {book.bookname.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBookImgUrl">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text"
                        name="description"
                        value={book.description.value}
                        onChange={(e) => { onInputChange("description", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("description", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: book.description.touched && book.description.hasError ? "block" : "none" }}> {book.description.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text"
                        name="price"
                        value={book.price.value}
                        onChange={(e) => { onInputChange("price", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("price", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: book.price.touched && book.price.hasError ? "block" : "none" }}> {book.price.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formQuantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number"
                        name="quantity"
                        value={book.quantity.value}
                        onChange={(e) => { onInputChange("quantity", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("quantity", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: book.quantity.touched && book.quantity.hasError ? "block" : "none" }}> {book.quantity.error} </p>

                </Form.Group>

                <Form.Group className="mb-3" controlId="formBookimgurl">
                    <Form.Label>Book image url</Form.Label>
                    <Form.Control type="text"
                        name="book_img_url"
                        value={book.book_img_url.value}
                        onChange={(e) => { onInputChange("book_img_url", e.target.value, dispatch) }}
                        onBlur={(e) => { onFocusOut("book_img_url", e.target.value, dispatch) }} />
                    <p className="text-danger" style={{ display: book.book_img_url.touched && book.book_img_url.hasError ? "block" : "none" }}> {book.book_img_url.error} </p>

                </Form.Group>
                
                <Button variant="primary" type="submit" 
                    onClick={(e) => { sendData(e) }}
                >  Update book
                </Button>&nbsp; &nbsp;
                <Button variant="primary" type="reset"
                    onClick={() => { dispatch({ type: 'reset' }) }} >Clear</Button>
            </Form>
            <p className='text-danger'>{msg}</p>
            {msg}
        </div>
        <br/><br/>
        </div>
    );
}

export default UpdateBookComp;