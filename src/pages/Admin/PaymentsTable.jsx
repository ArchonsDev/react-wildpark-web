import React from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";

import styles from "./style.module.css";

const PaymentsTable = () => {
  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Body className={styles.tableHeader}>
          <Card.Title>Payments</Card.Title>
        </Card.Body>
        <ListGroup>
          <ListGroup.Item className={styles.tableContent}>
            <Row>
              <Col xs={4}>Subject</Col>
              <Col xs={4}>Date Posted</Col>
              <Col xs={4}>Status</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        <ListGroup>
          <ListGroup.Item className={styles.tableContent}>
            <Row>
              <Col xs={4}>1</Col>
              <Col xs={4}>December 12, 2023</Col>
              <Col xs={4}>Open</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default PaymentsTable;
