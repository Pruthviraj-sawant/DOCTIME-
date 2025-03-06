import { useState } from "react";
import { submitOpdForm } from "../api/api";
import { Link } from "react-router-dom";

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
    bloodGroup: "",
    opdFees: "",
    paymentMode: "",
    hospitalId: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const hospitalId = formData.hospitalId;
  const opdData = { ...formData };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitOpdForm(hospitalId, opdData);
      alert("OPD Form submitted successfully");
    } catch (error) {
      alert("Error submitting OPD Form");
    }
    try {
      const response = await fetch("http://localhost:5000/submitOpdForm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert("Error submitting OPD Form");
    }

  };

  return (
    <div className="w-full">
      <div className="h-16 px-5 bg-blue-500 text-white flex items-center justify-between">
        <h1 className="text-xl font-bold">DocTime</h1>
        <div className="flex gap-6">
          <Link to="/login" className="px-6 py-2 rounded hover:bg-blue-600 transition">
            Login
          </Link>
          <Link to="/register" className="px-6 py-2 rounded hover:bg-blue-600 transition">
            Register
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl rounded-2xl mt-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">OPD Form</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                type={
                  key === "email"
                    ? "email"
                    : key === "age" || key === "opdFees"
                    ? "number"
                    : "text"
                }
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").trim()}`}
                className={`w-full px-4 py-3 border ${
                  errors[key] ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500`}
              />
              {errors[key] && <p className="text-red-500 text-sm mt-1">{errors[key]}</p>}
            </div>
          ))}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OpdForm;
