import React from "react";
import styles from "./style.module.css";
import BtnSecondary from "../../common/Buttons/BtnSecondary";
import image from "../../images/google-placeholder.png";

import { Card } from "react-bootstrap";
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
                <Card>
                  <Card.Img variant="top" src={image} />
                  <Card.Body>
                    <Card.Text className={styles.bookingDetails}>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </Card.Text>
                  </Card.Body>
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
