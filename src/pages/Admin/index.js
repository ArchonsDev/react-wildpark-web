import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

import UsersTable from "./UsersTable";
import VehiclesTable from "./VehiclesTable";
import BookingsTable from "./BookingsTable";
import PaymentsTable from "./PaymentsTable";

import styles from "./style.module.css";

const Admin = () => {
  const [views, setViews] = useState({
    users: true,
    vehicles: false,
    bookings: false,
    payments: false,
  });

  const handleSwitchView = (e) => {
    switch (e.target.name) {
      case "vehicles":
        setViews({
          users: false,
          vehicles: true,
          bookings: false,
          payments: false,
        });
        break;
      case "bookings":
        setViews({
          users: false,
          vehicles: false,
          bookings: true,
          payments: false,
        });
        break;
      case "payments":
        setViews({
          users: false,
          vehicles: false,
          bookings: false,
          payments: true,
        });
        break;
      default:
        setViews({
          users: true,
          vehicles: false,
          bookings: false,
          payments: false,
        });
    }
  };

  return (
    <div className={styles.Admin}>
      <div className={`${styles.backgroundContent} pt-5 d-flex flex-column`}>
        <div
          className={`${styles.content} container d-flex flex-column flex-grow-1 mt-3 p-5`}>
          <Row className="flex-grow-1">
            <Col md={2}>
              <Row className="mb-3 d-flex justify-content-center">
                <Col
                  md={12}
                  className={`${views.users
                    ? styles["active-button"]
                    : styles["selector-button"]
                    }`}>
                  <Button
                    className="w-100"
                    onClick={handleSwitchView}
                    name="users">
                    Users
                  </Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col
                  md={12}
                  className={`${views.vehicles
                    ? styles["active-button"]
                    : styles["selector-button"]
                    }`}>
                  <Button
                    className="w-100"
                    onClick={handleSwitchView}
                    name="vehicles">
                    Vehicles
                  </Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col
                  md={12}
                  className={`${views.bookings
                    ? styles["active-button"]
                    : styles["selector-button"]
                    }`}>
                  <Button
                    className="w-100"
                    onClick={handleSwitchView}
                    name="bookings">
                    Bookings
                  </Button>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col
                  md={12}
                  className={`${views.payments
                    ? styles["active-button"]
                    : styles["selector-button"]
                    }`}>
                  <Button
                    className="w-100"
                    onClick={handleSwitchView}
                    name="payments">
                    Payments
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col md={10} className="d-flex flex-column px-5">
              {views.users && <UsersTable />}
              {views.vehicles && <VehiclesTable />}
              {views.bookings && <BookingsTable />}
              {views.payments && <PaymentsTable />}
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Admin;
