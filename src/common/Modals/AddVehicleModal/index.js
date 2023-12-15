import React, { useEffect, useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

import BtnPrimary from "../../Buttons/BtnPrimary";
import BtnSecondary from "../../Buttons/BtnSecondary";

import { useTrigger } from "../../../hooks/useTrigger";

import { createVehicle } from "../../../api/vehicles";

import styles from "../../../styles/modal.module.css";

const AddVehicleModal = ({ show, onHide, onConfirm }) => {
  const [accounts, setAccounts] = useState([]);
  const [showSuccess, triggerShowSuccess] = useTrigger(false);
  const [showError, triggerShowError] = useTrigger(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const [form, setForm] = useState({
    plateNumber: "",
    make: "",
    model: "",
    color: "",
    type: "",
    displacement: 0,
    size: "",
    ownerId: 0,
  });

  const resetForm = () => {
    setForm({
      plateNumber: "",
      brand: "",
      make: "",
      model: "",
      color: "",
      type: "",
      displacement: 0,
      size: "",
    });
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/accounts/",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setAccounts(response.data);
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
    var data = {
      plateNumber: form.plateNumber,
      make: form.make,
      model: form.model,
      color: form.color,
      type: form.type,
      ownerId: form.ownerId,
    };

    if (data.type === "TWO_WHEEL") {
      data = {
        ...data,
        displacement: form.displacement,
      };
    } else if (data.type === "FOUR_WHEEL") {
      data = {
        ...data,
        size: form.size,
      };
    }

    createVehicle(
      data,
      (response) => {
        resetForm();
        triggerShowSuccess(3000);
        setTimeout(() => {
          onConfirm();
          onHide();
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

  useEffect(() => {
    fetchAccounts();
  });

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title
          className={styles.title}
          id="contained-modal-title-vcenter">
          Add New Vehicle
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody} style={{ fontSize: "1.3em" }}>
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
        <Row className="mb-2">
          <Col md={3} className="d-flex">
            Plate Number:
          </Col>
          <Col md={9}>
            <input
              className={`form-control ${styles["field-edit"]}`}
              id="inputPlateNumber"
              name="plateNumber"
              value={form.plateNumber}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-2">
          <Col md={3} className="d-flex">
            Make:
          </Col>
          <Col md={9}>
            <input
              className={`form-control ${styles["field-edit"]}`}
              id="inputMake"
              name="make"
              value={form.make}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-2">
          <Col md={3} className="d-flex">
            Model:
          </Col>
          <Col md={9}>
            <input
              className={`form-control ${styles["field-edit"]}`}
              id="inputModel"
              name="model"
              value={form.model}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-2">
          <Col md={3} className="d-flex">
            Color:
          </Col>
          <Col md={9}>
            <input
              className={`form-control ${styles["field-edit"]}`}
              id="inputColor"
              name="color"
              value={form.color}
              onChange={handleChange}
            />
          </Col>
        </Row>

        <Row className="mb-2">
          <Col md={3} className="d-flex">
            Type:
          </Col>
          <Col md={9}>
            <select
              className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
              value={form.type}
              onChange={handleChange}
              style={{ borderRadius: "8px" }}
              name="type">
              <option value="" style={{ fontSize: "0.8em" }}>
                Select vehicle type
              </option>
              <option value="TWO_WHEEL" style={{ fontSize: "0.8em" }}>
                Two Wheeler
              </option>
              <option value="FOUR_WHEEL" style={{ fontSize: "0.8em" }}>
                Four Wheeler
              </option>
            </select>
          </Col>
        </Row>

        {form.type === "TWO_WHEEL" && (
          <Row className="mb-2">
            <Col md={3} className="d-flex">
              Displacement:
            </Col>
            <Col md={9}>
              <input
                className={`form-control ${styles["field-edit"]}`}
                id="inputDisplacement"
                name="displacement"
                value={form.displacement}
                onChange={handleChange}
              />
            </Col>
          </Row>
        )}

        {form.type === "FOUR_WHEEL" && (
          <Row className="mb-2">
            <Col md={3} className="d-flex">
              Displacement:
            </Col>
            <Col md={9}>
              <select
                className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                value={form.size}
                onChange={handleChange}
                style={{ borderRadius: "8px" }}
                name="size">
                <option value="" style={{ fontSize: "0.8em" }}>
                  Select vehicle size
                </option>
                <option value="SEDAN" style={{ fontSize: "0.8em" }}>
                  Sedan
                </option>
                <option value="SUV" style={{ fontSize: "0.8em" }}>
                  SUV
                </option>
                <option value="VAN" style={{ fontSize: "0.8em" }}>
                  Van
                </option>
              </select>
            </Col>
          </Row>
        )}

        <Row className="mb-2">
          <Col md={3} className="d-flex">
            Owner ID:
          </Col>
          <Col md={9}>
            <select
              className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
              value={form.ownerId}
              onChange={handleChange}
              style={{ borderRadius: "8px" }}
              name="ownerId">
              <option value="" style={{ fontSize: "0.8em" }}>
                Select owner
              </option>
              {accounts.map((account) => (
                <option
                  key={account.id}
                  value={account.id}
                  style={{ fontSize: "0.8em" }}>
                  {account.id}
                  {" - "}
                  {account.firstname} {account.lastname}
                </option>
              ))}
            </select>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <div className="container-fluid d-flex justify-content-between">
          <BtnSecondary onClick={onHide}>Cancel</BtnSecondary>
          <BtnPrimary onClick={handleSave}>Add</BtnPrimary>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AddVehicleModal;
