const express = require("express");
const Fund = require("../models/Fund");
const router = express.Router();

// Get all funds
router.get("/", async (req, res) => {
  try {
    const funds = await Fund.find();
    res.json(funds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get fund by ID
router.get("/:id", async (req, res) => {
  try {
    const fund = await Fund.findOne({ fundId: req.params.id });
    if (!fund) return res.status(404).json({ message: "Fund not found" });
    res.json(fund);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search funds
router.get("/search/:name", async (req, res) => {
  try {
    const funds = await Fund.find({
      name: { $regex: req.params.name, $options: "i" },
    });
    res.json(funds);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a fund by ID
router.put("/:id", async (req, res) => {
  const { name, netValue, cumulativeNetValue } = req.body;

  try {
    const updatedFund = await Fund.findOneAndUpdate(
      { fundId: req.params.id }, // Find the fund by its fundId
      { name, netValue, cumulativeNetValue }, // Update these fields
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedFund) {
      return res.status(404).json({ message: "Fund not found" });
    }

    res.json({ message: "Fund updated successfully", fund: updatedFund });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a fund by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedFund = await Fund.findOneAndDelete({ fundId: req.params.id });

    if (!deletedFund) {
      return res.status(404).json({ message: "Fund not found" });
    }

    res.json({ message: "Fund deleted successfully", fund: deletedFund });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new fund
router.post("/", async (req, res) => {
  const { fundId, name, netValue, cumulativeNetValue } = req.body;
  try {
    const newFund = new Fund({
      fundId,
      name,
      netValue,
      cumulativeNetValue,
    });
    await newFund.save();
    res.status(201).json({ message: "Fund added successfully", fund: newFund });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
