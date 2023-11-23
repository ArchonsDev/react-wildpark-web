import React, { useState } from "react";
import axios from "axios";

import BtnPrimary from '../../common/Buttons/BtnPrimary';

import logo from "../../images/logo.png";

import styles from "./style.module.css";

const Register = () => {
  const [inputFirstname, setInputFirstname] = useState('');
  const [inputLastname, setInputLastname] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [isRegistrationComplete, setIsRegistrationComplete] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage(<></>);
    setShowErrorMessage(false);

    let hasError = false;
    let errorMessages = [];

    if (!(inputFirstname.length > 2)) {
      errorMessages.push(<><b>Firstname</b> is too short.<br /></>);
      hasError = true;
    }

    if (!(inputLastname.length > 2)) {
      errorMessages.push(<><b>Lastname</b> is too short.<br /></>);
      hasError = true;
    }

    if (!(inputEmail.length > 2 && isValidEmail(inputEmail))) {
      errorMessages.push(<><b>Email</b> must be valid.<br /></>);
      hasError = true;
    }

    if (!hasSpecialCharacter(inputPassword)) {
      errorMessages.push(<><b>Passwords</b> must contain <b>at least one special character</b>.<br /></>);
      hasError = true;
    }

    if (!hasNumber(inputPassword)) {
      errorMessages.push(<><b>Passwords</b> must contain <b>at least one number</b>.<br /></>);
      hasError = true;
    }

    if (!hasMinimumLength(inputPassword, 8)) {
      errorMessages.push(<><b>Passwords</b> be <b>at least 8 characters long</b>.<br /></>);
      hasError = true;
    }

    if (inputPassword !== inputConfirmPassword) {
      errorMessages.push(<><b>Passwords</b> do not match.<br /></>);
      hasError = true;
    }

    if (hasError) {
      setErrorMessage(errorMessages);
      setShowErrorMessage(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/register", {
        "firstname": inputFirstname,
        "lastname": inputLastname,
        "email": inputEmail,
        "password": inputPassword
      });

      if (response.status === 200) {
        setIsRegistrationComplete(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
      }
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const hasSpecialCharacter = (password) => {
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharacterRegex.test(password);
  };

  const hasNumber = (password) => {
    const numberRegex = /\d/;
    return numberRegex.test(password);
  };

  const hasMinimumLength = (password, minLength) => {
    return password.length >= minLength;
  };

  const handleContinue = (e) => {
    e.preventDefault();

    window.close();
  }

  return (
    <div className={`container-fluid ${styles.customContainer} d-flex justify-content-center align-items-center`}>
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

        {!isRegistrationComplete ?
          <form>
            {showErrorMessage && <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
            </div>}

            {/* Register section: Name */}
            <div className="row pt-3">
              <div className="col">
                <div className={`${styles.inputContainer}`}>
                  <i className={`fa fa-user icon ${styles.iconStyle}`}></i>
                  <input
                    type="text"
                    className={`form-control ${styles.inputMargin}`}
                    placeholder="First name"
                    value={inputFirstname}
                    onChange={e => setInputFirstname(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div className={`${styles.inputContainer}`}>
                  <i className={`fa fa-user icon ${styles.iconStyle}`}></i>
                  <input
                    type="text"
                    className={`form-control ${styles.inputMargin}`}
                    placeholder="Last name"
                    value={inputLastname}
                    onChange={e => setInputLastname(e.target.value)}
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
                  id="exampleInputEmail1"
                  placeholder="E-mail address"
                  value={inputEmail}
                  onChange={e => setInputEmail(e.target.value)}
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
                  value={inputPassword}
                  onChange={e => setInputPassword(e.target.value)}
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
                  value={inputConfirmPassword}
                  onChange={e => setInputConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="row justify-content-center pt-3">
              <div className="col-auto">
                <BtnPrimary onClick={handleSubmit}>Continue</BtnPrimary>
              </div>
            </div>
          </form>
          :
          <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
            <span className="mt-4 mb-5">Registration successful!</span>
            <BtnPrimary onClick={handleContinue}>Click to Continue</BtnPrimary>
          </div>
        }
      </div>
    </div>
  );
};

export default Register;
