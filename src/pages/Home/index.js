import React from "react";
import styles from './style.module.css';

const Home = () => {

  return (
    <>
      <div className={`container-fluid px-0  ${styles['banner']} ${styles.Home}`}>
        <div className="row">
          <div className="col-lg-12">
            <span className={`d-flex justify-content-center ${styles['tagline']}`}>
              <p>Finding a <u className={`${styles['highlighted-text']}`}>parking space</u> has never been this easy!</p>
            </span>
          </div>
        </div>
        <div className={`container d-flex justify-content-center ${styles.content}`}>
          <span>Find a guaranteed parking space everytime using our Automated Parking Management and reservation system.</span>
        </div>
        <small className={`${styles['credits']}`} href="http://www.freepik.com">Header designed by upklyak / Freepik</small>
      </div >
    </>
  );
}

export default Home;