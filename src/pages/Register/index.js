import React from "react";
import styles from "./style.module.css";
import logo from "../../images/logo.png";

const Register = () => {
  return (
    <>
      <div className={`${styles.registerBackground}`}>
        <div className={`container ${styles.formContainer}`}>
          <form>
            {/* Register section: Title */}
            <div className={`${styles.titleForm}`}>
              <img src={logo} className={`${styles.logoStyle}`} />
              <h3 className={`${styles.registerTitle}`}>Register</h3>
            </div>
            {/* Register section: Name */}
            <div className="form-group d-flex">
              <div className={`mr-2 ${styles.inputNameBox}`}>
                <label htmlFor="inputFirstname">First name</label>
                <input
                  type="text"
                  className={`form-control ${styles.inputMargin}`}
                  id="inputFirstname"
                  aria-describedby="fnameHelp"
                />
              </div>
              <div>
                <label htmlFor="inputLastname">Last name</label>
                <input
                  type="text"
                  className={`form-control ${styles.inputMargin}`}
                  id="inputLastname"
                  aria-describedby="lnameHelp"
                />
              </div>
            </div>

            {/* Register section: Email */}
            <div className="form-group">
              <label for="inputEmail">Email address</label>
              <input
                type="email"
                class={`form-control ${styles.inputMargin}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            {/* Register section: Password */}
            <div className="form-group">
              <label for="inputPassword">Password</label>
              <input
                type="password"
                class={`form-control ${styles.inputMargin}`}
                id="inputPassword"
              />
            </div>

            <div className="form-group">
              <label for="inputConfirmPassword">Confirm Password</label>
              <input
                type="password"
                class={`form-control ${styles.inputMargin}`}
                id="inputConfirmPassword"
              />
            </div>

            <div className="row justify-content-center">
              <div className="col-auto">
                <button type="submit" className={`${styles.submitButton}`}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
