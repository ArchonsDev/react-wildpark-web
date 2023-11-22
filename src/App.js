import styles from "./styles/App.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./common/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import SessionUserContext from "./contexts/SessionUserContext";
import Cookie from "js-cookie";
import AboutUs from "./pages/AboutUs";
import Support from "./pages/Support";

const App = () => {
  const location = useLocation();

  const [sessionUser, setSessionUser] = useState(Cookie.get('userAccount'));
  const sessionUserContextValue = { sessionUser, setSessionUser };

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <SessionUserContext.Provider value={sessionUserContextValue}>
      <div className={`${styles.App}`}>
        {location.pathname !== "/register" && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
    </SessionUserContext.Provider>
  );
};

export default App;
