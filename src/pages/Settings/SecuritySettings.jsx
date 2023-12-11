import React, { useState } from "react";

import BtnPrimary from "../../common/Buttons/BtnPrimary";

import styles from "./style.module.css";

const SecuritySettings = () => {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

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
              {/* Current password */}
              <div className="form-group d-flex flex-column mb-3">
                <label className={styles['form-label']} htmlFor="inputCurrentPassword">Current Password</label>
                <input
                  type="email"
                  className={`form-control ${styles.inputMargin}`}
                  id="inputCurrentPassword"
                  name="currentPassword"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              {/* New passowrd */}
              <div className="form-group d-flex flex-column mb-3">
                <label className={styles['form-label']} htmlFor="inputNewPassword">New Password</label>
                <input
                  type="password"
                  className={`form-control ${styles.inputMargin}`}
                  id="inputNewPassword"
                  name="newPassword"
                  value={form.password}
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
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-12 d-flex justify-content-end px-0 mx-0">
          <BtnPrimary>Submit</BtnPrimary>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;