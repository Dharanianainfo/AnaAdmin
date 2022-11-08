import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../../assets/images/product_images_2/thumb_image1.jpg'
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";

import { useState, useEffect } from 'react';
import axios from 'axios';

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


const Editscreen = () => {
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

    return(
        <div>
     <div className="col-12 grid-margin">
     
              <div className="card">
                <div className="card-body">
                 
                  <div className="row"></div> 
  <div className="row">
  <aside className="col-lg-6 mx-auto">
  <Magnifier
    imageSrc={`${process.env.REACT_APP_BACK_END_URL}`+user.path}
    imageAlt="Example"
    largeImageSrc={`${process.env.REACT_APP_API_KEY}`+user.path} // Optional
  />

  </aside>
  <aside className="col-lg-6 mx-auto">
    <div className="details ">
     <div>
     {product_name}
     {product_price}
      </div>
      <div>
      <b>DESCRIPTION:</b>
      <p>{product_description}</p>
      </div>
      </div>
    

    
    </aside>
  </div>
  

        </div>
        </div>
        </div>
        </div>
      
    )
  }


export default Editscreen
