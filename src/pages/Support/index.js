import React from "react";
import styles from "./style.module.css";
import SearchIcon from "@mui/icons-material/Search";

const Support = () => {
  return (
    <div>
      <div className={styles.backdrop}>
        <div className={styles.supportHeader}>
          <span>WildPark Support</span>
        </div>
      </div>

      <div className={styles.whiteContainer}>
        <div className={styles.question}>
          <span>How can we help you?</span>
        </div>

        <div className={styles.searchContainer}>
          <SearchIcon className={styles.searchIcon} />
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search help articles..."
          />
        </div>

        <div className={styles.categoryHeader}>
          <span>Categories</span>
        </div>

        <button className={styles.gqButton}>
          <i className={`fa-solid fa-question fa-5x`}></i> <br /> <br />
          <span className={styles.Label}>General Question</span>
        </button>

        <button className={styles.accButton}>
          <i class="fa-solid fa-user fa-5x"></i> <br /> <br />
          <span className={styles.Label}>Account</span>
        </button>

        <button className={styles.vehButton}>
          <i class="fa-solid fa-car fa-5x"></i> <br /> <br />
          <span className={styles.Label}>Vehicle</span>
        </button>

        <button className={styles.orgButton}>
          <i class="fa-solid fa-building fa-5x"></i> <br /> <br />
          <span className={styles.Label}>Organization</span>
        </button>

        <button className={styles.bugrepButton}>
          <i class="fa-solid fa-bug fa-5x"></i> <br /> <br />
          <span className={styles.Label}>Bug Report</span>
        </button>

        <button className={styles.featreqButton}>
          <i class="fa-solid fa-star fa-5x"></i> <br /> <br />
          <span className={styles.Label}>Feature Request</span>
        </button>

        <button className={styles.otherButton}>
          <i class="fa-solid fa-ellipsis fa-5x"></i> <br /> <br />
          <span className={styles.Label}>Other</span>
        </button>

        <span className={styles.assistHeader}>Need further assistance?</span>

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
  );
};

export default Support;
