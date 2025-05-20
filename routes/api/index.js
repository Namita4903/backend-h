const router = require("express").Router()

const report = require("../../routes/api/report.route");
const authRoutes = require("./Auth.route.js");
const contactRoute = require("./contact.route");
const doctorRoute = require("./doctorAccess.route.js");

router.use("/doctor", doctorRoute);

router.use("/auth", authRoutes);

router.use("/contact", contactRoute);
router.use("/report", report);


module.exports = router

