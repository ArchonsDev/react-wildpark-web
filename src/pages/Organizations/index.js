import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";

import OrgParking from "./OrgParking";
import OrgDetails from "./OrgDetails";
import BtnPrimary from "../../common/Buttons/BtnPrimary";

import OrganizationContext from "../../contexts/OrganizationContext";
import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./styles.module.css";
import { useParams } from "react-router";

const Organizations = () => {
  const { id } = useParams();
  const { sessionUser } = useContext(SessionUserContext);

  const [views, setViews] = useState({ information: true, parking: false, })
  const [org, setOrg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [accountOrgs, setAccountOrgs] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const hasPerms = (user, orgs, orgId) => {
    console.log(orgs, orgId);
    return orgs?.ownedOrganizations.some(org => org.id === parseInt(orgId)) ||
      orgs?.memberOrganizations.some(org => org.id === parseInt(orgId)) || user.role === "ADMIN";
  };

  const isMember = (orgs, orgId) => {
    return orgs?.ownedOrganizations?.some(org => org.id === parseInt(orgId)) ||
      orgs?.adminOrganizations?.some(org => org.id === parseInt(orgId)) ||
      orgs?.memberOrganization?.some(org => org.id === parseInt(orgId));
  }

  const fetchAccountOrgs = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/accounts/${sessionUser.id}/organizations`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        if (response.data) {
          setAccountOrgs(response.data);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  const handleSwitchView = e => {
    switch (e.target.name) {
      case "parking":
        setViews({ parking: true, information: false });
        break;
      default:
        setViews({ parking: false, information: true });
    }
  };

  const fetchOrg = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/organizations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        if (response.data) {
          console.log(response.data);
          setOrg(response.data);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchOrg();
    fetchAccountOrgs();
  }, [id]);

  useEffect(() => {
    if (org && accountOrgs) {
      setIsAdmin(hasPerms(sessionUser, accountOrgs, id));
    }
  }, [org, accountOrgs, sessionUser, id]);

  const orgContextValue = {
    org, fetchOrg, hasPerms, accountOrgs, isMember, fetchAccountOrgs
  }

  return (
    <OrganizationContext.Provider value={orgContextValue}>
      <Container fluid className={`${styles.Organizations} d-flex flex-column justify-content-end p-0 m-0`}>
        <Container className={`${styles.content} ${styles.border} d-flex flex-column p-5`}>
          <Row className={`${styles.banner} ${styles.border} row mb-3 py-2`}>
            <Col md={1} className="d-flex justify-content-center align-items-center">
              <i className="fa-solid fa-building fa-5x mx-2"></i>
            </Col>

            <Col md={7} className="d-flex flex-column justify-content-center">
              <span className={`${styles['org-name']}`}>{org?.name}</span>
            </Col>

            {isAdmin && <>
              {!editMode ?
                <Col md={4} className={`${styles['edit-btn']} ms-auto d-flex justify-content-end align-items-center`} onClick={e => setEditMode(true)}>
                  <i className="fa-regular fa-pen-to-square mx-2"></i>
                  Edit details
                </Col>
                :
                <Col md={4} className={`${styles['edit-btn']} ms-auto d-flex justify-content-end align-items-center`}>
                  <BtnPrimary onClick={e => setEditMode(false)}>Cancel</BtnPrimary>
                </Col>
              }
            </>}
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
              {views.information && org && <OrgDetails editMode={editMode} onSave={setEditMode} />}
              {views.parking && org && <OrgParking />}
            </Col>
          </Row>
        </Container>
      </Container>
    </OrganizationContext.Provider>
  );
}

export default Organizations;
