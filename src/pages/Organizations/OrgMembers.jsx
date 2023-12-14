import React, { useContext, useEffect, useState } from "react";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";

import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";

import { useSwitch } from "../../hooks/useSwitch";
import { useTrigger } from "../../hooks/useTrigger";
import { getOrgMembers, deleteAdmin, addAdmin, deleteMember } from "../../api/organizations";

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

  const [showwSuccess, triggerShowSuccess] = useTrigger();
  const [successMessage, setSuccessMessage] = useState(null);

  const [showError, triggerShowError] = useTrigger();
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchMembers = async () => {
    getOrgMembers({ id: org.id }, (response) => response?.data && setMembers(response.data));
  };

  const handleAdminKick = async (id) => {
    await handleDemote(id);
    await handleKick(id);
  }

  const handleDemote = async (id) => {
    deleteAdmin(
      {
        id: org.id,
        accountId: id
      },
      (response) => {
        setSuccessMessage(<>Member demoted.</>);
        triggerShowSuccess(5000, () => setSuccessMessage(null));
        fetchMembers();
      },
      (error) => {
        if (error?.response && error?.response?.data) {
          setErrorMessage(<>{error.response.data}</>);
        } else {
          setErrorMessage(<>Failed to demote member.</>);
        }
        triggerShowError(5000, () => setErrorMessage(null));
      }
    );
  };

  const handlePromote = async (id) => {
    addAdmin(
      {
        id: org.id,
        accountId: id
      },
      (response) => {
        setSuccessMessage(<>Member promoted.</>);
        triggerShowSuccess(5000, () => setSuccessMessage(null));
        fetchMembers();
      },
      (error) => {
        if (error?.response && error?.response?.data) {
          setErrorMessage(<>{error.response.data}</>);
        } else {
          setErrorMessage(<>Failed to demote member.</>);
        }
        triggerShowError(5000, () => setErrorMessage(null));
      }
    );
  };

  const handleKick = async (id) => {
    deleteMember(
      {
        id: org.id,
        accountId: id,
      },
      (response) => {
        setSuccessMessage(<>Member removed.</>);
        triggerShowSuccess(5000, () => setSuccessMessage(null));
        fetchMembers();
      },
      (error) => {
        if (error?.response && error?.response?.data) {
          setErrorMessage(<>{error.response.data}</>);
        } else {
          setErrorMessage(<>Failed to demote member.</>);
        }
        triggerShowError(5000, () => setErrorMessage(null));
      }
    );
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
                  {/* !! DOES NOT WORK !!
                  <Col xs={1} style={{ cursor: "pointer" }}>
                    {member.id !== sessionUser.id && <i
                      className={`${styles.icon} fa-solid fa-user-slash fa-xl`}
                      onClick={() => { setSelectedId(member.id); openAdminKickConfirm() }}></i>}
                  </Col> 
                  */}
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
          onConfirm={async () => await handleAdminKick(selectedId)}
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
