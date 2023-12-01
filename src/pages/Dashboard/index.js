import React from "react";

import { Card } from "react-bootstrap";

import BtnSecondary from "../../common/Buttons/BtnSecondary";
import styles from "./styles.module.css";

const Dashboard = () => {
  return (
    <div className={styles.Dashboard}>
      <div className={`${styles.backgroundContent} container-fluid`}>
        <div
          className={`${styles.content} container d-flex align-items-center flex-column p-5`}>
          <div className={styles.redBox}>
            <div className="row">
              <div className="col">
                <Card>
                  <Card.Body>
                    <Card.Title>User</Card.Title>
                    <Card.Text>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </Card.Text>
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
                  <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

              <div className="col md-4 mt-4">
                <Card className={styles.card}>
                  <Card.Header className={styles.cardHeader}>
                    Organizations
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </Card.Text>
                    <BtnSecondary>Details</BtnSecondary>
                  </Card.Body>
                </Card>

                <Card className={`${styles.card} mt-4`}>
                  <Card.Header className={styles.cardHeader}>
                    Booking Information
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Special title treatment</Card.Title>
                    <Card.Text>
                      With supporting text below as a natural lead-in to
                      additional content.
                    </Card.Text>
                    <BtnSecondary>Manage</BtnSecondary>
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
