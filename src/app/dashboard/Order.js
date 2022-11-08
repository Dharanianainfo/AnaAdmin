import React from 'react'
import {Table} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import axios from 'axios';
import './form.css'
//import { ProgressBar } from 'react-bootstrap';

export default function Ordershow(){
  const [users, setUsers] = useState([]);
  const[len,setlen]=useState([])
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
  const getUsers = async (_id) => {
   // _id = _id || '';
    return await axios.get(`http://localhost:4000/users/getorders`,{ headers: { "authorization": `${token}` }});
}
  const getAllUsers = async () => {
      let response = await getUsers();
      console.log(response.data)
      console.log(response.data.length)
      setUsers(response.data.data);
      setlen(response.data.length)
      console.log(users)
  }



//   const deleteUser = async (_id) => {
//       return await axios.get(`http://localhost:4000/users/deleteuser/${_id}`);
//   }
//   const deleteUserData = async (_id) => {
//       let response = await deleteUser(_id);
//      // alert(" Deleted Sucessfully")
//       getAllUsers();
//   }
 

    return (
        <div>
        <div className="page-header">
          <h3 className="page-title"> ORDER DETAILS </h3>
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
                <h4 className="card-title"> Number Of Orders : {len} </h4>
                <p className="card-description"></p>
                <div className="table-responsive">
                   
                <Table className='table table-striped'>
                    <thead className="thead-dark" >
                        <tr>
                            <th >ID</th>
                            <th>USER ID</th>
                            <th >USER NAME</th>
                            <th>BILL</th>
                            <th>ORDER</th>
                        </tr>
                    </thead> 
                  
                    <tbody>
                    {users.length > 0 && users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td> 
                                <td>{user.owner}{user.owner1}</td>
                                <td>{user.ownerName}</td>
                               <td>{user.bill}</td>
                              <td>
                               <Link to={`/orderedit/${user._id}`}><i className="mdi mdi-account-plus menu-icon"></i></Link> 
                              </td>
                                
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


