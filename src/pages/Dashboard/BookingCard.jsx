import React, { useContext, useEffect, useState } from "react";
import { Card, Row, Col, Modal, FormGroup, FormLabel, Form } from "react-bootstrap";

import { getAccountBookings, getAccountVehicles } from "../../api/accounts";
import { getAllOrgs, getOrgParkingAreas } from "../../api/organizations";
import { addBooking } from "../../api/bookings";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./styles.module.css";
import BtnPrimary from "../../common/Buttons/BtnPrimary";
import { useSwitch } from "../../hooks/useSwitch";
import { useNavigate } from "react-router-dom";

const BookingCard = () => {
  const { sessionUser } = useContext(SessionUserContext);

  const [bookings, setBookings] = useState(null);
  const [organizations, setOrganizations] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [parking, setParking] = useState(null);

  const [form, setForm] = useState({
    vehicleId: 0,
    dateTime: '',
    duration: 0,
    organizationId: 0,
    parkingAreaId: 0,
  });

  const [addBookingModal, showAddBookingModal, hideAddBookingModal] = useSwitch();

  const navigate = useNavigate();

  const resetForm = () => {
    setForm({
      vehicleId: 0,
      dateTime: '',
      duration: 0,
      organizationId: 0,
      parkingAreaId: 0,
    });
  }

  useEffect(() => {
    getAccountBookings({ id: sessionUser.id, }, (response) => response?.data && setBookings(response.data));
    getAccountVehicles({ id: sessionUser.id }, (response) => response?.data && setVehicles(response.data));
    getAllOrgs(response => response?.data && setOrganizations(response.data));
  }, []);

  useEffect(() => {
    if (form.organizationId !== 0) {
      getOrgParkingAreas(
        {
          id: form.organizationId
        },
        (response) => response?.data && setParking(response.data)
      );
    } else {
      setParking(null);
      setForm({
        ...form,
        parkingAreaId: 0
      })
    }
  }, [form.organizationId]);

  return (
    <Card
      className={styles.card}
      style={{ height: "100%" }}>
      <Card.Header
        className={`${styles.cardHeader}`}>
        Booking Information
      </Card.Header>
      {bookings && bookings.length > 0 ?
        <Card.Body
          className={`${styles.cardContent} text-center`}
        >
          {bookings?.map(booking => (
            <Card
              key={booking.id}
              onClick={e => navigate("/bookings")}
              className={`${styles['booking-card']} mb-1`}
            >
              <Row>
                <Col
                  md={3}
                  className="card-icon d-flex justify-content-end align-items-center">
                  <i
                    className="fa-solid fa-calendar-day fa-5x"
                    style={{ color: "#0d0630" }}></i>
                </Col>
                <Col md={9}>
                  <Card.Body>
                    <Card.Title>{booking.organization.name}</Card.Title>
                    <Card.Text>{booking.vehicle} @ {(new Date(booking.date)).toLocaleDateString()} {(new Date(booking.date)).toLocaleTimeString()}</Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
        </Card.Body>
        :
        <>
          <Card.Body
            className={`${styles.cardContent} text-center`}>
            <Card.Text className="text-muted">
              No bookings.
            </Card.Text>
          </Card.Body>
        </>
      }
      <Card.Footer
        className="d-flex justify-content-end px-0"
      >
        <BtnPrimary onClick={showAddBookingModal}>New Booking</BtnPrimary>
      </Card.Footer>
      <Modal
        show={addBookingModal}
        onHide={hideAddBookingModal}
        className={`${styles['modal']}`}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            className={`${styles['modal-header']}`}
          >
            New Booking
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="py-1"
          >
            <FormGroup
              controlId="formOrganizationId"
              className="py-1"
            >
              <FormLabel
                className={`${styles['field-label']} m-0`}
              >
                Organization
              </FormLabel>
              <Form.Control
                className={`${styles['field-edit']} w-100`}
                as="select"
                name="organizationId"
                value={form.organizationId}
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                required
              >
                <option disabled value={0}>Select organization</option>
                {organizations?.map(organization => (
                  <option key={organization.id} value={organization.id}>{organization.name}</option>
                ))}
              </Form.Control>
            </FormGroup>
            {form.organizationId !== 0 &&
              <FormGroup
                controlId="formParkingAreaId"
                className="py-1"
              >
                <FormLabel
                  className={`${styles['field-label']} m-0`}
                >
                  Parking Area
                </FormLabel>
                <Form.Control
                  className={`${styles['field-edit']} w-100`}
                  as="select"
                  name="parkingAreaId"
                  value={form.parkingAreaId}
                  onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                  required
                >
                  <option disabled value={0}>Select organization</option>
                  {parking?.map(area => (
                    <option key={area.id} value={area.id}>{area.id}</option>
                  ))}
                </Form.Control>
              </FormGroup>
            }

            <FormGroup
              controlId="formVehicleId"
              className="py-1"
            >
              <FormLabel
                className={`${styles['field-label']} m-0`}
              >
                Vehicle
              </FormLabel>
              <Form.Control
                className={`${styles['field-edit']} w-100`}
                as="select"
                name="vehicleId"
                value={form.vehicleId}
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                required
              >
                <option disabled value={0}>Select vehicle</option>
                {vehicles?.map(vehicle => (
                  <React.Fragment key={vehicle.id}>
                    {!vehicle.parkingAreaId && <option key={vehicle.id} value={vehicle.id}>{vehicle.plateNumber} | {vehicle.make} {vehicle.model}</option>}
                  </React.Fragment>
                ))}
              </Form.Control>
            </FormGroup>

            <Form.Group
              controlId="formDateTime"
              className="py-1">
              <Form.Label
                className={`${styles['field-label']} m-0`}
              >
                Date & Time
              </Form.Label>
              <Form.Control
                className={`${styles['field-edit']} w-100`}
                type="text"
                placeholder="YYYY-mm-DD HH:MM"
                name="dateTime"
                value={form.dateTime}
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group
              controlId="formDuration"
              className="py-1">
              <Form.Label
                className={`${styles['field-label']} m-0`}
              >
                Duration (minutes)
              </Form.Label>
              <Form.Control
                className={`${styles['field-edit']} w-100`}
                type="number"
                name="duration"
                value={form.duration}
                onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
                required
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <BtnPrimary
            onClick={async () => {
              await addBooking(form, (response) => { hideAddBookingModal(); });
              await getAccountBookings({ id: sessionUser.id, }, (response) => response?.data && setBookings(response.data));
              resetForm();
            }}
          >
            Create
          </BtnPrimary>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default BookingCard;