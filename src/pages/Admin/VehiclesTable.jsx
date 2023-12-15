import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, Row, Col, ListGroup, Container } from "react-bootstrap";

import { useSwitch } from "../../hooks/useSwitch";
import { useTrigger } from "../../hooks/useTrigger";
import { updateVehicle, deleteVehicle } from "../../api/vehicles";

import BtnPrimary from "../../common/Buttons/BtnPrimary";
import BtnSecondary from "../../common/Buttons/BtnSecondary";
import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";
import styles from "./style.module.css";

const VehiclesTable = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isEditing, enableEditing, disableEditing] = useSwitch(false);
  const [showModal, openModal, closeModal] = useSwitch();
  const [showSuccess, triggerShowSuccess] = useTrigger(false);
  const [showError, triggerShowError] = useTrigger(false);

  const [form, setForm] = useState({
    plateNumber: "",
    color: "",
    displacement: "",
    type: "",
    make: "",
    model: "",
    ownerId: "",
    parkingAreaId: "",
  });

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/vehicles/",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setVehicles(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    updateVehicle(
      {
        id: selectedVehicle.id,
        ...form,
      },
      (response) => {
        triggerShowSuccess(3000);

        setTimeout(() => {
          disableEditing();
          fetchVehicles();
        }, 3000);
      },
      (error) => {
        if (error.response && error.response.data) {
          error.response &&
            error.response.data &&
            setErrorMessage(<>{error.response.data}</>);
        } else {
          setErrorMessage(<>An error occurred.</>);
        }
        triggerShowError(5000);
      }
    );
  };

  const handleDelete = async () => {
    deleteVehicle(
      {
        id: selectedVehicle.id,
      },
      (response) => {
        fetchVehicles();
      },
      (error) => {
        if (error.response && error.response.data) {
          error.response &&
            error.response.data &&
            setErrorMessage(<>{error.response.data}</>);
        } else {
          setErrorMessage(<>An error occurred.</>);
        }
        triggerShowError(5000);
      }
    );
  };

  useEffect(() => {
    if (selectedVehicle) {
      setForm({
        plateNumber: selectedVehicle.plateNumber,
        color: selectedVehicle.color,
        displacement: selectedVehicle.displacement,
        type: selectedVehicle.type,
        make: selectedVehicle.make,
        model: selectedVehicle.model,
        ownerId: selectedVehicle.ownerId,
        parkingAreaId: selectedVehicle.parkingAreaId,
      });
    }
  }, [selectedVehicle]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <>
      {isEditing ? (
        <Container fluid className={styles.form}>
          <Row>
            <Col md={12}>
              {/* RESPONSE RESULTS */}
              <Row>
                {showSuccess && (
                  <div
                    className="alert alert-success d-flex justify-content-center align-items-center mb-3"
                    role="alert">
                    Vehicle details successfully updated!
                  </div>
                )}

                {errorMessage && showError && (
                  <div
                    className="alert alert-danger d-flex justify-content-center align-items-center mb-3"
                    role="alert">
                    {errorMessage}
                  </div>
                )}
              </Row>

              {/* FORM */}
              <Row className="mb-2">
                <Col md={3}>Vehicle Type</Col>
                <Col md={9} className="d-flex">
                  {selectedVehicle &&
                    selectedVehicle.hasOwnProperty("displacement") && (
                      <span style={{ fontFamily: "Poppins-SemiBold" }}>
                        Two-Wheeler
                      </span>
                    )}
                  {selectedVehicle &&
                    selectedVehicle.hasOwnProperty("type") && (
                      <span style={{ fontFamily: "Poppins-SemiBold" }}>
                        Four-Wheeler
                      </span>
                    )}
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>Owner ID</Col>
                <Col md={9} className="d-flex">
                  <input
                    className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                    placeholder="Owner ID"
                    value={form.ownerId}
                    name="ownerId"
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              {selectedVehicle &&
                selectedVehicle.hasOwnProperty("displacement") && (
                  <Row className="mb-2">
                    <Col md={3}>Displacement</Col>
                    <Col md={9} className="d-flex">
                      <input
                        className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                        placeholder="Plate number"
                        value={form.displacement}
                        name="displacement"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                )}

              {selectedVehicle && selectedVehicle.hasOwnProperty("type") && (
                <Row className="mb-2">
                  <Col md={3}>Vehicle Size</Col>
                  <Col md={9} className="d-flex">
                    <select
                      className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                      value={form.type}
                      onChange={handleChange}
                      name="type">
                      <option value="">Select vehicle size</option>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Van">Van</option>
                    </select>
                  </Col>
                </Row>
              )}

              <Row className="mb-2">
                <Col md={3}>Plate Number</Col>
                <Col md={9} className="d-flex">
                  <input
                    className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                    placeholder="Plate number"
                    value={form.plateNumber}
                    name="plateNumber"
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>Make</Col>
                <Col md={9} className="d-flex">
                  <input
                    className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                    placeholder="Make"
                    value={form.make}
                    name="make"
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>Model</Col>
                <Col md={9} className="d-flex">
                  <input
                    className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                    placeholder="Model"
                    value={form.model}
                    name="model"
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={3}>Color</Col>
                <Col md={9} className="d-flex">
                  <input
                    className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                    placeholder="Color"
                    value={form.color}
                    name="color"
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              {/* BUTTONS */}
              <Row>
                <Col md={6}>
                  <BtnPrimary onClick={disableEditing}>Cancel</BtnPrimary>
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                  <BtnSecondary onClick={openModal}>Save</BtnSecondary>
                  <ConfirmDeleteModal
                    show={showModal}
                    onHide={closeModal}
                    onConfirm={handleSave}
                    header={"Update Vehicle"}
                    message={"Do you wish to save these changes?"}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        <>
          <Row>
            {showSuccess && (
              <div
                className="alert alert-success d-flex justify-content-center align-items-center mb-3"
                role="alert">
                Vehicle successfully deleted!
              </div>
            )}
            {errorMessage && showError && (
              <div
                className="alert alert-danger d-flex justify-content-center align-items-center mb-3"
                role="alert">
                {errorMessage}
              </div>
            )}
          </Row>
          <Card style={{ width: "100%" }}>
            <Card.Body className={styles.tableHeader}>
              <Card.Title>Vehicles</Card.Title>
            </Card.Body>
            <ListGroup>
              <ListGroup.Item className={styles.tableContent}>
                <Row>
                  <Col xs={1}>ID</Col>
                  <Col xs={2}>Plate Number</Col>
                  <Col xs={2}>Make</Col>
                  <Col xs={2}>Model</Col>
                  <Col xs={2}>Type</Col>
                  <Col xs={1}>Owner</Col>
                  <Col xs={1}>{""}</Col>
                  <Col xs={1}>{""}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup>
              {vehicles.map((vehicle) => {
                const isTwoWheeler = vehicle.hasOwnProperty("displacement");
                const isFourWheeler = vehicle.hasOwnProperty("type");
                return (
                  <ListGroup.Item
                    key={vehicle.id}
                    className={styles.tableContent}>
                    <Row>
                      <Col xs={1}>{vehicle.id}</Col>
                      <Col xs={2}>{vehicle.plateNumber}</Col>
                      <Col xs={2}>{vehicle.make}</Col>
                      <Col xs={2}>{vehicle.model}</Col>
                      {isTwoWheeler && <Col xs={2}>Two_Wheeler</Col>}
                      {isFourWheeler && <Col xs={2}>Four_Wheeler</Col>}
                      <Col xs={1}>{vehicle.ownerId}</Col>
                      <Col xs={1}>
                        <i
                          className={`${styles.icon} fa-solid fa-pen`}
                          onClick={() => {
                            enableEditing();
                            setSelectedVehicle(vehicle);
                          }}></i>
                      </Col>
                      <Col xs={1}>
                        <i
                          className={`${styles.icon} fa-solid fa-trash-can`}
                          onClick={() => {
                            openModal();
                            setSelectedVehicle(vehicle);
                          }}></i>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
              <ConfirmDeleteModal
                show={showModal}
                onHide={closeModal}
                onConfirm={handleDelete}
                header={"Delete Vehicle"}
                message={"Do you wish to delete this vehicle?"}
              />
            </ListGroup>
          </Card>
        </>
      )}
    </>
  );
};

export default VehiclesTable;
