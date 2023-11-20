import React from "react";
import styles from "./style.module.css";
import SearchIcon from "@mui/icons-material/Search";

const Support = () => {
  return (
    <div className="container-fluid px-0">
      <div className={styles.backdrop}>
        <div className={styles.supportHeader}>
          <span>WildPark Support</span>
        </div>
      </div>

      <div className={styles.whiteContainer}>
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <div className={styles.searchContainer}>
            <span className={styles.question}>How can we help you?</span>
            <div className={styles.searchBox}>
              <SearchIcon className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchBar}
                placeholder="Search help articles..."
              />
            </div>
          </div>

          <div className={styles.categoryHeader}>
            <span>Categories</span>
          </div>

          {/* {Changed button classes} */}
          <div className={`container ${styles.categoryContainer}`}>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gx-0 gy-3">
              <div className="col">
                <button className={styles.categoryButton}>
                  <i className={`fa-solid fa-question fa-5x`}></i> <br /> <br />
                  <span className={styles.Label}>General Question</span>
                </button>
              </div>
              <div className="col">
                <button className={styles.categoryButton}>
                  <i class="fa-solid fa-user fa-5x"></i> <br /> <br />
                  <span className={styles.Label}>Account</span>
                </button>
              </div>
              <div className="col">
                <button className={styles.categoryButton}>
                  <i class="fa-solid fa-car fa-5x"></i> <br /> <br />
                  <span className={styles.Label}>Vehicle</span>
                </button>
              </div>
              <div className="col">
                <button className={styles.categoryButton}>
                  <i class="fa-solid fa-building fa-5x"></i> <br /> <br />
                  <span className={styles.Label}>Organization</span>
                </button>
              </div>
              <div className="col">
                <button className={styles.categoryButton}>
                  <i class="fa-solid fa-bug fa-5x"></i> <br /> <br />
                  <span className={styles.Label}>Bug Report</span>
                </button>
              </div>
              <div className="col">
                <button className={styles.categoryButton}>
                  <i class="fa-solid fa-star fa-5x"></i> <br /> <br />
                  <span className={styles.Label}>Feature Request</span>
                </button>
              </div>
              <div className="col">
                <button className={styles.categoryButton}>
                  <i class="fa-solid fa-ellipsis fa-5x"></i> <br /> <br />
                  <span className={styles.Label}>Other</span>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.ticketSubmit}>
            <span className={styles.assistHeader}>
              Need further assistance?
            </span>
            <div className={styles.fnameContainer}>
              <span className={styles.fname}>First name:</span> <br />
              <input type="text" className={styles.inputFname} />
            </div>
            <div className={styles.lnameContainer}>
              <span className={styles.lname}>Last name:</span> <br />
              <input type="text" className={styles.inputLname} />
            </div>
            <div className={styles.emailContainer}>
              <span className={styles.email}>Email:</span> <br />
              <input type="text" className={styles.inputEmail} />
            </div>
            <div className={styles.msgContainer}>
              <span className={styles.msg}>Message:</span> <br />
              <input type="text" className={styles.inputMsg} />
            </div>
            <button className={styles.submitButton}>Submit Ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
