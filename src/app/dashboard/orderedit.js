import React from 'react'
import {ModalFooter, Table} from 'react-bootstrap';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import './form.css'
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import { ProgressBar } from 'react-bootstrap';

export default function EditOrder(){
  const [users, setUsers] = useState([]);
  const [addr, setAddr] = useState([]);
  const [Pro, setPro] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
 
//   let navigate = useNavigate();
  var token=localStorage.getItem('token');
  var decode=jwt_decode(token)
  var time=decode.exp
  console.log(token)
console.log(decode," ",time)
const id=window.location.pathname.split('/').pop();
console.log(id)
// if (time * 1000 < Date.now()) {
 
//   localStorage.removeItem(token); 
 
//   navigate('/login');// this runs only when I refresh the page or reload on route change it dosent work
// }
  useEffect(() => {
    loadUserDetails();
     
  }, []);
  const getUsers = async (id) => {
   // _id = _id || '';
    return await axios.get(`http://localhost:4000/users/getIdorder/${id}`,{ headers: { "authorization": `${token}` }});
}

const loadUserDetails = async() => {
  const response = await getUsers(id);
  console.log(response.data.data)
  console.log(response.status)
  if(response.status === 200){
  setUsers(response.data.data);
  setAddr(response.data.data.address[0])
  setPro(response.data.data.items)
  }
  else{
    
    
    console.log("error")
  }
}


 
//   const deleteUser = async (_id) => {
//       return await axios.get(`http://localhost:4000/users/deleteuser/${_id}`);
//   }
//   const deleteUserData = async (_id) => {
//       let response = await deleteUser(_id);
//      // alert(" Deleted Sucessfully")
//       getAllUsers();
//   }
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form.Group className="row">
                          <label className="col-sm-3 col-form-label">QUANTITY</label>
                          <div className="col-sm-9">
                          <Form.Control className="form_input"  name='quantity'  id="my-input" aria-describedby="my-helper-text" />
                          </div>
                          </Form.Group>
                          <div>
                           
                          </div>
                          <ModalFooter><Button >Close</Button></ModalFooter>                 
      </Modal.Body>
    
    </Modal>
  );
}

    return (
      <div>
     

      
      <div className="page-header">
        <h3 className="page-title"> USER'S ORDER DETAILS </h3>
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
            <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
              <h4 className="card-title"> {users.ownerName}</h4>
              <p className="card-description">  Order ID : {users._id} <br></br>
              Bill Amount : {users.bill} <label className="badge badge-warning">label</label></p>
              <h3 className="card-title"> User Address</h3>
              <p className="card-description">
                 Phone Number : {addr.phoneNumber}<br></br>
                 {addr.houseNo} , {addr.streetName} , {addr.city}<br></br>
                 {addr.landMark} , {addr.pincode}<br></br>
               </p>
              
              {/* {JSON.stringify(users)} */}
            
              <div className="table-responsive">
              <Table className='table table-striped'>
                  <thead className="thead-dark" >
                      <tr>
                         <th>PRODUCT ID</th>
                         <th>PRODUCT NAME</th>
                         <th>PRODUCT QUANTITY</th>
                         <th>PRODUCT PRICE</th>
                         <th>EDIT</th>
                      </tr>
                  </thead> 

                  <tbody>
                   
                    {JSON.stringify(Pro.price)}
                   {Pro.length > 0 && Pro.map((pro) => ( 
                          
                          <tr key={pro._id}>
                               <td>{pro._id}</td>
                               <td>{pro.name}</td>
                               <td>{pro.quantity}</td>
                              <td>{pro.price}</td>
                               <td> 
                               <button onClick={() => setModalShow(true)}></button><i className="mdi mdi-account-plus menu-icon"></i>
                              
                                {/* <a href='#' onClick={()=>deleteUserData(user.id)}><i className="mdi mdi-delete menu-icon"></i> </a> */}
                                {/* <Link to={`/general-pages/useredit/${user.id}`}><i className="mdi mdi-account-plus menu-icon"></i></Link>  */}
                              </td> 
                           
                            {/* <Link to={`/general-pages/orderedit/${user.id}`}><i className="mdi mdi-account-plus menu-icon"></i></Link>  */}
                      
                            
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

