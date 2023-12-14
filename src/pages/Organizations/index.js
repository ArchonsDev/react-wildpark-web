import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import OrgMembers from "./OrgMembers";
import OrgParking from "./OrgParking";
import OrgDetails from "./OrgDetails";
import BtnPrimary from "../../common/Buttons/BtnPrimary";

import { useSwitch } from "../../hooks/useSwitch";
import { getAccountOrgs } from "../../api/accounts";
import { getOrganization } from "../../api/organizations";

import OrganizationContext from "../../contexts/OrganizationContext";
import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./styles.module.css";
import { useParams } from "react-router";

const isOwner = (user, orgs, orgId) => {
  return orgs?.ownedOrganizations.some((org) => org.id === parseInt(orgId)) ||
    user.role === "ADMIN";
}

const hasPerms = (user, orgs, orgId) => {
  // console.log(orgs, orgId);
  return (
    orgs?.ownedOrganizations.some((org) => org.id === parseInt(orgId)) ||
    orgs?.adminOrganizations.some((org) => org.id === parseInt(orgId)) ||
    user.role === "ADMIN"
  );
};

const isMember = (orgs, orgId) => {
  return (
    orgs?.ownedOrganizations?.some((org) => org.id === parseInt(orgId)) ||
    orgs?.adminOrganizations?.some((org) => org.id === parseInt(orgId)) ||
    orgs?.memberOrganizations.some((org) => org.id === parseInt(orgId))
  );
};

const Organizations = () => {
  const { id } = useParams();

  const { sessionUser, reloadUser } = useContext(SessionUserContext);

  const [org, setOrg] = useState(null);

  const [editMode, enableEditMode, disableEditMode] = useSwitch();
  const [accountOrgs, setAccountOrgs] = useState(null);
  const [views, setViews] = useState({
    information: true,
    parking: false,
    members: false,
  });

  const isOrgOwner = org && accountOrgs && isOwner(sessionUser, accountOrgs, org.id);
  const isOrgAdmin = org && accountOrgs && hasPerms(sessionUser, accountOrgs, org.id);
  const isOrgMember = org && accountOrgs && isMember(accountOrgs, org.id);

  const fetchAccountOrgs = async () => {
    getAccountOrgs({ id: sessionUser.id }, (response) => response?.data && setAccountOrgs(response.data));
  };

  const handleSwitchView = (e) => {
    switch (e.target.name) {
      case "parking":
        setViews({ parking: true, information: false, members: false });
        break;
      case "members":
        setViews({ parking: false, information: false, members: true });
        break;
      default:
        setViews({ parking: false, information: true, members: false });
    }
  };

  const fetchOrg = async () => {
    getOrganization({ id: id }, (response) => response?.data && setOrg(response.data));
  };

  useEffect(() => {
    fetchOrg();
    reloadUser();
  }, [id]);

  useEffect(() => {
    fetchAccountOrgs();
  }, [org, sessionUser])

  const orgContextValue = {
    org,
    accountOrgs,
    fetchOrg,
    isOrgOwner,
    isOrgAdmin,
    isOrgMember
  };

  return (
    <OrganizationContext.Provider value={orgContextValue}>
      <Container
        fluid
        className={`${styles.Organizations} d-flex flex-column justify-content-end p-0 m-0`}>
        <Container
          className={`${styles.content} ${styles.border} d-flex flex-column p-5`}>
          <Row className={`${styles.banner} ${styles.border} row mb-3 py-2`}>
            <Col
              md={1}
              className="d-flex justify-content-center align-items-center">
              <i className="fa-solid fa-building fa-5x mx-2"></i>
            </Col>

            <Col md={7} className="d-flex flex-column justify-content-center">
              <span className={`${styles["org-name"]}`}>{org?.name}</span>
            </Col>

            {isOrgAdmin && (
              <>
                {!editMode ? (
                  <Col
                    md={4}
                    className={`${styles["edit-btn"]} ms-auto d-flex justify-content-end align-items-center`}
                    onClick={enableEditMode}>
                    <i className="fa-regular fa-pen-to-square mx-2"></i>
                    Edit details
                  </Col>
                ) : (
                  <Col
                    md={4}
                    className={`${styles["edit-btn"]} ms-auto d-flex justify-content-end align-items-center`}>
                    <BtnPrimary onClick={disableEditMode}>
                      Cancel
                    </BtnPrimary>
                  </Col>
                )}
              </>
            )}
          </Row>

          <Row className="flex-grow-1">
            <Col md={3}>
              <Container fluid className="m-0 p-0">
                <Row className="mb-1">
                  <Col md={12} className="d-flex align-items-center p-0">
                    <Button
                      className={`${styles.tab} ${styles.border} ${views.information ? styles.active : ""
                        } flex-grow-1 d-flex justify-content-start align-items-center px-5`}
                      onClick={handleSwitchView}
                      name="information">
                      Information
                    </Button>
                  </Col>
                </Row>
                <Row className="mb-1">
                  <Col md={12} className="d-flex align-items-center p-0">
                    <Button
                      className={`${styles.tab} ${styles.border} ${views.parking ? styles.active : ""
                        } flex-grow-1 d-flex justify-content-start align-items-center px-5`}
                      onClick={handleSwitchView}
                      name="parking">
                      Parking
                    </Button>
                  </Col>
                </Row>
                {/* BREEENTTTT I HOPE U CAN SEE THIS W UR BIG MONITOR!!!!! */}
                {/* CONDITIONAL RENDERING OF MEMBERS TAB 4 OWNER & ADMINS */}
                {/* IDK HOW TO DO THE OWNER PART SORRu */}
                {isOrgAdmin && (
                  <Row>
                    <Col md={12} className="d-flex align-items-center p-0">
                      <Button
                        className={`${styles.tab} ${styles.border} ${views.members ? styles.active : ""
                          } flex-grow-1 d-flex justify-content-start align-items-center px-5`}
                        onClick={handleSwitchView}
                        name="members">
                        Members
                      </Button>
                    </Col>
                  </Row>
                )}
              </Container>
            </Col>
            <Col md={9} className={`${styles["tab-content"]} ${styles.border}`}>
              {views.information && org && (
                <OrgDetails editMode={editMode} onCancelEdit={disableEditMode} />
              )}
              {views.parking && org && <OrgParking />}
              {views.members && org && <OrgMembers />}
            </Col>
          </Row>
        </Container>
      </Container>
    </OrganizationContext.Provider>
  );
};

export default Organizations;
