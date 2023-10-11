import React from "react";
import { Modal } from "react-bootstrap";
import Button from '@mui/material/Button'

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
        <Button
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LogoutModal;