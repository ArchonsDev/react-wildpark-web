import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./styles.module.css";
import OrganizationCard from "./OrganizationCard";

// TO-DO:
// Conditional rendering for bookings

const Dashboard = () => {
  const navigate = useNavigate();
  const { sessionUser } = useContext(SessionUserContext);
  const [currentDate, setCurrentDate] = useState(new Date());


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={`${styles.Dashboard} container-fluid p-0`}>
      <div className={`${styles.content} container d-flex flex-column justify-content-end align-items-center`}>

        <div className={`${styles.dateTab} row d-flex justify-content-end mb-3`}>
          <div className={`${styles.date} col-sm-3 py-2 d-flex justify-content-center align-items-center`}>
            {currentDate.toLocaleString()}
          </div>
        </div>

        <div className={`${styles.redBox} row w-100`}>
          <div className="container-fluid p-5 d-flex flex-column">
            <div className="row mb-4">
              <div className="container-fluid">
                <Card className={styles.card} onClick={(e) => navigate("/settings")}>
                  <Card.Body className="d-flex align-items-center">
                    <i className="fa-solid fa-circle-user fa-4x"></i>
                    <div className={styles.userInfo}>
                      <Card.Title className="mb-0">
                        {sessionUser.firstname} {sessionUser.lastname}
                      </Card.Title>
                      <Card.Text>{sessionUser.email}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>

            {/* DASHBOARD CONTENT */}
            {/* NOTIFICATIONS */}
            <div className="row flex-grow-1 d-flex flex-column">
              <div className="container-fluid flex-grow-1 d-flex flex-column">
                <div className="row flex-grow-1">
                  <div className="col-sm-6 mb-4 d-flex flex-column">
                    <Card className={`${styles.notificationCard} flex-grow-1`}>
                      <Card.Header
                        className={`${styles.cardHeader} d-flex justify-content-center`}>
                        Notification Center
                      </Card.Header>
                      <Card.Body
                        className={`${styles.cardContent} d-flex flex-column justify-content-center align-items-center`}>
                        <Card.Text className="text-muted">
                          No new notifications.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>

                  {/* ORGANIZATION */}
                  <div className="col-sm-6 mb-4 d-flex flex-column">
                    <div className="row mb-4 flex-grow-1">
                      <div className="col-sm-12">
                        <OrganizationCard />
                      </div>
                    </div>

                    {/* BOOKINGS */}
                    <div className="row flex-grow-1">
                      <div className="col-sm-12">
                        <Card className={styles.card} style={{ height: "100%" }}>
                          <Card.Header
                            className={`${styles.cardHeader} d-flex justify-content-center`}>
                            Booking Information
                          </Card.Header>
                          <Card.Body
                            className={`${styles.cardContent} d-flex flex-column justify-content-center align-items-center`}>
                            <Card.Text className="text-muted">
                              No bookings.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
