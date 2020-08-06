import React, { Component, useState, validated, handleSubmit } from "react";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import { render } from 'react-dom';
import "./BecomeTutor.css";
import Skills from "./Skills";
import Axios from "axios";
import { makeToast, endSessionToast } from "../../components/misc/Toaster";
import ErrorNotice from "../../components/misc/ErrorNotice";
import SuccessNotice from "../../components/misc/SuccessNotice";
import bsCustomFileInput from "bs-custom-file-input"


export default function BecomeTutor() {
  const [validated, setValidated] = useState(true);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [skills, setSkills] = useState([]);
  const [resume, setResume] = useState();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === true && skills !== null && skills.length > 0) {
      console.log(firstName, lastName, email, skills, age);
      console.log(resume);
      const data = new FormData();
      for (let i = 0; i < skills.length; i++) {
        data.append("skills", skills[i].value);
      }
      let token = localStorage.getItem("auth-token");

      data.append("resume", resume);
      data.append("firstName", firstName);
      data.append("lastName", lastName);
      data.append("email", email);
      data.append("age", age);

      Axios.post("http://localhost:5000/mail/send", data).then(function (
        response
      ) {
        console.log(response);
      });
      document.getElementById("tutor-form").reset();
      setValidated(false);
      setSuccess("Application submitted successfully!");
    } else {
      let missingInputs = []
      let needs = ["first name", "last name", "email", "age", "resume/CV", "skills"]
      let firstTrue = -1;
      let lastTrue = 0;
      let count = 0;
      let tcount = 0;
      if (firstName===undefined || firstName.length== 0) {
        missingInputs.push(true);
        if(firstTrue == -1) firstTrue = count;
        lastTrue = count;
        tcount++;
      } else {missingInputs.push(false);} count++;
      if (lastName===undefined || lastName.length== 0) {
        missingInputs.push(true);
        if(firstTrue == -1) firstTrue = count;
        lastTrue = count;
        tcount++;
        
      } else {missingInputs.push(false);} count++;
      if (email===undefined || email.length== 0) {
        missingInputs.push(true);
        if(firstTrue == -1) firstTrue = count;
        lastTrue = count;
        tcount++;
        
      } else {missingInputs.push(false);} count++;
      if (age===undefined || age.length== 0) {
        missingInputs.push(true);
        if(firstTrue == -1) firstTrue = count;
        lastTrue = count;
        tcount++;
        
      } else {missingInputs.push(false);} count++;
      if (resume===undefined || resume.length== 0) {
        missingInputs.push(true);
        if(firstTrue == -1) firstTrue = count;
        lastTrue = count;
        tcount++;
        
      } else {missingInputs.push(false);} count++;
      if (skills===null|| skills.length== 0) {
        missingInputs.push(true);
        if(firstTrue == -1) firstTrue = count;
        lastTrue = count;
        tcount++;
        
      } else {missingInputs.push(false);}
      console.log("handleSubmit -> lastTrue", lastTrue)
      let output = "";
      firstTrue == lastTrue ? output = "Please output your " : output ="Please output your ";
      console.log(firstTrue, lastTrue);
      for(let i = 0; i < missingInputs.length; i++){
        if(firstTrue != lastTrue){
          if(missingInputs[i]){
            if(lastTrue == i){
              output += "and "
            }
            output += needs[i];
            if(tcount != 2 && lastTrue != i){
              output += ", "
            }
            else if(tcount == 2 && lastTrue != i){
              output += " ";
            }
          }
        }
        else{
          if(missingInputs[i]){
            output += needs[i];
          }
        }
      }
      output += ".";
      setError(output);
      e.stopPropagation();
      setValidated(true);
    }
  }


  return (
    <div className="bt-outer-container">
      <div className="bt-inner-container">
        <div className="bt-form">
          <h2>Become a Tutor</h2>
          {error && <ErrorNotice message={error} fade={true} />
         || success && <SuccessNotice message={success} />}
          <Form
            id="tutor-form"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Row>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please input your first name.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please input your last name.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="validationCustomEmail">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="foo@gmail.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please input your email address.
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationCustom05">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  onChange={(e) => setAge(e.target.value)}
                  type="number"
                  placeholder="Age"
                  required
                />
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid age.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="validationCustom03">
                {/* <Form.File
                id="resume"
                label="Resume/CV"
                onChange={(e) => setResume(e.target.files[0])}
                required
              /> */}
              <Form.Label>Resume/CV</Form.Label>
                <Form.File
                  id="resume"
                  label="Choose a file..."
                  custom
                  onChange={(e) => setResume(e.target.files[0])}
                  required 
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="validationCustom06">
                <Form.Label>Skills</Form.Label>
                <Skills setSkills={setSkills} required />
              </Form.Group>
            </Form.Row>

            <hr />
            <Button type="submit">Submit app</Button>
          </Form>
        </div>
        <div className="bt-right-half">hi</div>
      </div>
    </div>
  );
}

