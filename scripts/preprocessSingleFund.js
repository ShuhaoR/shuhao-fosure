// scripts/preprocessSingleFund.js

const fs = require("fs");
const XLSX = require("xlsx");

// Read the Excel file
const workbook = XLSX.readFile("client/public/DataSource.xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

// Group data by fundname
const fundDetails = sheet.reduce((acc, row) => {
  const { fundname, totalnav, unitnav, date } = row;
  if (!acc[fundname]) {
    acc[fundname] = [];
  }
  acc[fundname].push({ totalnav, unitnav, date });
  return acc;
}, {});

// Save the preprocessed data as a JSON file
fs.writeFileSync(
  "client/public/fundDetails.json",
  JSON.stringify(fundDetails, null, 2)
);

console.log("Fund details have been processed and saved!");
