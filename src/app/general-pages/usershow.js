import React from 'react'
import {Table} from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import { useEffect, useState } from 'react';
import { Link,Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import './form.css'
//import { ProgressBar } from 'react-bootstrap';

export default function Ushow(){
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  let redirect=Redirect
  var token=localStorage.getItem('token');
  var decode=jwt_decode(token)
  var time=decode.exp
  console.log(token)
console.log(decode," ",time)
if (time * 1000 < Date.now()) {
 
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  localStorage.setItem('isloggedIn',false)
  window.location.replace('/')
  // this runs only when I refresh the page or reload on route change it dosent work
}
  useEffect(() => {
      getAllUsers();
    console.log("users----",users);

     
  }, []);
  const getUsers = async (_id) => {
   // _id = _id || '';
    return await axios.get("http://localhost:4000/users/getallUser",{ headers: { "authorization": `${token}` }});
}
  const getAllUsers = async () => {
      let response = await getUsers();
      console.log("Check----",response.data.data)
      setUsers(response.data.data);
      console.log("new-------",users)
  }
  const deleteUser = async (_id) => {
      return await axios.get(`http://localhost:4000/admin/deleteUser/${_id}`,{ headers: { "authorization": `${token}` }});
  }
  const deleteUserData = async (_id) => {
      let response = await deleteUser(_id);
     alert(" Deleted Sucessfully")
     console.log(response)
      getAllUsers();
  }
  const [foundUsers, setFoundUsers] = useState(users);
  const [foundUsers1, setFoundUsers1] = useState(users);
  const filter = (e) => {
    const keyword = e.target.value;

    if (keyword !== '') {
      const results = users.filter((user) => {
        
        return user.username.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      console.log(results)
      setFoundUsers(results);
      const results1 = users.filter((user) => {
        
        return user.Idcard.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      setFoundUsers1(results1);
    } else {
      setFoundUsers(users);
      // If the text field is empty, show all users
    }

    setName(keyword);
  };
 const logout = ()=>{
 
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.setItem('isloggedIn',false)
    window.location.replace('/')

 }

    return (
      
      <div>
       
         <input
        type="search"
        value={name}
        onChange={filter}
        className="input"
        placeholder="Filter"
      />
        <div className="page-header">
          <h3 className="page-title"> USER DETAILS </h3>
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
                         <th></th>
                            <th  >ID</th>
                            <th  style={{"vertical-align":"middle"}}>FULL NAME</th>
                            <th  style={{"vertical-align":"middle"}}>ROLL NO</th>
                            <th  style={{"vertical-align":"middle"}}>MOBILE NO</th>
                            <th  style={{"vertical-align":"middle"}}>EDIT</th>
                       
                        </tr>
                    </thead> 
                  
                    <tbody>
                   

                    {foundUsers.length > 0 ?(foundUsers.map((user) => (
                            <tr key={user.id}>
                                {/* <td>{user.id}</td>  */}                       
                                <td>  {user.id}</td>
                                <td>{user.fullName}</td>
                                <td>{user.RollNo}</td>
                                <td>{user.phoneNo}</td>
                             
                                <td>
                                  <a href='#' onClick={()=>deleteUserData(user.Idcard)}><i className="mdi mdi-delete menu-icon"></i> </a>
                                  <Link to={`/general-pages/useredit/${user.Idcard}`}><i className="mdi mdi-account-plus menu-icon"></i></Link>
                                </td> 
                             
                                
                            </tr>
                        ))):(users.map((user) => (
                            <tr key={user.id}>
                                {/* <td>{user.id}</td>  */}
                                <td>{user.id}</td>
                                <td>{user.fullName}</td>
                                <td>{user.RollNo}</td>
                                <td>{user.phoneNo}</td>
                                
                                <td>
                                  <a href='#' onClick={()=>deleteUserData(user.Idcard)}><i className="mdi mdi-delete menu-icon"></i> </a>
                                  <Link to={`/general-pages/useredit/${user.Idcard}`}><i className="mdi mdi-account-plus menu-icon"></i></Link>
                                </td> 
                            
                                
                            </tr>
                        )))}

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


