import React, { useState, useEffect } from "react";

import { Button } from "react-bootstrap";
import BtnSecondary from "../../common/Buttons/BtnSecondary";
import MapComponent from "../../common/MapComponent";

import styles from "./style.module.css";
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
      <div className={`${styles.content} container d-flex flex-column justify-content-end align-items-center`}>

        <div className={`${styles.dateTab} row d-flex justify-content-end`}>
          <div className={`${styles.date} col-sm-3 py-2 d-flex justify-content-center align-items-center`}>
            {currentDate.toLocaleString()}
          </div>
        </div>

        <div className={`${styles.redBox} row d-flex flex-column pt-5 px-5 pb-0 mt-3`}>
          <div className={`${styles.whiteBox} flex-grow-1 col-md-12 d-flex flex-column container-fluid bg-white py-4 px-5`}>
            <div className="row my-2 py-2">
              <div className="col-md-4 d-flex justify-content-center">
                <span className={styles.header}>Bookings</span>
              </div>
            </div>
            <div className="row flex-grow-1">
              <div className={`${styles['booking-selector']} col-sm-4 mb-2 container-fluid d-flex align-items-center flex-column p-0 m-0`}>
                <div className="row mb-4 flex-grow-1">
                  <div className={`${styles['active-button']} col-md-12 d-flex justify-content-center`}>
                    <Button>
                      Registered Vehicles <br />
                      <p>Manage your vehicles here</p>
                    </Button>
                  </div>
                </div>

                <div className="row mt-auto">
                  <BtnSecondary>New Booking</BtnSecondary>
                </div>
              </div>

              <div className={`${styles['booking-details']} col-sm-8 mb-2 container-fldui d-flex flex-column m-0 p-0`}>
                <div className={`${styles.field} row flex-grow-1 d-flex flex-column`}>
                  <MapComponent className="col-md-12 flex-grow-1" />
                </div>
                <div className={`${styles.field} row py-2 px-3`}>
                  <div className="col-md-3">
                    Date & Time
                  </div>
                  <div className="col-md-9">
                    Date & Time
                  </div>
                </div>
                <div className={`${styles.field} row py-2 px-3`}>
                  <div className="col-md-3">
                    Location
                  </div>
                  <div className="col-md-9">
                    Date & Time
                  </div>
                </div>
                <div className={`${styles.field} row py-2 px-3`}>
                  <div className="col-md-3">
                    Parking Area
                  </div>
                  <div className="col-md-9">
                    Date & Time
                  </div>
                </div>
                <div className="row py-2 px-3">
                  <div className="col-md-3">
                    Vehicle
                  </div>
                  <div className="col-md-9">
                    Date & Time
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div >
    </div >
  );
};

export default Bookings;
