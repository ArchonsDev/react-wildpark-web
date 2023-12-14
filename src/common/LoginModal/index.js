import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Modal } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import BtnPrimary from "../Buttons/BtnPrimary";

import { login } from "../../api/auth";

import SessionUserContext from '../../contexts/SessionUserContext';

import logo from "../../images/logo.png";
import styles from "./style.module.css";

const LoginModal = () => {
  const { sessionUser, setSessionUser, showLoginModal, toggleLoginModal } = useContext(SessionUserContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const showErrorMessage = errorMessage !== null;

  const handleSubmitClick = async () => {
    setIsLoading(true);

    login(
      form,
      (response) => {
        setSessionUser(response?.data?.account);
        setTimeout(() => { toggleLoginModal(); navigate("/dashboard"); setForm({ email: "", password: "" }) }, 2000);
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          setErrorMessage(<>Incorrect <b>username</b> or <b>password</b>.</>);
        } else {
          setErrorMessage(<>An error occurred.</>);
        }
      },
      () => {
        setTimeout(() => { setIsLoading(false) }, 1500);
      }
    );
  }

  const handleClose = () => {
    setForm({
      email: "",
      password: "",
    });

    setErrorMessage(null);
    toggleLoginModal();
  }

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    setErrorMessage(null);
  }, [form.email, form.password]);

  return (
    <Modal
      show={showLoginModal}
      onHide={handleClose}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <form>
          {/* Login section: Title */}
          <div className={`${styles.titleForm} mt-3`}>
            <img src={logo} className={`${styles.logoStyle}`} alt="wildpark_logo" />
            <h3 className={`${styles.registerTitle}`}>Login</h3>
          </div>
          {/* Login successful */}
          {sessionUser && !isLoading && <div className="alert alert-success mx-3 mt-3" role="alert">
            Log-in <b>successful</b>!
          </div>}
          {/* Invalid credentials alert */}
          {showErrorMessage && !isLoading && <div className="alert alert-danger mx-3 mt-3" role="alert">
            {errorMessage}
          </div>}
          {/* Login section: Email */}
          {isLoading ? <div className="container-fluid d-flex justify-content-center align-items-center p-5"><CircularProgress color="error" /></div>
            :
            <>
              <div className="form-group mt-3 mx-3">
                <div className={`${styles.inputContainer}`}>
                  <i className={`fa-solid fa-envelope ${styles.iconStyle}`}></i>
                  <input
                    type="email"
                    className={`form-control ${styles.inputMargin} ${showErrorMessage ? 'is-invalid' : ''}`}
                    id="inputEmail"
                    placeholder="E-mail address"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={sessionUser}
                  />
                </div>
              </div>

              {/* Login section: Password */}
              <div className="form-group pb-3 mx-3">
                <div className={`${styles.inputContainer}`}>
                  <i className={`fa-solid fa-lock ${styles.iconStyle}`}></i>
                  <input
                    type="password"
                    className={`form-control ${styles.inputMargin} ${showErrorMessage ? 'is-invalid' : ''}`}
                    id="inputPassword"
                    placeholder="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={sessionUser}
                  />
                </div>
              </div>
              <div className="row justify-content-end pb-3 mx-1">
                <div className="col-auto">
                  <BtnPrimary onClick={handleSubmitClick} disabled={sessionUser}>Login</BtnPrimary>
                </div>
              </div>
            </>}

        </form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;