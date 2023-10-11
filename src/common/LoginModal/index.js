import React from "react";
import styles from "./style.module.css";
import logo from "../../images/logo.png";
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';


const LoginModal = ({ show, closeCallback }) => {
  return (
    <Modal
      show={show}
      onHide={closeCallback}
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
          {/* Login section: Email */}
          <div className="form-group mt-3 mx-3">
            <div className={`${styles.inputContainer}`}>
              <i className={`fa-solid fa-envelope ${styles.iconStyle}`}></i>
              <input
                type="email"
                class={`form-control ${styles.inputMargin}`}
                id="exampleInputEmail1"
                placeholder="E-mail address"
              />
            </div>
          </div>

          {/* Login section: Password */}
          <div className="form-group pb-3 mx-3">
            <div className={`${styles.inputContainer}`}>
              <i class={`fa-solid fa-lock ${styles.iconStyle}`}></i>
              <input
                type="password"
                class={`form-control ${styles.inputMargin}`}
                id="inputPassword"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="row justify-content-end pb-3 mx-1">
            <div className="col-auto">
              <button type="submit" className={`${styles.submitButton}`}>
                Login
              </button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;