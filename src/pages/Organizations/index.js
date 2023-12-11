import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import OrgParking from "./OrgParking";
import OrgDetails from "./OrgDetails";

import styles from "./styles.module.css";

const Organizations = () => {
  const [views, setViews] = useState({
    information: true,
    parking: false,
  })


  const handleSwitchView = e => {
    switch (e.target.name) {
      case "parking":
        setViews({ parking: true, information: false });
        break;
      default:
        setViews({ parking: false, information: true });
    }
  };

  return (
    <Container fluid className={`${styles.Organizations} d-flex flex-column justify-content-end p-0 m-0`}>
      <Container className={`${styles.content} ${styles.border} d-flex flex-column py-3 px-4`}>
        <Row className={`${styles.banner} ${styles.border} row mb-3 py-2`}>
          <Col md={1} className="d-flex justify-content-center align-items-center">
            <i className="fa-solid fa-building fa-5x mx-2"></i>
          </Col>

          <Col md={7} className="d-flex flex-column justify-content-center">
            <span className={`${styles['org-name']}`}>Cebu Institute of Technology - University</span>
          </Col>

          {true &&
            <Col md={4} className={`${styles['edit-btn']} ms-auto d-flex justify-content-end align-items-center`}>
              <i className="fa-regular fa-pen-to-square mx-2"></i>
              Edit details
            </Col>
          }
        </Row>

        <Row className="flex-grow-1">
          <Col md={3}>
            <Container fluid className="m-0 p-0">
              <Row className="mb-1">
                <Col md={12} className="d-flex align-items-center p-0">
                  <Button
                    className={`${styles.tab} ${styles.border} ${views.information ? styles.active : ''} flex-grow-1 d-flex justify-content-start align-items-center px-5`}
                    onClick={handleSwitchView}
                    name="information"
                  >Information</Button>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="d-flex align-items-center p-0">
                  <Button
                    className={`${styles.tab} ${styles.border} ${views.parking ? styles.active : ''} flex-grow-1 d-flex justify-content-start align-items-center px-5`}
                    onClick={handleSwitchView}
                    name="parking">Parking</Button>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col md={9} className={`${styles['tab-content']} ${styles.border}`}>
            {views.information && <OrgDetails />}
            {views.parking && <OrgParking />}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Organizations;
