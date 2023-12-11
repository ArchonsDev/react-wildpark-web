import React, { useState } from "react";
import { Button } from "react-bootstrap";

import AccountSettings from "./AccountSettings";
import SecuritySettings from "./SecuritySettings";

import styles from "./style.module.css";
import VehicleSettings from "./VehicleSettings";
import TicketSettings from "./TicketSettings";

const Settings = () => {
  const [showAccountBox, setShowAccountBox] = useState(true);
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
        <div
          className={`${styles.content} container d-flex flex-column flex-grow-1 mt-5 p-5`}
        >
          <div className="row flex-grow-1">
            <div className="col-md-3">
              <div className="row mb-4">
                <div
                  className={`${
                    showAccountBox
                      ? styles["active-button"]
                      : styles["selector-button"]
                  } col-md-12 d-flex justify-content-center`}
                >
                  <Button
                    className={`${
                      showAccountBox
                        ? styles["active-button"]
                        : styles["selector-button"]
                    }`}
                    onClick={handleAccountSettingsClick}
                  >
                    Account Settings <br />
                    <p>Manage your details here</p>
                  </Button>
                </div>
              </div>
              <div className="row mb-4">
                <div
                  className={`${
                    showSecurityBox
                      ? styles["active-button"]
                      : styles["selector-button"]
                  } col-md-12 d-flex justify-content-center`}
                >
                  <Button onClick={handlePasswordSecurityClick}>
                    Password & Security <br />
                    <p>Manage your privacy settings here</p>
                  </Button>
                </div>
              </div>
              <div className="row mb-4">
                <div
                  className={`${
                    showVehicleBox
                      ? styles["active-button"]
                      : styles["selector-button"]
                  } col-md-12 d-flex justify-content-center`}
                >
                  <Button onClick={handleRegisteredVehiclesClick}>
                    Registered Vehicles <br />
                    <p>Manage your vehicles here</p>
                  </Button>
                </div>
              </div>
              <div className="row mb-4">
                <div
                  className={`${
                    showTicketsBox
                      ? styles["active-button"]
                      : styles["selector-button"]
                  } col-md-12 d-flex justify-content-center`}
                >
                  <Button onClick={handleTicketsCitationsClick}>
                    Tickets & Citations <br />
                    <p>Manage your tickets and citations here</p>
                  </Button>
                </div>
              </div>
            </div>

            <div className="col-md-9 d-flex flex-column">
              {showAccountBox && <AccountSettings />}
              {showSecurityBox && <SecuritySettings />}
              {showVehicleBox && <VehicleSettings />}

              {showTicketsBox && <TicketSettings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
