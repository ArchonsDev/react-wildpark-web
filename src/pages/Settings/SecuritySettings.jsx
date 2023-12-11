import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import BtnPrimary from "../../common/Buttons/BtnPrimary";

import { isValidPassword } from "../Register/utils";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./style.module.css";

const SecuritySettings = () => {
  const { sessionUser, setSessionUser } = useContext(SessionUserContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const showErrorMessage = errorMessage !== null;
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [form, setForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(null);

    let hasError = false;
    let errorMessages = [];

    if (!isValidPassword(form.newPassword)) {
      errorMessages.push(
        <>
          <b>Password</b> must contain <b>at least one special character</b>.<br />
          <b>Password</b> be <b>at least 8 characters long</b>.<br />
          <b>Password</b> must contain <b>at least one number</b>.<br />
        </>
      );
      hasError = true;
    }

    if (form.newPassword !== form.confirmPassword) {
      errorMessages.push(
        <>
          <b>Passwords</b> do not match.
          <br />
        </>
      );
      hasError = true;
    }

    if (hasError) {
      setErrorMessage(errorMessages);
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/accounts/${sessionUser.id}`,
        {
          password: form.newPassword
        },
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("userToken")}`,
            "Content-Type": "application/json", // Add this line for the content type
          }
        }
      );


      if (response.status === 200) {
        setSessionUser(response.data);
        setSaveSuccess(true);
        setTimeout(() => {
          setSaveSuccess(prev => !prev);
          setForm({
            ...form,
            newPassword: '',
            confirmPassword: '',
          })
        }, 5000);
      } else if (response.status === 409) {

      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
      }
    }
  };

  return (
    <div className="container-fluid flex-grow-1 p-0">
      <div className="row">
        <div className="col-md-12">
          <span className={`${styles.settingsHeader}`}>
            Change Password
          </span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className={`${styles['password-box']} p-3`}>
            <form>
              {showErrorMessage && (
                <div className="alert alert-danger mb-3" role="alert">
                  {errorMessage}
                </div>
              )}
              {saveSuccess && (
                <div className="alert alert-success mb-3" role="alert">
                  Password changed!
                </div>
              )}
              {/* New passowrd */}
              <div className="form-group d-flex flex-column mb-3">
                <label className={styles['form-label']} htmlFor="inputNewPassword">New Password</label>
                <input
                  type="password"
                  className={`form-control ${styles.inputMargin}`}
                  id="inputNewPassword"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Confirm passowrd */}
              <div className="form-group  d-flex flex-column mb-3">
                <label className={styles['form-label']} htmlFor="inputConfirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${styles.inputMargin}`}
                  id="inputConfirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12 d-flex justify-content-end px-0 mx-0">
          <BtnPrimary onClick={handleSubmit}>Submit</BtnPrimary>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;