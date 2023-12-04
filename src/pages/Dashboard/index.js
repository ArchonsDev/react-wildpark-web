import React from "react";
import { Card } from "react-bootstrap";
import { Search as SearchIcon, Add as PlusIcon } from "@mui/icons-material";

import BtnSecondary from "../../common/Buttons/BtnSecondary";
import styles from "./styles.module.css";

const Dashboard = () => {
  return (
    <div className={styles.Dashboard}>
      <div className={`${styles.backgroundContent} container-fluid`}>
        <div
          className={`${styles.content} container d-flex align-items-center flex-column p-5`}
        >
          <div className={styles.redBox}>
            <div className="row">
              <div className="col">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <i className="fa-solid fa-circle-user fa-2xl"></i> User
                    </Card.Title>
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
                    <Card.Text className="text-muted">
                      <i
                        class="fa-regular fa-square-plus fa-5x"
                        style={{
                          marginLeft: "105px",
                          textAlign: "center",
                        }}
                      ></i>
                      <br />
                      <br />
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
