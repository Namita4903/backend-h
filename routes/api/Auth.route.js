const route = require("express").Router()

const register = require("../../controllers/auth/register.js")
const login = require("../../controllers/auth/login.js")
const checkAuth=require("../../middleware/checkAuth.js");
//const products = require("../../controllers/auth/product.js");
const getUsers = require("../../controllers/auth/users.js");
const getUser =require("../../controllers/auth/getUsers.js");
const addUser = require("../../controllers/auth/addUser.js");
const updateUser = require("../../controllers/auth/updateUser.js");
const deleteUser  = require("../../controllers/auth/deleteUser.js");
const report = require("../../controllers/auth/report.js");
const getUserReport = require("../../controllers/auth/getUserReport.js");
const getReportsByDoctor = require("../../controllers/auth/getReportByDoctor.js");
const googleLogin = require("../../controllers/auth/google.js");
const getPaymentStatus = require("../../controllers/auth/getPayment.js");
const getReportByPatient = require("../../controllers/auth/getReportByPatient.js");
const getUsersByDoctor = require("../../controllers/auth/getUsersByDoctor.js");
const getSingleReportsPatient = require("../../controllers/auth/getSingleReportsPatient.js");
const adminLogin = require("../../controllers/auth/adminLogin.js");
const getAllowedDoctors = require("../../controllers/auth/getAllowedDoctors.js");
const getPayment = require("../../controllers/auth/getPayment.js");
const forgotPassword = require("../../controllers/auth/forgotPassword.js");
const verifyPassword = require("../../controllers/auth/verifyPassword.js");
const bookAppointment = require("../../controllers/auth/bookAppointement.js");
const getAppointment = require("../../controllers/auth/getAppointment.js");







route.post("/register", register);
route.post("/login" , login);
route.post("/report",report);
route.post("/getUserReport",getUserReport);
route.post("/google",googleLogin);
route.post("/bookAppointment",bookAppointment);
route.get("/getAppointment",getAppointment);
route.post("/getPayment",getPayment);
route.get("/getReportByDoctor/:id",getReportsByDoctor);
route.get("/getReportByPatient/:id",getReportByPatient);
route.get("/getSingleReportsPatient",getSingleReportsPatient);
route.get("/users",getUsers);
route.get("/getUsersByDoctor",getUsersByDoctor);
route.get("/getUsers",getUser);
route.post("/addUser",addUser); 
route.put("/updateUser/:id", updateUser);
route.delete("/deleteUser/:id", deleteUser);
route.post("/admin/login", adminLogin);
route.post("/getAllowedDoctors", getAllowedDoctors);
route.post("/forgotPassword",forgotPassword)
route.post("/verifyPassword",verifyPassword)


module.exports = route;