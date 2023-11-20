import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import logo from "../../images/logo.png";
import axios from "axios";

const Register = () => {
  const [inputFirstname, setInputFirstname] = useState('');
  const [inputLastname, setInputLastname] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [isMatchingPassword, setIsMatchingPassword] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputPassword !== inputConfirmPassword) {
      setIsMatchingPassword(false);
      return;
    }

    axios.post("http://localhost:8080/api/v1/auth/register", {
      "firstname": inputFirstname,
      "lastname": inputLastname,
      "email": inputEmail,
      "password": inputPassword
    })
      .then(response => {
        if (response.status === 200) {
          window.close();
        }
      })
      .catch(error => {
        if (error.response.status === 403) {
        }
      })
  }

  useEffect(() => {
    setIsMatchingPassword(true);
  }, [inputFirstname, inputLastname, inputEmail, inputPassword, inputConfirmPassword])

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
          {!isMatchingPassword && <div className="alert alert-danger mt-3" role="alert">
            Invalid <b>username</b> or <b>password</b>.
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
                class={`form-control ${styles.inputMargin}`}
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
              <i class={`fa-solid fa-lock ${styles.iconStyle}`}></i>
              <input
                type="password"
                class={`form-control ${styles.inputMargin}`}
                id="inputPassword"
                placeholder="Password"
                value={inputPassword}
                onChange={e => setInputPassword(e.target.value)}
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
                value={inputConfirmPassword}
                onChange={e => setInputConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="row justify-content-center pt-3">
            <div className="col-auto">
              <button type="submit" className={`${styles.submitButton}`} onClick={handleSubmit}>
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
