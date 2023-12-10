import React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";

import SessionUserContext from "../../contexts/SessionUserContext";
import BtnSecondary from "../../common/Buttons/BtnSecondary";

import styles from "./styles.module.css";

// TO-DO:
// User profile picture (to be discussed ig)
// Conditional rendering for organization
// Conditional rendering for bookings

// CONCERNS:
// User icon not displaying its true size? (Might be the card size idk)
// How will notifications work?

const Dashboard = () => {
  const { sessionUser, setSessionUser } = useContext(SessionUserContext);
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
      <div className={`${styles.backgroundContent} container-fluid`}>
        <div
          className={`${styles.content} container d-flex align-items-center flex-column`}>
          <div className={styles.dateTab}>
            <div className={styles.date}>{currentDate.toLocaleString()}</div>
          </div>
          <div className={styles.redBox}>
            <div className="row">
              <div className="col">
                <Card>
                  <Card.Body className={styles.userContent}>
                    <i className="fa-solid fa-circle-user fa-2xl"></i>
                    <div className={styles.userInfo}>
                      <Card.Title style={{ marginBottom: "0" }}>
                        {sessionUser.firstname} {sessionUser.lastname}
                      </Card.Title>
                      <Card.Text>{sessionUser.email}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>

            <div className="row">
              <div className="col-md-7 col-12 mt-4">
                <Card className={styles.notificationCard}>
                  <Card.Header className={styles.cardHeader}>
                    Notification Center
                  </Card.Header>
                  <Card.Body className={styles.cardContent}>
                    <Card.Text className="text-muted">
                      No new notifications.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div className="col md-4 mt-4">
                <Card className={styles.card}>
                  <Card.Header className={styles.cardHeader}>
                    Organizations
                  </Card.Header>
                  <Card.Body className={styles.cardContent}>
                    <div>
                      <i class="fa-regular fa-square-plus fa-5x"></i>
                    </div>
                    <Card.Text className="text-muted">
                      Click to create or join an organization.
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card className={`${styles.card} mt-4`}>
                  <Card.Header className={styles.cardHeader}>
                    Booking Information
                  </Card.Header>
                  <Card.Body className={styles.cardContent}>
                    <Card.Text className="text-muted">No bookings.</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
