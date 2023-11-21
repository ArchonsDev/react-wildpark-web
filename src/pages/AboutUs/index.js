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
      <div className={`${styles.backdropFilter}`}>
        <div className={`${styles.backdrop}`}>
          <div className={`${styles["about-content"]} container-fluid`}>
            <div className="row">
              <span className={`${styles["page-header"]} col-md-12`}>
                About Us
              </span>
            </div>
            <div className="row">
              <div
                className={`${styles["about-content"]} container-fluid bg-white d-flex flex-column p-5`}
              >
                <div className="row">
                  <div className="col-md-12">
                    <span className={`${styles["content-header"]}`}>
                      Our Story
                    </span>
                  </div>
                </div>
                <div className="row d-flex justify-content-center align-items-center mt-3">
                  <div className="col-md-3 d-flex justify-content-center flex-column">
                    <img className={`${styles["story-img"]}`} src={sotryImg} />
                  </div>
                  <div className="col-md-6">
                    <p className={`${styles.text}`}>
                      Inspiration struck as we saw the hurdles in parking
                      system—inefficiencies and unfriendly costs. Determined to
                      bring about change, we envisioned a solution not just for
                      us but for organizations everywhere. Thus, our journey to
                      redefine parking management began, born from a desire to
                      make a difference. Welcome to the genesis of innovation at{" "}
                      <span
                        style={{ fontFamily: "Poppins-Bold", color: "#7c0902" }}
                      >
                        WildPark
                      </span>
                      .
                    </p>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <hr className={`${styles.divider} my-5`} />
                </div>
                <div className="row">
                  <span className={`${styles["content-header"]}`}>
                    Our Team
                  </span>
                </div>
                <div className="row d-flex justify-content-center align-items-center mt-3">
                  <div className="col-md-3 d-flex justify-content-center align-items-center flex-column">
                    <img
                      src={dogs1}
                      alt="dogs1"
                      className={`${styles["icon-style"]}`}
                    />
                    <p className={`${styles["icon-text"]}`}>Brent Empasis</p>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center align-items-center flex-column">
                    <img
                      src={dogs2}
                      alt="dogs1"
                      className={`${styles["icon-style"]}`}
                    />
                    <p className={`${styles["icon-text"]}`}>Dawn Raine Dy</p>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center align-items-center flex-column">
                    <img
                      src={dogs3}
                      alt="dogs1"
                      className={`${styles["icon-style"]}`}
                    />
                    <p className={`${styles["icon-text"]}`}>
                      Cedrick Paglinawan
                    </p>
                  </div>
                  <div className="col-md-3 d-flex justify-content-center align-items-center flex-column">
                    <img
                      src={dogs4}
                      alt="dogs1"
                      className={`${styles["icon-style"]}`}
                    />
                    <p className={`${styles["icon-text"]}`}>Harold Jamiro II</p>
                  </div>
                </div>
                <div className="row d-flex justify-content-center">
                  <hr className={`${styles.divider} my-5`} />
                </div>
                <div className="row">
                  <span className={`${styles["content-header"]}`}>
                    We're Hiring!
                  </span>
                </div>
                <div className="row d-flex justify-content-center align-items-center mt-3">
                  <div className="col-md-3 d-flex justify-content-center">
                    <img className={`${styles["story-img"]}`} src={calendar} />
                  </div>
                  <div className="col-md-6">
                    <p className={`${styles.text}`}>
                      Discover a world of innovation at WildPark. We're hiring
                      bright minds to be part of our dynamic team. Explore
                      opportunities now!
                      <br />
                      <br />
                      <span
                        style={{ fontFamily: "Poppins-Bold", color: "#7c0902" }}
                      >
                        Contact Us:
                      </span>
                      <div style={{ color: "#7c0902" }}>
                        <i class="fa-solid fa-phone"></i>{" "}
                        <span> (032) 234 8200</span>
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
        </div>
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <div className={styles.backdrop}>
  //       <div className={styles.aboutHeader}>
  //
  //       </div>
  //     </div>

  //     <div className={styles.whiteContainer}>
  //       <div className={styles.storyHeader}>
  //         <span>Our Story</span>
  //       </div>

  //       <div className={styles.storyPic}>
  //         <img src={parkingan} alt="parkingan" />
  //       </div>

  //       <div className={styles.storyParagraph}>
  //         {/* <p>
  //           sauna kita mi ang mga studyante sa cit galisod kay usa ra ka ticket
  //           ang gi allow sa cit per student unya perting mahala sad intawn kaayo
  //           tag 1k ang sa studyante nya sa faculty kay 200 unfair kaayo noh? ang
  //           studyante unta to ang 200 nya 1k sa faculty kay naa mana silay
  //           trabaho mga maderpaker shet
  //         </p> */}

  //         <p>
  //           Inspiration struck as we saw the hurdles in parking
  //           system—inefficiencies and unfriendly costs. Determined to bring
  //           about change, we envisioned a solution not just for us but for
  //           organizations everywhere. Thus, our journey to redefine parking
  //           management began, born from a desire to make a difference. Welcome
  //           to the genesis of innovation at{" "}
  //           <span style={{ fontFamily: "Poppins-Bold", color: "#7c0902" }}>
  //             WildPark
  //           </span>
  //           .
  //         </p>
  //       </div>

  //       <div className={styles.line}></div>

  //       <div className={styles.membersHeader}>
  //         <span>Our Members</span>
  //       </div>

  //       <div className={styles.imgContainer}>
  //         <div className={styles.member}>
  //           <img src={dogs1} alt="dogs1" className={styles.iconStyle} />
  //           <p>Brent Uriel Empasis</p>
  //         </div>

  //         <div className={styles.member}>
  //           <img src={dogs2} alt="dogs2" className={styles.iconStyle} />
  //           <p>Dawn Raine Dy</p>
  //         </div>

  //         <div className={styles.member}>
  //           <img src={dogs3} alt="dogs3" className={styles.iconStyle} />
  //           <p>Cedrick Clloyd Paglinawan</p>
  //         </div>

  //         <div className={styles.member}>
  //           <img src={dogs4} alt="dogs4" className={styles.iconStyle} />
  //           <p>Harold Jamiro II</p>
  //         </div>
  //       </div>

  //       <div className={styles.line2}></div>

  //       <div className={styles.hiringPic}>
  //         <img src={calendar} alt="calendar" />
  //       </div>

  //       <div className={styles.hiringHeader}>
  //         <span>We're Hiring!</span>
  //       </div>

  //       <div className={styles.hiringParagraph}>
  //         {/* <p>
  //           nangita mi ug inspirational and motivational na desperate na another
  //           team member kay mag bonding2 mi tanan naa pay libre dukol sa mo apil
  //           hehe mwa mwa
  //         </p> */}
  //         <p>
  //           Discover a world of innovation at WildPark. We're hiring bright
  //           minds to be part of our dynamic team. Explore opportunities now!
  //         </p>
  //         <span style={{ fontFamily: "Poppins-Bold", color: "#7c0902" }}>
  //           Contact Us:
  //         </span>
  //         <div style={{ color: "#7c0902" }}>
  //           <i class="fa-solid fa-phone"></i> <span> (032) 234 8200</span>
  //           <br />
  //           <i class="fa-solid fa-envelope"></i>{" "}
  //           <span> wildpark@gmail.com</span>
  //         </div>
  //       </div>

  //       {/* <button className={styles.hiringButton}>Apply Now</button> */}
  //     </div>
  //   </div>
  // );
};

export default AboutUs;
