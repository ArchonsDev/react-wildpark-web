import React, { useContext, useEffect, useState } from "react";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";

import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";

import { useSwitch } from "../../hooks/useSwitch";

import OrganizationContext from "../../contexts/OrganizationContext";
import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./styles.module.css";

const OrgMembers = () => {
  const { org } = useContext(OrganizationContext);
  const { sessionUser } = useContext(SessionUserContext);

  const [members, setMembers] = useState(null);
  const [selectedId, setSelectedId] = useState(0);
  const [showKickConfirm, openKickConfirm, closeKickConfirm] = useSwitch();
  const [showAdminKickConfirm, openAdminKickConfirm, closeAdminKickConfirm] = useSwitch();
  const [showPromoteConfirm, openPromoteConfirm, closePromoteConfirm] = useSwitch();
  const [showDemoteConfirm, openDemoteConfirm, closeDemoteConfirm] = useSwitch();

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/organizations/${org.id}/members`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        if (response.data) {
          setMembers(response.data);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  const handleAdminKick = async (id) => {
    await handleDemote(id);
    await handleKick(id);
  }

  const handleDemote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/organizations/${org.id}/admins/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        fetchMembers();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  const handlePromote = async (id) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/organizations/${org.id}/admins`,
        {
          accountId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        if (response.data) {
          fetchMembers();
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  const handleKick = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/organizations/${org.id}/members/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        fetchMembers();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (org) {
      fetchMembers();
    }
  }, []);

  return (
    <>
      <Card className="mt-2" style={{ width: "100%" }}>
        <ListGroup>
          <ListGroup.Item className={styles.parkingHeader}>
            <Row>
              <Col xs={4}>Name</Col>
              <Col xs={4}>Email</Col>
              <Col xs={2}>Role</Col>
              <Col xs={2}>{""}</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
        {members &&
          <ListGroup>
            <ListGroup.Item className={styles.parkingContent}>
              <Row>
                <Col xs={4}>{members.owner.firstname} {members.owner.lastname}</Col>
                <Col xs={4}>{members.owner.email}</Col>
                <Col xs={2}>Owner</Col>
              </Row>
            </ListGroup.Item>
            {members.admins.map((member) => (
              <ListGroup.Item key={member.id} className={styles.parkingContent}>
                <Row>
                  <Col xs={4}>{member.firstname} {member.lastname}</Col>
                  <Col xs={4}>{member.email}</Col>
                  <Col xs={2}>Admin</Col>
                  <Col xs={1} style={{ cursor: "pointer" }}>
                    {member.id !== sessionUser.id && <i
                      className={`${styles.icon} fa-solid fa-circle-chevron-down fa-xl`}
                      onClick={() => { setSelectedId(member.id); openDemoteConfirm() }}></i>}
                  </Col>
                  <Col xs={1} style={{ cursor: "pointer" }}>
                    {member.id !== sessionUser.id && <i
                      className={`${styles.icon} fa-solid fa-user-slash fa-xl`}
                      onClick={() => { setSelectedId(member.id); openAdminKickConfirm() }}></i>}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            {members.members.map((member) => (
              <ListGroup.Item key={member.id} className={styles.parkingContent}>
                <Row>
                  <Col xs={4}>{member.firstname} {member.lastname}</Col>
                  <Col xs={4}>{member.email}</Col>
                  <Col xs={2}>Member</Col>
                  <Col xs={1} style={{ cursor: "pointer" }}>
                    {member.id !== sessionUser.id && <i
                      className={`${styles.promote} fa-solid fa-circle-chevron-up fa-xl`}
                      onClick={() => { setSelectedId(member.id); openPromoteConfirm() }}></i>}
                  </Col>
                  <Col xs={1} style={{ cursor: "pointer" }}>
                    {member.id !== sessionUser.id && <i
                      className={`${styles.icon} fa-solid fa-user-slash fa-xl`}
                      onClick={() => { setSelectedId(member.id); openKickConfirm() }}></i>}
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        }
        <ConfirmDeleteModal
          show={showKickConfirm}
          onHide={closeKickConfirm}
          onConfirm={() => handleKick(selectedId)}
          header={"Kick Member"}
          message={"Do you want to kick this member?"}
        />
        <ConfirmDeleteModal
          show={showAdminKickConfirm}
          onHide={closeAdminKickConfirm}
          onConfirm={() => handleAdminKick(selectedId)}
          header={"Kick Member"}
          message={"Do you want to kick this member?"}
        />
        <ConfirmDeleteModal
          show={showPromoteConfirm}
          onHide={closePromoteConfirm}
          onConfirm={() => handlePromote(selectedId)}
          header={"Promote to Admin"}
          message={"Do you want to promote this member?"}
        />
        <ConfirmDeleteModal
          show={showDemoteConfirm}
          onHide={closeDemoteConfirm}
          onConfirm={() => handleDemote(selectedId)}
          header={"Demote to Member"}
          message={"Do you want to demote this member?"}
        />
      </Card >
    </>
  );
};

export default OrgMembers;
