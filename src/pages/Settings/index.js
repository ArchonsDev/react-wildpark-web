import React from "react";
import { Button } from "react-bootstrap";
import styles from "./style.module.css";

const Settings = () => {
  return (
    <div className={styles.Settings}>
      <div className={`${styles.backgroundContent} container-fluid`}>
        <div className={`${styles.content} container flex-column p-5`}>
          <div className={styles.cardsContainer}>
            <div className="col">
              <div className="row">
                <Button>
                  Account Settings <br />
                  <p>Manage your details here</p>
                </Button>
              </div>
              <div className="row">
                <Button>
                  Password & Security <br />
                  <p>Manage your privacy settings here</p>
                </Button>
              </div>
              <div className="row">
                <Button>
                  Registered Vehicles <br />
                  <p>Manage your vehicles here</p>
                </Button>
              </div>
              <div className="row">
                <Button>
                  Tickets & Citations <br />
                  <p>Manage your tickets and citations here</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
