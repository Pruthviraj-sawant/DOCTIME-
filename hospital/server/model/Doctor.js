const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
 hospital_name:{type:String,required:true}, 
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  contact_info: { type: String, required: true },
  availability: { type: String, required: true },
  hospitalId: { type: String,required:true, required: true }, // Reference to Hospital
});
module.exports = mongoose.model('Doctor', doctorSchema);