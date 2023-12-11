import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Modal } from "react-bootstrap";

import styles from "./style.module.css";
import SessionUserContext from "../../contexts/SessionUserContext";
import BtnPrimary from "../../common/Buttons/BtnPrimary";
import BtnSecondary from "../../common/Buttons/BtnSecondary";

const OrganizationListModal = ({ show, closeCallback }) => {
  const { sessionUser } = useContext(SessionUserContext);
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrganization, setSelectedOrganization] = useState();
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchOrganizations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/organizations/",
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
    fetchOrganizations();
  }, []);

  const joinOrganization = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/organizations/${selectedOrganization.id}/members`,
        {
          accountId: sessionUser.id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setShowSuccess(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={closeCallback}
      scrollable={true}
      aria-labelledby="contained-modal-title-vcenter"
      className="d-flex justify-content-center align-items-center"
      centered>
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className={`${styles.title}`}>
          Organizations
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccess ? (
          <div>
            <span className={styles.successMessage}>
              Successfully joined an organization.
            </span>
          </div>
        ) : (
          organizations.map((organization) => (
            <div
              key={organization.id}
              className={`${styles.organizationItem} ${
                organization.id === selectedOrganization?.id
                  ? styles.selectedOrganization
                  : ""
              } row d-flex justify-content-center align-items-center p-2`}
              onClick={() => setSelectedOrganization(organization)}>
              <div className="col-auto">
                <i className="fa-solid fa-building fa-2x"></i>
              </div>
              <div className={`${styles.organizationName} col`}>
                {organization.name}
              </div>
              <div className="row">Owner: {organization.owner}</div>
            </div>
          ))
        )}
      </Modal.Body>
      <Modal.Footer>
        {showSuccess ? (
          <></>
        ) : (
          <div className="container-fluid d-flex flex-row justify-content-between">
            <div className="col-md-6">
              <BtnSecondary>Create</BtnSecondary>
            </div>
            <div className="col-md-6 d-flex justify-content-end">
              <BtnPrimary
                onClick={() => {
                  if (selectedOrganization !== null) joinOrganization();
                }}>
                Join
              </BtnPrimary>
            </div>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default OrganizationListModal;
