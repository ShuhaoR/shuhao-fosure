import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/styles.css";

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <header className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>{t("welcome_message")}</h1>
          <p>{t("one_stop_solution")}</p>
          <a href="/create-fund" className="btn btn-primary">
            {t("create_fund")}
          </a>
          <a href="/funds" className="btn btn-secondary">
            {t("view_funds")}
          </a>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
