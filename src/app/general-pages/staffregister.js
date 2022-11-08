import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Form, FormCheck } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import './form.css'

export class Uregister extends Component {
  constructor() {
    super();
    this.state = {
      
      fields: {email:"",password:"",password2:""},
      errors: {}
    }
    

    this.handleChange = this.handleChange.bind(this);
    this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

  };
  

  handleChange(e) {
    let fields = this.state.fields;
    
    fields[e.target.name] = e.target.value;

    this.setState({
      fields
    });
    console.log(fields)
  }

  submituserRegistrationForm(e) {
    

    e.preventDefault();
     if (this.validateForm()) {
        let fields = this.state.fields;
        console.log("register")
        // fields[e.target.name] = e.target.value;
        // this.setState({fields:fields});
        
        axios.post("http://localhost:4000/users/proRegister",fields).then(res=>{
           console.log(res.data.message._message)
          if(res.data.message._message==="user validation failed")
           {
            alert("This is User is already present")
          }
       
           else{
            console.log(res.data)
            alert("hello")
             //setTimeout(() => {window.location.replace('/login')},500)  
           }
          
         
         })
        console.log({fields})
        
        }
    

  }

  validateForm() {
    
    let fields = this.state.fields;
    let errors = {};
   
    let formIsValid = true;

  
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "*Please enter your username.";
     
    }
   
    if (!fields["Idcard"]) {
      formIsValid = false;
      errors["Idcard"] = "*Please enter your Id Card.";
     
    }
    // if (!fields["year"]) {
    //   formIsValid = false;
    //   errors["year"] = "*Please enter your Id Year.";
     
    // }
    // if (!fields["department"]) {
    //   formIsValid = false;
    //   errors["department"] = "*Please enter your department.";
     
    // }
    // if (!fields["RollNo"]) {
    //   formIsValid = false;
    //   errors["RollNo"] = "*Please enter your Roll Number.";
     
    // }
  
   /* if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username"] = "*Please enter alphabet characters only.";
      }
    }*/
    
  //  if(!fields["gender"] ){
  //     formIsValid=false
  //     errors["gender"]="*Please select the gender"
  //   }

  //   if (!fields["email"]) {
  //     formIsValid = false;
  //     errors["email"] = "*Please enter your email-ID.";
  //   }

  //   if (typeof fields["email"] !== "undefined") {
  //     //regular expression for email validation
  //     var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{3})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  //     if (!pattern.test(fields["email"])) {
  //       formIsValid = false;
  //       errors["email"] = "*Please enter valid email-ID.";
  //     }
  //   }

    if (!fields["phoneNo"]) {
      formIsValid = false;
      errors["phoneNo"] = "*Please enter your mobile no.";
     
    }
  
  //   if (!fields["password"]) {
  //     formIsValid = false;
  //     errors["password"] = "*Please enter your password.";
  //   }
  //   if (typeof fields["password"] !== "undefined") {
  //     if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
  //       formIsValid = false;
  //       errors["password"] = "*Password must have more than 8 chars must have [A-Z][a-z] special chars [0-9]";
  //     }
  //   }
    

    // if (!fields["password2"]) {
    //   formIsValid = false;
    //   errors["password2"] = "*Please enter your password.";
    // }
    

    // if (typeof fields["password2"] !== "undefined") {
    //   if (!fields["password2"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //     formIsValid = false;
    //     errors["password2"] = "*Password must have [A-Z][a-z] special chars [0-9]";
    //   }
    // }
    // if (fields["password2"]!==fields["password"]) {
    //   formIsValid = false;
    //   errors["password2"] = "*Umnmatch";
    // }

    // if (!fields["houseNo"]) {
    //   formIsValid = false;
    //   errors["houseNo"] = "*Please enter address.";
     
    // }

    // if (!fields["streetName"]) {
    //   formIsValid = false;
    //   errors["street"] = "*Please enter street.";
     
    // }

    // if (!fields["landMark"]) {
    //   formIsValid = false;
    //   errors["landmark"] = "*Please enter landmark.";
     
    // }

    // if (!fields["city"]) {
    //   formIsValid = false;
    //   errors["city"] = "*Please enter city.";
     
    // }

    // if (!fields["pincode"]) {
    //   formIsValid = false;
    //   errors["pincode"] = "*Please enter Pincode.";
     
    // }

