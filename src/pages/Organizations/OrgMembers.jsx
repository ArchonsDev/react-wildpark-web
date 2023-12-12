import React, { useContext } from "react";
import { Row, Col, ListGroup, Card } from "react-bootstrap";

import OrganizationContext from "../../contexts/OrganizationContext";
import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./styles.module.css";

const OrgMembers = () => {
  const { org, hasPerms, accountOrgs } = useContext(OrganizationContext);
  const { sessionUser } = useContext(SessionUserContext);
  return (
    <>
      <Card className="mt-2" style={{ width: "100%" }}>
        <ListGroup>
          <ListGroup.Item className={styles.parkingHeader}>
            <Row>
              <Col xs={4}>Name</Col>
              <Col xs={4}>Date Joined</Col>
              <Col xs={2}>Role</Col>
              <Col xs={2}>{""}</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item className={styles.parkingContent}>
            <Row>
              <Col xs={4}>Jane Doe</Col>
              <Col xs={4}>09-10-2023</Col>
              <Col xs={2}>Member</Col>
              {org &&
                accountOrgs &&
                hasPerms(sessionUser, accountOrgs, org.id) && (
                  <>
                    {/* for promoting to demote/kick? */}
                    <Col xs={1}>
                      <i
                        className={`${styles.icon} fa-solid fa-user-slash fa-xl`}></i>
                    </Col>

                    {/* for promoting to admin */}
                    <Col xs={1}>
                      <i
                        className={`${styles.promote} fa-solid fa-user-tie fa-xl`}></i>
                    </Col>
                  </>
                )}
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default OrgMembers;
