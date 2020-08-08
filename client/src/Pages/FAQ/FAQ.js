import React from "react";
import { Card, Accordion } from "react-bootstrap";
import "./FAQ.css";

export default function FAQ() {
  return (
    <div className="faq-outer-container">
      <div className="faq-inner-container">
      <h2 class="header">Frequently Asked Questions</h2>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              <strong>How much does it cost to get tutored?</strong>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body class="answer">
              Since CoderConnect is a volunteering site, tutoring is{" "}
              <span class="important-word">free</span>. Tutors are given
              volunteer hours instead of money
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
              <strong>How can I become a tutor?</strong>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              You can apply to become a tutor on our "Become a Tutor" page!
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
              <strong>How can I get tutored?</strong>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="2">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
              <strong>Where does the tutoring take place?</strong>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="3">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
    </div>
  );
}
