import styles from "./styles/App.module.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./common/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";

const App = () => {
  return (
    <div className={`${styles.App}`}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
