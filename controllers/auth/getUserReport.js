const reportModel = require("../../models/report.model");

const getUserReport = async (req, res) => {
  try {
    const userEmail = req.query.email;

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "Email query parameter is required",
      });
    }

    const reports = await reportModel.find({ uploadedOfPatient: userEmail });
console.log(reports)
    if (!reports.length) {
      return res.status(404).json({
        success: false,
        message: "No reports found for the given email",
      });
    }

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching reports",
      error: error.message,
    });
  }
};

module.exports = getUserReport;
