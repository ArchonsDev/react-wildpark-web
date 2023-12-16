import React from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";

import { deleteBooking } from "../../../api/bookings";
import { useSwitch } from "../../../hooks/useSwitch";
import ConfirmDeleteModal from "../ConfirmDeleteModal";

import BtnPrimary from "../../Buttons/BtnPrimary";

import styles from "../../../styles/modal.module.css";

const BookingModal = ({ show, onHide, data, deleteSuccess, deleteError }) => {
  const [showModal, openModal, closeModal] = useSwitch();

  const handleDelete = async () => {
    try {
      await deleteBooking({ id: data?.id });
      closeModal();
      onHide();
      deleteSuccess();
    } catch (error) {
      let message = "An error occurred.";
      if (error.response && error.response.data) {
        message = error.response.data;
      }
      deleteError(message);
    }
  };
  return (
    <>
      <Modal
        size="md"
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className={styles.title}>
            {`Booking #${data?.id}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Row>
            <Col md={4}>Email:</Col>
            <Col md={8} className={styles.detail}>
              {data?.booker}
            </Col>
          </Row>
          <Row>
            <Col md={4}>Date:</Col>
            <Col md={8} className={styles.detail}>
              <Card.Text>
                {new Date(data?.date).toLocaleDateString()}{" "}
                {new Date(data?.date).toLocaleTimeString()}
              </Card.Text>
            </Col>
          </Row>
          <Row>
            <Col md={4}>Organization:</Col>
            <Col md={8} className={styles.detail}>
              {data?.organization.name}
            </Col>
          </Row>
          <Row>
            <Col md={4}>Parking Area ID:</Col>
            <Col md={8} className={styles.detail}>
              {data?.parkingArea}
            </Col>
          </Row>
          <Row>
            <Col md={4}>Vehicle:</Col>
            <Col md={8} className={styles.detail}>
              {data?.vehicle}
            </Col>
          </Row>
          <Row>
            <Col md={4}>Status:</Col>
            <Col md={8} className={styles.detail}>
              {data?.status}
            </Col>
          </Row>
          <Row>
            <Col md={4}>Duration:</Col>
            <Col md={8} className={styles.detail}>
              {data?.duration}
            </Col>
          </Row>
          {data?.status === "CONFIRMED" && (
            <Row>
              <Col md={4}>Payment ID:</Col>
              <Col md={8} className={styles.detail}>
                {data?.paymentId}
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <BtnPrimary
            onClick={() => {
              openModal();
              onHide();
            }}>
            Delete
          </BtnPrimary>
        </Modal.Footer>
      </Modal>
      <ConfirmDeleteModal
        show={showModal}
        onHide={closeModal}
        onConfirm={handleDelete}
        header={"Delete Vehicle"}
        message={"Do you wish to delete this booking?"}
      />
    </>
  );
};

export default BookingModal;
