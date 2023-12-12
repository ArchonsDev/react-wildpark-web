import React from "react";

import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";

import styles from "./style.module.css";

function TicketSettings() {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body className={styles.ticketHeader}>
        <Card.Title>Tickets</Card.Title>
      </Card.Body>
      <ListGroup >
        <ListGroup.Item className={styles.ticketContents}>
          <Row>
            <Col xs={4}>Subject</Col>
            <Col xs={4}>Date Posted</Col>
            <Col xs={4}>Status</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup >
        <ListGroup.Item className={styles.ticketContents}>
          <Row>
            <Col xs={4}>1</Col>
            <Col xs={4}>December 12, 2023</Col>
            <Col xs={4}>Open</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

function CitationSettings() {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Body className={styles.ticketHeader}>
        <Card.Title>Citations</Card.Title>
      </Card.Body>
      <ListGroup >
        <ListGroup.Item className={styles.ticketContents}>
          <Row >
            <Col xs={3}>Subject</Col>
            <Col xs={3}>Fine</Col>
            <Col xs={3}>Date</Col>
            <Col xs={3}>Status</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>

      <ListGroup >
        <ListGroup.Item className={styles.ticketContents}>
          <Row>
            <Col xs={3}>1</Col>
            <Col xs={3}>500</Col>
            <Col xs={3}>December 12, 2023</Col>
            <Col xs={3}>Open</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

function SettingsPage() {
  return (
    <Container fluid className="m-0 p-0 flex-grow-1">
      <Row>
        <Col md={12}>
          <TicketSettings />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <CitationSettings />
        </Col>
      </Row>
    </Container>
  );
}

export default SettingsPage;
