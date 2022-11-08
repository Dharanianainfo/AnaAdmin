import React from 'react'
import {Table} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './form.css'
import jwt_decode from "jwt-decode"


require('dotenv').config()

//import { ProgressBar } from 'react-bootstrap';

export default function Productshow(){
  const [users, setUsers] = useState([]);
//   let navigate = useNavigate();
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
      getAllUsers();
     
  }, []);
  const getUsers = async (_id) => {
   // _id = _id || '';
    return await axios.get("http://localhost:4000/product/getimageproduct",{ headers: { "authorization": `${token}` }});
}
  const getAllUsers = async () => {
      let response = await getUsers();
      console.log(response.data)
      setUsers(response.data);
      console.log(users)
     
      console.log(process.env.BACK_END_URL)
      console.log(process.env.REACT_APP_BACK_END_URL)
  }
  const deleteUser = async (_id) => {
      return await axios.get(`http://localhost:4000/product/deleteproduct/${_id}`);
  }
  const deleteUserData = async (_id) => {
      let response = await deleteUser(_id);
      setUsers(response.data);
      alert(" Deleted Sucessfully")
      getAllUsers();
  }
 

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title"> BOOK DETAILS </h3>
          
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              
            <li className="breadcrumb-item"><a onClick={event => event.preventDefault()}>DETAILS</a></li>
            </ol>
          </nav>
        </div>
        <div className="row">
          
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title"> </h4>
                <p className="card-description">  
                </p>
                <div className="table-responsive">
                <Table className='table table-striped'>
                    <thead className="thead-dark" >
                        <tr>
                            <th  style={{"text-align":"center"}}>ID</th>
                            <th  style={{"text-align":"center"}}>PRODUCT NAME</th>
                            <th  style={{"text-align":"center"}}>QUANTITY</th>
                            <th style={{"text-align":"center"}}>PRODUCT PRICE</th>
                            <th  style={{"text-align":"center"}}>CATEGORY</th>
                            <th  style={{"text-align":"center"}}>RATING</th>
                            <th  style={{"text-align":"center"}}>EDIT</th>
                        </tr>
                    </thead> 
                  
                    <tbody>
                    {users.length > 0 && users.map((user) => (
                            <tr key={user._id}>
                                <td style={{"text-align":"center"}}>{user._id}</td>
                                <td style={{"text-align":"center"}}>{user.product_name}</td> 
                                <td style={{"text-align":"center"}}>{user.quantity}</td>
                                <td style={{"text-align":"center"}}>{user.product_price}</td>
                             <td>{process.env.BACK_END_URL}</td>
                                <td><img src={`${process.env.REACT_APP_BACK_END_URL}`+user.path}></img></td> 
                                <td style={{"text-align":"center"}}><label className="badge badge-warning">In progress</label>{user.Cname}</td>
                                <td>{user.ratings}</td>                               
                                <td style={{"text-align":"center"}}>
                             <a href='#' onClick={()=>deleteUserData(user._id)}><i className="mdi mdi-delete menu-icon"></i> </a>
                           <Link to={`/user-pages/productedit/${user._id}`}><i className="mdi mdi-account-plus menu-icon"></i></Link> 
                           <Link to={`/user-pages/Lockscreen/${user._id}`}><i className="mdi mdi-account-plus menu-icon"></i></Link> 
                                </td> 
                                {/* <td style={{"text-align":"center"}}><a href='http://localhost:4000/uploads/image-1661511704081.png'>{user.path}</a></td> */}
                                
                            </tr>
                        ))}
                    </tbody> 
                </Table>
               
              </div>
            </div>
            </div>
            </div>
            </div>
            </div>
       
         
        
    )
  
}


