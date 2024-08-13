// src/components/Navbar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../styles/styles.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const { t, i18n } = useTranslation(); // Hook to use translations
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to the login page after logging out
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Call changeLanguage on the i18n instance
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">{t("home")}</Link>
        </li>
        <li>
          <Link to="/funds">{t("fund_list")}</Link>
        </li>
        <li>
          <Link to="/create-fund">{t("create_fund")}</Link>
        </li>
        <li>
          <Link to="/market">{t("market")}</Link>
        </li>
        <li>
          <Link to="/selection">{t("selection")}</Link>
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/register">{t("register_now")}</Link>
            </li>
            <li>
              <Link to="/login">{t("login")}</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <button onClick={handleLogout} className="logout-button">
                {t("logout")}
              </button>
            </li>
          </>
        )}
        <li>
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            className="language-switcher"
            defaultValue={i18n.language}
          >
            <option value="en">English</option>
            <option value="zh">中文</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
