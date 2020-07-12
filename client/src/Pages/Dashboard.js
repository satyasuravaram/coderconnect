import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Axios from "axios";

export default function Dashboard() {
  const [show, setShow] = useState(false);

  const [tutorsBio, setTutorsBio] = useState([]);
  const [tutorsFirstName, setTutorsFirstName] = useState([]);
  const [tutorsLastName, setTutorsLastName] = useState([]);
  const [tutorsID, setTutorsID] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getTutors = async () => {
      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await Axios.post(
        "http://localhost:5000/users/isTokenValid",
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenRes.data) {
        const tutorArr = await Axios.get("http://localhost:5000/users/tutors", {
          headers: { "x-auth-token": token },
        });
        for (let i = 0; i < tutorArr.data.length; i++) {
          setTutorsBio((oldTutors) => [...oldTutors, tutorArr.data[i].bio]);
          setTutorsFirstName((oldTutors) => [
            ...oldTutors,
            tutorArr.data[i].firstName,
          ]);
          setTutorsLastName((oldTutors) => [
            ...oldTutors,
            tutorArr.data[i].lastName,
          ]);
          setTutorsID((oldTutors) => [...oldTutors, tutorArr.data[i]._id]);
        }
      }
    };
    getTutors();
  }, []);
  return (
    <div
      className="text-center"
      style={{ backgroundColor: "#dbe2ef", marginLeft: "0px" }}
    >
      <h5 style={{ marginLeft: "0px" }}>We'll have some info here</h5>
      <Button variant="outline-primary" onClick={handleShow}>
        Request a tutor
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request a Tutor</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select Skill: </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <h6
        style={{
          marginBottom: 2 + "rem",
          marginTop: 4 + "rem",
          marginLeft: "0px",
        }}
      >
        Tutors:
      </h6>

      {tutorsFirstName.map((name, index) => (
        <Card
          style={{
            width: "50rem",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "20px",
          }}
        >
          <Card.Img variant="left" src="holder.js/100px180?text=Image cap" />
          <Card.Body style={{ paddingBottom: ".1rem" }}>
            <Card.Title>
              {name} {tutorsLastName[index]}
            </Card.Title>
            <Card.Text>
              {tutorsBio[index]}
              <Button
                variant="outline-danger"
                href={`/app/profile/${tutorsID[index]}`}
                style={{ marginLeft: ".5rem" }}
              >
                Read more
              </Button>
            </Card.Text>
            <Button
              variant="primary"
              style={{ position: "relative", left: "300px", bottom: "50px" }}
              onClick={handleShow}
            >
              Connect
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Connect with tutor</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Skill you need help with:</Form.Label>
                    <Form.Control placeholder="Skill" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Issue:</Form.Label>
                    <Form.Control placeholder="Issue" />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  href={`/app/messages/${tutorsID[index]}`}
                  type="submit"
                  onClick={handleClose}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
