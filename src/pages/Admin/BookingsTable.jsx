import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, Row, Col, ListGroup } from "react-bootstrap";

import { useSwitch } from "../../hooks/useSwitch";
import { useTrigger } from "../../hooks/useTrigger";
import BookingModal from "../../common/Modals/BookingModal";

import BtnPrimary from "../../common/Buttons/BtnPrimary";
import styles from "./style.module.css";

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [showModal, openModal, hideModal] = useSwitch();

  const [showSuccess, triggerShowSuccess] = useTrigger(false);
  const [showError, triggerShowError] = useTrigger(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/accounts/",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setAccounts(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  const fetchBookings = async () => {
    const accountBookings = await Promise.all(
      accounts.map(async (account) => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/v1/accounts/${account.id}/bookings`,
            {
              headers: {
                Authorization: `Bearer ${Cookies.get("userToken")}`,
              },
            }
          );
          if (response.status === 200)
            return { accountId: account.id, bookings: response.data };
        } catch (error) {
          if (error.response && error.response.status === 403) {
            console.log(error);
          }
        }
        return { accountId: account.id, bookings: [] };
      })
    );
    setBookings(accountBookings);
  };

  const deleteError = (message) => {
    setErrorMessage(message);
    triggerShowError(3000);
  };

  const deleteSuccess = async () => {
    triggerShowSuccess(3000);
    await fetchBookings();
  };

  useEffect(() => {
    if (selectedAccount) {
      const updatedAccount = bookings.find(
        (book) => book.accountId === selectedAccount.accountId
      );
      if (updatedAccount) {
        console.log(updatedAccount);
        setSelectedAccount(updatedAccount);
      }
    }
  }, [bookings, selectedAccount]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  useEffect(() => {
    if (accounts.length > 0) {
      fetchBookings();
      console.log(bookings);
    }
  }, [accounts]);

  return (
    <>
      {selectedAccount ? (
        <>
          <Row>
            {showSuccess && (
              <div
                className="alert alert-success d-flex justify-content-center align-items-center mb-3"
                role="alert">
                Booking successfully deleted!
              </div>
            )}

            {errorMessage && showError && (
              <div
                className="alert alert-danger d-flex justify-content-center align-items-center mb-3"
                role="alert">
                {errorMessage}
              </div>
            )}
          </Row>
          <Card className="mb-3" style={{ width: "100%" }}>
            <Card.Body className={styles.tableHeader}>
              <Card.Title>
                {
                  accounts.find((acc) => acc.id === selectedAccount.accountId)
                    .firstname
                }{" "}
                {
                  accounts.find((acc) => acc.id === selectedAccount.accountId)
                    .lastname
                }
                {"'s Bookings"}
              </Card.Title>
            </Card.Body>
            <ListGroup>
              <ListGroup.Item
                className={styles.tableContent}
                style={{ pointerEvents: "none" }}>
                <Row>
                  <Col xs={1}>ID</Col>
                  <Col xs={3}>Organization</Col>
                  <Col xs={2}>Parking Area</Col>
                  <Col xs={2}>Vehicle</Col>
                  <Col xs={3}>Status</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup>
              {selectedAccount.bookings.map((booking) => (
                <ListGroup.Item
                  key={booking.id}
                  className={styles.tableContent}>
                  <Row>
                    <Col xs={1}>{booking.id}</Col>
                    <Col xs={3}>{booking.organization.name}</Col>
                    <Col xs={2}>{booking.parkingArea}</Col>
                    <Col xs={2}>{booking.vehicle}</Col>
                    <Col xs={3}>{booking.status}</Col>
                    <Col xs={1}>
                      <i
                        onClick={() => {
                          openModal();
                          setSelectedBooking(booking);
                        }}
                        className="fa-solid fa-circle-info"></i>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
              <BookingModal
                show={showModal}
                onHide={hideModal}
                data={selectedBooking}
                deleteSuccess={deleteSuccess}
                deleteError={deleteError}
              />
            </ListGroup>
          </Card>
          <Row className="d-flex">
            <Col>
              <BtnPrimary onClick={() => setSelectedAccount(null)}>
                Back
              </BtnPrimary>
            </Col>
          </Row>
        </>
      ) : (
        <Card style={{ width: "100%" }}>
          <Card.Body className={styles.tableHeader}>
            <Card.Title>Bookings</Card.Title>
          </Card.Body>
          <ListGroup>
            <ListGroup.Item
              className={styles.tableContent}
              style={{
                pointerEvents: "none",
              }}>
              <Row>
                <Col xs={4}>User ID</Col>
                <Col xs={4}>Name</Col>
                <Col xs={4}>Bookings</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup>
            {bookings.map((booking) => {
              const account = accounts.find(
                (acc) => acc.id === booking.accountId
              );
              return (
                <ListGroup.Item
                  key={booking.accountId}
                  className={styles.tableContent}
                  style={{
                    pointerEvents: booking.bookings.length === 0 ? "none" : "",
                  }}
                  onClick={() =>
                    booking.bookings.length > 0 && setSelectedAccount(booking)
                  }>
                  <Row>
                    <Col xs={4}>{booking.accountId}</Col>
                    <Col xs={4}>
                      {account.firstname} {account.lastname}
                    </Col>
                    <Col xs={4}>{booking.bookings.length}</Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Card>
      )}
    </>
  );
};

export default BookingsTable;
