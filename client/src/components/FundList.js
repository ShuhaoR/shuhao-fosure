// src/components/FundList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const FundList = () => {
  const [funds, setFunds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/uniqueFunds.json")
      .then((response) => response.json())
      .then((data) => {
        setFunds(data);
      })
      .catch((error) => {
        console.error("Error fetching funds:", error);
      });
  }, []);

  const filteredFunds = funds.filter(
    (fund) =>
      fund.code.includes(searchTerm) || fund.fundname.includes(searchTerm)
  );

  return (
    <div className="fund-list-container">
      <h1>基金列表</h1>
      <input
        type="text"
        placeholder="搜索基金"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>基金代码</th>
            <th>基金名称</th>
          </tr>
        </thead>
        <tbody>
          {filteredFunds.map((fund) => (
            <tr key={fund.code}>
              <td>{fund.code}</td>
              <td>
                <Link to={`/fund/${fund.fundname}`}>{fund.fundname}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FundList;
