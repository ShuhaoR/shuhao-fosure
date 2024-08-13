import React from "react";
import { useTranslation } from "react-i18next";
import "../styles/styles.css";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("welcome_message")}</h1>
      <p>{t("one_stop_solution")}</p>
      <button>{t("create_fund_button")}</button>
      <button>{t("view_funds")}</button>
    </div>
  );
};

export default Home;
