import React, { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

import BtnSecondary from "../../common/Buttons/BtnSecondary";
import BtnPrimary from "../../common/Buttons/BtnPrimary";
import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";

import OrganizationContext from "../../contexts/OrganizationContext";

import { useTrigger } from "../../hooks/useTrigger";
import { useSwitch } from "../../hooks/useSwitch";
import { addMember, deleteOrg, updateOrg, deleteMember } from "../../api/organizations";

import styles from "./styles.module.css";
import SessionUserContext from "../../contexts/SessionUserContext";

const OrgDetails = ({ editMode, onCancelEdit }) => {
  const cancelEditMode = onCancelEdit;

  const { sessionUser, reloadUser } = useContext(SessionUserContext);
  const { org, fetchOrg, isOrgOwner, isOrgMember } = useContext(OrganizationContext);

  const [showConfirmOrgDelete, openConfirmOrgDelete, closeConfirmOrgDelete] = useSwitch();
  const [showLeaveConfirm, openLeaveConfirm, closeLeaveConfirm] = useSwitch();
  const [showJoinConfirm, openJoinConfirm, closeJoinConfirm] = useSwitch();

  const [successMessage, setSuccessMessage] = useState(null);
  const [showSuccess, triggerShowSuccess] = useTrigger();

  const [errorMessage, setErrorMessage] = useState(null);
  const [showError, triggerShowError] = useTrigger();

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

  const handleDelete = async (e) => {
    deleteOrg(
      { id: org.id },
      (response) => navigate("/dashboard"),
      (error) => {
        error?.response?.data ? setErrorMessage(<>{error.response.data}</>) : setErrorMessage(<>Failed to delete this organization.</>);
        triggerShowError(5000, () => setErrorMessage(null));
      }
    );
  };

  const handleSubmit = async () => {
    updateOrg(
      {
        id: org.id,
        ...form
      },
      (response) => {
        setSuccessMessage(<>Successfully updated organization details.</>);
        triggerShowSuccess(5000, () => {
          setSuccessMessage(null);
          fetchOrg();
        })
      },
      (error) => {
        error?.response?.data ? setErrorMessage(<>{error.response.data}</>) : setErrorMessage(<>Failed to update this organization.</>);
        triggerShowError(5000, () => setErrorMessage(null));
      },
      () => cancelEditMode()
    );
  };

  const handleJoin = async (e) => {
    addMember(
      {
        id: org.id,
        accountId: sessionUser.id
      },
      (response) => {
        setSuccessMessage(<>You are now part of this organization.</>)
        triggerShowSuccess(5000, () => setSuccessMessage(null));
        fetchOrg();
        reloadUser();
      },
      (error) => {
        error?.response?.data ? setErrorMessage(<>{error.response.data}</>) : setErrorMessage(<>Failed to join this organization.</>);
        triggerShowError(5000, () => setErrorMessage(null));
      }
    );
  };

  const handleLeave = async () => {
    deleteMember(
      {
        id: org.id,
        accountId: sessionUser.id
      },
      (response) => {
        setSuccessMessage(<>You are no longer part of this organization.</>)
        triggerShowSuccess(5000, () => setSuccessMessage(null));
        fetchOrg();
        reloadUser();
      },
      (error) => {
        error?.response?.data ? setErrorMessage(<>{error.response.data}</>) : setErrorMessage(<>Failed to update this organization.</>);
        triggerShowError(5000, () => setErrorMessage(null));
      },
      () => cancelEditMode()
    );
  };

  return (
    <Container fluid className="p-3">
      <Row>
        {successMessage && showSuccess &&
          <div className="alert alert-success mb-3" role="alert">
            {successMessage}
          </div>
        }
        {errorMessage && showError &&
          <div className="alert alert-danger mb-3" role="alert">
            {errorMessage}
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
        {isOrgOwner &&
          <Col md={6} className={`${styles['edit-btn']} d-flex justify-content-start align-items-center`}>
            <BtnPrimary onClick={openConfirmOrgDelete}>Delete</BtnPrimary>
            <ConfirmDeleteModal show={showConfirmOrgDelete} onHide={closeConfirmOrgDelete} onConfirm={handleDelete} />
          </Col>
        }
        {isOrgMember && !isOrgOwner &&
          <Col md={6} className={`${styles['edit-btn']} d-flex justify-content-start align-items-center`}>
            <BtnPrimary onClick={openLeaveConfirm}>Leave</BtnPrimary>
          </Col>
        }
        {!isOrgMember &&
          <Col md={6} className={`${styles['edit-btn']} d-flex justify-content-start align-items-center`}>
            <BtnPrimary onClick={openJoinConfirm}>Join</BtnPrimary>
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