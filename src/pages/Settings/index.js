import React, { useState } from "react";
import { Button } from "react-bootstrap";

import styles from "./style.module.css";
import BtnSecondary from "../../common/Buttons/BtnSecondary";

const Settings = () => {
  const [showAccountBox, setShowAccountBox] = useState(false);
  const [showSecurityBox, setShowSecurityBox] = useState(false);
  const [showVehicleBox, setShowVehicleBox] = useState(false);
  const [showTicketsBox, setShowTicketsBox] = useState(false);

  const handleAccountSettingsClick = () => {
    setShowAccountBox(true);
    setShowSecurityBox(false);
    setShowVehicleBox(false);
    setShowTicketsBox(false);
  };

  const handlePasswordSecurityClick = () => {
    setShowAccountBox(false);
    setShowSecurityBox(true);
    setShowVehicleBox(false);
    setShowTicketsBox(false);
  };

  const handleRegisteredVehiclesClick = () => {
    setShowAccountBox(false);
    setShowSecurityBox(false);
    setShowVehicleBox(true);
    setShowTicketsBox(false);
  };

  const handleTicketsCitationsClick = () => {
    setShowAccountBox(false);
    setShowSecurityBox(false);
    setShowVehicleBox(false);
    setShowTicketsBox(true);
  };

  return (
    <div className={styles.Settings}>
      <div className={`${styles.backgroundContent} container-fluid`}>
        <div className={`${styles.content} container flex-column p-5`}>
          <div className="d-flex flex-row mt-5">
            <div className="col" style={{ flex: "1" }}>
              {/* cardsContainer */}
              <div className={styles.cardsContainer}>
                <div className="row">
                  <Button onClick={handleAccountSettingsClick}>
                    Account Settings <br />
                    <p>Manage your details here</p>
                  </Button>
                </div>
                <div className="row">
                  <Button onClick={handlePasswordSecurityClick}>
                    Password & Security <br />
                    <p>Manage your privacy settings here</p>
                  </Button>
                </div>
                <div className="row">
                  <Button onClick={handleRegisteredVehiclesClick}>
                    Registered Vehicles <br />
                    <p>Manage your vehicles here</p>
                  </Button>
                </div>
                <div className="row">
                  <Button onClick={handleTicketsCitationsClick}>
                    Tickets & Citations <br />
                    <p>Manage your tickets and citations here</p>
                  </Button>
                </div>
              </div>
            </div>

            <div class="col" style={{ flex: "2" }}>
              {showAccountBox && (
                <div className={`col ${styles.accountBox}`}>
                  <div className={styles.accountHeader}>
                    <i
                      className={`fa-solid fa-circle-user fa-7x mb-3 ${styles.userPfp}`}></i>
                    <BtnSecondary>Edit Profile</BtnSecondary>
                  </div>
                  <div className="row mt-4">
                    <div className="col">
                      <span>Name: </span>
                      <span>John Doe</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <br />
                      <span>Email Address: </span>
                      <span>john@gmail.com</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <br />
                      <span>Phone Number: </span>
                      <span>092720746580</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <br />
                      <span>Birthday: </span>
                      <span>February 29, 2002</span>
                    </div>
                  </div>
                </div>
              )}

              {showSecurityBox && (
                <div className={`col ${styles.securityBox}`}>
                  <span className={styles.changepassHeader}>
                    Change Password
                  </span>
                </div>
              )}

              {showVehicleBox && (
                <div className={`col ${styles.vehicleBox}`}>
                  <span className={styles.vehiclesHeader}>
                    Registered Vehicles
                  </span>
                </div>
              )}

              {showTicketsBox && (
                <div className={`col ${styles.ticketsBox}`}>
                  <span className={styles.ticketHeader}>Tickets</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
