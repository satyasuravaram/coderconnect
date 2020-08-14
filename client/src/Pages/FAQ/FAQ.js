import React from "react";
import { Card, Accordion } from "react-bootstrap";
import "./FAQ.css";

export default function FAQ() {
  return (
    <div className="faq-whole-container">
      <div className="faq-top-container">
        <h1 class="faq-header">Frequently Asked Questions</h1>
        <div className="faq-info">
            <hr className="faq-header-line" />
            <p className="faq-answer">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            scelerisque vehicula risus eget molestie. Curabitur ut bibendum diam.
            Vivamus et nulla vulputate neque finibus dictum sed non odio. Etiam
            magna justo, tempor eget nisl ullamcorper, euismod vulputate est.
              Aliquam varius justo congue orci bibendum elementum. Proin lacinia</p>
        </div>
      </div>
      <div className="faq-bottom-container">
      <Accordion id="faqs">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
              <strong>How much does it cost to get tutored?</strong>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
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
