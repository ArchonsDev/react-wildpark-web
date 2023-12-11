import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import BtnSecondary from "../../common/Buttons/BtnSecondary";
import image from "../../images/google-placeholder.png";

import { Card, ListGroup } from "react-bootstrap";

//TO-DO:
// Add tabs of user's bookings
// Add details of the booking details
// Necessary buttons (Reserved and cancel)
// Actual rendering of booked space (not placeholder)

const Bookings = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.Bookings}>
      <div
        className={`${styles.content} container d-flex flex-column justify-content-end align-items-center`}>

        <div className={`${styles.dateTab} row d-flex justify-content-end`}>
          <div
            className={`${styles.date} col-sm-3 py-2 d-flex justify-content-center align-items-center`}>
            {currentDate.toLocaleString()}
          </div>
        </div>

        <div className={`${styles.redBox} row d-flex flex-column pt-5 px-5 pb-0 mt-3`}>
          <div className={`${styles.whiteBox} flex-grow-1 col-md-12 container-fluid bg-white p-3`}>
            <div className="row">

              <div className="col-sm-3 mb-2 d-flex align-items-center flex-column">
                <span className={styles.header}>Bookings</span>
                <div className={`${styles.activeBookings} flex-grow-1 d-flex flex-column`}>
                  <span className={styles.header}>Bookings</span>
                  <span className={styles.header}>Bookings</span>
                  <span className={styles.header}>Bookings</span>
                  <span className={styles.header}>Bookings</span>
                </div>
                <BtnSecondary className="mt-auto">New Booking</BtnSecondary>
              </div>

              <div className="col-sm-9 mb-2 d-flex align-items-center flex-column">
                <Card style={{ minWidth: "100%" }}>
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
