import React, { useContext } from "react";
import { Row, Col, ListGroup, Card } from "react-bootstrap";

import OrganizationContext from "../../contexts/OrganizationContext";
import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./styles.module.css";

const OrgParking = () => {
  const { org, hasPerms, accountOrgs } = useContext(OrganizationContext);
  const { sessionUser } = useContext(SessionUserContext);
  return (
    <div className="OrgParking">
      <Card className="mt-2" style={{ width: "100%" }}>
        <ListGroup>
          <ListGroup.Item className={styles.parkingHeader}>
            <Row>
              <Col xs={5}>Name</Col>
              <Col xs={5}>Availability</Col>
              {org &&
                accountOrgs &&
                hasPerms(sessionUser, accountOrgs, org.id) && (
                  <Col xs={2}>
                    <i
                      className={`${styles.icon} fa-solid fa-square-plus fa-xl`}></i>
                  </Col>
                )}
            </Row>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item className={styles.parkingContent}>
            <Row>
              <Col xs={5}>Block A</Col>
              <Col xs={5}>9/10</Col>
              {org &&
                accountOrgs &&
                hasPerms(sessionUser, accountOrgs, org.id) && (
                  <Col xs={2}>
                    <i
                      className={`${styles.icon} fa-solid fa-trash-can fa-xl`}></i>
                  </Col>
                )}
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>

      {/* Shows vehicles booked when a parking area is clicked */}
      <Card className="mt-2" style={{ width: "100%" }}>
        <ListGroup>
          <ListGroup.Item className={styles.parkingHeader}>
            <Row>
              <Col xs={1}>Spot</Col>
              <Col xs={2}>Vehicle</Col>
              <Col xs={2}>Status</Col>
              <Col xs={5}>Date & Time</Col>
              <Col xs={2}>{""}</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        <ListGroup>
          <ListGroup.Item className={styles.parkingContent}>
            <Row>
              <Col xs={1}>1</Col>
              <Col xs={2}>ABC 123</Col>
              <Col xs={2}>Reserved</Col>
              <Col xs={5}>12-12-2023 3:00PM</Col>
              {org &&
                accountOrgs &&
                hasPerms(sessionUser, accountOrgs, org.id) && (
                  <Col xs={2}>
                    <i
                      className={`${styles.icon} fa-solid fa-trash-can fa-xl`}></i>
                  </Col>
                )}
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default OrgParking;
