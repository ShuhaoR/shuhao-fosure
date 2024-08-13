import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const FundForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [fund, setFund] = useState({
    name: "",
    netValue: "",
    cumulativeNetValue: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchFund = async () => {
        try {
          const response = await fetch(`http://localhost:5001/api/funds/${id}`);
          const data = await response.json();
          setFund(data);
        } catch (error) {
          console.error("Error fetching fund:", error);
        }
      };

      fetchFund();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:5001/api/funds/${id}`
      : "http://localhost:5001/api/funds";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fund),
      });

      if (response.ok) {
        navigate("/funds");
      } else {
        console.error("Error saving fund");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleChange = (e) => {
    setFund({ ...fund, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{id ? t("update_fund") : t("create_fund")}</h1>
      <input
        type="text"
        name="name"
        value={fund.name}
        onChange={handleChange}
        placeholder={t("fund_name")}
      />
      <input
        type="number"
        name="netValue"
        value={fund.netValue}
        onChange={handleChange}
        placeholder={t("net_value")}
      />
      <input
        type="number"
        name="cumulativeNetValue"
        value={fund.cumulativeNetValue}
        onChange={handleChange}
        placeholder={t("cumulative_net_value")}
      />
      <button type="submit">{t("save_fund")}</button>
    </form>
  );
};

export default FundForm;
