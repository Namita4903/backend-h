// routes/api/report.route.js
const express = require("express");
const router = express.Router();
const Report = require("../../models/report.model");
const reportModel = require("../../models/report.model");

// Route to get all reports
const getReport = async (req, res) => {
  try {
    // Fetch all reports from the database
    const reports = await reportModel.find();
    
    // Return the reports in the response
    res.status(200).json({
      success: true,
       count: reports.length,
      reports: reports, // Send the array of reports as response
    });
  } catch (error) {
    // Handle error case
    res.status(500).json({
      
      success: false,
      message: "Failed to fetch reports",
    });
  }
};

module.exports = getReport;
