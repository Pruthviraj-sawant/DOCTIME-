import { submitDocForm } from "../api/api"; // Adjust path based on your project structure
import { useState } from "react";

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    hospital_name: "",
    name: "",
    specialization: "",
    contact_info: "",
    availability: "",
    hospitalId: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await submitDocForm(formData);
      console.log("Doctor added successfully:", result);
      alert("Doctor added successfully!");
    } catch (error) {
      alert("Failed to add doctor.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-center item-center gap-10 p-10 bg-white mr-10 border-2 ">
      <input type="text" name="hospital_name" placeholder="Hospital Name" onChange={handleChange} required />
      <input type="text" name="name" placeholder="Doctor Name" onChange={handleChange} required />
      <input type="text" name="specialization" placeholder="Specialization" onChange={handleChange} required />
      <input type="text" name="contact_info" placeholder="Contact Info" onChange={handleChange} required />
      <input type="text" name="availability" placeholder="Availability" onChange={handleChange} required />
      <input type="text" name="hospitalId" placeholder="Hospital ID" onChange={handleChange} required />
      <button type="submit" className="border w-20">Submit</button>
    </form>
  );
};

export default AddDoctorForm;
