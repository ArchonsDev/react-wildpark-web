import React, { useContext, useState } from "react";

import BtnPrimary from "../../common/Buttons/BtnPrimary";
import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";

import { useSwitch } from "../../hooks/useSwitch";
import { useTrigger } from "../../hooks/useTrigger";
import { isValidPassword } from "../Register/utils";
import { updatePassword } from "../../api/accounts";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./style.module.css";

const SecuritySettings = () => {
  const { sessionUser, setSessionUser } = useContext(SessionUserContext);

  const [showConfirmPassword, openConfirmPassword, closeConfirmPassword] = useSwitch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [showSuccess, triggerShowSuccess] = useTrigger(false);
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const showErrorMessage = errorMessage !== null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      ...form,
      newPassword: "",
      confirmPassword: "",
    });
  }

  const handleSubmit = async () => {
    setErrorMessage(null);

    let hasError = false;
    let errorMessages = [];

    if (!isValidPassword(form.newPassword)) {
      errorMessages.push(
        <>
          <b>Password</b> must contain <b>at least one special character</b>.
          <br />
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

    updatePassword(
      {
        id: sessionUser.id,
        password: form.newPassword
      },
      (response) => {
        setSessionUser(response.data);
        triggerShowSuccess(5000, () => resetForm());
      },
      (error) => {
        if (error.response && error.response.data) {
          setErrorMessage(<>{error.response.data}</>)
        } else {
          setErrorMessage(<>An error occurred.</>)
        }
      }
    );
  };

  return (
    <div className="container-fluid flex-grow-1 p-0">
      <div className="row">
        <div className="col-md-12">
          <span className={`${styles.settingsHeader}`}>Change Password</span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className={`${styles["password-box"]} p-3`}>
            <form>
              {showErrorMessage && (
                <div className="alert alert-danger mb-3" role="alert">
                  {errorMessage}
                </div>
              )}
              {showSuccess && (
                <div className="alert alert-success mb-3" role="alert">
                  Password changed!
                </div>
              )}
              {/* New passowrd */}
              <div className="form-group d-flex flex-column mb-3">
                <label
                  className={styles["form-label"]}
                  htmlFor="inputNewPassword">
                  New Password
                </label>
                <input
                  type="password"
                  className={`form-control ${styles.inputMargin}`}
                  id="inputNewPassword"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                />
              </div>

              {/* Confirm password */}
              <div className="form-group  d-flex flex-column mb-3">
                <label
                  className={styles["form-label"]}
                  htmlFor="inputConfirmPassword">
                  Confirm Password
                </label>
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
          <BtnPrimary onClick={openConfirmPassword}>Submit</BtnPrimary>
          <ConfirmDeleteModal
            show={showConfirmPassword}
            onHide={closeConfirmPassword}
            onConfirm={handleSubmit}
            header={"Update Password"}
            message={"Do you wish to save this new password?"}
          />
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
