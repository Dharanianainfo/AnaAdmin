import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import './form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate,useHistory } from "react-router-dom";
import { Container,Form,Button } from 'react-bootstrap';

const initialValue = {
    product_name: '.',
    product_price: '.',
    product_description: '.',
    quantity:'.',
}
var token=localStorage.getItem('token',token);


const ProductEdit = () => {
    const [user, setUser] = useState([initialValue]);
    const [addr, setAddr] = useState([]);
    const { product_name, product_price, product_description,quantity } = user;
   
   const _id=window.location.pathname.split('/').pop();
  
 //  const (_id)=useParams('')  
 //let navigate = useNavigate(); 
 //let history = useHistory();
   var token=localStorage.getItem('token');
   var decode=jwt_decode(token)
   var time=decode.exp
   console.log(token)
console.log(decode," ",time)
if (time * 1000 < Date.now()) {
  
   localStorage.removeItem(token); 
  
   //navigate('/login');// this runs only when I refresh the page or reload on route change it dosent work
}

useEffect(() => {
    loadUserDetails();
}, []);
const getUsers = async (_id) => {
    // _id = _id || '';
    console.log("hello")
    return await axios.get(`http://localhost:4000/product/oneimageproduct/${_id}`,{ headers: { "authorization": `${token}` }});
}
  const loadUserDetails = async() => {
    const response = await getUsers(_id);
    console.log(response.data)
    console.log(response.data.address[0])
   setAddr(response.data.address[0])
    setUser(response.data);
}

const editUserDetails = async() => {
    const response = await editUser(_id,user);
    getUsers(_id)
    setUser(response.data)
    
    
}
const editUser = async (_id) => {
    console.log(user)
     var upuser=await axios.post(`http://localhost:4000/product/updateproduct/${_id}`,user)
     console.log(upuser)
     return upuser
}
const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({...user, [e.target.name]: e.target.value})
}

// function Productshow(){
//     navigate('./productshow');
// }
//     // function logout(){

    //     navigate('/fo');
    // }

    return (
        <div>
       <div className="col-12 grid-margin">
      hello
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Products Info</h4>
                  <div className="row">
          <div className="col-md-6 stretch-card grid-margin">
            <div className="card text-black">
              <div className="card-body" style={{"textAlign":"center"}}>
                <h6 className="card-text">Contact Details</h6>
                <p className="para">Owner Number : {addr.phoneNumber}, <br></br>
                Shop Number : {addr.shopNumber}<br></br>
               {addr.email}<br></br>
               {addr.shopEmail}<br></br></p>
              </div>
            </div>
          </div>
          <div className="col-md-6 stretch-card grid-margin">
            <div className="card text-black">
              <div className="card-body" style={{"textAlign":"center"}}>
                <h6 className="card-text">Address</h6>
                <p >
             Shop Name:{addr.shopName}<br></br>
             Owner Name : {user.username}
                 {addr.houseNo} , {addr.streetName} , {addr.city} ,
                 {addr.landMark} , {addr.pincode}<br></br>
               </p>
              </div>
            </div>
          </div>
         
        </div>
                  <form className="form-sample">
                 
                    
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">NAME</label>
                          <div className="col-sm-9">
                          <Form.Control className="form_input" onChange={(e) => onValueChange(e)} name='product_name' value={product_name} id="my-input" aria-describedby="my-helper-text" />
                          </div>
                          </Form.Group>
                      </div>
                      <div className="col-md-6">
                      <Form.Group className="row">
                      <label className="col-sm-3 col-form-label">PRICE</label>
                      <div className="col-sm-9">
                      <Form.Control className="form_input" onChange={(e) => onValueChange(e)} name='product_price' value={product_price} />
                          </div>
                          
                        </Form.Group>
                      </div>
                    </div>
                
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">ABOUT</label>
                          <div className="col-sm-9">
                          <Form.Control className="form_input" onChange={(e) => onValueChange(e)} name='product_description' value={product_description} />
                          </div>
                        </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">QUANTITY</label>
                          <div className="col-sm-9">
                          <Form.Control className="form_input" onChange={(e) => onValueChange(e)} name='quantity' value={quantity} />
                          </div>
                        </Form.Group>
                      </div>
                                            
                    </div>
                     
                   
                    <button  className="btn btn-gradient-primary mr-2" onClick={() => editUserDetails()} >Submit</button>
                    <Link to={`/user-pages/productshow`}><button className="btn btn-light" >Cancel</button></Link>
                  </form>
                </div>
              </div>
            </div>
        </div>
      )
}

export default ProductEdit;