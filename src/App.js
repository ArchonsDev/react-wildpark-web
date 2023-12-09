import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Cookie from "js-cookie";

import Navbar from "./common/Navbar";
import Drawer from "./common/Drawer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import Support from "./pages/Support";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";

import SessionUserContext from "./contexts/SessionUserContext";

import styles from "./styles/App.module.css";

const App = () => {
  const location = useLocation();

  const userCookie = Cookie.get("userAccount");
  const [sessionUser, setSessionUser] = useState(userCookie ? JSON.parse(userCookie) : null);
  const sessionUserContextValue = { sessionUser, setSessionUser };

  const hideNavbar = () => {
    return (
      location.pathname !== "/register" &&
      location.pathname !== "/dashboard" &&
      location.pathname !== "/bookings" &&
      location.pathname !== "/settings"
    );
  };
  const displayDrawer = () => {
    // WIP: Must include condition that the user is logged in
    return (
      location.pathname === "/dashboard" ||
      location.pathname === "/bookings" ||
      location.pathname === "/settings"
    );
  };

  useEffect(() => {
    let tabName = "";
    switch (location.pathname) {
      case "/":
        tabName = "Home";
        break;
      case "/about":
        tabName = "About Us";
        break;
      case "/register":
        tabName = "Register";
        break;
      case "/support":
        tabName = "Support";
        break;
      case "/dashboard":
        tabName = "Dashboard";
        break;
      case "/bookings":
        tabName = "Bookings";
        break;
      case "/settings":
        tabName = "Settings";
        break;
      default:
        tabName = "WildPark";
        break;
    }
    document.title = tabName;
  }, [location.pathname]);

  return (
    <SessionUserContext.Provider value={sessionUserContextValue}>
      <div className={`${styles.App}`}>
        {hideNavbar() && <Navbar />}
        {displayDrawer() && <Drawer />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </div>
    </SessionUserContext.Provider>
  );
};

export default App;
