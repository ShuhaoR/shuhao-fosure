// src/components/FundDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FundDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [fund, setFund] = useState(null);

  useEffect(() => {
    const fetchFundDetail = async () => {
      try {
        const response = await fetch(
          `https://shuhao-fosure.onrender.com/api/funds/${id}`
        );
        const data = await response.json();
        setFund(data);
      } catch (error) {
        console.error("Error fetching fund detail:", error);
      }
    };

    fetchFundDetail();
  }, [id]);

  if (!fund) {
    return <p>{t("loading")}</p>;
  }

  return (
    <div>
      <h1>{fund.name}</h1>
      <p>
        {t("net_value")}: {fund.netValue}
      </p>
      <p>
        {t("cumulative_net_value")}: {fund.cumulativeNetValue}
      </p>
      <Link to={`/funds/${fund.fundId}/edit`}>{t("edit_fund")}</Link>
    </div>
  );
};

export default FundDetail;
