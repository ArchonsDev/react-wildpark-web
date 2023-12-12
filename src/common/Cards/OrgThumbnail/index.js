import React from "react";
import { Card, Row, Col } from "react-bootstrap";

const OrgThumbnail = ({ name, owner, ...rest }) => {
  return (
    <Card {...rest} style={{ cursor: "pointer" }}>
      <Row noGutters>
        <Col md={3} className="card-icon d-flex justify-content-end align-items-center">
          <i className="fa-solid fa-building fa-5x" style={{ color: "#0d0630" }}></i>
        </Col>
        <Col md={9}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{owner}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default OrgThumbnail;