    this.setState({
      errors: errors
    });
    return formIsValid;


  }



  render() {
    return (
      <div>
     <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Horizontal Two column</h4>
                <form className="form-sample" autoComplete='on'>
                  <p className="card-description"> Personal info </p>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Name</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name='username' className="form-control" onChange={this.handleChange} placeholder="User Name"/>
                        <div className="errorMsg">{this.state.errors.username}</div>
                        </div>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                    <Form.Group className="row">
                    <label className="col-sm-3 col-form-label">Gender</label>
                    <div className="col-sm-9">
                   <FormCheck>
                   <label className="form-check-label">
                            <input type="radio" onChange={this.handleChange} className="form-check-input" name='gender' id="optionsRadios1" value="male"/>
                            <i className="input-helper"></i>
                            Male
                          </label>
                   </FormCheck>
                   <FormCheck>
                   <label className="form-check-label">
                            <input type="radio" onChange={this.handleChange} className="form-check-input" name='gender' id="optionsRadios1" value="female"/>
                            <i className="input-helper"></i>
                            Female
                          </label>
                   </FormCheck>
                   <div className="errorMsg">{this.state.errors.gender}</div>
                        </div>
                        
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Id Card</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name='Idcard' className="form-control" onChange={this.handleChange} placeholder="Id Number"/>
                        <div className="errorMsg">{this.state.errors.Idcard}</div>
                        </div>
                        
                      </Form.Group>
                    </div>
                    
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Roll No</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name='RollNo' className="form-control" onChange={this.handleChange} placeholder="Roll No"/>
                        <div className="errorMsg">{this.state.errors.RollNo}</div>
                        </div>
                       
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Year</label>
                        <div className="col-sm-9">
                        <Form.Control type="number" name='year' className="form-control" onChange={this.handleChange} placeholder="Year"/>
                        <div className="errorMsg">{this.state.errors.year}</div>
                        </div>
                        
                      </Form.Group>
                    </div>
                    
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-4 col-form-label">Course</label>
                        <div className="col-sm-8">
                        <Form.Control type="text" name='deparment' className="form-control" onChange={this.handleChange} placeholder="Department"/>
                        <div className="errorMsg">{this.state.errors.deparment}</div>
                        </div>
                       
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name='email' className="form-control" onChange={this.handleChange} placeholder="Email Address"/>
                        <div className="errorMsg">{this.state.errors.email}</div>
                        </div>
                        
                      </Form.Group>
                    </div>
                    
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Mobile No</label>
                        <div className="col-sm-9">
                        <Form.Control type="number" name='phoneNo' className="form-control" onChange={this.handleChange} placeholder="Mobile No"/>
                        <div className="errorMsg">{this.state.errors.phoneNo}</div>
                        </div>
                       
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                        <Form.Control type="password" name="password"  onChange={this.handleChange} placeholder="Password"/>
                        <div className="errorMsg">{this.state.errors.password}</div>
                        </div>
                       
                      </Form.Group>
                    </div>
                    
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                        <Form.Control type="password" name="password2"  onChange={this.handleChange} placeholder="confirm Password"/>
                        <div className="errorMsg">{this.state.errors.password2}</div>
                        </div>
                        
                      </Form.Group>
                    </div>
                  </div>

                  <p className="card-description"> Address</p>
                  {/* <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">House No</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name="houseNo" className="form-control" onChange={this.handleChange} placeholder="Enter House Address"/>
                        <div className="errorMsg">{this.state.errors.houseNo}</div>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Street</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name="streetName" className="form-control" onChange={this.handleChange} placeholder="Enter Street Name"/>
                        <div className="errorMsg">{this.state.errors.streetName}</div>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Landmark</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name="landMark" className="form-control" onChange={this.handleChange} placeholder="Enter Landmark"/>
                        <div className="errorMsg">{this.state.errors.landMark}</div>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">City</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name="city" className="form-control" onChange={this.handleChange} placeholder="Enter City Name"/>
                        <div className="errorMsg">{this.state.errors.city}</div>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Pincode</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name="pincode" className="form-control" onChange={this.handleChange} placeholder="Enter Pincode" />
                        <div className="errorMsg">{this.state.errors.pincode}</div>
                        </div>
                      </Form.Group>
                    </div>
                   
                  </div>
                  */}
                  <button type="submit" className="btn btn-gradient-primary mr-2" onClick={this.submituserRegistrationForm} >Submit</button>
                  <button className="btn btn-light">Cancel</button>
                </form>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default Uregister
