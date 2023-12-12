import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Modal } from "react-bootstrap";

import SessionUserContext from "../../../contexts/SessionUserContext";
import BtnPrimary from "../../Buttons/BtnPrimary";
import BtnSecondary from "../../Buttons/BtnSecondary";
import OrgThumbnail from "../../Cards/OrgThumbnail";

import styles from "./style.module.css";
import { useNavigate } from "react-router";

const OrganizationListModal = ({ show, closeCallback }) => {
  const { sessionUser } = useContext(SessionUserContext);

  const [organizations, setOrganizations] = useState([]);

  const navigate = useNavigate();

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

  // const joinOrganization = async () => {
  //   try {
  //     const response = await axios.post(
  //       `http://localhost:8080/api/v1/organizations/${selectedOrganization.id}/members`,
  //       {
  //         accountId: sessionUser.id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${Cookies.get("userToken")}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       setShowSuccess(true);
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 403) {
  //       console.log(error);
  //     }
  //   }
  // };

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
        <Modal.Title id="contained-modal-title-vcenter" className={`${styles.title}`}>
          Organizations
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {organizations.map((organization) => (
          <OrgThumbnail
            className={`${styles['org-item']} my-1`}
            key={organization.id}
            name={organization.name}
            owner={organization.owner}
            onClick={e => navigate(`/organizations/${organization.id}`)}
          />
        ))
        }
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-end">
        <BtnSecondary>Create</BtnSecondary>
      </Modal.Footer>
    </Modal>
  );
};

export default OrganizationListModal;
