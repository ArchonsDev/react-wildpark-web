import React from "react";
import styles from './style.module.css';

const Home = () => {

  return (
    <div className={`${styles.Home} container-fluid px-0`}>
      <div className={`${styles.backdrop}`}>
        <div className={`${styles.content} container d-flex flex-column justify-content-center align-items-center`}>
            <p className={`${styles.tagline} col-md-10`}>Finding a <u className={`${styles['highlighted-text']}`}>parking space</u> has never been this easy!</p>
            <div className={`${styles['cta-button']} px-5 py-3 mt-3`}>Get Started</div>
        </div>
      </div>
      <small className={`${styles['credits']}`} href="http://www.freepik.com">Header designed by upklyak / Freepik</small>
    </div>
  );
}

export default Home;