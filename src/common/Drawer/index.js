import React from "react";
import styles from "./styles.module.css";

import logo from "../../images/logo_circle.png";

import { Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";

const Drawer = () => {
  return (
    <div className="Drawer">
      <Nav className={`sidebar ${styles.sidebar}`} activeKey="/home">
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link href="/" className={styles.brand}>
            <img src={logo} className={styles.logo} />
            <span className={styles.brandName}>WILDPARK</span>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/home" className={styles.navItem}>
            <i className={`fa-solid fa-house fa-lg ${styles.drawerIcon}`}></i>{" "}
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" className={styles.navItem}>
            <i className={`fa-solid fa-scroll fa-lg ${styles.drawerIcon}`}></i>{" "}
            My Bookings
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" className={styles.navItem}>
            <i className={`fa-solid fa-gear fa-lg ${styles.drawerIcon}`}></i>{" "}
            Settings
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className={styles.logout}>
          <Nav.Link href="/" className={styles.navItem}>
            <i
              className={`fa-solid fa-arrow-right-from-bracket fa-lg ${styles.drawerIcon}`}></i>{" "}
            Log out
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Drawer;
