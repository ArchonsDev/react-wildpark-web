import React from "react";
import styles from "./styles.module.css";
import { Nav } from "react-bootstrap";
import { withRouter } from "react-router";

const Drawer = () => {
  return (
    <div>
      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link href="/home">
            <i className="fa-solid fa-house"></i> Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">
            <i className="fa-solid fa-scroll"></i> My Bookings
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">
            <i className="fa-solid fa-gear"></i> Settings
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Drawer;
