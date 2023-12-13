import React, { useContext } from "react";
import { Nav, Navbar, Offcanvas, Container, Row, Col } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";

import logo from "../../images/logo_circle.png";

import { useSwitch } from "../../hooks/useSwitch";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./styles.module.css";

const Drawer = () => {
  const [showDrawer, openDrawer, closeDrawer] = useSwitch();

  const location = useLocation();
  const navigate = useNavigate();

  const { toggleLogoutModal } = useContext(SessionUserContext);

  const brandNames = {
    "/dashboard": "Dashboard",
    "/bookings": "Bookings",
    "/settings": "Settings",
    "/organizations/:id": "Organizations",
  };

  const brand = location.pathname.startsWith("/organizations/")
    ? "Organizations"
    : brandNames[location.pathname] || "WildPark";

  return (
    <div className="Drawer">
      <Navbar
        expand={false}
        className={`${styles.navbar} d-flex align-items-start h-100 px-3`}
        onMouseEnter={() => openDrawer()}
        onMouseLeave={() => closeDrawer()}>
        {/* Hamburger button */}
        <Navbar.Toggle
          aria-controls={`offcanvasNavbar`}
          className={styles.toggle}
        />

        {/* Page Name */}
        <Navbar.Brand className={styles.pageName}>{brand}</Navbar.Brand>

        {/* Drawer pop-up */}
        <Navbar.Offcanvas
          show={showDrawer}
          id={`offcanvasNavbar`}
          aria-labelledby={`offcanvasNavbarLabel`}
          className={styles.sidebar}
          placement="start"
          onHide={() => closeDrawer()}
        >
          <Offcanvas.Header onClick={(e) => navigate("/")}>
            <Offcanvas.Title id={`offcanvasNavbarLabel`}>
              <div className={styles.brand}>
                <img src={logo} className={styles.logo} alt="logo" />
                <span className={styles.brandName}>WILDPARK</span>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column p-0">
            <div className="flex-grow-1">
              <Nav>
                <Nav.Link
                  onClick={(e) => navigate("/dashboard")}
                  className={`mx-3 my-1 p-3 ${location.pathname === "/dashboard" ? styles.active : styles.navItem}`}
                >
                  <i
                    className={`fa-solid fa-house fa-lg ${styles.drawerIcon}`}>
                  </i>
                  <span className="px-3">Dashboard</span>
                </Nav.Link>
                <Nav.Link
                  onClick={(e) => navigate("/bookings")}
                  className={`mx-3 my-1 p-3 ${location.pathname === "/bookings"
                    ? styles.active
                    : styles.navItem
                    }`}
                >
                  <i
                    className={`fa-solid fa-scroll fa-lg ${styles.drawerIcon}`}
                  ></i>
                  <span className="px-3">My Bookings</span>
                </Nav.Link>
                <Nav.Link
                  onClick={(e) => navigate("/settings")}
                  className={`mx-3 my-1 p-3 ${location.pathname === "/settings"
                    ? styles.active
                    : styles.navItem
                    }`}
                >
                  <i
                    className={`fa-solid fa-gear fa-lg ${styles.drawerIcon}`}
                  ></i>
                  <span className="px-3">Settings</span>
                </Nav.Link>

                {location.pathname === "/dashboard" && (
                  <Nav.Link
                    onClick={(e) => window.print()}
                    className={`mx-3 my-1 p-3 ${location.pathname === "/dashboard"
                      ? styles.navItem
                      : styles.hidden
                      }`}
                  >
                    <i
                      className={`fa-solid fa-file-arrow-down fa-lg ${styles.drawerIcon}`}
                    ></i>
                    <span className="px-3">Export</span>
                  </Nav.Link>
                )}
              </Nav>
            </div>

            <Nav.Item className={styles.logout}>
              <Nav.Link
                className={`mx-3 mb-3 p-3 ${styles.navItem}`}
                onClick={toggleLogoutModal}
              >
                <i
                  className={`fa-solid fa-arrow-right-from-bracket fa-lg ${styles.drawerIcon}`}
                ></i>
                Log out
              </Nav.Link>
            </Nav.Item>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </div>
  );
};

export default Drawer;
