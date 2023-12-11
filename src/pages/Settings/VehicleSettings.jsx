import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import BtnPrimary from "../../common/Buttons/BtnPrimary";
import BtnSecondary from "../../common/Buttons/BtnSecondary";
import { Modal } from "react-bootstrap";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./style.module.css";
import { useToggle } from "../../hooks/useToggle";

const VehicleSettings = () => {
  const key = useRef(0);
  const { sessionUser } = useContext(SessionUserContext);
  const [vehicles, setVehicles] = useState([]);
  const [showAddVehicleForm, toggleShowAddVehicleForm] = useToggle(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    plateNumber: '',
    brand: '',
    make: '',
    model: '',
    color: '',
    type: '',
    displacement: 0,
    size: '',
  });

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/accounts/${sessionUser.id}/vehicles`, {
        headers: {
          "Authorization": `Bearer ${Cookies.get("userToken")}`
        }
      });

      if (response.status === 200) {
        setVehicles(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  const postVehicle = async () => {
    try {
      var data = {
        plateNumber: form.plateNumber,
        make: form.make,
        model: form.model,
        color: form.color,
        type: form.type,
      }

      if (form.type === "TWO_WHEEL") {
        data = {
          ...data,
          displacement: form.displacement,
        }
      }

      if (form.type === "FOUR_WHEEL") {
        data = {
          ...data,
          size: form.size,
        }
      }

      const response = await axios.post(`http://localhost:8080/api/v1/vehicles/`,
        {
          ...data,
        },
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("userToken")}`,
            "Content-Type": "application/json",
          }
        });

      if (response.status === 200) {
        fetchVehicles();
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(prev => !prev);
          toggleShowAddVehicleForm();
          setForm({
            plateNumber: '',
            brand: '',
            make: '',
            model: '',
            color: '',
            type: '',
            displacement: 0,
            size: '',
          });
        }, 5000);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = e => {
    postVehicle();
  };

  return (
    <div className="container-fluid flex-grow-1 p-0 m-0">
      {!showAddVehicleForm ?
        <div className="row mb-4">
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <button
              className={`${styles['add-vehicle-btn']} d-flex align-items-center justify-content-center flex-grow-1`}
              onClick={toggleShowAddVehicleForm}>
              <i className="fa-solid fa-plus" />
              <span className="d-flex align-items-center p-0 m-0">Add Vehicle</span>
            </button>
          </div>
        </div>
        :
        <>
          <div className="row">
            <div className="col-md-12">
              <span className={`${styles.settingsHeader}`}>
                Register New Vehicle
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {showSuccess && (
                <div className="alert alert-success mb-3" role="alert">
                  Vehicle saved!
                </div>
              )}
            </div>
            <div className="col-md-12">
              <div className={`${styles['password-box']} p-3`}>
                <form>
                  <div className="form-group d-flex flex-column mb-3">
                    <label className={styles['form-label']} htmlFor="inputPlateNumber">Plate Number</label>
                    <input
                      className={`form-control ${styles['field-edit']}`}
                      id="inputPlateNumber"
                      name="plateNumber"
                      value={form.plateNumber}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group  d-flex flex-column mb-3">
                    <label className={styles['form-label']} htmlFor="inputMake">Make</label>
                    <input
                      className={`form-control ${styles['field-edit']}`}
                      id="inputMake"
                      name="make"
                      value={form.make}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group  d-flex flex-column mb-3">
                    <label className={styles['form-label']} htmlFor="inputModel">Model</label>
                    <input
                      className={`form-control ${styles['field-edit']}`}
                      id="inputModel"
                      name="model"
                      value={form.model}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group  d-flex flex-column mb-3">
                    <label className={styles['form-label']} htmlFor="inputColor">Color</label>
                    <input
                      className={`form-control ${styles['field-edit']}`}
                      id="inputColor"
                      name="color"
                      value={form.color}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group  d-flex flex-column mb-3">
                    <label className={styles['form-label']} htmlFor="inputColor">Type</label>
                    <select
                      className={`${styles['field-edit']} flex-grow-1 mx-1 p-2`}
                      value={form.type}
                      onChange={handleChange}
                      name="type">
                      <option value="">Select vehicle type</option>
                      <option value="TWO_WHEEL">Two Wheeler</option>
                      <option value="FOUR_WHEEL">Four Wheeler</option>
                    </select>
                  </div>

                  {form.type === "TWO_WHEEL" &&
                    <div className="form-group  d-flex flex-column mb-3">
                      <label className={styles['form-label']} htmlFor="inputColor">Displacement</label>
                      <input
                        type="number"
                        className={`form-control ${styles['field-edit']}`}
                        id="inputDisplacement"
                        name="displacement"
                        value={form.displacement}
                        onChange={handleChange}
                      />
                    </div>
                  }

                  {form.type === "FOUR_WHEEL" &&
                    <div className="form-group  d-flex flex-column mb-3">
                      <label className={styles['form-label']} htmlFor="inputColor">Type</label>
                      <select
                        className={`${styles['field-edit']} flex-grow-1 mx-1 p-2`}
                        value={form.size}
                        onChange={handleChange}
                        name="size">
                        <option value="">Select vehicle size</option>
                        <option value="SEDAN">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="VAN">Van</option>
                      </select>
                    </div>
                  }
                </form>
              </div>
            </div>
          </div>
          <div className="row mt-3 mb-4">
            <div className="col-md-12 d-flex justify-content-end px-0 mx-0">
              <BtnPrimary onClick={toggleShowAddVehicleForm}>Cancel</BtnPrimary>
              <BtnSecondary onClick={handleSubmit}>Submit</BtnSecondary>
            </div>
          </div>
        </>
      }
      {!showAddVehicleForm && <div className="row">
        <div className="col-md-12">
          {vehicles.map(vehicle => (
            <VehicleCard key={key.current++} data={vehicle} onUpdate={fetchVehicles} />
          ))}
        </div>
      </div>
      }
    </div>
  );
};

const VehicleCard = ({ data, onUpdate }) => {
  const [enableEditing, toggleEnableEditing] = useToggle(false);
  const [color, setColor] = useState(data.color);
  const [showDeleteConfirm, toggleDeleteConfirm] = useToggle(false);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/vehicles/${data.id}`,
        {
          "color": color,
        },
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("userToken")}`,
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        onUpdate();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/vehicles/${data.id}`,
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("userToken")}`,
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        onUpdate();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container-fluid mb-4">
      <div className={`${styles['vehicle-card']} row`}>
        <div className="col-md-12">
          <div className={`${styles['vehicle-card-header']} row py-4`}>
            <span className="d-flex justify-content-center align-items-center">
              <i className="fa-solid fa-image fa-10x"></i>
            </span>
          </div>
          <div className={`${styles.field} row py-2`}>
            <div className="col-md-3">
              Plate Number
            </div>
            <div className="col-md-9">
              {data.plateNumber}
            </div>
          </div>
          <div className={`${styles.field} row py-2`}>
            <div className="col-md-3">
              Make
            </div>
            <div className="col-md-9">
              {data.make}
            </div>
          </div>
          <div className={`${styles.field} row py-2`}>
            <div className="col-md-3">
              Model
            </div>
            <div className="col-md-9">
              {data.model}
            </div>
          </div>
          <div className={`${styles['field-no-border']} row py-2`}>
            <div className="col-md-3">
              Color
            </div>
            <div className="col-md-9 d-flex">
              {enableEditing ?
                <input
                  className={`${styles['field-edit']} flex-grow-1 mx-1 p-2`}
                  placeholder="Color"
                  value={color}
                  name="color"
                  onChange={e => setColor(e.target.value)}
                />
                :
                data.color
              }
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 d-flex justify-content-end">
          {enableEditing ?
            <BtnSecondary onClick={handleSave}>Save</BtnSecondary>
            :
            <BtnSecondary onClick={toggleEnableEditing}>Edit</BtnSecondary>
          }
          {!enableEditing && <BtnPrimary onClick={toggleDeleteConfirm}>Delete</BtnPrimary>}
          <ConfirmVehicleDelete show={showDeleteConfirm} onHide={toggleDeleteConfirm} onConfirm={handleDelete} />
        </div>
      </div>
    </div >
  );
};

const ConfirmVehicleDelete = ({ show, onHide, onConfirm }) => {
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
        <p>Do you want to delete this vehicle? (It will be gone forever!)</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="container-fluid d-flex justify-content-between">
          <BtnSecondary onClick={onHide}>No</BtnSecondary>
          <BtnPrimary onClick={onConfirm}>Yes</BtnPrimary>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default VehicleSettings;