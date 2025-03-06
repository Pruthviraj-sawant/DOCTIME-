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

const nodemailer = require("nodemailer");
const app = express();
app.use(cors());
app.use(express.json());



let appointmentQueue = [];
const HOSPITAL_OPEN = 9 * 60; // 9:00 AM in minutes
const HOSPITAL_CLOSE = 17 * 60; // 5:00 PM in minutes

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "doctime274@gmail.com",
    pass: "zxrz cbjf nilv rnri",
  },
});

const getNextAppointmentTime = () => {
  let lastAppointment = appointmentQueue.length
    ? appointmentQueue[appointmentQueue.length - 1]
    : HOSPITAL_OPEN;
  
  let nextAppointment = lastAppointment + 20; // 20 minutes after the last
  
  if (nextAppointment >= HOSPITAL_CLOSE) {
    return null; // No more slots available
  }

  appointmentQueue.push(nextAppointment);
  return nextAppointment;
};

app.post("/submitOpdForm", async (req, res) => {
  const { fullName, email } = req.body;
  const currentTime = new Date();
  const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

  if (currentMinutes >= HOSPITAL_CLOSE || currentMinutes < HOSPITAL_OPEN) {
    return res.status(400).json({ message: "Appointments closed for today." });
  }

  const appointmentTimeMinutes = getNextAppointmentTime();
  if (!appointmentTimeMinutes) {
    return res.status(400).json({ message: "No available slots." });
  }

  const appointmentTime = `${Math.floor(appointmentTimeMinutes / 60)}:${
    appointmentTimeMinutes % 60 === 0 ? "00" : appointmentTimeMinutes % 60
  } AM`;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: email,
    subject: "Appointment Confirmation",
    text: `Dear ${fullName}, your appointment is confirmed at ${appointmentTime}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: `Appointment booked at ${appointmentTime}` });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error });
  }
});




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