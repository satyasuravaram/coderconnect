import React, { useState, validated, handleSubmit } from "react";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import "./Contact.css";
import Axios from "axios";
import SuccessNotice from "../../components/misc/SuccessNotice";

export default function Contact() {
  const [validated, setValidated] = useState(true);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === true) {
      console.log(firstName, lastName, email, message);
      Axios.post("/mail/contact", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        message: message,
      }).then(function (response) {
        console.log(response);
      });
      setValidated(false);
      document.getElementById("contact-form").reset();
      setSuccess("Form submitted successfully!");
    } else {
      e.stopPropagation();
      setValidated(true);
    }
  };

  return (
    <div className="contact-whole-container">
      <div className="contact-top-container">
        <h1 className="contact-header">Contact Us</h1>
        <div className="contact-info">
          <hr className="contact-header-line" />
          <p className="contact-answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          scelerisque vehicula risus eget molestie. Curabitur ut bibendum diam.
          Vivamus et nulla vulputate neque finibus dictum sed non odio. Etiam
          magna justo, tempor eget nisl ullamcorper, euismod vulputate est.
            Aliquam varius justo congue orci bibendum elementum. Proin lacinia</p>
        </div>
      </div>
      <div className="bt-form">
        <h1 className="contact-title">Contact Us</h1>
        {success && <SuccessNotice message={success} />}
        <Form
          id="contact-form"
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
          </Form.Row>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Message</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows="4"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Form.Control.Feedback type="valid">
              Looks good!
                </Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Please input your message
                </Form.Control.Feedback>
          </Form.Group>
          <hr />
          <Button type="submit">Submit message</Button>
        </Form>
      </div>
    </div>
  );
}
