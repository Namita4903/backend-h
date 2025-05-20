const multer = require("multer");

// Set up memory storage for multer
const storage = multer.memoryStorage();

// Multer file upload settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size of 10MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/; // Allow image files
    const isValid = filetypes.test(file.mimetype);
    cb(isValid ? null : new Error("Only image files are allowed"), isValid);
  },
});

module.exports = upload;
