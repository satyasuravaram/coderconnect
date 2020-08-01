import React, { useState, validated, handleSubmit } from "react";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import "./BecomeTutor.css"
import Skills from "./Skills"
import Axios from "axios";

export default function BecomeTutor() {
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [skills, setSkills] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, skills, age);
    // console.log("hi");
    // const form = event.currentTarget;
    // console.log("handleSubmit -> form", form)
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }
    Axios.post('http://localhost:5000/mail/send', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      age: age,
      skills: skills
    })
      .then(function (response) {
        console.log(response);
      })
    setValidated(true);
  };

  return <div>
    <h2>Become a Tutor</h2>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            onChange={e => setFirstName(e.target.value)}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
              </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please input your first name.
              </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            onChange={e => setLastName(e.target.value)}
          />
          <Form.Control.Feedback type="valid">
            Looks good!
              </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please input your last name.
              </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomEmail">
          <Form.Label>Email</Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              type="email"
              placeholder="foo@gmail.com"
              aria-describedby="inputGroupPrepend"
              required
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="valid">
              Looks good!
                </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please input your email address.
                </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="3" controlId="validationCustom03">
          <Form.File id="resume" label="Please put your resume or CV here" />
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Age</Form.Label>
          <Form.Control onChange={e => setAge(e.target.value)} type="text" placeholder="Age" required />
          <Form.Control.Feedback type="valid">
            Looks good!
              </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please provide a valid age.
              </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Skills setSkills={setSkills} />
      <hr />
      <Button type="submit">Submit app</Button>
    </Form>
  </div>
}