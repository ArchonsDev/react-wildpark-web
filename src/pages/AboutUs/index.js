import React from "react";
import styles from "./style.module.css";
import brent from "../../images/brentoes.jpg";
import dawn from "../../images/Dawn.png";
import ced from "../../images/ced.jpg";
import harold from "../../images/Jamiro.jpeg";
import sotryImg from "../../images/parkingan.jpg";
import calendar from "../../images/calendar.png";

const AboutUs = () => {
  return (
    <div className={`${styles.About}`}>
      <div className={`${styles.content} container-fluid`}>
        <div className="row mt-5 py-5">
          <span className={`${styles["page-header"]} mt-5 py-5`}>About Us</span>
        </div>
      </div>

      <div className={`${styles["about-content"]} bg-white`}>
        <div className="container d-flex align-items-center flex-column p-5">
          <div className="row">
            <span className={`${styles["content-header"]}`}>Our Story</span>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-md-4">
              <img
                className={`${styles["story-img"]} mt-3`}
                src={sotryImg}
                alt="Parking"
              />
            </div>
            <div className="col-md-5 px-5 mt-5">
              <p className={`${styles.text}`}>
                Inspiration struck as we saw the hurdles in parking
                system—inefficiencies and unfriendly costs. Determined to bring
                about change, we envisioned a solution not just for us but for
                organizations everywhere. Thus, our journey to redefine parking
                management began, born from a desire to make a difference.
                Welcome to the genesis of innovation at{" "}
                <span style={{ fontFamily: "Poppins-Bold", color: "#7c0902" }}>
                  WildPark
                </span>
                .
              </p>
            </div>
          </div>

          <hr className={`${styles.divider} m-5`} />

          <div className="row">
            <span className={`${styles["content-header"]}`}>Our Team</span>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-md-3 d-flex justify-content-center align-items-center flex-column">
              <img
                src={brent}
                alt="Avatar"
                className={`${styles["icon-style"]}`}
              />
              <p className={`${styles["icon-text"]}`}>Brent Empasis</p>
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center flex-column">
              <img
                src={dawn}
                alt="Avatar"
                className={`${styles["icon-style"]}`}
              />
              <p className={`${styles["icon-text"]}`}>Dawn Raine Dy</p>
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center flex-column">
              <img
                src={ced}
                alt="Avatar"
                className={`${styles["icon-style"]}`}
              />
              <p className={`${styles["icon-text"]}`}>Cedrick Paglinawan</p>
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center flex-column">
              <img
                src={harold}
                alt="Avatar"
                className={`${styles["icon-style"]}`}
              />
              <p className={`${styles["icon-text"]}`}>Harold Jamiro II</p>
            </div>
          </div>

          <hr className={`${styles.divider} m-5`} />

          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-3 d-flex justify-content-center">
              <img
                className={`${styles["story-img"]}`}
                src={calendar}
                alt="Calendar"
              />
            </div>
            <div className="col-md-6">
              <span className={`${styles["content-header"]}`}>
                We're Hiring!
              </span>
              <div className={`${styles.text}`}>
                Discover a world of innovation at WildPark. We're hiring bright
                minds to be part of our dynamic team. Explore opportunities now!
                <br />
                <br />
                <span style={{ fontFamily: "Poppins-Bold", color: "#7c0902" }}>
                  Contact Us:
                </span>
                <div style={{ color: "#7c0902" }}>
                  <i className="fa-solid fa-phone"></i>{" "}
                  <span> (032) 234 8200</span>
                  <br />
                  <i className="fa-solid fa-envelope"></i>{" "}
                  <span> wildpark@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
