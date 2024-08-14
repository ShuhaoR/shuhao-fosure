import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { Chart as ChartJS, TimeScale } from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(TimeScale);

// Helper function to convert Excel date to JavaScript Date object
function excelDateToJSDate(excelDate) {
  const date = new Date((excelDate - 25569) * 86400 * 1000);
  const convertedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60000
  );
  return convertedDate;
}

const SingleFund = () => {
  const { fundname } = useParams();
  const [fundDetails, setFundDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/fundDetails.json")
      .then((response) => response.json())
      .then((data) => {
        setFundDetails(data[fundname] || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching fund details:", error);
        setLoading(false);
      });
  }, [fundname]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (fundDetails.length === 0) {
    return <p>No details available for this fund.</p>;
  }

  // Convert Excel date format to JavaScript Date objects
  const dates = fundDetails.map((detail) => excelDateToJSDate(detail.date));
  const totalNav = fundDetails.map((detail) => detail.totalnav);
  const unitNav = fundDetails.map((detail) => detail.unitnav);

  const data = {
    labels: dates,
    datasets: [
      {
        label: "总净值",
        data: totalNav,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        xAxisID: "x",
      },
      {
        label: "单位净值",
        data: unitNav,
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
        xAxisID: "x",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "MM/dd/yyyy",
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  };

  return (
    <div>
      <h1>{fundname}</h1>
      <Line data={data} options={options} />
    </div>
  );
};

export default SingleFund;
