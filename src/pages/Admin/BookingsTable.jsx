import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, Row, Col, ListGroup } from "react-bootstrap";

import styles from "./style.module.css";

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/accounts/",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setAccounts(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  const fetchBookings = async () => {};

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Body className={styles.tableHeader}>
          <Card.Title>Bookings</Card.Title>
        </Card.Body>
        <ListGroup>
          <ListGroup.Item className={styles.tableContent}>
            <Row>
              <Col xs={4}>User ID</Col>
              <Col xs={4}>Name</Col>
              <Col xs={4}>Bookings</Col>
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

export default BookingsTable;
