import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Cookie from "js-cookie";

import Navbar from "./common/Navbar";
import Drawer from "./common/Drawer";
import LogoutModal from "./common/LogoutModal";
import LoginModal from "./common/LoginModal";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import Support from "./pages/Support";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Bookings from "./pages/Bookings";

import { useToggle } from "./hooks/useToggle";

import SessionUserContext from "./contexts/SessionUserContext";

import styles from "./styles/App.module.css";

const App = () => {
  const location = useLocation();

  const userCookie = Cookie.get("userAccount");
  const [sessionUser, setSessionUser] = useState(
    userCookie ? JSON.parse(userCookie) : null
  );
  const [showLogoutModal, toggleLogoutModal] = useToggle(false);
  const [showLoginModal, toggleLoginModal] = useToggle(false);
  const sessionUserContextValue = {
    sessionUser,
    setSessionUser,
    showLogoutModal,
    toggleLogoutModal,
    showLoginModal,
    toggleLoginModal,
  };

  const hideNavbar = ![
    "/register",
    "/dashboard",
    "/bookings",
    "/settings",
  ].includes(location.pathname);

  const displayDrawer = ["/dashboard", "/bookings", "/settings"].includes(
    location.pathname
  );

  const tabNames = {
    "/": "Home",
    "/about": "About Us",
    "/register": "Register",
    "/support": "Support",
    "/dashboard": "Dashboard",
    "/settings": "Settings",
    "/bookings": "Bookings",
  };

  document.title = tabNames[location.pathname]
    ? tabNames[location.pathname]
    : "WildPark";

  return (
    <SessionUserContext.Provider value={sessionUserContextValue}>
      <div className={`${styles.App} ${!hideNavbar ? styles['no-bg'] : styles.bg}`}>
        {hideNavbar && <Navbar />}
        {displayDrawer && <Drawer />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
        <LogoutModal />
        <LoginModal />
      </div>
    </SessionUserContext.Provider>
  );
};

export default App;
