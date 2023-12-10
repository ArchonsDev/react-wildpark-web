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
      <div className={`${styles.backgroundContent} pt-5 d-flex flex-column`}>
        <div className={`${styles.content} container d-flex flex-column flex-grow-1 mt-5 p-5`}>
          <div className="row flex-grow-1">
            <div className={`${styles.cardsContainer} col-md-3`}>
              <div className="row mb-4">
                <div className="col-md-12 d-flex justify-content-center">
                  <Button onClick={handleAccountSettingsClick}>
                    Account Settings <br />
                    <p>Manage your details here</p>
                  </Button>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12 d-flex justify-content-center">
                  <Button onClick={handlePasswordSecurityClick}>
                    Password & Security <br />
                    <p>Manage your privacy settings here</p>
                  </Button>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12 d-flex justify-content-center">
                  <Button onClick={handleRegisteredVehiclesClick}>
                    Registered Vehicles <br />
                    <p>Manage your vehicles here</p>
                  </Button>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12 d-flex justify-content-center">
                  <Button onClick={handleTicketsCitationsClick}>
                    Tickets & Citations <br />
                    <p>Manage your tickets and citations here</p>
                  </Button>
                </div>
              </div>
            </div>

            <div className="col-md-9 d-flex flex-column">
              {showAccountBox && (
                <div className={`${styles.settingsContent} container-fluid flex-grow-1 p-0`}>

                  <div className="row">
                    <div className={`${styles.accountHeader} d-flex flex-column justify-content-center align-items-center py-4`}>
                      <i
                        className={`fa-solid fa-circle-user fa-7x mb-3 ${styles.userPfp}`}></i>
                      <BtnSecondary>Edit Profile</BtnSecondary>
                    </div>
                  </div>

                  <div className="row mt-4 px-5">
                    <div className="col-md-3">
                      <span>Name: </span>
                    </div>
                    <div className="col-md-9">
                      <span>John Doe</span>
                    </div>
                  </div>

                  <div className="row mt-4 px-5">
                    <div className="col-md-3">
                      <span>Email Address: </span>
                    </div>
                    <div className="col-md-9">
                      <span>john@gmail.com</span>
                    </div>
                  </div>

                  <div className="row mt-4 px-5">
                    <div className="col-md-3">
                      <span>Phone Number:</span>
                    </div>
                    <div className="col-md-9">
                      <span>092720746580</span>
                    </div>
                  </div>

                  <div className="row mt-4 px-5">
                    <div className="col-md-3">
                      <span>Birthday: </span>
                    </div>
                    <div className="col-md-9">
                      <span>February 29, 2002</span>
                    </div>
                  </div>
                </div>
              )}

              {showSecurityBox && (
                <div className={`${styles.settingsContent} container-fluid flex-grow-1 p-0`}>
                  <span className={styles.changepassHeader}>
                    Change Password
                  </span>
                </div>
              )}

              {showVehicleBox && (
                <div className={`${styles.settingsContent} container-fluid flex-grow-1 p-0`}>
                  <span className={styles.vehiclesHeader}>
                    Registered Vehicles
                  </span>
                </div>
              )}

              {showTicketsBox && (
                <div className={`${styles.settingsContent} container-fluid flex-grow-1 p-0`}>
                  <span className={styles.ticketHeader}>Tickets</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Settings;

