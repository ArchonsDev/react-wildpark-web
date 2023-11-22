import React from "react";
import styles from "./style.module.css";
import SearchIcon from "@mui/icons-material/Search";

const Support = () => {
  return (
    <div className={styles.Support}>
      <div className={`${styles.content} container-fluid`}>
        {/* Header */}
        <div className="row mt-5 py-5">
          <div className={`${styles.supportHeader} mt-5 py-5`}>
            <span>WildPark Support</span>
          </div>
        </div>
      </div>

      {/* Search Box */}
      <div className={`${styles.supportContent} bg-white`}>
        <div className="container">
          <div className="row mb-5">
            <span className={styles.question}>How can we help you?</span>
            <div className={`col ${styles.searchBox}`}>
              <SearchIcon className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchBar}
                placeholder="Search help articles..."
              />
            </div>
          </div>

          {/* Categories */}
          <div className="row mb-5">
            <span className={styles.contentHeader}>Categories</span>
            <div className={`row ${styles.customSpacing} gy-3`}>
              <div className="col-6 col-md-3 col-lg-2">
                <button className={styles.categoryButton}>
                  <i className={`fa-solid fa-question fa-5x`}></i>
                  <span className={styles.categoryLabel}>General Question</span>
                </button>
              </div>
              <div className="col-6 col-md-3 col-lg-2">
                <button className={styles.categoryButton}>
                  <i class="fa-solid fa-user fa-5x"></i>
                  <span className={styles.categoryLabel}>Account</span>
                </button>
              </div>
              <div className="col-6 col-md-3 col-lg-2">
                <button className={styles.categoryButton}>
                  <i class="fa-solid fa-car fa-5x"></i>
                  <span className={styles.categoryLabel}>Vehicle</span>
                </button>
              </div>
              <div className="col-6 col-md-3 col-lg-2">
                <button className={styles.categoryButton}>
                  <i class="fa-solid fa-building fa-5x"></i>
                  <span className={styles.categoryLabel}>Organization</span>
                </button>
              </div>
              <div className="col-6 col-md-3 col-lg-2">
                <button className={styles.categoryButton}>
                  <i class="fa-solid fa-bug fa-5x"></i>
                  <span className={styles.categoryLabel}>Bug Report</span>
                </button>
              </div>
              <div className="col-6 col-md-3 col-lg-2">
                <button className={styles.categoryButton}>
                  <i class="fa-solid fa-star fa-5x"></i>
                  <span className={styles.categoryLabel}>Feature Request</span>
                </button>
              </div>
              <div className="col-6 col-md-3 col-lg-2">
                <button className={styles.categoryButton}>
                  <i class="fa-solid fa-ellipsis fa-5x"></i>
                  <span className={styles.categoryLabel}>Other</span>
                </button>
              </div>
            </div>
          </div>

          {/* Support Ticket */}
          <div className="row">
            <span className={styles.contentHeader}>
              Need further assistance?
            </span>

            <div className="row">
              <div className="col-12 col-md-6">
                <span className={styles.inputLabel}>First name:</span> <br />
                <input type="text" className={styles.inputBox} />
              </div>
              <div className="col-12 col-md-6">
                <span className={styles.inputLabel}>Last name:</span> <br />
                <input type="text" className={styles.inputBox} />
              </div>
            </div>
            <div className="row">
              <div class="col">
                <span className={styles.inputLabel}>Email:</span> <br />
                <input type="text" className={styles.inputBox} />
              </div>
            </div>
            <div className="row mb-3">
              <div class="col">
                <span className={styles.inputLabel}>Message:</span> <br />
                <textarea
                  type="text"
                  className={styles.inputBox}
                  style={{ height: "15vh" }}></textarea>
              </div>
            </div>
          </div>
          <button className={styles.submitButton}>Submit Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default Support;
