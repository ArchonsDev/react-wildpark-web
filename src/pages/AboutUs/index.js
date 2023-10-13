import React from "react";
import styles from './style.module.css';
import dogs1 from "../../images/dogs1.jpg";
import dogs2 from "../../images/dogs2.jpg";
import dogs3 from "../../images/dogs3.jpg";
import dogs4 from "../../images/dogs4.png";


const AboutUs = () => {
    return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
        <div className={`${styles.header} container d-flex flex-column justify-content-center align-items-center`}>
            <h2>Welcome to WildPark!</h2>
        </div>
      
        <div class="d-flex justify-content-center" className={`${styles.imgcontainer}`}>
            <img src={dogs1} alt="dogs1" className={styles.iconStyle}/>
                <p>Cedrick</p>
            <img src={dogs2} alt="dogs2" className={styles.iconStyle}/>
                <p>Dawn</p>
            <img src={dogs3} alt="dogs3" className={styles.iconStyle}/>
                <p>Brent</p>
            <img src={dogs4} alt="dogs4" className={styles.iconStyle}/>
                <p>Harold</p>
        </div>
        
    </div>
    );
}

export default AboutUs;