import React from "react";
import { UncontrolledAlert, Row, Col } from "reactstrap";

export default function ErrorNotice(props) {
  return <div>
    <Row>
        <Col md={6} >
            <UncontrolledAlert color="danger">
                <span>{props.message}</span>
            </UncontrolledAlert>
        </Col>
    </Row>
      
  </div>;
}
