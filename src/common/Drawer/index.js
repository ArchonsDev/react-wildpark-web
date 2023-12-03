import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

import logo from "../../images/logo_circle.png";

import { Nav, Navbar, Container, Offcanvas } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";

const Drawer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [brand, setBrand] = useState("");

  useEffect(() => {
    let brandName = "";
    switch (location.pathname) {
      case "/":
        brandName = "Home";
        break;
      case "/about":
        brandName = "About Us";
        break;
      case "/register":
        brandName = "Register";
        break;
      case "/support":
        brandName = "Support";
        break;
      case "/dashboard":
        brandName = "Dashboard";
        break;
      case "/bookings":
        brandName = "Bookings";
        break;
      case "/settings":
        brandName = "Settings";
        break;
      default:
        brandName = "WildPark";
        break;
    }
    setBrand(brandName);
  }, [location.pathname]);

  const navigateToLanding = () => {
    navigate("/home");
  };

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

            {/* Label */}
            <Navbar.Brand className={styles.pageName}>{brand}</Navbar.Brand>

            {/* Drawer pop-up */}
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              className={styles.sidebar}
              placement="start">
              <Offcanvas.Header onClick={navigateToLanding}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <div className={styles.brand}>
                    <img src={logo} className={styles.logo} alt="logo" />
                    <span className={styles.brandName}>WILDPARK</span>
                  </div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="d-flex flex-column">
                <div className="flex-grow-1">
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/dashboard" className={styles.navItem}>
                      <i
                        className={`fa-solid fa-house fa-lg ${styles.drawerIcon}`}></i>{" "}
                      Home
                    </Nav.Link>
                    <Nav.Link href="/bookings" className={styles.navItem}>
                      <i
                        className={`fa-solid fa-scroll fa-lg ${styles.drawerIcon}`}></i>{" "}
                      My Bookings
                    </Nav.Link>
                    <Nav.Link href="/settings" className={styles.navItem}>
                      <i
                        className={`fa-solid fa-gear fa-lg ${styles.drawerIcon}`}></i>{" "}
                      Settings
                    </Nav.Link>

                    {location.pathname === "/dashboard" && (
                      <Nav.Link className={styles.navItem}>
                        <i
                          class={`fa-solid fa-file-arrow-down fa-lg ${styles.drawerIcon}`}></i>{" "}
                        Export
                      </Nav.Link>
                    )}
                  </Nav>
                </div>

                <Nav.Item className={styles.logout}>
                  <Nav.Link href="/" className={styles.navItem}>
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
