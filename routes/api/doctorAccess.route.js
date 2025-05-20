const express = require('express');
const router = express.Router();
const { sendDoctorAccessEmail } = require('../../controllers/doctorAccess.controller');
const handleConfirmation = require('../../controllers/handleConfirmation');

// Send email to patient for access confirmation
router.post('/request-access', sendDoctorAccessEmail);

// Patient clicks this link to confirm or deny access
router.post('/confirm-access', handleConfirmation);

module.exports = router;
