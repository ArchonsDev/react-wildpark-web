import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

// TO-DO:
// User profile picture (to be discussed ig)
// Conditional rendering for organization
// Conditional rendering for bookings

// CONCERNS:
// User icon not displaying its true size? (Might be the card size idk)
// How will notifications work?

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
    <div className={styles.Dashboard}>
      <div className={`${styles.content} container d-flex flex-column justify-content-end align-items-center`}>
        <div className={`${styles.dateTab} row d-flex justify-content-end`}>
          <div className={`${styles.date} col-sm-3 py-2 d-flex justify-content-center align-items-center`}>{currentDate.toLocaleString()}</div>
        </div>
        <div className={`${styles.redBox} row mt-3 p-5`}>
          <div className="col-sm-12 container-fluid d-flex flex-column mx-0 px-0">
            <div className="row">
              <div className="col-sm-12">
                <a style={{ textDecoration: "none" }} href="#" onClick={e => navigate("/settings")}>
                  <Card className={styles.card}>
                    <Card.Body className={styles.userContent}>
                      <i className="fa-solid fa-circle-user fa-2xl"></i>
                      <div className={styles.userInfo}>
                        <Card.Title className="mb-0">
                          {sessionUser.firstname} {sessionUser.lastname}
                        </Card.Title>
                        <Card.Text>{sessionUser.email}</Card.Text>
                      </div>
                    </Card.Body>
                  </Card>
                </a>
              </div>
            </div>
            <div className="row flex-grow-1 mt-4">
              <div className="col-sm-6">
                <Card className={styles.notificationCard}>
                  <Card.Header className={`${styles.cardHeader} d-flex justify-content-center`}>
                    Notification Center
                  </Card.Header>
                  <Card.Body className={`${styles.cardContent} d-flex flex-column justify-content-center align-items-center`}>
                    <Card.Text className="text-muted">
                      No new notifications.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-sm-6 container-fluid d-flex flex-column">
                <div className="row mb-4 flex-grow-1">
                  <div className="col-sm-12">
                    <Card className={styles.card}>
                      <Card.Header className={`${styles.cardHeader} d-flex justify-content-center`}>
                        Organizations
                      </Card.Header>
                      <Card.Body className={`${styles.cardContent} d-flex flex-column justify-content-center align-items-center`}>
                        <div>
                          <i class="fa-regular fa-square-plus fa-5x"></i>
                        </div>
                        <Card.Text className="text-muted">
                          Click to create or join an organization.
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
                <div className="row flex-grow-1">
                  <div className="col-sm-12">
                    <Card className={styles.card}>
                      <Card.Header className={`${styles.cardHeader} d-flex justify-content-center`}>
                        Booking Information
                      </Card.Header>
                      <Card.Body className={`${styles.cardContent} d-flex flex-column justify-content-center align-items-center`}>
                        <Card.Text className="text-muted">No bookings.</Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Dashboard;