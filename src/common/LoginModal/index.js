import React, { useEffect, useState, useContext } from "react";
import styles from "./style.module.css";
import logo from "../../images/logo.png";
import { Modal } from 'react-bootstrap';
import axios from "axios";
import Cookie from 'js-cookie';
import SessionUserContext from '../../contexts/SessionUserContext';
import CircularProgress from '@mui/material/CircularProgress';

const LoginModal = ({ show, closeCallback }) => {
  const [inputEmailValue, setInputEmailValue] = useState("");
  const [inputPasswordValue, setInputPasswordValue] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { sessionUser, setSessionUser } = useContext(SessionUserContext);

  const handleSubmitClick = (e) => {
    e.preventDefault();

    setIsLoading(true);

    axios.post("http://localhost:8080/api/v1/auth/authenticate", {
      "email": inputEmailValue,
      "password": inputPasswordValue
    })
      .then(response => {
        if (response.status === 200) {
          Cookie.set('userToken', response?.data?.token);

          setSessionUser(response?.data?.account);
          setTimeout(() => { closeCallback() }, 2000);

          setInputEmailValue('');
          setInputPasswordValue('');
        }
      })
      .catch(error => {
        if (error.response.status === 403) {
          setInvalidCredentials(true);
        }
      })

    setTimeout(() => { setIsLoading(false) }, 1500);
  }

  useEffect(() => {
    setInvalidCredentials(false);
  }, [inputEmailValue, inputPasswordValue]);

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
          {/* Login successful */}
          {sessionUser && !isLoading && <div className="alert alert-success mx-3 mt-3" role="alert">
            Log-in <b>successful</b>!
          </div>}
          {/* Invalid credentials alert */}
          {invalidCredentials && !isLoading && <div className="alert alert-danger mx-3 mt-3" role="alert">
            Invalid <b>username</b> or <b>password</b>.
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
                    className={`form-control ${styles.inputMargin} ${invalidCredentials ? 'is-invalid' : ''}`}
                    id="inputEmail"
                    placeholder="E-mail address"
                    value={inputEmailValue}
                    onChange={(e) => { setInputEmailValue(e.target.value) }}
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
                    className={`form-control ${styles.inputMargin} ${invalidCredentials ? 'is-invalid' : ''}`}
                    id="inputPassword"
                    placeholder="Password"
                    value={inputPasswordValue}
                    onChange={(e) => { setInputPasswordValue(e.target.value) }}
                    disabled={sessionUser}
                  />
                </div>
              </div>
              <div className="row justify-content-end pb-3 mx-1">
                <div className="col-auto">
                  <button
                    type="button"
                    className={`${styles.submitButton}`}
                    onClick={handleSubmitClick}
                    disabled={sessionUser}
                  >
                    Login
                  </button>
                </div>
              </div>
            </>}

        </form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;