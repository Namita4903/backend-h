
// const express = require('express');
// const router = express.Router();
// const uploadFile = require('../../controllers/uploadFile');

// router.post('/', uploadFile);

// module.exports = router;




// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const uploadFileController = require('../../controllers/auth/report');
// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);
//   isValid ? cb(null, true) : cb('Only image files are allowed!');
// };

// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 },
//   fileFilter
// });
// router.post('/upload', upload.single('file'), async(req,res)=>{
//     res.status(200).json({filePath:`/uploads/${req.file.filename}`});
// });

// module.exports = router;
