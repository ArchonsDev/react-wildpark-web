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

import SessionUserContext from "./contexts/SessionUserContext";

import styles from "./styles/App.module.css";

const App = () => {
  const location = useLocation();

  const [sessionUser, setSessionUser] = useState(Cookie.get("userAccount"));
  const sessionUserContextValue = { sessionUser, setSessionUser };

  const displayDrawer = () => {
    // Only displays drawer for certain conditions such as:
    // User must be logged in
    // Appears in certain pages such as dashboard, bookings, settings, etc
    // Status: Has temporary line to check the look of the drawer; bound to change :D
    return location.pathname === "/dashboard";
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
        {location.pathname !== "/register" &&
          location.pathname !== "/dashboard" && <Navbar />}
        {displayDrawer() && <Drawer />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/support" element={<Support />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </SessionUserContext.Provider>
  );
};

export default App;
