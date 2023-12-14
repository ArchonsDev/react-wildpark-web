import React, { useContext, useEffect, useRef, useState } from "react";

import BtnPrimary from "../../common/Buttons/BtnPrimary";
import BtnSecondary from "../../common/Buttons/BtnSecondary";
import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";

import { useSwitch } from "../../hooks/useSwitch";
import { useTrigger } from "../../hooks/useTrigger";
import { getAccountVehicles } from "../../api/accounts";
import { createVehicle, updateVehicle, deleteVehicle } from "../../api/vehicles";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./style.module.css";

const VehicleSettings = () => {
  const { sessionUser } = useContext(SessionUserContext);

  const [vehicles, setVehicles] = useState([]);
  const [addVehicleForm, showAddVehicleForm, hideAddVehicleForm] = useSwitch(false);

  const [showSuccess, triggerShowSuccess] = useTrigger();

  const [errorMessage, setErrorMessage] = useState(null);
  const [showError, triggerShowError] = useTrigger();

  const [form, setForm] = useState({
    plateNumber: '',
    make: '',
    model: '',
    color: '',
    type: '',
    displacement: 0,
    size: '',
  });

  const key = useRef(0);

  const fetchVehicles = async () => {
    await getAccountVehicles(
      {
        id: sessionUser.id
      },
      (response) => {
        setVehicles(response.data);
      }
    );
  };

  const resetForm = () => {
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
  };

  const postVehicle = async () => {
    var data = {
      plateNumber: form.plateNumber,
      make: form.make,
      model: form.model,
      color: form.color,
      type: form.type,
    }

    if (data.type === "TWO_WHEEL") {
      data = {
        ...data,
        displacement: form.displacement,
      }
    } else if (data.type === "FOUR_WHEEL") {
      data = {
        ...data,
        size: form.size,
      }
    }

    createVehicle(
      data,
      (response) => {
        fetchVehicles();
        triggerShowSuccess(5000, () => {
          resetForm();
        });
        hideAddVehicleForm();
      },
      (error) => {
        if (error.response && error.response.data) {
          setErrorMessage(<>{error.response.data}</>);
        } else {
          setErrorMessage(<>An error occurred.</>)
        }
        triggerShowError(5000, () => setErrorMessage(null));
      }
    );
  };

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = e => {
    postVehicle();
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="container-fluid flex-grow-1 p-0 m-0">
      {!addVehicleForm ?
        <div className="row mb-4">
          <div className="col-md-12 d-flex justify-content-center align-items-center">
            <button
              className={`${styles['add-vehicle-btn']} d-flex align-items-center justify-content-center flex-grow-1`}
              onClick={showAddVehicleForm}>
              <i className="fa-solid fa-plus" />
              <span className="d-flex align-items-center p-0 m-0">Add Vehicle</span>
            </button>
          </div>
          <div className="col-md-12 mt-4">
            {showSuccess && (
              <div className="alert alert-success mb-3" role="alert">
                Vehicle saved!
              </div>
            )}
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
              <div className={`${styles['password-box']} p-3`}>
                {errorMessage && showError && (
                  <div className="alert alert-danger mb-3" role="alert">
                    {errorMessage}
                  </div>
                )}
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
              <BtnPrimary onClick={hideAddVehicleForm}>Cancel</BtnPrimary>
              <BtnSecondary onClick={handleSubmit}>Submit</BtnSecondary>
            </div>
          </div>
        </>
      }
      {!addVehicleForm && <div className="row">
        <div className="col-md-12">
          {vehicles.map(vehicle => (
            <VehicleCard
              key={key.current++}
              data={vehicle}
              onUpdate={fetchVehicles}
            />
          ))}
        </div>
      </div>
      }
    </div>
  );
};

const VehicleCard = ({ data, onUpdate }) => {
  const [color, setColor] = useState(data.color);
  const [editing, enableEditing, disableEditing] = useSwitch();
  const [showDeleteModal, openDeleteModal, closeDeleteModal] = useSwitch();

  const [updateSuccess, triggerUpdateSuccess] = useTrigger();

  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorMessage, triggerShowErrorMessage] = useTrigger();

  const handleSave = async () => {
    updateVehicle(
      {
        id: data.id,
        color: color
      },
      (response) => {
        triggerUpdateSuccess(5000, () => onUpdate());
      },
      (error) => {
        setErrorMessage(<>Could not update vehicle.</>)
        triggerShowErrorMessage(5000, () => setErrorMessage(null));
      },
      () => disableEditing()
    );
  }

  const handleDelete = async () => {
    deleteVehicle(
      {
        id: data.id
      },
      (response) => {
        onUpdate();
      },
      (error) => {
        setErrorMessage(<>Could not delete vehicle.</>);
        triggerShowErrorMessage(5000, () => setErrorMessage(null));
      }
    );
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
          {updateSuccess && (
            <div className="row">
              <div className="alert alert-success mb-3 text-center" role="alert">
                Vehicle saved!
              </div>
            </div>
          )}
          {errorMessage && showErrorMessage && (
            <div className="row">
              <div className="alert alert-danger mb-3 text-center" role="alert">
                {errorMessage}
              </div>
            </div>
          )}
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
              {editing ?
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
          {editing ?
            <>
              <BtnSecondary onClick={disableEditing}>Cancel</BtnSecondary>
              <BtnSecondary onClick={handleSave}>Save</BtnSecondary>
            </>
            :
            <BtnSecondary onClick={enableEditing}>Edit</BtnSecondary>
          }
          {!editing && <BtnPrimary onClick={openDeleteModal}>Delete</BtnPrimary>}
          <ConfirmDeleteModal show={showDeleteModal} onHide={closeDeleteModal} onConfirm={handleDelete} />
        </div>
      </div>
    </div >
  );
};

export default VehicleSettings;