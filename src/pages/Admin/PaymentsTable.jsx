import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, Row, Col, ListGroup, Container, Form, Button } from "react-bootstrap";

import { useTrigger } from "../../hooks/useTrigger";
import { updatePayment, deletePayment } from "../../api/payments"; // Update API imports

import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";
import BtnPrimary from "../../common/Buttons/BtnPrimary";
import BtnSecondary from "../../common/Buttons/BtnSecondary";
import styles from "./style.module.css";

const PaymentsTable = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [form, setForm] = useState({
    id: "",
    date: "",
    amount: "",
    paymentType: "",
    payor: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const {
    triggerShowSuccess,
    triggerShowError,
    showSuccess,
    showError,
  } = useTrigger();

  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const enableEditing = () => {
    setIsEditing(true);
  };

  const disableEditing = () => {
    setIsEditing(false);
    setForm({
      id: "",
      date: "",
      amount: "",
      payment_type: "",
      payor_id: "",
    });
  };

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

  const handleSave = async () => {
    updatePayment(
      {
        id: selectedPayment.id,
        ...form,
      },
      (response) => {
        triggerShowSuccess(3000);

        setTimeout(() => {
          disableEditing();
          fetchPayments();
        }, 3000);
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

  const handleDelete = async () => {
    deletePayment(
      {
        id: selectedPayment.id,
      },
      (response) => {
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
    if (selectedPayment) {
      setForm({
        date: selectedPayment.date,
        amount: selectedPayment.amount,
        paymentType: selectedPayment.paymentType,
        payor: selectedPayment.payor,
      });
    }
  }, [selectedPayment]);

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <>
      {isEditing ? (
        <Container fluid className={styles.form}>
          <Row>
            <Col md={12}>
              {/* RESPONSE RESULTS */}
              <Row>
                {showSuccess && (
                  <div
                    className="alert alert-success d-flex justify-content-center align-items-center mb-3"
                    role="alert">
                    Payment details successfully updated!
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

              {/* FORM */}
              <Row className="mb-3">
                <Col md={3}>Payor</Col>
                <Col md={9} className="d-flex" style={{ fontFamily: "Poppins-SemiBold" }}>
                  {form.payor}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3}>Date</Col>
                <Col md={9} className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3}>Amount</Col>
                <Col md={9} className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Amount"
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3}>Payment Type</Col>
                <Col md={9} className="d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Payment Type"
                    name="paymentType"
                    value={form.paymentType}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <BtnPrimary variant="secondary" onClick={disableEditing}>
                    Cancel
                  </BtnPrimary>
                  <BtnSecondary variant="primary" onClick={handleSave}>
                    Save
                  </BtnSecondary>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
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
                  <Col xs={3}>Payor</Col>
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
                    <Col xs={3}>{payment.payor}</Col>
                    <Col xs={1}>
                      <i
                        className={`${styles.icon} fa-solid fa-pen`}
                        onClick={() => {
                          enableEditing();
                          setSelectedPayment(payment);
                        }}
                      ></i>
                    </Col>
                    <Col xs={1}>
                      <i
                        className={`${styles.icon} fa-solid fa-trash-can`}
                        onClick={() => {
                          openModal();
                          setSelectedPayment(payment);
                        }}
                      ></i>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </>
      )}
    </>
  );
};

export default PaymentsTable;
