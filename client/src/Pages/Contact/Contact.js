import React, { useState, validated, handleSubmit } from "react";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import "./Contact.css"
import Axios from "axios";

export default function Contact() {
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(firstName, lastName, email, message);
        // console.log("hi");
        // const form = event.currentTarget;
        // console.log("handleSubmit -> form", form)
        // if (form.checkValidity() === false) {
        //   event.preventDefault();
        //   event.stopPropagation();
        // }
        Axios.post('http://localhost:5000/mail/contact', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message
        })
            .then(function (response) {
                console.log(response);
            })
        setValidated(true);
    };

    return <div>
        <h2>Contact Us</h2>
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
            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Example textarea</Form.Label>
                <Form.Control required as="textarea" rows="3" onChange={e=>setMessage(e.target.value)}/>
            </Form.Group>
            <hr />
            <Button type="submit">Submit message</Button>
        </Form>
    </div>
}