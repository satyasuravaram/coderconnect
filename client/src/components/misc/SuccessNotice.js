import React from "react";
import { UncontrolledAlert, Alert, Row, Col } from "reactstrap";
export default function Notice(props) {
  return (
    <Alert className="error-popup" color="success">
      <span>{props.message}</span>
    </Alert>
  );
}
