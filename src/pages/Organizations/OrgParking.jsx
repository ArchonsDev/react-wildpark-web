import React, { useContext, useEffect, useState } from "react";
import { Row, Col, ListGroup, Card, Modal, Form, FormGroup, FormLabel, FormControl, Container } from "react-bootstrap";

import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";

import { useSwitch } from "../../hooks/useSwitch";
import { useTrigger } from "../../hooks/useTrigger";
import { getOrgParkingAreas } from "../../api/organizations";
import { deleteParkingArea, addParkingArea } from "../../api/parking";
import { deleteBooking } from "../../api/bookings";

import OrganizationContext from "../../contexts/OrganizationContext";

import styles from "./styles.module.css";
import BtnSecondary from "../../common/Buttons/BtnSecondary";

const OrgParking = () => {
  const { org, isOrgAdmin } = useContext(OrganizationContext);

  const [parkingAreas, setParkingAreas] = useState();
  const [parkingDeleteConfirm, showParkingDeleteConfirm, hideParkingDeleteConfirm] = useSwitch();
  const [bookingDeleteConfirm, showBookingDeleteConfirm, hideBookingDeleteConfirm] = useSwitch();

  const [selectedBookingId, setSelectedBookingId] = useState(0);
  const [selectedParkingId, setSelectedParkingId] = useState(0);

  const [addParkingModal, showAddParkingModal, hideAddParkingModal] = useSwitch();

  const [showSuccess, triggerShowSuccess] = useTrigger();
  const [successMessage, setSuccessMessage] = useState(null);

  const [showError, triggerShowError] = useTrigger();
  const [errorMessage, setErrorMessage] = useState(null);

  const [slotsValue, setSlotsValue] = useState(0);

  const [selected, setSelected] = useState(null);

  const fetchParkingAreas = async () => {
    getOrgParkingAreas({ id: org.id }, (response) => response?.data && setParkingAreas(response.data));
  };

  useEffect(() => {
    fetchParkingAreas();
  }, [selected])

  return (
    <div className="OrgParking">
      {successMessage && showSuccess &&
        <div className="alert alert-success my-3" role="alert">
          {successMessage}
        </div>
      }
      {errorMessage && showError &&
        <div className="alert alert-danger my-3" role="alert">
          {errorMessage}
        </div>
      }
      <Card className="mt-2" style={{ width: "100%" }}>
        <ListGroup>
          <ListGroup.Item className={styles.parkingHeader}>
            <Row>
              <Col xs={5}>Area ID</Col>
              <Col xs={5}>Availability</Col>
              <Col xs={1}>{" "}</Col>
              {isOrgAdmin &&
                <Col xs={1}>
                  <i
                    className={`${styles['add-parking-icon']} fa-solid fa-square-plus fa-xl`}
                    onClick={showAddParkingModal}
                  ></i>
                </Col>
              }
            </Row>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          {parkingAreas && parkingAreas.map(parking => (
            <ListGroup.Item
              key={parking.id}
              onClick={() => setSelected(parking)}
              className={`${selected?.id === parking.id ? styles['selected-parking-content'] : styles.parkingContent}`}>
              <Row>
                <Col
                  xs={5}
                >
                  {parking.id}
                </Col>
                <Col
                  xs={5}
                >
                  {parking.slots - parking.parkedVehicles.length}
                </Col>
                <Col xs={1}>{" "}</Col>
                {isOrgAdmin &&
                  <Col
                    xs={1}
                  >
                    <i
                      className={`${styles.icon} fa-solid fa-trash-can fa-xl`}
                      onClick={() => { setSelectedParkingId(parking.id); showParkingDeleteConfirm() }}
                      style={selected === parking ? { cursor: "pointer", color: "#f7b538" } : { cursor: "pointer" }}
                    ></i>
                  </Col>
                }
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* Shows vehicles booked when a parking area is clicked */}
      {selected && isOrgAdmin &&
        <Card className="mt-2" style={{ width: "100%" }}>
          <ListGroup>
            <ListGroup.Item className={styles.parkingHeader}>
              <Row>
                <Col xs={3}>Plate Number</Col>
                <Col xs={4}>Date & Time</Col>
                <Col xs={3}>Status</Col>
                <Col xs={1}>{""}</Col>
                <Col xs={1}>{""}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>

          {selected.bookings.length > 0 &&
            <ListGroup>
              {selected.bookings.map(booking => (
                <ListGroup.Item className={styles.parkingContent}>
                  <Row>
                    <Col xs={3}>{booking.vehicle}</Col>
                    <Col xs={4}>{(new Date(booking.date)).toLocaleDateString()} {(new Date(booking.date)).toLocaleTimeString()}</Col>
                    <Col xs={3}>{booking.status}</Col>
                    <Col xs={1}>{""}</Col>
                    {isOrgAdmin &&
                      <Col xs={1}>
                        <i
                          className={`${styles.icon} fa-solid fa-trash-can fa-xl`}
                          onClick={() => { setSelectedBookingId(booking.id); showBookingDeleteConfirm() }}
                          style={{ cursor: "pointer" }}
                        ></i>
                      </Col>}
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          }
        </Card>}

      <ConfirmDeleteModal
        show={parkingDeleteConfirm}
        onHide={hideParkingDeleteConfirm}
        onConfirm={() =>
          deleteParkingArea(
            {
              id: selectedParkingId,
            },
            async (response) => {
              setSuccessMessage(<>Parking area deleted.</>);
              triggerShowSuccess(5000, () => setSuccessMessage(null));
              await fetchParkingAreas();
            },
            (error) => {
              if (error?.response && error?.response?.data) {
                setErrorMessage(<>{error.response.data}</>);
              } else {
                setErrorMessage(<>Could not delete parking area.</>);
              }
              triggerShowError(5000, () => setErrorMessage(null));
            },
            () => setSelectedParkingId(0)
          )
        }
        header={<>Confirm Action</>}
        message={<>Are you sure you want to delete this parking area? (It will be gone forever!)</>}
      />

      <ConfirmDeleteModal
        show={bookingDeleteConfirm}
        onHide={hideBookingDeleteConfirm}
        onConfirm={() =>
          deleteBooking(
            {
              id: selectedBookingId
            },
            async (response) => {
              setSuccessMessage(<>Booking deleted.</>);
              triggerShowSuccess(5000, () => setSuccessMessage(null));
              await fetchParkingAreas();
              setSelected(null);
            },
            (error) => {
              if (error?.response && error?.response?.data) {
                setErrorMessage(<>{error.response.data}</>);
              } else {
                setErrorMessage(<>Could not delete booking.</>);
              }
              triggerShowError(5000, () => setErrorMessage(null));
            },
            () => setSelectedBookingId(0)
          )
        }
      />

      <Modal
        show={addParkingModal}
        onHide={hideAddParkingModal}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={
              {
                fontFamily: "Poppins-Bold",
                color: "#7c0902"
              }
            }
          >
            Add a parking area
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup controlId="formSlots">
              <FormLabel
                style={{
                  fontFamily: "Poppins-SemiBold",
                  color: "#7c0902"
                }}
              >
                Slots
              </FormLabel>
              <FormControl
                type="number"
                value={slotsValue}
                onChange={e => setSlotsValue(e.target.value)}
                className={styles['field-edit']}
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Container
            fluid
            className="p-0">
            <Row
              className="m-0 p-0"
            >
              <Col
                md={12}
                className="d-flex justify-content-end p-0">
                <BtnSecondary
                  onClick={async () => {
                    await addParkingArea(
                      {
                        id: org.id,
                        slots: slotsValue
                      },
                      (response) => {
                        setSuccessMessage(<>Parking area created.</>);
                        triggerShowSuccess(5000, () => setSuccessMessage(null));
                      },
                      (error) => {
                        if (error?.response && error?.response?.data) {
                          setErrorMessage(<>{error.response.data}</>);
                        } else {
                          setErrorMessage(<>Cannot create parking area.</>);
                        }
                        triggerShowError(5000, () => setErrorMessage(null));
                      },
                      () => hideAddParkingModal()
                    )
                    await fetchParkingAreas();
                  }}

                  disabled={
                    slotsValue <= 0
                  }
                >
                  Add
                </BtnSecondary>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrgParking;
