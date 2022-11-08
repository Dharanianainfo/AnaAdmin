import React, { Component } from 'react';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { Card,Table,Button } from 'react-bootstrap';
import {Bar, Doughnut} from 'react-chartjs-2';
import DatePicker from "react-datepicker";
import axios from 'axios';
import { Link,Redirect } from 'react-router-dom';
import './form.css'
import BlankPage from '../general-pages/BlankPage';
import Ordershow from './Order';
// import "react-datepicker/dist/react-datepicker.css";


var admin= JSON.parse( localStorage.getItem('isloggedIn'))
export default function Weekorder(){
  const [flagUser,setflagUser]= useState([])
    const [users, setUsers] = useState([]);
    const[order,setorder]=useState([])
    const[act,setAct]=useState([])
  //   let navigate = useNavigate();
    var token=localStorage.getItem('token');
    var decode=jwt_decode(token)
    var time=decode.exp
    console.log(token)
  console.log(decode," ",time)
  // if (time * 1000 < Date.now()) {
   
  //   localStorage.removeItem(token); 
   
  //   navigate('/login');// this runs only when I refresh the page or reload on route change it dosent work
  // }
    useEffect(() => {
        getAllUsers();
       
    }, []);
    const getOrders = async (_id) => {
     // _id = _id || '';
     return await axios.get("http://localhost:4000/users/getbitzfunUser",{ headers: { "authorization": `${token}` }});
  }

  const getFlag = async (_id) => {
    // _id = _id || '';
    return await axios.get("http://localhost:4000/users/getblockUser",{ headers: { "authorization": `${token}` }});
 }
 const getAct = async (_id) => {
  // _id = _id || '';
  return await axios.get("http://localhost:4000/users/getanatechUser",{ headers: { "authorization": `${token}` }});
}
  const getUsers = async (_id) => {
    // _id = _id || '';
    return await axios.get("http://localhost:4000/users/getadminUser",{ headers: { "authorization": `${token}` }});
 }
    const getAllUsers = async () => {
        let response = await getOrders();
        let response1 = await getUsers();
        let response2 = await getFlag();
        let response3 = await getAct();
        console.log(response2.data.length)
       
        setUsers(response1.data.length);
        setorder(response.data.length)
        setAct(response3.data.length)
        setflagUser(response2.data.length)
        // console.log(users)
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
   
    return (
      <div>
         <div className="proBanner">
        
        </div>
       
        <div className="page-header">
         
        
        </div>
        <div className="row">
          <div className="col-md-3 stretch-card grid-margin">
            <div className="card bg-gradient-primary card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Bitz Fun <i className="mdi mdi-account-plus menu-icon mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{order}</h2>
                
               <Link to={`/general-pages/usershow`}><Button >View Users</Button></Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 stretch-card grid-margin">
            <div className="card bg-gradient-primary card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Admin Users <i className="mdi mdi-library mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{users}</h2>
                <Link to={`/tables/bookshow`}><Button >View Books</Button></Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 stretch-card grid-margin">
            <div className="card bg-gradient-primary card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Blockz Dub <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{flagUser}</h2>
                <Link to={`/general-pages/flagusershow`}><Button >View Users</Button></Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 stretch-card grid-margin">
            <div className="card bg-gradient-primary card-img-holder text-white">
              <div className="card-body">
                <img src={require("../../assets/images/dashboard/circle.svg")} className="card-img-absolute" alt="circle" />
                <h4 className="font-weight-normal mb-3">Anatech User <i className="mdi mdi-bookmark-outline mdi-24px float-right"></i>
                </h4>
                <h2 className="mb-5">{act}</h2>
                <Link to={`/general-pages/bitsfun`}><Button >View Users</Button></Link>
              </div>
            </div>
          </div>
        </div> 
          
                
      </div> 
    );
  }
