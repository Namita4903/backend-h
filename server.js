const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");
require("dotenv").config();
const backend = express();
const http = require("http").Server(backend);
const cors = require("cors")
const routes = require("./routes")
const contactRoute = require("./routes/api/contact.route");
const doctorAccessRoute=require("./routes/api/doctorAccess.route");


// const uploadRoutes=require("./routes/api/upload");
const path = require('path');
// const ReportModel= require("./models/report.model");
// Old
// app.use(express.json());


backend.use(express.json({ limit: '50mb' }));
backend.use(express.urlencoded({ extended: true, limit: '50mb' }));

backend.use(cors({
    origin: "*",
    methods : ["GET", "PUT", "PATCH", "POST", "DELETE"]
})
);

backend.use(routes);
backend.use("/api/contact", contactRoute);
 backend.use("/api/doctor", doctorAccessRoute);
// backend.use("/api",uploadRoutes);
// backend.use('/uploads', express.static('uploads'));

// backend.use("/api/report", require("./routes/api/report.route"));


mongoose.connect("mongodb+srv://mahajannamita2003:90zkozdP4u5obLyv@cluster0.icll5.mongodb.net/")
.then(() => {
    console.log(colors.green("✓ DB is connected with Backend"));
    const PORT =5001;
    http.listen(PORT, () => {
        console.log(colors.cyan(`Server is listening on port ${PORT}`));
    });
})
.catch((error) => {
    console.error(colors.red("Error connecting to DB:", error));
});

// backend.get("/", (req, res) => {
//     res.send("Welcome to the Backend Server!");
// });

// backend.get("/contact", (req,res)=>{
//     res.send("Welcome to the Contact Page")
// })
// backend.get("/api/data", async (req, res) => {
//     try {
//         const data = await UserModel.find();
//         res.status(200).json({ success: true, data });
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });
// backend.get("/api/data", async (req, res) => {
//     try {
//         const data = await ReportModel.find();
//         res.status(200).json({ success: true, data });
//     } catch (error) {
//         console.error("Error fetching data:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });