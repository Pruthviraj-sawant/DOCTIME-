const express = require("express");
const OPD = require("../model/opdModel");
const Admin = require('../model/adminModel');
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();
const router = express.Router();

// Submit OPD Form
const mongoose = require("mongoose");

router.post("/opd/:hospitalId", async (req, res) => {
  try {
    const { hospitalId } = req.params; // Get the dynamic hospitalId from the URL

    // Check if the hospitalId is valid
    if (!mongoose.Types.ObjectId.isValid(hospitalId)) {
      return res.status(400).json({ error: "Invalid Hospital ID" });
    }

    // Convert the hospitalId to a MongoDB ObjectId
    const validHospitalId = new mongoose.Types.ObjectId(hospitalId);

    const opdData = req.body;
    opdData.hospitalId = validHospitalId;

    const newOpdEntry = new OPD(opdData);
    await newOpdEntry.save();

    await Admin.findByIdAndUpdate(
      hospitalId,
      { $push: { opdForms: opdData._id } }, // Push OPD form ID into admin's array
      { new: true }
  );
    res.status(201).json({ message: "OPD Form Submitted Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Get all OPD records (Admin only)
router.get("/dashboard", authMiddleware, async (req, res) => {
  const opdRecords = await OPD.find(req.body);
  res.json(opdRecords);
  console.log(opdRecords);
});

module.exports = router;
