import React from "react";
import styles from "./style.module.css";

const Home = () => {
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
            <button
              type="button"
              className={`${styles["cta-button"]} px-5 py-3 mt-3`}>
              Get Started
            </button>
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
