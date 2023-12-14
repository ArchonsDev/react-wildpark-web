import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Card, Row, Col, ListGroup, Container } from "react-bootstrap";

import { useSwitch } from "../../hooks/useSwitch";
import { useTrigger } from "../../hooks/useTrigger";
import { updateAccount, updatePassword } from "../../api/accounts";

import BtnPrimary from "../../common/Buttons/BtnPrimary";
import BtnSecondary from "../../common/Buttons/BtnSecondary";
import ConfirmDeleteModal from "../../common/Modals/ConfirmDeleteModal";

import styles from "./style.module.css";

const UsersTable = () => {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState();
  const [isEditing, enableEditing, disableEditing] = useSwitch(false);
  const [showSuccess, triggerShowSuccess] = useTrigger(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [
    showConfirmAccountUpdate,
    openConfirmAccountUpdate,
    closeConfirmAccountUpdate,
  ] = useSwitch();
  const [showError, triggerShowError] = useTrigger(false);

  const [form, setForm] = useState({
    password: "",
    firstname: "",
    lastname: "",
    birthdate: "",
    contactNo: "",
    gender: "",
    street: "",
    municipality: "",
    province: "",
    country: "",
    zipCode: "",
  });

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const password = form.password || "";
    if (password.trim() !== "") {
      updatePassword(
        {
          id: user.id,
          password: form.password,
        },
        (response) => {
          triggerShowSuccess(3000);
          setTimeout(() => {
            disableEditing();
            fetchAccounts();
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
    } else {
      updateAccount(
        {
          id: user.id,
          ...form,
        },
        (response) => {
          // setUser(response.data);
          triggerShowSuccess(3000);
          setTimeout(() => {
            disableEditing();
            fetchAccounts();
          }, 3000);
        },
        (error) => {
          if (error.response && error.response.data) {
            error.response &&
              error.response.data &&
              setErrorMessage(<>{error.response.data}</>);
          } else {
            setErrorMessage(<>An error occurred.</>);
          }
          triggerShowError(5000);
        }
      );
    }
  };

  useEffect(() => {
    if (user) {
      setForm({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        birthdate: user.birthdate || "",
        contactNo: user.contactNo || "",
        gender: user.gender || "",
        street: user.street || "",
        municipality: user.municipality || "",
        province: user.province || "",
        country: user.country || "",
        zipCode: user.zipCode || "",
      });
    }
  }, [user]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <>
      {isEditing ? (
        <Container fluid className={styles.form}>
          <Row>
            <Col md={12}>
              <Row>
                {showSuccess && (
                  <div
                    className="alert alert-success d-flex justify-content-center align-items-center mb-3"
                    role="alert">
                    Account details successfully updated!
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
              <Row className="mb-4">
                <Col md={3}>Role</Col>
                <Col
                  md={9}
                  className="d-flex"
                  style={{ fontFamily: "Poppins-SemiBold" }}>
                  {user.role}
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>Name</Col>
                <Col md={9} className="d-flex">
                  <input
                    className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                    placeholder="Firstname"
                    value={form.firstname}
                    name="firstname"
                    onChange={handleChange}
                  />
                  <input
                    className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                    placeholder="Lastname"
                    value={form.lastname}
                    name="lastname"
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mt-4 mb-4">
                <Col md={3}>E-mail</Col>
                <Col
                  md={9}
                  className="d-flex"
                  style={{ fontFamily: "Poppins-SemiBold" }}>
                  {user.email}
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>Password</Col>
                <Col md={9} className="d-flex">
                  <input
                    className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                    placeholder="Password"
                    value={form.password}
                    name="password"
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>Gender</Col>
                <Col md={9} className="d-flex">
                  <select
                    className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                    value={form.gender}
                    onChange={handleChange}
                    name="gender">
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>Contact Number</Col>
                <Col md={9} className="d-flex">
                  <input
                    className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                    placeholder="Contact number"
                    value={form.contactNo}
                    name="contactNo"
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mb-2">
                <Col md={3}>Birthday</Col>
                <Col md={9} className="d-flex">
                  <input
                    className={`${styles["field-edit"]} flex-grow-1 mx-1 p-2`}
                    placeholder="(YYYY-MM-DD)"
                    value={form.birthdate}
                    name="birthdate"
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={3}>Address</Col>
                <Col md={9} className="d-flex">
                  <Container fluid className="d-flex flex-column p-0">
                    <input
                      className={`${styles["field-edit"]} flex-grow-1 m-1 p-2`}
                      placeholder="Street"
                      value={form.street}
                      name="street"
                      onChange={handleChange}
                    />
                    <input
                      className={`${styles["field-edit"]} flex-grow-1 m-1 p-2`}
                      placeholder="Municipality"
                      value={form.municipality}
                      name="municipality"
                      onChange={handleChange}
                    />
                    <input
                      className={`${styles["field-edit"]} flex-grow-1 m-1 p-2`}
                      placeholder="Province"
                      value={form.province}
                      name="province"
                      onChange={handleChange}
                    />
                    <input
                      className={`${styles["field-edit"]} flex-grow-1 m-1 p-2`}
                      placeholder="Country"
                      value={form.country}
                      name="country"
                      onChange={handleChange}
                    />
                    <input
                      className={`${styles["field-edit"]} flex-grow-1 m-1 p-2`}
                      placeholder={
                        form.zipCode === 0 || form.zipCode === ""
                          ? "Zip Code"
                          : form.zipCode
                      }
                      value={
                        form.zipCode === 0 || form.zipCode === ""
                          ? ""
                          : form.zipCode
                      }
                      name="zipCode"
                      onChange={handleChange}
                    />
                  </Container>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <BtnPrimary onClick={disableEditing}>Cancel</BtnPrimary>
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                  <BtnSecondary onClick={openConfirmAccountUpdate}>
                    Save
                  </BtnSecondary>
                  <ConfirmDeleteModal
                    show={showConfirmAccountUpdate}
                    onHide={closeConfirmAccountUpdate}
                    onConfirm={handleSave}
                    header={"Update Account"}
                    message={"Do you wish to save these changes?"}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      ) : (
        <Card style={{ width: "100%" }}>
          <Card.Body className={styles.tableHeader}>
            <Card.Title>Users</Card.Title>
          </Card.Body>
          <ListGroup>
            <ListGroup.Item className={styles.tableContent}>
              <Row>
                <Col xs={1}>ID</Col>
                <Col xs={2}>Firstname</Col>
                <Col xs={2}>Lastname</Col>
                <Col xs={3}>E-mail</Col>
                <Col xs={3}>Role</Col>
                <Col xs={1}>{""}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup>
            {accounts.map((account) => (
              <ListGroup.Item key={account.id} className={styles.tableContent}>
                <Row>
                  <Col xs={1}>{account.id}</Col>
                  <Col xs={2}>{account.firstname}</Col>
                  <Col xs={2}>{account.lastname}</Col>
                  <Col xs={3}>{account.email}</Col>
                  <Col xs={3}>{account.role}</Col>
                  <Col xs={1}>
                    <i
                      className={`${styles.icon} fa-solid fa-pen`}
                      onClick={() => {
                        enableEditing();
                        setUser(account);
                      }}></i>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </>
  );
};

export default UsersTable;
