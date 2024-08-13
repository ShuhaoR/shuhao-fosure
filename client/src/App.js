// src/App.js
// src/App.js
import "./i18n"; // Import the i18n configuration
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import FundList from "./components/FundList";
import CreateFund from "./components/CreateFund";
import Market from "./components/Market";
import Selection from "./components/Selection";
import "./styles/styles.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  useEffect(() => {
    const storedStatus = localStorage.getItem("isLoggedIn");
    if (storedStatus) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      {isLoggedIn && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/funds"
          element={isLoggedIn ? <FundList /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-fund"
          element={isLoggedIn ? <CreateFund /> : <Navigate to="/login" />}
        />
        <Route
          path="/market"
          element={isLoggedIn ? <Market /> : <Navigate to="/login" />}
        />
        <Route
          path="/selection"
          element={isLoggedIn ? <Selection /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
