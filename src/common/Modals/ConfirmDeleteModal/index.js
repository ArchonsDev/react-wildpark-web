import React from "react";
import { Modal } from "react-bootstrap";

import BtnPrimary from "../../Buttons/BtnPrimary";
import BtnSecondary from "../../Buttons/BtnSecondary";

import styles from "../../../styles/modal.module.css";

const ConfirmDeleteModal = ({
  show,
  onHide,
  onConfirm,
  header = null,
  message = null,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title
          className={styles.title}
          id="contained-modal-title-vcenter">
          {header ? header : "Confirm Delete"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <p>
          {message
            ? message
            : "Do you want to delete this item? (It will be gone forever!)"}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <div className="container-fluid d-flex justify-content-between">
          <BtnSecondary onClick={onHide}>No</BtnSecondary>
          <BtnPrimary onClick={handleConfirm}>Yes</BtnPrimary>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
