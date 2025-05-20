const Report = require("../../models/report.model");

const report = async (req, res, next) => {
  try {
    const { title, description, date, image, uploadedOfPatient,uploadedByDoctor } = req.body;

    // Validation (simple check)
    if (!title || !description || !date || !image) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: title, description, date, or image",
      });
    }

    // Optional: Check image size (if base64 string)
    const sizeKB = Buffer.byteLength(image, 'base64') / 1024;
    console.log(`Image size: ${sizeKB.toFixed(2)} KB`);

    const newReport = new Report({
      title,
      description,
      date,
      image,
      uploadedByDoctor,
      uploadedOfPatient
    });

    await newReport.save();

    return res.status(201).json({
      success: true,
      message: "Report registered successfully 🎉",
    });

  } catch (error) {
    console.error("Error submitting report:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit report.",
      error: error.message,
    });
  }
};

module.exports = report;
