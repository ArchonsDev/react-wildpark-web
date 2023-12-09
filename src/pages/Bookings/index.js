import React from "react";
import styles from "./style.module.css";
import BtnSecondary from "../../common/Buttons/BtnSecondary";
import image from "../../images/google-placeholder.png";

import { Card, ListGroup } from "react-bootstrap";
//TO-DO:
//Add tabs of user's bookings
//Add details of the booking details
//Necessary buttons (Reserved and cancel)
//Actual rendering of booked space (not placeholder)
const Bookings = () => {
  return (
    <div className={styles.Bookings}>
      <div className={`${styles.backgroundContent} container-fluid`}>
        <div
          className={`${styles.content} container d-flex align-items-center flex-column`}>
          <div className={styles.redBox}>
            <div className={`${styles.whiteBox} d-flex flex-row`}>
              <div
                className={`col ${styles.columnStyle}`}
                style={{ justifyContent: "space-between" }}>
                <span className={styles.header}>Bookings</span>
                <div className={styles.activeBookings}></div>
                <BtnSecondary>New Booking</BtnSecondary>
              </div>

              <div
                className={`col ${styles.columnStyle}`}
                style={{ flex: "2" }}>
                <Card style={{ width: "100%" }}>
                  <Card.Img variant="top" src={image} />
                  <ListGroup className={styles.bookingDetails}>
                    <ListGroup.Item>Date & Time</ListGroup.Item>
                    <ListGroup.Item>Location</ListGroup.Item>
                    <ListGroup.Item>Parking</ListGroup.Item>
                    <ListGroup.Item>Vehicle</ListGroup.Item>
                  </ListGroup>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
