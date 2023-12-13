import React, { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";

import BtnSecondary from "../../common/Buttons/BtnSecondary";
import BtnPrimary from "../../common/Buttons/BtnPrimary";
import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";

import OrganizationContext from "../../contexts/OrganizationContext";

import { useTrigger } from "../../hooks/useTrigger";
import { useSwitch } from "../../hooks/useSwitch";

import styles from "./styles.module.css";
import SessionUserContext from "../../contexts/SessionUserContext";
import { useNavigate } from "react-router";

const OrgDetails = ({ editMode, onSave }) => {
  const { org, fetchOrg, hasPerms, accountOrgs, isMember, isOwner } = useContext(OrganizationContext);
  const { sessionUser, reloadUser } = useContext(SessionUserContext);

  const [updateSuccess, triggerUpdateSuccess] = useTrigger(false);
  const [updateFail, triggerUpdateFail] = useTrigger(false);

  const [showConfirmOrgDelete, openConfirmOrgDelete, closeConfirmOrgDelete] = useSwitch();
  const [deleteFail, triggerDeleteFail] = useTrigger(false);

  const [joinSuccess, triggerJoinSuccess] = useTrigger(false);
  const [joinFail, triggerJoinFail] = useTrigger(false);

  const [leaveSuccess, triggerLeaveSuccess] = useTrigger(false);
  const [leaveFail, triggerLeaveFail] = useTrigger(false);

  const [showLeaveConfirm, openLeaveConfirm, closeLeaveConfirm] = useSwitch();
  const [showJoinConfirm, openJoinConfirm, closeJoinConfirm] = useSwitch();


  const [form, setForm] = useState({
    name: org.name,
    latitude: org.latitude,
    longitude: org.longitude,
    paymentStrategy: org.paymentStrategy,
    organizationType: org.type,
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const handleJoin = async (e) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/organizations/${org.id}/members`,
        {
          accountId: sessionUser.id,
        },
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("userToken")}`,
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        triggerJoinSuccess(5000);
        fetchOrg();
        reloadUser();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        triggerJoinFail(5000);
        console.log(error);
      }
    }
  };

  const handleDelete = async (e) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/organizations/${org.id}`,
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("userToken")}`,
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        triggerDeleteFail(5000);
        console.log(error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/organizations/${org.id}`,
        {
          ...form
        },
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("userToken")}`,
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200 || response.status === 409) {
        triggerUpdateSuccess(5000);
        fetchOrg();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        triggerUpdateFail(5000);
        console.log(error);
      }
    } finally {
      onSave(false);
    }
  };

  const handleLeave = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/organizations/${org.id}/members/${sessionUser.id}`,
        {
          headers: {
            "Authorization": `Bearer ${Cookies.get("userToken")}`,
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200 || response.status === 409) {
        triggerLeaveSuccess(5000);
        fetchOrg();
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        triggerLeaveFail(5000);
        console.log(error);
      }
    } finally {
      onSave(false);
    }
  };

  return (
    <Container fluid className="p-3">
      <Row>
        {updateSuccess &&
          <div className="alert alert-success mb-3" role="alert">
            Organization details successfully updated!
          </div>
        }
        {updateFail &&
          <div className="alert alert-danger mb-3" role="alert">
            Failed to update organization details.
          </div>
        }
        {deleteFail &&
          <div className="alert alert-danger mb-3" role="alert">
            Failed to delete organization.
          </div>
        }
        {joinSuccess &&
          <div className="alert alert-success mb-3" role="alert">
            You are now part of this organization.
          </div>
        }
        {joinFail &&
          <div className="alert alert-danger mb-3" role="alert">
            Failed to join this organization.
          </div>
        }
        {leaveSuccess &&
          <div className="alert alert-success mb-3" role="alert">
            You have left this organization.
          </div>
        }
        {leaveFail &&
          <div className="alert alert-danger mb-3" role="alert">
            Failed to leave this organization.
          </div>
        }
      </Row>
      <Row>
        <Col md={3} className={`${styles.field} ${styles['field-title']} d-flex align-items-center py-2`}>Name</Col>
        {editMode ?
          <Col md={9} className={`${styles.field} py-2`}>
            <input
              className={`${styles['field-edit']} flex-grow-1 mx-0 p-2 w-100`}
              placeholder="Name"
              value={form.name}
              name="name"
              onChange={handleChange}
            />
          </Col>
          :
          <Col className={`${styles.field} d-flex align-items-center py-2`}>{org?.name}</Col>
        }
      </Row>
      <Row>
        <Col md={3} className={`${styles.field} ${styles['field-title']} d-flex align-items-center py-2`}>Location</Col>
        <Col md={9} className="px-0 mx-0">
          <Container className="px-0 mx-0">
            <Row className="px-0 mx-0">
              {editMode ?
                <>
                  <Col md={6} className={`${styles.field} py-2`}>
                    <input
                      type="number"
                      className={`${styles['field-edit']} flex-grow-1 mx-0 p-2 w-100`}
                      placeholder="Name"
                      value={form.latitude}
                      name="latitude"
                      onChange={handleChange}
                    />
                  </Col>
                  <Col md={6} className={`${styles.field} py-2`}>
                    <input
                      type="number"
                      className={`${styles['field-edit']} flex-grow-1 mx-0 p-2 w-100`}
                      placeholder="Name"
                      value={form.longitude}
                      name="longitude"
                      onChange={handleChange}
                    />
                  </Col>
                </>
                :
                <>
                  <Col md={6} className={`${styles.field} d-flex align-items-center py-2`}>{org?.latitude}° N</Col>
                  <Col md={6} className={`${styles.field} py-2`}>{org?.longitude}° E</Col>
                </>
              }
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col md={3} className={`${styles.field} ${styles['field-title']} d-flex align-items-center py-2`}>Payment Strategy</Col>
        {editMode ?
          <Col md={9} className={`${styles.field} py-2`}>
            <select
              className={`${styles['field-edit']} flex-grow-1 w-100 mx-0 p-2`}
              value={form.paymentStrategy}
              onChange={handleChange}
              name="paymentStrategy">
              <option value="">Select type</option>
              <option value="PAY_PER_USE">PAY PER USE</option>
              <option value="MEMBERSHIP">MEMBERSHIP</option>
              <option value="HYBRID">HYBRID</option>
            </select>
          </Col>
          :
          <Col md={9} className={`${styles.field} py-2`}>{org?.paymentStrategy}</Col>
        }
      </Row>
      <Row>
        <Col md={3} className={`${styles.field} ${styles['field-title']} d-flex align-items-center py-2`}>Type</Col>
        {editMode ?
          <Col md={9} className={`${styles.field} py-2`}>
            <select
              className={`${styles['field-edit']} flex-grow-1 w-100 mx-0 p-2`}
              value={form.organizationType}
              onChange={handleChange}
              name="organizationType">
              <option value="">Select payment strategy</option>
              <option value="EDUCATIONAL">EDUCATIONAL</option>
              <option value="COMMERCIAL">COMMERCIAL</option>
              <option value="GOVERNMENT">GOVERNMENT</option>
            </select>

          </Col>
          :
          <Col md={9} className={`${styles.field} py-2`}>{org?.type}</Col>
        }
      </Row>
      <Row className="mt-5">
        {org && accountOrgs && isOwner(sessionUser, accountOrgs, org.id) &&
          <Col md={6} className={`${styles['edit-btn']} d-flex justify-content-start align-items-center`}>
            <BtnPrimary onClick={openConfirmOrgDelete}>Delete</BtnPrimary>
            <ConfirmDeleteModal show={showConfirmOrgDelete} onHide={closeConfirmOrgDelete} onConfirm={handleDelete} />
          </Col>
        }
        {org && accountOrgs && !isMember(accountOrgs, org.id) &&
          <Col md={6} className={`${styles['edit-btn']} d-flex justify-content-start align-items-center`}>
            <BtnPrimary onClick={openJoinConfirm}>Join</BtnPrimary>
          </Col>
        }
        {org && accountOrgs && isMember(accountOrgs, org.id) && !hasPerms(sessionUser, accountOrgs, org.id) &&
          <Col md={6} className={`${styles['edit-btn']} d-flex justify-content-start align-items-center`}>
            <BtnPrimary onClick={openLeaveConfirm}>Leave</BtnPrimary>
          </Col>
        }
        <Col md={6} className={`${styles['edit-btn']} d-flex justify-content-end align-items-center`}>
          {editMode &&
            <BtnSecondary onClick={handleSubmit}>Save Changes</BtnSecondary>
          }
        </Col>
      </Row>
      <ConfirmDeleteModal
        show={showLeaveConfirm}
        onHide={closeLeaveConfirm}
        onConfirm={handleLeave}
        header={"Leave Organization"}
        message={<>Do you wish to leave <b>{org.name}</b>?</>} />
      <ConfirmDeleteModal
        show={showJoinConfirm}
        onHide={closeJoinConfirm}
        onConfirm={handleJoin}
        header={"Join Organization"}
        message={<>Do you wish to join <b>{org.name}</b>?</>} />
    </Container>
  );
};

export default OrgDetails;