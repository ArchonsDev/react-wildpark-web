import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Modal } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import BtnPrimary from "../Buttons/BtnPrimary";
import BtnSecondary from "../Buttons/BtnSecondary";

import { useSwitch } from "../../hooks/useSwitch";
import { useTrigger } from "../../hooks/useTrigger";
import { login, resetPassword } from "../../api/auth";

import SessionUserContext from '../../contexts/SessionUserContext';

import logo from "../../images/logo.png";
import styles from "./style.module.css";

const LoginModal = () => {
  const { sessionUser, setSessionUser, showLoginModal, toggleLoginModal } = useContext(SessionUserContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPass, showForgotPass, hideForgotPass] = useSwitch();
  const [resetSuccess, triggerResetSuccess] = useTrigger();
  const [resetfail, triggerResetFail] = useTrigger();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const showErrorMessage = errorMessage !== null;

  const handleSubmitClick = async () => {
    setIsLoading(true);

    await login(
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
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    await resetPassword(
      {
        email: form.email
      },
      (response) => {
        triggerResetSuccess(5000);
        setForm({
          ...form,
          email: ''
        });
      },
      (error) => {
        triggerResetFail(5000);
      },
      () => setIsLoading(false)
    )
    hideForgotPass();
  };

  const handleClose = () => {
    setForm({
      email: "",
      password: "",
    });

    setErrorMessage(null);
    toggleLoginModal();
  };

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  };

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
            <h3 className={`${styles.registerTitle}`}>{forgotPass ? "Reset Password" : "Login"}</h3>
          </div>
          {/* Login successful */}
          {sessionUser && !isLoading && <div className="alert alert-success mx-3 mt-3" role="alert">
            Log-in <b>successful</b>!
          </div>}
          {resetSuccess && !isLoading && <div className="alert alert-success mx-3 mt-3" role="alert">
            Please check your email for the new password!
          </div>}
          {/* Invalid credentials alert */}
          {showErrorMessage && !isLoading && <div className="alert alert-danger mx-3 mt-3" role="alert">
            {errorMessage}
          </div>}
          {resetfail && !isLoading && <div className="alert alert-danger mx-3 mt-3" role="alert">
            Cannot reset password at this time.
          </div>}
          {/* Login section: Email */}
          {isLoading ? <div className="container-fluid d-flex justify-content-center align-items-center p-5"><CircularProgress color="error" /></div>
            :
            <>
              <div className="form-group mt-3 mx-3">
                {forgotPass && <div className={`${styles['email-label']} d-flex justify-content-center text-center mb-3`}>Enter the email you used to register your account. If an account exists, an email will be sent to you that contains the new password,</div>}
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
              {!forgotPass &&
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
              }
              <div className="row justify-content-end pb-3 mx-1">
                {forgotPass ?
                  <>
                    <div className="col-auto me-auto">
                      <BtnSecondary
                        onClick={hideForgotPass}
                      >
                        Cancel
                      </BtnSecondary>
                    </div>
                    <div className="col-auto">
                      <BtnPrimary
                        onClick={handleResetPassword}
                        disabled={form.email === ''}>Reset Password</BtnPrimary>
                    </div>
                  </>
                  :
                  <>
                    <div
                      onClick={showForgotPass}
                      className={`${styles['forgot-pw']} col-auto d-flex align-items-center me-auto`}
                    >
                      Forgot password?
                    </div>
                    <div className="col-auto">
                      <BtnPrimary
                        onClick={handleSubmitClick}
                        disabled={
                          form.email === '' ||
                          form.password === ''
                        }>Login</BtnPrimary>
                    </div>
                  </>
                }
              </div>
            </>}

        </form>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;