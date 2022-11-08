import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import './form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, useNavigate, useParams } from 'react-router-dom';
import { Redirect,Link } from 'react-router-dom';
import { Container,Form,Button, Table } from 'react-bootstrap';

const initialValue = {
    code: '.',
    title: '.',
    genre: '.',
    author: '.',
}
//var token=localStorage.getItem('token',token);


const EditBook = () => {
    const [user, setUser] = useState([initialValue]);
    const [issue, setIssue] = useState([]);
    const [violation,setviolation] = useState()
   const { title, code, genre,author } = user;
   
   const _id=window.location.pathname.split('/').pop();
  // const _id=useParams('') 
  
   var token=localStorage.getItem('token');
   var decode=jwt_decode(token)
   var time=decode.exp
   console.log(token)
console.log(decode," ",time)
// if (time * 1000 < Date.now()) {
  
//    localStorage.removeItem(token); 
  
//    navigate('/login');// this runs only when I refresh the page or reload on route change it dosent work
// }

useEffect(() => {
    loadUserDetails();
}, []);
const getUsers = async (id) => {
    // _id = _id || '';
    console.log("issue"+" "+issue)
    console.log("hello")
    return await axios.get(`http://localhost:4000/users/getoneBook/${id}`,{ headers: { "authorization": `${token}` }});
}
  const loadUserDetails = async() => {
    const response = await getUsers(_id);
    // console.log(response.data.data.violationFlag)
    // setviolation(response.data.data.violationFlag)
    setUser(response.data.data);
    
    
}
// const editFlag = async() => {
//   var res=await axios.get(`http://localhost:4000/admin/user-flag/${_id}`,{ headers: { "authorization": `${token}` }})
//   setviolation(res.data)
//   console.log(res.data)
// }

const editUserDetails = async() => {
   const response = await editUser(_id,user);
    console.log("issue"+user)

    getUsers(_id)
   setUser(response.data.data)
    
    
}
const editUser = async (_id) => {
    console.log(user)
     var upuser=await axios.post(`http://localhost:4000/admin/updateBook/${_id}`,user,{ headers: { "authorization": `${token}` }})
     console.log(upuser)
     return upuser
}
const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({...user, [e.target.name]: e.target.value})
}
    

    return (
        <div>
       <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title"></h4>
                  <form className="form-sample">
                    
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Name</label>
                          <div className="col-sm-9">
                          <Form.Control className="form_input" onChange={(e) => onValueChange(e)} name='title' value={title} id="my-input" aria-describedby="my-helper-text" />
                          </div>
                          </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Code</label>
                          <div className="col-sm-9">
                          <Form.Control className="form_input" onChange={(e) => onValueChange(e)} name='code' value={code} />
                          </div>
                          </Form.Group>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Genre</label>
                          <div className="col-sm-9">
                          <Form.Control className="form_input" onChange={(e) => onValueChange(e)} name='genre' value={genre} id="my-input" aria-describedby="my-helper-text" />
                          </div>
                          </Form.Group>
                      </div>
                      <div className="col-md-6">
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Author</label>
                          <div className="col-sm-9">
                          <Form.Control className="form_input" onChange={(e) => onValueChange(e)} name='author' value={author} />
                          </div>
                          </Form.Group>
                      </div>
                    </div>
                    
                                      
                    <button  className="btn btn-gradient-primary mr-2" onClick={() => editUserDetails()} >Submit</button>
                    <Link to={`/tables/bookshow`}><button className="btn btn-light" >Cancel</button></Link>
                  </form>
                
                </div>
              </div>
            </div>
      
        </div>
      )
}

export default EditBook;