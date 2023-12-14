import React, { useState, useContext, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

import OrgListModal from "../../common/Modals/OrgListModal";
import BtnPrimary from "../../common/Buttons/BtnPrimary";
import OrgThumbnail from "../../common/Cards/OrgThumbnail";

import { getAccountOrgs } from "../../api/accounts";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./styles.module.css";

const OrganizationCard = () => {
  const { sessionUser } = useContext(SessionUserContext);

  const [orgs, setOrgs] = useState(null);
  const [showOrganizationsModal, setShowOrganizationsModal] = useState(false);

  const navigate = useNavigate();

  const fetchOrgs = async () => {
    getAccountOrgs(
      {
        id: sessionUser.id
      },
      (response) => {
        if (response?.data) {
          setOrgs(response.data);
        }
      }
    )
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const hasOrg = orgs && (
    orgs.ownedOrganizations.length ||
    orgs.adminOrganizations.length ||
    orgs.memberOrganizations.length
  );

  const openOrganizationsModal = () => {
    setShowOrganizationsModal(true);
  };

  const closeOrganizationsModal = () => {
    setShowOrganizationsModal(false);
  };

  return (
    <Card className={styles.card} style={{ height: "100%" }}>
      <Card.Header
        className={`${styles.cardHeader} d-flex justify-content-center`}>
        Organizations
      </Card.Header>


      {hasOrg ?
        <>
          <Card.Body className={`${styles.cardContent} d-flex flex-column align-items-center"`}>
            {orgs.ownedOrganizations.map(org => (
              <OrgThumbnail key={org.id} onClick={e => navigate(`/organizations/${org.id}`)} className={`${styles['org-item']} w-100 my-1`} name={org.name} owner={"Owner"} />
            ))}
            {orgs.adminOrganizations.map(org => (
              <OrgThumbnail key={org.id} onClick={e => navigate(`/organizations/${org.id}`)} className={`${styles['org-item']} w-100 my-1`} name={org.name} owner={"Admin"} />
            ))}
            {orgs.memberOrganizations.map(org => (
              <OrgThumbnail key={org.id} onClick={e => navigate(`/organizations/${org.id}`)} className={`${styles['org-item']} w-100 my-1`} name={org.name} owner={"Member"} />
            ))}
          </Card.Body>
          <Card.Footer className="container-fluid m-0 px-0">
            <Row className="d-flex justify-content-end">
              <Col sm={12} className="d-flex justify-content-end">
                <BtnPrimary onClick={openOrganizationsModal}>View All</BtnPrimary>
              </Col>
            </Row>
          </Card.Footer>
        </>
        :
        <Card.Body className={`${styles.cardContent} d-flex flex-column justify-content-center align-items-center"`} style={{ cursor: "pointer" }} onClick={openOrganizationsModal}>

          <i className="d-flex justify-content-center my-1 fa-regular fa-square-plus fa-5x"></i>

          <Card.Text className="text-muted text-center">
            Click to create or join an organization.
          </Card.Text>
        </Card.Body>
      }
      <OrgListModal show={showOrganizationsModal} closeCallback={closeOrganizationsModal} />
    </Card>
  );
};

export default OrganizationCard;