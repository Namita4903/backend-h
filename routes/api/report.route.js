const express = require("express");
const router = express.Router();
const Report = require("../../models/report.model"); // adjust path if needed

// GET all reports
router.get("/getAllReports", async (req, res) => {
  try {
    const reports = await Report.find().sort({ uploadedAt: -1 });
    console.log(reports)
   return  res.json({reports:reports,reportsCount:reports.length});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE report by ID
router.delete("/delete/:id", async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete report" });
  }
});


// PUT /api/report/update/:id
router.put("/update/:id", async (req, res) => {
  try {
    const { title, description, date,uploadedByDoctor,uploadedOfPatient
     } = req.body;
    const updatedReport = await Report.findByIdAndUpdate(
      req.params.id,
      { title, description, date,uploadedByDoctor,uploadedOfPatient },
      { new: true }
    );
    res.json(updatedReport);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Failed to update report" });
  }
});

module.exports = router;
