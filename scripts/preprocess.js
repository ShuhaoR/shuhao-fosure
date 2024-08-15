const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

// Correct file path assuming the script is run from the root of your project
const filePath = path.join(__dirname, "../client/public/DataSource.xlsx");

// Read the Excel file
const workbook = XLSX.readFile(filePath);

// Access the first sheet
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert sheet to JSON
const data = XLSX.utils.sheet_to_json(sheet);

// Process the data to get unique fund codes and names
const uniqueFunds = {};
data.forEach((row) => {
  if (row.code && !uniqueFunds[row.code]) {
    uniqueFunds[row.code] = {
      code: row.code,
      fundname: row.fundname,
    };
  }
});

// Save the unique fund codes and names to a JSON file
fs.writeFileSync(
  path.join(__dirname, "../client/public/uniqueFunds.json"),
  JSON.stringify(Object.values(uniqueFunds), null, 2)
);

console.log("Unique funds have been processed and saved!");
