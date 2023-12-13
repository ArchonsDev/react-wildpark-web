import React, { useContext } from "react";
import { Modal } from "react-bootstrap";

import BtnPrimary from "../Buttons/BtnPrimary";
import BtnSecondary from "../Buttons/BtnSecondary";

import { useLogout } from "../../hooks/useLogout";

import SessionUserContext from "../../contexts/SessionUserContext";
import styles from "../ModalStyles/style.module.css";

const LogoutModal = () => {
  const { showLogoutModal, toggleLogoutModal } = useContext(SessionUserContext);
  const logout = useLogout();

  return (
    <Modal
      show={showLogoutModal}
      onHide={toggleLogoutModal}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header className={styles.title} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <p>Do you really want to logout?</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="container-fluid d-flex justify-content-between">
          <BtnSecondary onClick={toggleLogoutModal}>No</BtnSecondary>
          <BtnPrimary onClick={logout}>Yes</BtnPrimary>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
