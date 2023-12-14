import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Col, Container, Modal, Row, Form } from "react-bootstrap";

import SessionUserContext from "../../../contexts/SessionUserContext";
import BtnPrimary from "../../Buttons/BtnPrimary";
import BtnSecondary from "../../Buttons/BtnSecondary";
import OrgThumbnail from "../../Cards/OrgThumbnail";
import MapComponent from "../../MapComponent";

import { useSwitch } from "../../../hooks/useSwitch";
import { useTrigger } from "../../../hooks/useTrigger";
import { createOrg, getAllOrgs } from "../../../api/organizations";

import styles from "./style.module.css";
import { useNavigate } from "react-router";

const OrganizationListModal = ({ show, closeCallback }) => {
  const { sessionUser } = useContext(SessionUserContext);

  const [organizations, setOrganizations] = useState([]);
  const [createMode, enableCreateMode, disableCreateMode] = useSwitch();
  const [mapStep, showMapStep, showDetailsStep] = useSwitch();
  const [showCreateSuccess, triggerShowSuccess] = useTrigger();
  const [formData, setFormData] = useState({
    name: '',
    latitude: 0.0,
    longitude: 0.0,
    paymentStrategy: '',
    type: '',
  });

  const navigate = useNavigate();

  const resetForm = () => {
    setFormData({
      name: '',
      latitude: 0,
      longitude: 0,
      paymentStrategy: '',
      type: '',
    });
  }

  const fetchOrganizations = async () => {
    getAllOrgs(
      (response) => response?.data && setOrganizations(response.data)
    )
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    createOrg(
      {
        ...formData
      },
      (response) => {
        fetchOrganizations();
        triggerShowSuccess();
        disableCreateMode();
        showMapStep();
        resetForm();
      }
    );
  };

  const handleCancel = () => {
    disableCreateMode();
    showMapStep();
  }

  const handleClose = () => {
    handleCancel();
    closeCallback();
  }

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData])

  return (
    <Modal
      size="xxl"
      show={show}
      onHide={handleClose}
      scrollable={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className={`${styles.title}`}>
          {createMode ? "New Organization" : "Organizations"}
        </Modal.Title>
      </Modal.Header>
      {createMode ?
        <>
          {/* CREATE ORG SCREEN */}
          {mapStep ?
            <>
              {/* DISPLAY MAP SECTION */}
              <Modal.Body className="d-flex flex-column justify-content-center align-items-center p-1 m-0" style={{ minHeight: "400px", maxHeight: "400px", overflowX: "hidden", overflowY: "auto" }}>
                <Container fluid className="flex-grow-1 d-flex flex-column justify-content-center p-0 m-0">
                  <Row className="flex-grow-1 d-flex flex-column justify-content-center p-0 m-0" style={{ minHeight: "300px !important" }}>
                    <Col md={12} className="flex-grow-1 d-flex flex-column justify-content-center p-0 m-0">
                      <MapComponent className="flex-grow-1 m-0 p-0" onMarkerClick={(coordinates) => setFormData({ ...formData, latitude: coordinates.lat, longitude: coordinates.lng })} />
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <BtnSecondary onClick={handleCancel}>Cancel</BtnSecondary>
                <BtnPrimary onClick={showDetailsStep} disabled={formData.lat === 0 && formData.lng === 0}>
                  Next
                </BtnPrimary>
              </Modal.Footer>
            </>
            :
            <>
              {/* DISPLAY DETAILS SECTION */}
              <Modal.Body className="d-flex flex-column justify-content-center align-items-center p-1 m-0" style={{ minHeight: "400px", maxHeight: "400px", overflowX: "hidden", overflowY: "auto" }}>
                <Container fluid className="flex-grow-1 d-flex flex-column p-0 m-0">
                  <Row className="px-3 py-2" style={{ maxHeight: "200ox" }}>
                    <Col xs={12} md={12}>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName" className="py-2 mt-5">
                          <Form.Label className={`${styles['field-label']}`}>Organization name</Form.Label>
                          <Form.Control
                            className={`${styles['field-edit']} w-100`}
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formLatitude" className="py-2">
                          <Form.Label className={`${styles['field-label']}`}>Latitude</Form.Label>
                          <Form.Control
                            className={`${styles['field-edit']} w-100`}
                            type="number"
                            placeholder="Latitude"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            disabled
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formLongitude" className="py-2">
                          <Form.Label className={`${styles['field-label']}`}>Longitude</Form.Label>
                          <Form.Control
                            className={`${styles['field-edit']} w-100`}
                            type="number"
                            placeholder="Longitude"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            disabled
                            required
                          />
                        </Form.Group>

                        <Form.Group controlId="formPaymentStrategy" className="py-2">
                          <Form.Label className={`${styles['field-label']}`}>Payment strategy</Form.Label>
                          <Form.Control
                            className={`${styles['field-edit']} w-100`}
                            as="select"
                            name="paymentStrategy"
                            value={formData.paymentStrategy}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select payment strategy</option>
                            <option value="PAY_PER_USE">Pay Per Use</option>
                            <option value="MEMBERSHIP">Membership</option>
                            <option value="HYBRID">Hybrid</option>
                          </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="formType" className="py-2 mb-4">
                          <Form.Label className={`${styles['field-label']}`}>Organization type</Form.Label>
                          <Form.Control
                            className={`${styles['field-edit']} w-100`}
                            as="select"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                          >
                            <option value="">Select organization type</option>
                            <option value="EDUCATIONAL">Educational</option>
                            <option value="COMMERCIAL">Commercial</option>
                            <option value="GOVERNMENT">Government</option>
                          </Form.Control>
                        </Form.Group>


                      </Form>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <BtnSecondary onClick={showMapStep}>Back</BtnSecondary>
                <BtnPrimary onClick={handleSubmit}>Submit</BtnPrimary>
              </Modal.Footer>
            </>
          }
        </>
        :
        <>
          {/* DISPLAY ORG SCREEN */}
          <Modal.Body className="container-fluid d-flex align-items-center flex-column">
            {organizations.map((organization) => (
              <div key={organization.id} className="row w-100 my-1">
                <div className="col-md-12">
                  <OrgThumbnail
                    className={`${styles["org-item"]}`}
                    name={organization.name}
                    owner={organization.owner}
                    onClick={(e) => navigate(`/organizations/${organization.id}`)}
                  />
                </div>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-end">
            <span>or create your own organization.</span>
            <BtnSecondary onClick={e => { enableCreateMode(); showMapStep() }}>Create</BtnSecondary>
          </Modal.Footer>
        </>
      }
    </Modal>
  );
};

export default OrganizationListModal;
