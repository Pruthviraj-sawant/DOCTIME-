const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const patientRoutes = require("./Routes/patientRoutes");
const hospitalRoutes = require("./Routes/hospitalRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const opd=require("./Routes/opdRoutes");
const Doctor=require("./Routes/hospitalRoutes");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hospital Queuing System Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/api/patients", patientRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/admin", adminRoutes);
app.use("api/auth/dashboard",opd);
app.use("/api/",opd);
app.use('/api/admin', hospitalRoutes); // Admin routes (e.g., /api/admin/hospital)
app.use('/api/', Doctor);
app.use('/api/dashboard', Doctor);