import styles from "./styles/App.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./common/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import UserLoginContext from './contexts/UserLoginContext';
import Cookie from 'js-cookie'

const App = () => {
  const location = useLocation();

  const [isUserLoggedIn, setIsUserLoggedIn] = useState((Cookie.get('userToken') ? true : false));
  const userLoggedInContextValue = { isUserLoggedIn, setIsUserLoggedIn };

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <UserLoginContext.Provider value={userLoggedInContextValue}>
      <div className={`${styles.App}`}>
        {location.pathname !== '/register' && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </UserLoginContext.Provider>
  );
};

export default App;
