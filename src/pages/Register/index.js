import React, { useState } from "react";
import axios from "axios";

import BtnPrimary from "../../common/Buttons/BtnPrimary";

import logo from "../../images/logo.png";
import { isValidEmail, isValidPassword } from "./utils";

import styles from "./style.module.css";

const Register = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const [errorMessage, setErrorMessage] = useState(null);
  const showErrorMessage = errorMessage !== null;

  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(null);

    let hasError = false;
    let errorMessages = [];

    if (!(form.firstname.length > 2)) {
      errorMessages.push(
        <>
          <b>Firstname</b> is too short.
          <br />
        </>
      );
      hasError = true;
    }

    if (!(form.lastname.length > 2)) {
      errorMessages.push(
        <>
          <b>Lastname</b> is too short.
          <br />
        </>
      );
      hasError = true;
    }

    if (!(form.email.length > 2 && isValidEmail(form.email))) {
      errorMessages.push(
        <>
          <b>Email</b> must be valid.
          <br />
        </>
      );
      hasError = true;
    }

    if (!isValidPassword(form.password)) {
      errorMessages.push(
        <>
          <b>Password</b> must contain <b>at least one special character</b>.<br />
          <b>Password</b> be <b>at least 8 characters long</b>.<br />
          <b>Password</b> must contain <b>at least one number</b>.<br />
        </>
      );
      hasError = true;
    }

    if (form.password !== form.confirmPassword) {
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
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          password: form.password,
        }
      );

      if (response.status === 200) {
        setIsRegistrationComplete(true);
      } else if (response.status === 409) {

      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
      }
    }
  };

  return (
    <div
      className={`container-fluid ${styles.customContainer} d-flex justify-content-center align-items-center`}>
      <div className={`${styles.formBox} p-5`}>
        {/* Register section: Title */}
        <div className={`${styles.titleForm}`}>
          <img
            src={logo}
            className={`${styles.logoStyle}`}
            alt="wildpark_logo"
          />
          <h3 className={`${styles.registerTitle}`}>Register</h3>
        </div>

        {!isRegistrationComplete ? (
          <form>
            {showErrorMessage && (
              <div className="alert alert-danger mt-3" role="alert">
                {errorMessage}
              </div>
            )}

            {/* Register section: Name */}
            <div className="row pt-3">
              <div className="col">
                <div className={`${styles.inputContainer}`}>
                  <i className={`fa fa-user icon ${styles.iconStyle}`}></i>
                  <input
                    type="text"
                    className={`form-control ${styles.inputMargin}`}
                    placeholder="Firstname"
                    id="inputFirstname"
                    name="firstname"
                    value={form.firstname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className={`${styles.inputContainer}`}>
                  <i className={`fa fa-user icon ${styles.iconStyle}`}></i>
                  <input
                    type="text"
                    className={`form-control ${styles.inputMargin}`}
                    placeholder="Lastname"
                    id="inputLastname"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Register section: Email */}
            <div className="form-group">
              <div className={`${styles.inputContainer}`}>
                <i className={`fa-solid fa-envelope ${styles.iconStyle}`}></i>
                <input
                  type="email"
                  className={`form-control ${styles.inputMargin}`}
                  id="inputEmail"
                  placeholder="E-mail address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Register section: Password */}
            <div className="form-group">
              <div className={`${styles.inputContainer}`}>
                <i className={`fa-solid fa-lock ${styles.iconStyle}`}></i>
                <input
                  type="password"
                  className={`form-control ${styles.inputMargin}`}
                  id="inputPassword"
                  placeholder="Password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className={`${styles.inputContainer}`}>
                <i className={`fa-solid fa-lock ${styles.iconStyle}`}></i>
                <input
                  type="password"
                  className={`form-control ${styles.inputMargin}`}
                  id="inputConfirmPassword"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row justify-content-center pt-3">
              <div className="col-auto">
                <BtnPrimary onClick={handleSubmit}>Continue</BtnPrimary>
              </div>
            </div>
          </form>
        ) : (
          <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
            <span className="mt-4 mb-5">Registration successful!</span>
            <BtnPrimary onClick={e => window.close()}>Click to Continue</BtnPrimary>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
