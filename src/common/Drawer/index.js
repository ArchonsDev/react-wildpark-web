import React, { useContext } from "react";
import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";

import logo from "../../images/logo_circle.png";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./styles.module.css";

const Drawer = () => {
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
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className={styles.navbar}>
          <Container fluid>
            {/* Hamburger button */}
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className={styles.toggle}
            />

            {/* Page Name */}
            <Navbar.Brand className={styles.pageName}>{brand}</Navbar.Brand>

            {/* Drawer pop-up */}
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              className={styles.sidebar}
              placement="start">
              <Offcanvas.Header onClick={(e) => navigate("/")}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
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
                      className={`mx-3 my-1 p-3 ${
                        location.pathname === "/dashboard"
                          ? styles.active
                          : styles.navItem
                      }`}>
                      <i
                        className={`fa-solid fa-house fa-lg ${styles.drawerIcon}`}></i>{" "}
                      Dashboard
                    </Nav.Link>
                    <Nav.Link
                      onClick={(e) => navigate("/bookings")}
                      className={`mx-3 my-1 p-3 ${
                        location.pathname === "/bookings"
                          ? styles.active
                          : styles.navItem
                      }`}>
                      <i
                        className={`fa-solid fa-scroll fa-lg ${styles.drawerIcon}`}></i>{" "}
                      My Bookings
                    </Nav.Link>
                    <Nav.Link
                      onClick={(e) => navigate("/settings")}
                      className={`mx-3 my-1 p-3 ${
                        location.pathname === "/settings"
                          ? styles.active
                          : styles.navItem
                      }`}>
                      <i
                        className={`fa-solid fa-gear fa-lg ${styles.drawerIcon}`}></i>{" "}
                      Settings
                    </Nav.Link>

                    {location.pathname === "/dashboard" && (
                      <Nav.Link
                        onClick={(e) => window.print()}
                        className={`mx-3 my-1 p-3 ${
                          location.pathname === "/dashboard"
                            ? styles.navItem
                            : styles.hidden
                        }`}>
                        <i
                          className={`fa-solid fa-file-arrow-down fa-lg ${styles.drawerIcon}`}></i>{" "}
                        Export
                      </Nav.Link>
                    )}
                  </Nav>
                </div>

                <Nav.Item className={styles.logout}>
                  <Nav.Link
                    className={`mx-3 mb-3 p-3 ${styles.navItem}`}
                    onClick={toggleLogoutModal}>
                    <i
                      className={`fa-solid fa-arrow-right-from-bracket fa-lg ${styles.drawerIcon}`}></i>{" "}
                    Log out
                  </Nav.Link>
                </Nav.Item>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export default Drawer;
