import React, { useContext } from "react";
import styles from "./style.module.css";

import SessionUserContext from "../../contexts/SessionUserContext";

import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();
  const { sessionUser, setSessionUser } = useContext(SessionUserContext);

  return (
    <div className={`${styles.Home}`}>
      <div
        className={`${styles.content} container d-flex flex-column justify-content-center align-items-center`}>
        <div className="row d-flex justify-content-center">
          <div className={`${styles.tagline} col-md-10`}>
            Finding a{" "}
            <span className={`${styles["highlighted-text"]}`}>
              parking space
            </span>{" "}
            has never been this easy!
          </div>
        </div>

        <div className="row">
          <button
            className={`${styles["cta-button"]} col-md-12 px-5 py-3 mt-3`}
            onClick={(e) => {
              if (sessionUser === null) {
                window.open("/register", "_blank");
              } else {
                navigate("/dashboard");
              }
            }}>
            Get Started
          </button>
        </div>
      </div>

      <small className={`${styles["credits"]}`} href="http://www.freepik.com">
        Header designed by upklyak / Freepik
      </small>
    </div>
  );
};

export default Home;
