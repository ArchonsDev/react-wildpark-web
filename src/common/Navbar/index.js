import React, { useEffect, useState, useContext } from "react";
import styles from "./style.module.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LoginModal from "../LoginModal";
import LogoutModal from '../LogoutModal';
import UserLoggedInContext from '../../contexts/UserLoginContext';
import Cookie from 'js-cookie';

const Navbar = () => {
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserLoggedInContext);

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openRegister = () => {
    window.open("/register", "_blank");
  };

  const handleConfirmLogout = () => {
    Cookie.remove('userToken');
    setIsUserLoggedIn(false);

    setShowLogoutModal(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <img
            src={logo}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="wildpark-logo"
          />
        </Link>
        <div className={`${styles.wildparkName}`}>
          <Link to="/" className={`navbar-brand ${styles.navbarWild}`} href="#">
            WILD
          </Link>
          <Link to="/" className={`navbar-brand ${styles.navbarPark}`} href="#">
            PARK
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navbarItems}`}>
            <li className="nav-item">
              <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}>About Us</Link>
            </li>
            <li className="nav-item">
              <Link to="/support" className={`nav-link ${location.pathname === "/support" ? "active" : ""}`}>Support</Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                to="/downloads"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Downloads
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    WildPark Mobile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    WildPark Web
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          {!isUserLoggedIn && <>
            <button
              type="button"
              className={`${styles.loginButton}`}
              onClick={openLoginModal}
            >
              Login
            </button>
            <button
              type="button"
              className={`${styles.signupButton}`}
              onClick={openRegister}
            >
              Register
            </button>
          </>}

          {isUserLoggedIn && <>
            <div className={`navbar-nav mb-2 mb-lg-0 ${styles.navbarItems}`}>
              <div className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  id="accountDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </Link>
                <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="accountDropdown">
                  <li>
                    <button className="dropdown-item" type="button">
                      Profile
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item" type="button">
                      Settings
                    </button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={(e) => {
                        setShowLogoutModal(true);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>}

          <LogoutModal
            show={showLogoutModal}
            onHide={(e) => {
              setShowLogoutModal(false);
            }}
            onConfirm={handleConfirmLogout} />
          <LoginModal
            show={showLoginModal}
            closeCallback={closeLoginModal} />
        </div>
      </div>
    </nav >
  );
};

export default Navbar;
