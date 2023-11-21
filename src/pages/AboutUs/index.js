import React from "react";
import styles from "./style.module.css";
import dogs1 from "../../images/dogs1.jpg";
import dogs2 from "../../images/dogs2.jpg";
import dogs3 from "../../images/dogs3.jpg";
import dogs4 from "../../images/dogs4.png";
import sotryImg from "../../images/parkingan.jpg";
import calendar from "../../images/calendar.png";

const AboutUs = () => {
  return (
    <div className={`${styles.About}`}>
      <div className={`${styles.content} container-fluid`}>
        <div className="row mt-5 py-5">
          <span className={`${styles['page-header']} mt-5 py-5`}>About Us</span>
        </div>
      </div>

      <div className={`${styles['about-content']} bg-white`}>
        <div className="container d-flex align-items-center flex-column p-5">

          <div className="row">
            <span className={`${styles['content-header']}`}>Our Story</span>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-md-4">
              <img className={`${styles['story-img']} mt-3`} src={sotryImg} />
            </div>
            <div className="col-md-5 px-5 mt-5">
              <p className={`${styles.text}`}>Inspiration struck as we saw the hurdles in parking system—inefficiencies and unfriendly costs. Determined to bring about change, we envisioned a solution not just for us but for organizations everywhere. Thus, our journey to redefine parking management began, born from a desire to make a difference. Welcome to the genesis of innovation at <span style={{ fontFamily: "Poppins-Bold", color: "#7c0902" }}>WildPark</span>.</p>
            </div>
          </div>

          <hr className={`${styles.divider} m-5`} />

          <div className="row">
            <span className={`${styles['content-header']}`}>Our Team</span>
          </div>

          <div className="row d-flex justify-content-center align-items-center mt-3">
            <div className="col-md-3 d-flex justify-content-center align-items-center flex-column">
              <img src={dogs1} alt="dogs1" className={`${styles['icon-style']}`} />
              <p className={`${styles['icon-text']}`}>Brent Empasis</p>
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center flex-column">
              <img src={dogs2} alt="dogs1" className={`${styles['icon-style']}`} />
              <p className={`${styles['icon-text']}`}>Dawn Raine Dy</p>
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center flex-column">
              <img src={dogs3} alt="dogs1" className={`${styles['icon-style']}`} />
              <p className={`${styles['icon-text']}`}>Cedrick Paglinawan</p>
            </div>
            <div className="col-md-3 d-flex justify-content-center align-items-center flex-column">
              <img src={dogs4} alt="dogs1" className={`${styles['icon-style']}`} />
              <p className={`${styles['icon-text']}`}>Harold Jamiro II</p>
            </div>
          </div>

          <hr className={`${styles.divider} m-5`} />

          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-3 d-flex justify-content-center">
              <img className={`${styles['story-img']}`} src={calendar} />
            </div>
            <div className="col-md-6">
              <span className={`${styles['content-header']}`}>We're Hiring!</span>
              <p className={`${styles.text}`}>
                Discover a world of innovation at WildPark. We're hiring bright
                minds to be part of our dynamic team. Explore opportunities now!
                <br />
                <br />
                <span style={{ fontFamily: "Poppins-Bold", color: "#7c0902" }}>
                  Contact Us:
                </span>
                <div style={{ color: "#7c0902" }}>
                  <i class="fa-solid fa-phone"></i> <span> (032) 234 8200</span>
                  <br />
                  <i class="fa-solid fa-envelope"></i>{" "}
                  <span> wildpark@gmail.com</span>
                </div>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
