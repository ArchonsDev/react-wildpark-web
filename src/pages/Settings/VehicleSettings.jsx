import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import BtnPrimary from "../../common/Buttons/BtnPrimary";
import BtnSecondary from "../../common/Buttons/BtnSecondary";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./style.module.css";

const VehicleSettings = () => {
  const key = useRef(0);
  const { sessionUser } = useContext(SessionUserContext);
  const [vehicles, setVehicles] = useState([]);

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
  }

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="container-fluid flex-grow-1 p-0 m-0">
      <div className="row mb-4">
        <div className="col-md-12 d-flex justify-content-center align-items-center">
          <button className={`${styles['add-vehicle-btn']} d-flex align-items-center justify-content-center flex-grow-1`}>
            <i className="fa-solid fa-plus" />
            <span className="d-flex align-items-center p-0 m-0">Add Vehicle</span>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {vehicles.map(vehicle => (
            <VehicleCard key={key.current++} data={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
};

const VehicleCard = ({ data }) => {
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
            <div className="col-md-9">
              {data.color}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12 d-flex justify-content-end">
          <BtnSecondary>Edit</BtnSecondary>
          <BtnPrimary>Delete</BtnPrimary>
        </div>
      </div>
    </div >
  );
};

export default VehicleSettings;