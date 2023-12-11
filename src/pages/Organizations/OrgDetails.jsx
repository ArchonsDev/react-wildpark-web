import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "./styles.module.css";

const OrgDetails = () => {
  return (
    <Container fluid className="p-3">
      <Row>
        <Col md={3} className={`${styles.field} ${styles['field-title']} py-2`}>Name</Col>
        <Col className={`${styles.field} py-2`}>Cebu Institute of Technology-University</Col>
      </Row>
      <Row>
        <Col md={3} className={`${styles.field} ${styles['field-title']} py-2`}>Location</Col>
        <Col md={2} className={`${styles.field} py-2`}>123.123123 N</Col>
        <Col md={2} className={`${styles.field} py-2`}>123.123123 E</Col>

      </Row>
      <Row>
        <Col md={3} className={`${styles.field} ${styles['field-title']} py-2`}>Payment Strategy</Col>
        <Col className={`${styles.field} py-2`}>PAY PER USE</Col>
      </Row>
      <Row>
        <Col md={3} className={`${styles.field} ${styles['field-title']} py-2`}>Type</Col>
        <Col className={`${styles.field} py-2`}>EDUCATUIONAL</Col>
      </Row>
    </Container>
  );
};

export default OrgDetails;