import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "./style.module.css";

function TicketSettings() {
  return (
    <Card style={{ width: '50rem', marginLeft: '7em', borderRadius: '20px' }}>
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
    <Card style={{ width: '50rem', marginTop: '20px', marginLeft: '7em' }}>
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
    <div>
      <Row>
        <Col>
          <TicketSettings />
        </Col>
      </Row>
      <Row>
        <Col>
          <CitationSettings />
        </Col>
      </Row>
    </div>
  );
}

export default SettingsPage;
