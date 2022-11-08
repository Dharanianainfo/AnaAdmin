import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import imgfiledata from '../../assets/images/faces/face2.jpg';
import './form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, useNavigate, useParams } from 'react-router-dom';
import { Redirect,Link } from 'react-router-dom';
import { Container,Form,Button, Table } from 'react-bootstrap';

const initialValue = {
    username: '.',
    Idcard: '.',
    phoneNo: '.',
    RollNo: '.',
}
//var token=localStorage.getItem('token',token);


const EditAdmin = () => {
    const [user, setUser] = useState([initialValue]);
    const [issue, setIssue] = useState([]);
    const [violation,setviolation] = useState()
    const [image,setImage] = useState()
    
   const { username, Idcard, phoneNo,email,fines } = user;
   
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
    return await axios.get(`http://localhost:4000/admin/getoneAdmin`,{ headers: { "authorization": `${token}` }});
}
const getprofile = async (id) => {
  // _id = _id || '';

  return await axios.get(`http://localhost:4000/admin/getadminprofile`,{ headers: { "authorization": `${token}` }});
}
  const loadUserDetails = async() => {
    const response = await getUsers(_id);
    const res = await getprofile();
    console.log(res.data.data)
    console.log(response.data.data.violationFlag)
    setviolation(response.data.data.violationFlag)
    setUser(response.data.data);
    setIssue(response.data.data.bookIssueInfo)
    setImage(res.data.data)
    
}
const editFlag = async() => {
  var res=await axios.get(`http://localhost:4000/admin/user-flag/${_id}`,{ headers: { "authorization": `${token}` }})
  setviolation(res.data)
  console.log(res.data)
}

const editUserDetails = async() => {
   const response = await editUser(_id,user);
    console.log("issue"+issue)

    getUsers(_id)
   setUser(response.data.data)
    
    
}
const editUser = async (_id) => {
    console.log(user)
     var upuser=await axios.post(`http://localhost:4000/admin/updateAdmin`,user,{ headers: { "authorization": `${token}` }})
     console.log(upuser)
     return upuser
}
const profileChange = async (event) => {
  let files = event.target.files;
  const formData = new FormData();
  formData.append(
      "imgUrl",files[0]
  );
  console.log("profile")
      // setLoading(true);
    
   var updateprofile =  await axios.post(`http://localhost:4000/admin/adminprofile`, formData, { headers: { "authorization": `${token}` } })
      console.log(updateprofile.data.data)
      setImage(updateprofile.data.data)
}
const add=()=>{
  localStorage.setItem("key",1)
}
const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({...user, [e.target.name]: e.target.value})
}
    

    return (
        <div>
       <div className="col-12 grid-margin">
              <div className="card">
                <div className="card-body" style={{"text-align":"space-evenly"}}>
                  <h4 className="card-title"></h4>
          
                  <form className="form-sample">
                    <div className="row" style={{"margin-bottom":"40px"}}>
                      <div className="col-md-7">
                      <div style={{"margin-bottom":"50px"}}>
                    <p className="card-description" > IdCard number {Idcard} { violation? <i className='mdi mdi-checkbox-blank-circle' id="flag"></i>: 
                                <i className='mdi mdi-checkbox-blank-circle' id="unflag"></i>}</p>

                                </div>
                        <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Name</label>
                          <div className="col-sm-9">
                          <Form.Control className="form_input" onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" aria-describedby="my-helper-text" />
                          </div>                        
                          </Form.Group>
                          <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Fine</label>
                          <div className="col-sm-9">
                          <Form.Control className="form_input" onChange={(e) => onValueChange(e)} name='fines' value={fines} />
                          </div>
                          </Form.Group>
                          <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Email</label>
                          <div className="col-sm-9">
                          <Form.Control className="form_input" onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input" aria-describedby="my-helper-text" />
                          </div>
                          </Form.Group>
                          <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">Mobile No</label>
                          <div className="col-sm-9">
                          <Form.Control className="form_input" onChange={(e) => onValueChange(e)} name='phoneNo' value={phoneNo} />
                          </div>
                          <button onClick={()=>add()}>click</button>
                          </Form.Group>
                      </div>
                      <div className="col-md-5">
                      <div className="profile-image">
                          <img src={`${process.env.REACT_APP_API_KEY }`+image} />
                            <input type="file" name="imgUrl" title=" " onChange={profileChange} /> 
                          {/* <input type="file" title=" " /> */}
                          
                        </div>
                      </div>
                    </div>
                
                   
                     
                      
                    

                    <button  className="btn btn-gradient-primary mr-2" onClick={() => editUserDetails()} >Submit</button>
                    <Link to={`/dashboard`}><button className="btn btn-light" >Cancel</button></Link>
                  </form>
                  <Table className='table table-striped' style={{"margin-top":"75px"}}>
                    <thead className="thead-dark" >
                        <tr>
                            <th >BOOK ID</th>
                            <th>BOOK TITLE</th>
                            <th >BOOK AUTHOR</th>
                            <th>GENRE</th>
                            <th>CODE</th>
                        </tr>
                    </thead> 
                  
                    <tbody>
                 
                 
                  {issue.length > 0 && issue.map((pro) => ( 
                          
                          <tr key={pro._id}>
                               {/* <td>{pro._id}</td> */}
                               <td>{pro.bookId}</td>
                               <td>{pro.title}</td>
                               <td>{pro.author}</td>                             
                              <td>{pro.genre}</td>
                              <td>{pro.code}</td>
                               <td> 
                            </td>
                            
                          </tr>
                      ))} 
                    </tbody> 
                </Table>
                </div>
              </div>
            </div>
      
        </div>
      )
}

export default EditAdmin;



    // .then(res => {
          //     console.log(res);
          //     if (res.data.message == "Profile Picture Changed successfuly") {
          //         // success(res.data.message);
          //         // setLoading(false);
          //         console.log(res.data)
          //         setTimeout(function () {
          //             window.location.reload();
          //         }, 2000);
          //     } else {
          //         // setLoading(false);
          //         alert(res.data.message);
          //     }
          // });
 