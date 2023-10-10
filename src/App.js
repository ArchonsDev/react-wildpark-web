import styles from "./styles/App.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./common/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div className={`${styles.App}`}>
      {location.pathname !== '/register' && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
