const express = require("express");
const Fund = require("../models/Fund");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Aggregate or fetch data needed for the dashboard
    const totalFunds = await Fund.countDocuments();
    const funds = await Fund.find().limit(5); // Example: Get first 5 funds
    res.json({ totalFunds, funds });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
