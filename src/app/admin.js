import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

export default class Adminlogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin:{ },
      user:{ },
      fields: { email:"",password:""},
      errors: { }
    }
    

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    

  };
  

  handleChange(e) {
    let fields = this.state.fields;
    e.preventDefault();
    fields[e.target.name] = e.target.value;

    this.setState({
      fields
    });
    console.log(fields)
  }
  async login(e) {
    

    e.preventDefault();
   
        let fields = this.state.fields;
        // fields[e.target.name] = e.target.value;
        // this.setState({fields:fields});
       console.log("login")
       const log = await axios.post("http://localhost:4000/users/adminLogin",fields).then(async res=>{
          console.log(res.data)
          // console.log(res.data.data.token)
          await localStorage.setItem('token', res.data.data.token);
          await localStorage.setItem('user', JSON.stringify(res.data.data));
          await localStorage.setItem('isloggedIn',"true");
          // var tokens=localStorage.getItem('token')
       
          // console.log(tokens)
    
          if(res.data.message==="Success"){
            
            setTimeout(() => {window.location.replace('/dashboard')},500) 
            console.log("hi")
            
         
          
          }
          else{
            console.log("error")
          }
        
          
        })
        console.log(log)
        var user= JSON.parse(localStorage.getItem('user'))
        var admin=localStorage.getItem('isloggedIn')
        
        console.log(admin) 

  }
 

render() {
  var user= JSON.parse(localStorage.getItem('user'))
  if(user){
    window.location.replace('./dashboard')
  }  
  return (
    
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left py-5 px-4 px-sm-5" >
                
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3"  autoComplete="off">
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" name="email" placeholder="Email" onChange={this.handleChange}  size="lg" className="h-auto" />
                  </Form.Group>
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" name="password" placeholder="Password" onChange={this.handleChange}  size="lg" className="h-auto" />
                  </Form.Group>
                  <div className="mt-3">
                   <Button onClick={this.login} >Admin Login</Button>
                   
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                   
                  </div>
                 
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

