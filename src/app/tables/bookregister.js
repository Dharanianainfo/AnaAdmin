import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Form, FormCheck } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input'
import './form.css'
var token=localStorage.getItem('token');
var decode=jwt_decode(token)
var time=decode.exp
console.log(token)
export class shopAdminRegister extends Component {
  constructor() {
    super();
    this.state = {
      
      fields: {title:"",code:"",genre:""},
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
    
        // fields[e.target.name] = e.target.value;
        // this.setState({fields:fields});
        
        axios.post(`http://localhost:4000/admin/bookRegister`,fields,{ headers: { "authorization": `${token}`}}).then(res=>{
           console.log(res.message)
          if(res.data.message==="user validation failed: email: Email aldready in use")
           {
            alert("this is user is already present")
          }
           else{
            console.log(res.data)
           // alert("hello")
           setTimeout(() => {window.location.replace('/tables/bookshow')},500)  
           }
          
          
         })
        console.log({fields})
        
    }
    

  }

  validateForm() {
    
    let fields = this.state.fields;
    let errors = {};
   
    let formIsValid = true;

  
    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = "*Please book title.";
     
    }

    if (!fields["code"]) {
      formIsValid = false;
      errors["code"] = "*Please book code.";
     
    }
   
   /* if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        errors["username"] = "*Please enter alphabet characters only.";
      }
    }*/
    


      if (!fields["bookId"]) {
      formIsValid = false;
      errors["bookId"] = "*Please enter bookId.";
     
    }

    if (!fields["stock"]) {
      formIsValid = false;
      errors["stock"] = "*Please enter stock.";
     
    }

    if (!fields["author"]) {
      formIsValid = false;
      errors["author"] = "*Please enter author.";
     
    }

    if (!fields["description"]) {
      formIsValid = false;
      errors["description"] = "*Please enter description.";
     
    }

    if (!fields["Sname"]) {
      formIsValid = false;
      errors["Sname"] = "*Please enter Sname.";
     
    }

    if (!fields["genre"]) {
      formIsValid = false;
      errors["genre"] = "*Please enter genre.";
     
    }

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
                <h4 className="card-title">ENTER BOOK DETAILS</h4>
                <form className="form-sample">
                  <p className="card-description"> BOOK INFO </p>
                  
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">TITLE</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name='title' className="form-control" onChange={this.handleChange} placeholder="Book Title"/>
                        <div className="errorMsg">{this.state.errors.title}</div>
                        </div>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Book Id</label>
                        <div className="col-sm-9">
                        <Form.Control type="number" name='bookId' className="form-control" onChange={this.handleChange} placeholder="bookId"/>
                        <div className="errorMsg">{this.state.errors.bookId}</div>
                        </div>
                        </Form.Group>
                    </div>
                  </div>              
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Stock</label>
                        <div className="col-sm-9">
                        <Form.Control type="number" name='stock' className="form-control" onChange={this.handleChange} placeholder="stock"/>
                        <div className="errorMsg">{this.state.errors.stock}</div>
                        </div>
                        
                      </Form.Group>
                    </div>
                    
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Author</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name='author' className="form-control" onChange={this.handleChange} placeholder="author"/>
                        <div className="errorMsg">{this.state.errors.author}</div>
                        </div>
                       
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Code</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name='code' className="form-control" onChange={this.handleChange} placeholder="book code"/>
                        <div className="errorMsg">{this.state.errors.code}</div>
                        </div>
                        
                      </Form.Group>
                    </div>
                    
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Sub genre</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name='Sname' className="form-control" onChange={this.handleChange} placeholder="Sname"/>
                        <div className="errorMsg">{this.state.errors.Sname}</div>
                        </div>
                       
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Genre</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name='genre' className="form-control" onChange={this.handleChange} placeholder="Book Genre"/>
                        <div className="errorMsg">{this.state.errors.genre}</div>
                        </div>
                        
                      </Form.Group>
                    </div>
                    
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">About</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" name='description' className="form-control" onChange={this.handleChange} placeholder="description"/>
                        <div className="errorMsg">{this.state.errors.description}</div>
                        </div>
                       
                      </Form.Group>
                    </div>
                  </div>
                                
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

export default shopAdminRegister


