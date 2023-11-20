import React from "react";
import styles from "./style.module.css";
import { useNavigate } from "react-router";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.Home} container-fluid px-0`}>
      <div className={`${styles.backdropFilter}`}>
        <div className={`${styles.backdrop}`}>
          <div
            className={`${styles.content} container d-flex flex-column justify-content-center align-items-center`}>
            <p className={`${styles.tagline} col-md-10`}>
              Finding a{" "}
              <span className={`${styles["highlighted-text"]}`}>
                parking space
              </span>{" "}
              has never been this easy!
            </p>
            <a
              type="button"
              className={`${styles["cta-button"]} px-5 py-3 mt-3`}
              onClick={e => window.open("/register", "_blank")}>
              Get Started
            </a>
          </div>
        </div>
      </div>
      <small className={`${styles["credits"]}`} href="http://www.freepik.com">
        Header designed by upklyak / Freepik
      </small>
    </div>
  );
};

export default Home;
