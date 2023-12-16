import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, Row, Col, ListGroup } from "react-bootstrap";

import { useTrigger } from "../../hooks/useTrigger";
import { deletePayment } from "../../api/payments"; // Update API imports

import { useSwitch } from "../../hooks/useSwitch";
import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";

import styles from "./style.module.css";

const PaymentsTable = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const {
    triggerShowSuccess,
    triggerShowError,
    showSuccess,
    showError,
  } = useTrigger();

  const [showModal, openModal, closeModal] = useSwitch();

  const fetchPayments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/payments/",
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("userToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setPayments(response.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.log(error);
      }
    }
  };

  const handleDelete = async () => {
    deletePayment(
      {
        id: selectedPayment.id,
      },
      (response) => {
        triggerShowSuccess(3000);
        fetchPayments();
      },
      (error) => {
        if (error.response && error.response.data) {
          setErrorMessage(<>{error.response.data}</>);
        } else {
          setErrorMessage(<>An error occurred.</>);
        }
        triggerShowError(5000);
      }
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <>
      <Row>
        {showSuccess && (
          <div
            className="alert alert-success d-flex justify-content-center align-items-center mb-3"
            role="alert">
            Payment successfully deleted!
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
      <Card style={{ width: "100%" }}>
        <Card.Body className={styles.tableHeader}>
          <Card.Title>Payments</Card.Title>
        </Card.Body>
        <ListGroup>
          <ListGroup.Item className={styles.tableContent}>
            <Row>
              <Col xs={1}>ID</Col>
              <Col xs={2}>Date</Col>
              <Col xs={2}>Amount</Col>
              <Col xs={2}>Payment Type</Col>
              <Col xs={4}>Payor</Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          {payments.map((payment) => (
            <ListGroup.Item key={payment.id} className={styles.tableContent}>
              <Row>
                <Col xs={1}>{payment.id}</Col>
                <Col xs={2}>{formatDate(payment.date)}</Col>
                <Col xs={2}>{payment.amount}</Col>
                <Col xs={2}>{payment.paymentType}</Col>
                <Col xs={4}>{payment.payor}</Col>
                <Col xs={1}>
                  <i
                    className={`${styles.icon} fa-solid fa-trash-can`}
                    onClick={() => {
                      openModal();
                      setSelectedPayment(payment);
                    }}></i>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
          <ConfirmDeleteModal
            show={showModal}
            onHide={closeModal}
            onConfirm={handleDelete}
            header={""}
            message={""}
          />
        </ListGroup>
      </Card>
    </>
  );
};

export default PaymentsTable;
