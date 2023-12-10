import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import BtnPrimary from '../Buttons/BtnPrimary';
import BtnSecondary from '../Buttons/BtnSecondary';
import SessionUserContext from "../../contexts/SessionUserContext";

import logo from "../../images/logo.png";

import styles from "./style.module.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessionUser, toggleLogoutModal, toggleLoginModal } = useContext(SessionUserContext);

  const openRegister = () => {
    window.open("/register", "_blank");
  };

  const getNavLink = (path) => {
    return location.pathname === path ? styles.activePage : "";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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
          <ul
            className={`navbar-nav me-auto mb-2 mb-lg-0 ${styles.navbarItems}`}
          >
            <li className="nav-item">
              <Link to="/" className={`nav-link ${getNavLink("/")}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className={`nav-link ${getNavLink("/about")}`}>
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/support"
                className={`nav-link ${getNavLink("/support")}`}
              >
                Support
              </Link>
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
                  <span className="dropdown-item">WildPark Mobile</span>
                </li>
                <li>
                  <span className="dropdown-item">WildPark Web</span>
                </li>
              </ul>
            </li>
          </ul>

          {!sessionUser && (
            <div className="d-flex justify-content-center py-2 px-5">
              <BtnPrimary onClick={toggleLoginModal}>Login</BtnPrimary>
              <BtnSecondary onClick={openRegister}>Register</BtnSecondary>
            </div>
          )}

          {sessionUser && (
            <>
              <div className={`navbar-nav mb-2 mb-lg-0 ${styles.navbarItems}`}>
                <div className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    id="accountDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {sessionUser.email}
                  </Link>
                  <ul
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="accountDropdown"
                  >
                    <li>
                      <button className="dropdown-item" type="button" onClick={e => navigate("/dashboard")}>
                        Dashboard
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" type="button" onClick={e => navigate("profile")}>
                        Profile
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" type="button" onClick={e => navigate("/settings")}>
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
                        onClick={toggleLogoutModal}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
