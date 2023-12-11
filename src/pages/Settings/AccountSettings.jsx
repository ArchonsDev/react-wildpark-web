import React, { useContext } from "react";

import BtnSecondary from "../../common/Buttons/BtnSecondary";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./style.module.css";

const AccountSettings = () => {
  const { sessionUser } = useContext(SessionUserContext);

  return (
    <div className={`${styles.settingsContent} container-fluid p-0`}>

      <div className="row">
        <div className={`${styles.accountHeader} d-flex flex-column justify-content-center align-items-center py-4`}>
          <i
            className={`fa-solid fa-circle-user fa-7x mb-3 ${styles.userPfp}`}></i>
          <BtnSecondary>Edit Profile</BtnSecondary>
        </div>
      </div>

      <div className={`${styles.field} row px-5 py-2`}>
        <div className="col-md-3">
          <span>Email Address: </span>
        </div>
        <div className="col-md-9">
          <span>{sessionUser.email}</span>
        </div>
      </div>

      <div className={`${styles.field} row px-5 py-2`}>
        <div className="col-md-3">
          <span>Name: </span>
        </div>
        <div className="col-md-9">
          <span>{sessionUser.firstname} {sessionUser.lastname}</span>
        </div>
      </div>

      <div className={`${styles.field} row px-5 py-2`}>
        <div className="col-md-3">
          <span>Birthday: </span>
        </div>
        <div className="col-md-9">
          <span>{sessionUser.birthdate}</span>
        </div>
      </div>

      <div className={`${styles.field} row px-5 py-2`}>
        <div className="col-md-3">
          <span>Phone Number:</span>
        </div>
        <div className="col-md-9">
          <span>{sessionUser.contactNo}</span>
        </div>
      </div>

      <div className={`${styles.field} row px-5 py-2`}>
        <div className="col-md-3">
          <span>Gender:</span>
        </div>
        <div className="col-md-9">
          <span>{sessionUser.gender}</span>
        </div>
      </div>

      <div className={`${styles['field-no-border']} row px-5 py-2`}>
        <div className="col-md-3">
          <span>Address:</span>
        </div>
        <div className="col-md-9">
          <span>{sessionUser.street ? sessionUser.street + ', ' : ''}{sessionUser.municipality ? sessionUser.municipality + ', ' : ''}{sessionUser.province ? sessionUser.province + ', ' : ''}{sessionUser.country ? sessionUser.country + ', ' : ''}{sessionUser.zipCode !== 0 ? sessionUser.zipCode : ''}</span>
        </div>
      </div>

    </div>
  );
};

export default AccountSettings;