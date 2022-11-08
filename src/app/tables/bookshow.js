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
  const [local,setLocal]=useState([])
  const [cart,setCart]=useState([])
  const [count,setcount]=useState(1)

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
    return await axios.get("http://localhost:4000/users/getAllbook",{ headers: { "authorization": `${token}` }});
}
  const getAllUsers = async () => {
      let response = await getUsers();
      console.log("Check----",response.data.data)
      setUsers(response.data.data);
      setLocal(response.data.data)
      console.log(cart)
      console.log("new-------",users)
  }
 
  let values=[];
 
 
  console.log(JSON.stringify(values))
 localStorage.setItem("name",JSON.stringify(values))
  const add=(key)=>{
   
console.log(local[0])
values.push((local[key]))
console.log(JSON.stringify(values),values.length)
if(values.length<6){
    localStorage.setItem("keyvalue", JSON.stringify(values))
  }
  else(
    alert("maximunm")
  )

  }
  const deleteUser = async (_id) => {
      return await axios.get(`http://localhost:4000/admin/deleteBook/${_id}`,{ headers: { "authorization": `${token}` }});
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
        
        return user.title.toLowerCase().startsWith(keyword.toLowerCase());
        // Use the toLowerCase() method to make it case-insensitive
      });
      console.log(results)
      setFoundUsers(results);
      const results1 = users.filter((user) => {
        
        return user.title.toLowerCase().startsWith(keyword.toLowerCase());
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
                         
                            <th>BOOK NAME</th>
                            <th>BOOK ID</th>
                            <th>STOCK</th>
                            <th>SUBJECT CODE</th>
                            <th>GENRE</th>
                            <th>SUB CATEGORY</th>
                            <th>AUTHOR</th>
                            <th>EDIT</th>
                        </tr>
                    </thead> 
                  
                    <tbody>
                   

                    {foundUsers.length > 0 ?(foundUsers.map((user) => (
                            <tr key={user._id}>
                                
                                <td>{user.title}</td>
                                <td>{user.bookId}</td>
                                <td>{user.stock}</td>
                                <td>{user.code}</td>
                                <td>{user.genre}</td>
                                <td>{user.Sname}</td>
                                <td>{user.author}</td>
                                <td>
                                  <a href='#' onClick={()=>deleteUserData(user.bookId)}><i className="mdi mdi-delete menu-icon"></i> </a>
                                  <Link to={`/tables/bookedit/${user.bookId}`}><i className="mdi mdi-account-plus menu-icon"></i></Link>
                                </td> 
                            </tr>
                        ))):(users.map((user,key) => (
                            <tr key={user._id}>
                                {/* <td>{user._id}</td>  */}
                                <td>{user.title}</td>
                                <td>{user.bookId}</td>
                                <td>{user.stock}</td>
                                <td>{user.code}</td>
                                <td>{user.genre}</td>
                                <td>{user.Sname}</td>
                                <td>{user.author}</td>
                                <td><button onClick={()=>add(key)}>{key}</button></td>
                                <td>
                                  <a href='#' onClick={()=>deleteUserData(user.bookId)}><i className="mdi mdi-delete menu-icon"></i> </a>
                                  <Link to={`/tables/bookedit/${user.bookId}`}><i className="mdi mdi-account-plus menu-icon"></i></Link>
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


