import React from "react";
import { Button, Card } from "react-bootstrap";
import styles from "./style.module.css";

const Dashboard = () => {
  return (
    <div className={styles.Dashboard}>
      <div className={`${styles.backgroundContent} container-fluid`}>
        <div className={`${styles.content} container flex-column p-5`}>
          <div className={styles.cardsContainer}>
            <Button>
              Account Settings <br />
              <span>Manage your details here</span>
            </Button>
            <br /> <br />
            <Button>
              Password & Security <br />
              <span>Manage your privacy settings here</span>
            </Button>
            <br /> <br />
            <Button>
              Registered Vehicles <br />
              <span>Manage your vehicles here</span>
            </Button>
            <br /> <br />
            <Button>
              Tickets & Citations <br />
              <span>Manage your tickets and citations here</span>
            </Button>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
