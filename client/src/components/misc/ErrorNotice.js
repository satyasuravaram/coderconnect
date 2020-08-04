import React from "react";
import { UncontrolledAlert, Alert, Row, Col } from "reactstrap";
export default function ErrorNotice(props) {
  return (
    <Alert className="error-popup" color="danger">
      <span>{props.message}</span>
    </Alert>
  );
}
