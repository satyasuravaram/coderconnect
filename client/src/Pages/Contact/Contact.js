import React, { useState, validated, handleSubmit } from "react";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import "./Contact.css";
import { makeToast, endSessionToast } from "../../components/misc/Toaster";
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
    <div>
      <div className="bt-outer-container-contact">
        <div className="bt-inner-container-contact">
          <div className="bt-form-contact">
            <h2>Contact Us</h2>
            {success && <SuccessNotice message={success} />}
            <Form
              id="contact-form"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
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
                <Form.Group as={Col} md="6" controlId="validationCustom02">
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
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        @
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="email"
                      placeholder="foo@gmail.com"
                      aria-describedby="inputGroupPrepend"
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
                  rows="3"
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
      </div>
    </div>
  );
}
