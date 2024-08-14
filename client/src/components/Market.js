// src/components/Market.js
import React from "react";
import { useTranslation } from "react-i18next"; // Import the translation hook

const Market = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("market")}</h1>
      <p>{t("market_content")}</p>
    </div>
  );
};

export default Market;
