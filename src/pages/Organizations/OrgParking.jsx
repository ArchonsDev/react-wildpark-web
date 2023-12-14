import React, { useContext, useEffect, useState } from "react";
import { Row, Col, ListGroup, Card } from "react-bootstrap";

import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";

import { useSwitch } from "../../hooks/useSwitch";
import { useTrigger } from "../../hooks/useTrigger";
import { getOrgParkingAreas } from "../../api/organizations";
import { deleteParkingArea } from "../../api/parking";
import { deleteBooking } from "../../api/bookings";

import OrganizationContext from "../../contexts/OrganizationContext";
import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./styles.module.css";

const OrgParking = () => {
  const { org, accountOrgs, isOrgAdmin } = useContext(OrganizationContext);
  const { sessionUser } = useContext(SessionUserContext);

  const [parkingAreas, setParkingAreas] = useState();
  const [parkingDeleteConfirm, showParkingDeleteConfirm, hideParkingDeleteConfirm] = useSwitch();
  const [bookingDeleteConfirm, showBookingDeleteConfirm, hideBookingDeleteConfirm] = useSwitch();

  const [showSuccess, triggerShowSuccess] = useTrigger();
  const [successMessage, setSuccessMessage] = useState(null);

  const [showError, triggerShowError] = useTrigger();
  const [errorMessage, setErrorMessage] = useState(null);

  const [selected, setSelected] = useState(null);

  const fetchParkingAreas = async () => {
    getOrgParkingAreas({ id: org.id }, (response) => response?.data && setParkingAreas(response.data));
  };

  useEffect(() => {
    fetchParkingAreas();
  }, [])

  useEffect(() => console.log(parkingAreas), [parkingAreas]);

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
                    className={`${styles.icon} fa-solid fa-square-plus fa-xl`}
                    style={{ cursor: "pointer" }}
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
              onClick={() => selected === parking ? setSelected(null) : setSelected(parking)}
              className={`${selected === parking ? styles['selected-parking-content'] : styles.parkingContent}`}>
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
                      onClick={showParkingDeleteConfirm}
                      style={selected === parking ? { cursor: "pointer", color: "#f7b538" } : { cursor: "pointer" }}
                    ></i>
                  </Col>
                }
              </Row>
              <ConfirmDeleteModal
                show={parkingDeleteConfirm}
                onHide={hideParkingDeleteConfirm}
                onConfirm={() =>
                  deleteParkingArea(
                    {
                      id: parking.id,
                    },
                    (response) => {
                      setSuccessMessage(<>Parking area deleted.</>);
                      triggerShowSuccess(5000, () => setSuccessMessage(null));
                      fetchParkingAreas();
                    },
                    (error) => {
                      if (error?.response && error?.response?.data) {
                        setErrorMessage(<>{error.response.data}</>);
                      } else {
                        setErrorMessage(<>Could not delete parking area.</>);
                      }
                      triggerShowError(5000, () => setErrorMessage(null));
                    }
                  )
                }
                header={<>Confirm Action</>}
                message={<>Are you sure you want to delete this parking area? (It will be gone forever!)</>}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      {/* Shows vehicles booked when a parking area is clicked */}
      {selected && <Card className="mt-2" style={{ width: "100%" }}>
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
                        onClick={showBookingDeleteConfirm}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </Col>}
                </Row>
                <ConfirmDeleteModal
                  show={bookingDeleteConfirm}
                  onHide={hideBookingDeleteConfirm}
                  onConfirm={() =>
                    deleteBooking(
                      {
                        id: booking.id
                      },
                      (response) => {
                        setSuccessMessage(<>Booking deleted.</>);
                        triggerShowSuccess(5000, () => setSuccessMessage(null));
                        fetchParkingAreas();
                        setSelected(null);
                      },
                      (error) => {
                        if (error?.response && error?.response?.data) {
                          setErrorMessage(<>{error.response.data}</>);
                        } else {
                          setErrorMessage(<>Could not delete booking.</>);
                        }
                        triggerShowError(5000, () => setErrorMessage(null));
                      }
                    )
                  }
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        }
      </Card>}
    </div>
  );
};

export default OrgParking;
