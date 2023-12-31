import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

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
import Organizations from "./pages/Organizations";
import Admin from "./pages/Admin";

import { useToggle } from "./hooks/useToggle";
import { getAccount } from "./api/accounts";

import SessionUserContext from "./contexts/SessionUserContext";

import styles from "./styles/App.module.css";

const App = () => {
  const location = useLocation();

  const userCookie = Cookies.get("userAccount");

  const [showLogoutModal, toggleLogoutModal] = useToggle(false);
  const [showLoginModal, toggleLoginModal] = useToggle(false);
  const [sessionUser, setSessionUser] = useState(
    userCookie ? JSON.parse(userCookie) : null
  );

  const reloadUser = async () => {
    getAccount({ id: sessionUser.id }, (response) => response?.data && setSessionUser(response.data));
  };

  const hideNavbar = ![
    "/register",
    "/dashboard",
    "/bookings",
    "/settings",
    "/organizations",
    "/admin",
  ].some((path) => location.pathname.startsWith(path));

  const displayDrawer = [
    "/dashboard",
    "/bookings",
    "/settings",
    "/organizations",
    "/admin",
  ].some((path) => location.pathname.startsWith(path));

  const tabNames = {
    "/": "Home",
    "/about": "About Us",
    "/register": "Register",
    "/support": "Support",
    "/dashboard": "Dashboard",
    "/settings": "Settings",
    "/bookings": "Bookings",
    "/admin": "Admin",
  };

  document.title = location.pathname.startsWith("/organizations/")
    ? "Organizations"
    : tabNames[location.pathname] || "WildPark";

  const sessionUserContextValue = {
    sessionUser,
    setSessionUser,
    showLogoutModal,
    toggleLogoutModal,
    showLoginModal,
    toggleLoginModal,
    reloadUser,
  };

  return (
    <SessionUserContext.Provider value={sessionUserContextValue}>
      <div
        className={`${styles.App} ${!hideNavbar ? styles["no-bg"] : styles.bg
          }`}>
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
          <Route path="/organizations/:id" element={<Organizations />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <LogoutModal />
        <LoginModal />
      </div>
    </SessionUserContext.Provider>
  );
};

export default App;
