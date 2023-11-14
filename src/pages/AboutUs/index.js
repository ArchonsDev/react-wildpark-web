import React from "react";
import styles from "./style.module.css";
import dogs1 from "../../images/dogs1.jpg";
import dogs2 from "../../images/dogs2.jpg";
import dogs3 from "../../images/dogs3.jpg";
import dogs4 from "../../images/dogs4.png";
import parkingan from "../../images/parkingan.jpg";
import calendar from "../../images/calendar.png";

const AboutUs = () => {
  return (
    <div>
      <div className={styles.backdrop}>
        <div className={styles.aboutHeader}>
          <span>About Us</span>
        </div>
      </div>

      <div className={styles.whiteContainer}>
        <div className={styles.storyHeader}>
          <span>Our Story</span>
        </div>

        <div className={styles.storyPic}>
          <img src={parkingan} alt="parkingan" />
        </div>

        <div className={styles.storyParagraph}>
          <p>
            sauna kita mi ang mga studyante sa cit galisod kay usa ra ka ticket
            ang gi allow sa cit per student unya perting mahala sad intawn kaayo
            tag 1k ang sa studyante nya sa faculty kay 200 unfair kaayo noh? ang
            studyante unta to ang 200 nya 1k sa faculty kay naa mana silay
            trabaho mga maderpaker shet
          </p>
        </div>

        <div className={styles.line}></div>

        <div className={styles.membersHeader}>
          <span>Our Members</span>
        </div>

        <div className={styles.imgContainer}>
          <div className={styles.member}>
            <img src={dogs1} alt="dogs1" className={styles.iconStyle} />
            <p>Brent Uriel Empasis</p>
          </div>

          <div className={styles.member}>
            <img src={dogs2} alt="dogs2" className={styles.iconStyle} />
            <p>Dawn Raine Dy</p>
          </div>

          <div className={styles.member}>
            <img src={dogs3} alt="dogs3" className={styles.iconStyle} />
            <p>Cedrick Clloyd Paglinawan</p>
          </div>

          <div className={styles.member}>
            <img src={dogs4} alt="dogs4" className={styles.iconStyle} />
            <p>Harold Jamiro II</p>
          </div>
        </div>

        <div className={styles.line2}></div>

        <div className={styles.hiringPic}>
          <img src={calendar} alt="calendar" />
        </div>

        <div className={styles.hiringHeader}>
          <span>We're Hiring!</span>
        </div>

        <div className={styles.hiringParagraph}>
          <p>
            nangita mi ug inspirational and motivational na desperate na another
            team member kay mag bonding2 mi tanan naa pay libre dukol sa mo apil
            hehe mwa mwa
          </p>
        </div>

        <button className={styles.hiringButton}>Apply Now</button>
      </div>
    </div>
  );
};

export default AboutUs;
