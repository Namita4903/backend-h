const reportModel = require("../../models/report.model");

const getSingleReportsPatient = async (req, res) => {
  try {
     const userEmail = req.query.email; // Change as needed or use req.query.email
     console.log("user email is ... to fetch report",userEmail)

    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: "Email query parameter is required",
      });
    }

    // Reports where the user is the patient
    const userReports = await reportModel.find({ uploadedOfPatient: userEmail });
    // Reports uploaded by the user as doctor
    const doctorReports = await reportModel.find({ uploadedByDoctor: userEmail });

    if (!userReports.length && !doctorReports.length) {
      return res.status(404).json({
        success: false,
        message: "No reports found for the given email",
      });
    }

    // Tag the reports
    const taggedUserReports = userReports.map((report) => ({
      ...report._doc,
      tag: "user",
    }));

    const taggedDoctorReports = doctorReports.map((report) => ({
      ...report._doc,
      tag: "doctor",
    }));

    // Combine both arrays
    const combinedReports = [...taggedUserReports, ...taggedDoctorReports];

    res.status(200).json({
      success: true,
      count: combinedReports.length,
      reports: combinedReports,
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

module.exports = getSingleReportsPatient;
