import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

import SessionUserContext from "../../contexts/SessionUserContext";
import OrganizationListModal from "../../modals/OrganizationsListModal";
import BtnPrimary from "../../common/Buttons/BtnPrimary";
import BtnSecondary from "../../common/Buttons/BtnSecondary";
import styles from "./styles.module.css";

// TO-DO:
// Conditional rendering for bookings

const Dashboard = () => {
  const navigate = useNavigate();
  const { sessionUser } = useContext(SessionUserContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showOrganizationsModal, setShowOrganizationsModal] = useState(false);
  const [organizations, setOrganizations] = useState([]);

  const fetchAccountOrganizations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/accounts/${sessionUser.id}/organizations`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setOrganizations(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchAccountOrganizations();
  }, []);

  const checkOrganization = Object.values(organizations).some(
    (orgArray) => Array.isArray(orgArray) && orgArray.length > 0
  );

  const renderOrganizationDetails = () => {
    let organizationName = "";
    let organizationRole = "";
    if (
      organizations.ownedOrganizations &&
      organizations.ownedOrganizations.length > 0
    ) {
      organizationName = organizations.ownedOrganizations[0].name;
      organizationRole = "Owner";
    } else if (
      organizations.adminOrganizations &&
      organizations.adminOrganizations.length > 0
    ) {
      organizationName = organizations.adminOrganizations[0].name;
      organizationRole = "Admin";
    } else if (
      organizations.memberOrganizations &&
      organizations.memberOrganizations.length > 0
    ) {
      organizationName = organizations.memberOrganizations[0].name;
      organizationRole = "Member";
    }

    return { organizationName, organizationRole };
  };

  const openOrganizationsModal = () => {
    setShowOrganizationsModal(true);
  };

  const closeOrganizationsModal = () => {
    setShowOrganizationsModal(false);
  };

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
      <div
        className={`${styles.content} container d-flex flex-column justify-content-end align-items-center`}>
        <div className={`${styles.dateTab} row d-flex justify-content-end`}>
          <div
            className={`${styles.date} col-sm-3 py-2 d-flex justify-content-center align-items-center`}>
            {currentDate.toLocaleString()}
          </div>
        </div>
        <div className={`${styles.redBox} row mt-3 p-5`}>
          <div className="col-sm-12 container-fluid d-flex flex-column mx-0 px-0">
            {/* USER INFO */}
            <div className="row">
              <div className="col-sm-12">
                <a
                  style={{ textDecoration: "none" }}
                  onClick={(e) => navigate("/settings")}>
                  <Card className={styles.card}>
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
                </a>
              </div>
            </div>

            {/* DASHBOARD CONTENT */}
            {/* NOTIFICATIONS */}
            <div className="row flex-grow-1 mt-4">
              <div className="col-sm-6 mb-4">
                <Card className={styles.notificationCard}>
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
              <div className="col-sm-6 mb-4 container-fluid d-flex flex-column">
                <div className="row mb-4 flex-grow-1">
                  <div className="col-sm-12">
                    <Card className={styles.card}>
                      <Card.Header
                        className={`${styles.cardHeader} d-flex justify-content-center`}>
                        Organizations
                      </Card.Header>

                      {checkOrganization ? (
                        <Card.Body
                          className={`${styles.cardContent} d-flex flex-column justify-content-between align-items-center`}>
                          <div className="d-flex justify-content-center align-items-center mt-2 flex-grow-1">
                            <div className="row">
                              <div className="col-sm-6 d-flex justify-content-end">
                                <i
                                  className="fa-solid fa-building fa-7x"
                                  style={{ color: "#0d0630" }}></i>
                              </div>
                              <div
                                className={`${styles.nameRole} col-sm-6 d-flex flex-column justify-content-center align-items-start`}>
                                <div className={styles.organizationName}>
                                  {renderOrganizationDetails().organizationName}
                                </div>
                                <div className={styles.organizationRole}>
                                  {renderOrganizationDetails().organizationRole}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="container-fluid d-flex flex-row justify-content-between">
                            <div className="col-sm-6">
                              <BtnPrimary onClick={openOrganizationsModal}>
                                Organizations List
                              </BtnPrimary>
                            </div>
                            <div className="col-sm-6 d-flex justify-content-end">
                              <BtnSecondary>Details</BtnSecondary>
                            </div>
                          </div>
                        </Card.Body>
                      ) : (
                        <Card.Body
                          className={`${styles.cardContent} d-flex flex-column justify-content-center align-items-center`}>
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={openOrganizationsModal}>
                            <i className="fa-regular fa-square-plus fa-5x"></i>
                          </div>
                          <Card.Text className="text-muted">
                            Click to create or join an organization.
                          </Card.Text>
                        </Card.Body>
                      )}
                    </Card>
                  </div>
                </div>

                {/* BOOKINGS */}
                <div className="row flex-grow-1">
                  <div className="col-sm-12">
                    <Card className={styles.card}>
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
          <OrganizationListModal
            show={showOrganizationsModal}
            closeCallback={closeOrganizationsModal}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
