const mongoose = require("mongoose");

const opdSchema = new mongoose.Schema({
  fullName: String,
  age: Number,
  gender: String,
  contactNumber: String,
  email: String,
  address: String,
  emergencyContact: String,
  symptoms: String,
  dateOfVisit: Date,
  doctorName: String,
  medicalHistory: String,
  allergies: String,
  currentMedications: String,
  bloodGroup: String,
  opdFees: Number,
  paymentMode: String,
  specialNotes: String,
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hospital', required: true }, // Reference to Hospital
});

module.exports = mongoose.model("opdModel", opdSchema);
