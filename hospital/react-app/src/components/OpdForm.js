import { useState } from "react";
import { submitOpdForm } from "../api/api";

const OpdForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    contactNumber: "",
    email: "",
    address: "",
    emergencyContact: "",
    symptoms: "",
    dateOfVisit: "",
    doctorName: "",
    medicalHistory: "",
    allergies: "",
    currentMedications: "",
    bloodGroup: "",
    opdFees: "",
    paymentMode: "",
    specialNotes: "",
    hospitalId:"",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const hospitalId = formData.hospitalId; // Example of dynamic hospitalId
  const opdData = {
    ...formData
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitOpdForm(hospitalId, opdData);
      alert("OPD Form submitted successfully");
    } catch (error) {
      alert("Error submitting OPD Form");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 ">OPD Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.keys(formData).map((key) => (
          <div key={key}>
            <label className="block text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}</label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        ))}
        <button type="submit" className="col-span-2 bg-blue-500 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default OpdForm;




