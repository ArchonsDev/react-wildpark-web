import React from "react";
import { Modal } from "react-bootstrap";

import BtnPrimary from '../Buttons/BtnPrimary';
import BtnSecondary from '../Buttons/BtnSecondary';

const LogoutModal = ({ show, onConfirm, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Confirm
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Do you really want to logout?</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="container-fluid d-flex justify-content-between">
          <BtnSecondary onClick={onHide}>Cancel</BtnSecondary>
          <BtnPrimary onClick={onConfirm}>Yes</BtnPrimary>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default LogoutModal;