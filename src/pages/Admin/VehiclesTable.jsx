import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, Row, Col, ListGroup } from "react-bootstrap";

import styles from "./style.module.css";

const VehiclesTable = () => {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/vehicles/",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setVehicles(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchVehicles();
    console.log(vehicles);
  }, []);

  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Body className={styles.tableHeader}>
          <Card.Title>Vehicles</Card.Title>
        </Card.Body>
        <ListGroup>
          <ListGroup.Item className={styles.tableContent}>
            <Row>
              <Col xs={1}>ID</Col>
              <Col xs={2}>Plate Number</Col>
              <Col xs={2}>Make</Col>
              <Col xs={2}>Model</Col>
              <Col xs={2}>Type</Col>
              <Col xs={1}>Owner</Col>
              <Col xs={1}>{""}</Col>
              <Col xs={1}>{""}</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        <ListGroup>
          {vehicles.map((vehicle) => {
            const isTwoWheeler = vehicle.hasOwnProperty("displacement");
            const isFourWheeler = vehicle.hasOwnProperty("type");
            return (
              <ListGroup.Item key={vehicle.id} className={styles.tableContent}>
                <Row>
                  <Col xs={1}>{vehicle.id}</Col>
                  <Col xs={2}>{vehicle.plateNumber}</Col>
                  <Col xs={2}>{vehicle.make}</Col>
                  <Col xs={2}>{vehicle.model}</Col>
                  {isTwoWheeler && <Col xs={2}>Two_Wheeler</Col>}
                  {isFourWheeler && <Col xs={2}>Four_Wheeler</Col>}
                  <Col xs={1}>{vehicle.ownerId}</Col>
                  <Col xs={1}>
                    <i className="fa-solid fa-pen"></i>
                  </Col>
                  <Col xs={1}>
                    <i className="fa-solid fa-trash-can"></i>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    </>
  );
};

export default VehiclesTable;
