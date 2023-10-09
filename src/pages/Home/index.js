import React from "react";
import styles from './style.module.css';
import banner from '../../images/homepage.jpg';

const Home = () => {
    const bannerStyle = {
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '25vh',
        width: 'auto',
        position: 'relative',
    }

    const textStyle = {
        textDecoration: 'none',
        color: '#e9e9e9',
        position: 'absolute',
        bottom: '0.3em',
        right: '1em'
    }

    return (
        <div className="container-fluid px-0">
            <div className="container-fluid" style={bannerStyle}>
                <small style={textStyle} href="http://www.freepik.com">Designed by upklyak / Freepik</small>
            </div>
        </div>
    );
}

export default Home;