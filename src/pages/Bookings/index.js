import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";

import BtnPrimary from "../../common/Buttons/BtnPrimary";
import BtnSecondary from "../../common/Buttons/BtnSecondary";
import MapComponent from "../../common/MapComponent";
import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";

import { useSwitch } from "../../hooks/useSwitch";
import { getAccountBookings } from "../../api/accounts";
import { deleteBooking } from "../../api/bookings";

import SessionUserContext from "../../contexts/SessionUserContext";

import styles from "./style.module.css";
//TO-DO:
// Add tabs of user's bookings
// Add details of the booking details
// Necessary buttons (Reserved and cancel)
// Actual rendering of booked space (not placeholder)

const Bookings = () => {
  const { sessionUser } = useContext(SessionUserContext);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState(null);
  const [selected, setSelected] = useState(null);

  const [confirmDeleteModal, showConfirmdeleteModal, hideConfirmDeleteModal] = useSwitch();

  const fetchBookings = async () => {
    await getAccountBookings(
      { id: sessionUser.id },
      (response) => response?.data && setBookings(response.data)
    );
  };

  useEffect(() => {
    fetchBookings();

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
              <div className={`${styles['booking-selector']} col-sm-4 mb-2 container-fluid d-flex align-items-start flex-column p-0 m-0`}>
                {bookings && bookings.map(booking => (
                  <div key={booking.id} className="row mb-4">
                    <div className={`${selected === booking ? styles['active-button'] : styles['inactive-button']} col-md-12 d-flex justify-content-center`}>
                      <Button
                        onClick={() => selected === booking ? setSelected(null) : setSelected(booking)}>
                        <span>{booking.organization.name}</span>
                        <p>{booking.vehicle} @ {(new Date(booking.date)).toLocaleDateString()} {(new Date(booking.date)).toLocaleTimeString()}</p>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {selected &&
                <div className={`${styles['booking-details']} col-sm-8 mb-2 container-fldui d-flex flex-column m-0 p-0`}>
                  <div className={`${styles.field} row flex-grow-1 d-flex flex-column`}>
                    <MapComponent
                      className="col-md-12 flex-grow-1"
                      startPos={[selected.organization.latitude, selected.organization.longitude]}
                      markers={[
                        {
                          name: selected.organization.name,
                          lat: selected.organization.latitude,
                          lng: selected.organization.longitude
                        }
                      ]}
                      zoom={15}
                    />
                  </div>
                  <div className={`${styles.field} row py-2 px-3`}>
                    <div className="col-md-3">
                      Date & Time
                    </div>
                    <div className="col-md-9">
                      {(new Date(selected.date)).toLocaleDateString()} {(new Date(selected.date)).toLocaleTimeString()}
                    </div>
                  </div>
                  <div className={`${styles.field} row py-2 px-3`}>
                    <div className="col-md-3">
                      Duration
                    </div>
                    <div className="col-md-9">
                      {selected.duration / 60} minutes
                    </div>
                  </div>
                  <div className={`${styles.field} row py-2 px-3`}>
                    <div className="col-md-3">
                      Location
                    </div>
                    <div className="col-md-9">
                      {selected.organization.name}
                    </div>
                  </div>
                  <div className={`${styles.field} row py-2 px-3`}>
                    <div className="col-md-3">
                      Parking Area
                    </div>
                    <div className="col-md-9">
                      {selected.parkingArea}
                    </div>
                  </div>
                  <div className={`${styles.field} row py-2 px-3`}>
                    <div className="col-md-3">
                      Vehicle
                    </div>
                    <div className="col-md-9">
                      {selected.vehicle}
                    </div>
                  </div>
                  <div className="row py-2 px-3">
                    <div className="col-md-3">
                      Status
                    </div>
                    <div className="col-md-9">
                      {selected.status}
                    </div>
                  </div>
                  <div className="row py-3">
                    <div className="d-flex justify-content-between">
                      <BtnPrimary
                        onClick={showConfirmdeleteModal}
                      >Cancel</BtnPrimary>
                      <BtnSecondary>Proceed to payment</BtnSecondary>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div >

      <ConfirmDeleteModal
        size="md"
        show={confirmDeleteModal}
        onHide={hideConfirmDeleteModal}
        onConfirm={async () => { await deleteBooking({ id: selected.id }); await fetchBookings(); setSelected(null); }}
        header={<>Cancel Booking</>}
        message={<>Are you sure you want to cancel this booking? (This action cannot be undone!)</>}
      />
    </div >
  );
};

export default Bookings;
