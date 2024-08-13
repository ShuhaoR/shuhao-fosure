// src/components/FundList.js
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const FundList = () => {
  const { t } = useTranslation();
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/funds");
        const data = await response.json();
        setFunds(data);
      } catch (error) {
        console.error("Error fetching funds:", error);
      }
    };

    fetchFunds();
  }, []);

  return (
    <div>
      <h1>{t("fund_list")}</h1>
      <ul>
        {funds.map((fund) => (
          <li key={fund._id}>
            <Link to={`/funds/${fund.fundId}`}>{fund.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FundList;
