import React from "react";
import styles from "./style.module.css";
import logo from "../../images/logo.png";

const Register = () => {
  return (
    <div className={`container-fluid ${styles.customContainer}`}>
      <div className={`${styles.formBox}`}>
        <form>
          {/* Register section: Title */}
          <div className={`${styles.titleForm}`}>
            <img
              src={logo}
              className={`${styles.logoStyle}`}
              alt="wildpark_logo"
            />
            <h3 className={`${styles.registerTitle}`}>Register</h3>
          </div>

          {/* Register section: Name */}
          <div className="row">
            <div className="col">
              <div className={`${styles.inputContainer}`}>
                <i className={`fa fa-user icon ${styles.iconStyle}`}></i>
                <input
                  type="text"
                  className={`form-control ${styles.inputMargin}`}
                  placeholder="First name"
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
                class={`form-control ${styles.inputMargin}`}
                id="exampleInputEmail1"
                placeholder="E-mail address"
              />
            </div>
          </div>

          {/* Register section: Password */}
          <div className="form-group">
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
          <div className="form-group">
            <div className={`${styles.inputContainer}`}>
              <i class={`fa-solid fa-lock ${styles.iconStyle}`}></i>
              <input
                type="password"
                class={`form-control ${styles.inputMargin}`}
                id="inputConfirmPassword"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto">
              <button type="submit" className={`${styles.submitButton}`}>
                Continue
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
