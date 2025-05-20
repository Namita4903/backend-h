const reportModel = require("../../models/report.model");

const getReportByPatient = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Patient ID:", id);

    // Fetch reports uploaded by the given patient ID
    const reports = await reportModel.find({ uploadedBy: id });

    res.status(200).json({
      success: true,
      reports,
    });
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reports",
    });
  }
};

module.exports = getReportByPatient;
