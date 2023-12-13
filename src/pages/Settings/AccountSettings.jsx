import React, { useContext, useState } from "react";
import { Row } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";

import BtnSecondary from "../../common/Buttons/BtnSecondary";

import { useToggle } from "../../hooks/useToggle";
import { useSwitch } from "../../hooks/useSwitch";
import { useTrigger } from "../../hooks/useTrigger";

import SessionUserContext from "../../contexts/SessionUserContext";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./style.module.css";
import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";

const AccountSettings = () => {
  const [enableEditing, toggleEnableEditing] = useToggle(false);
  const { sessionUser, setSessionUser } = useContext(SessionUserContext);

  const [updateSuccess, triggerUpdateSuccess] = useTrigger(false);
  const [updateFail, triggerUpdateFail] = useTrigger(false);
  const [
    showConfirmAccountUpdate,
    openConfirmAccountUpdate,
    closeConfirmAccountUpdate,
  ] = useSwitch();

  const [form, setForm] = useState({
    email: sessionUser.email,
    firstname: sessionUser.firstname,
    lastname: sessionUser.lastname,
    birthdate: sessionUser.birthdate,
    contactNo: sessionUser.contactNo,
    gender: sessionUser.gender,
    street: sessionUser.street,
    municipality: sessionUser.municipality,
    province: sessionUser.province,
    country: sessionUser.country,
    zipCode: sessionUser.zipCode,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/accounts/${sessionUser.id}`,
        {
          ...form,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setSessionUser(response.data);
        triggerUpdateSuccess(5000);
        toggleEnableEditing();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
        triggerUpdateFail(5000);
      }
    }
  };

  return (
    <div className={`${styles.settingsContent} container-fluid p-0`}>
      <div className="row">
        <div
          className={`${styles.accountHeader} d-flex flex-column justify-content-center align-items-center py-4`}>
          <i
            className={`fa-solid fa-circle-user fa-7x mb-3 ${styles.userPfp}`}></i>
          {enableEditing ? (
            <>
              <BtnSecondary onClick={openConfirmAccountUpdate}>
                Save Changes
              </BtnSecondary>
              <ConfirmDeleteModal
                show={showConfirmAccountUpdate}
                onHide={closeConfirmAccountUpdate}
                onConfirm={handleSave}
                header={"Update Account"}
                message={"Do you wish to save these changes?"}
              />
            </>
          ) : (
            <BtnSecondary onClick={toggleEnableEditing}>
              Edit Profile
            </BtnSecondary>
          )}
        </div>
      </div>
      <Row>
        {updateSuccess && (
          <div
            className="alert alert-success d-flex justify-content-center align-items-center mb-3"
            role="alert">
            Account details successfully updated!
          </div>
        )}

        {updateFail && (
          <div
            className="alert alert-danger d-flex justify-content-center align-items-center mb-3"
            role="alert">
            Failed to update account details.
          </div>
        )}
      </Row>
      <div className={`${styles.field} row px-5 py-2`}>
        <div className="col-md-3">
          <span>Email Address: </span>
        </div>
        <div className="col-md-9">
          <span>{sessionUser.email}</span>
        </div>
      </div>

      <div className={`${styles.field} row px-5 py-2`}>
        <div className="col-md-3">
          <span>Name: </span>
        </div>
        <div className="col-md-9 d-flex">
          {enableEditing ? (
            <>
              <input
                className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                placeholder="Firstname"
                value={form.firstname}
                name="firstname"
                onChange={handleChange}
              />
              <input
                className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                placeholder="Lastname"
                value={form.lastname}
                name="lastname"
                onChange={handleChange}
              />
            </>
          ) : (
            <span>
              {sessionUser.firstname} {sessionUser.lastname}
            </span>
          )}
        </div>
      </div>

      <div className={`${styles.field} row px-5 py-2`}>
        <div className="col-md-3">
          <span>Birthday: </span>
        </div>
        <div className="col-md-9 d-flex">
          {enableEditing ? (
            <input
              className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
              placeholder="Birthdate (YYYY-MM-DD)"
              value={form.birthdate}
              name="birthdate"
              onChange={handleChange}
            />
          ) : (
            <span>{sessionUser.birthdate}</span>
          )}
        </div>
      </div>

      <div className={`${styles.field} row px-5 py-2`}>
        <div className="col-md-3">
          <span>Phone Number:</span>
        </div>
        <div className="col-md-9 d-flex">
          {enableEditing ? (
            <input
              className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
              placeholder="Phone number"
              value={form.contactNo}
              name="contactNo"
              onChange={handleChange}
            />
          ) : (
            <span>{sessionUser.contactNo}</span>
          )}
        </div>
      </div>

      <div className={`${styles.field} row px-5 py-2`}>
        <div className="col-md-3">
          <span>Gender:</span>
        </div>
        <div className="col-md-9 d-flex">
          {enableEditing ? (
            <>
              <select
                className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                value={form.gender}
                onChange={handleChange}
                name="gender">
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </>
          ) : (
            <span>{sessionUser.gender}</span>
          )}
        </div>
      </div>

      <div className={`${styles["field-no-border"]} row px-5 py-2`}>
        <div className="col-md-3">
          <span>Address:</span>
        </div>
        <div className="col-md-9 d-flex">
          {enableEditing ? (
            <div className="container-fluid p-0 d-flex flex-column">
              <input
                className={`${styles["field-edit"]} flex-grow-1 m-1 p-2`}
                placeholder="Street"
                value={form.street}
                name="street"
                onChange={handleChange}
              />
              <input
                className={`${styles["field-edit"]} flex-grow-1 m-1 p-2`}
                placeholder="Municipality"
                value={form.municipality}
                name="municipality"
                onChange={handleChange}
              />
              <input
                className={`${styles["field-edit"]} flex-grow-1 m-1 p-2`}
                placeholder="Province"
                value={form.province}
                name="province"
                onChange={handleChange}
              />
              <input
                className={`${styles["field-edit"]} flex-grow-1 m-1 p-2`}
                placeholder="Country"
                value={form.country}
                name="country"
                onChange={handleChange}
              />
              <input
                className={`${styles["field-edit"]} flex-grow-1 m-1 p-2`}
                placeholder={form.zipCode === 0 ? "Zip Code" : form.zipCode}
                value={form.zipCode === 0 ? "" : form.zipCode}
                name="zipCode"
                onChange={handleChange}
              />
            </div>
          ) : (
            <span>
              {sessionUser.street ? sessionUser.street + ", " : ""}
              {sessionUser.municipality ? sessionUser.municipality + ", " : ""}
              {sessionUser.province ? sessionUser.province + ", " : ""}
              {sessionUser.country ? sessionUser.country + ", " : ""}
              {sessionUser.zipCode !== 0 ? sessionUser.zipCode : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
