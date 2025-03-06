import { useEffect, useState } from "react";
import { getOpdRecords } from "../api/api";

const AdminDashboard = ({ children }) => {
  const [opdRecords, setOpdRecords] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data } = await getOpdRecords(token);
        setOpdRecords(data);
      } catch (error) {
        alert("Error fetching OPD records");
      }
    };
    fetchRecords();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard - OPD Records</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Full Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Symptoms</th>
            <th className="border p-2">Appointment Number</th>
          </tr>
        </thead>
        <tbody>
          {opdRecords.map((record, index) => (
            <tr key={index} className="border">
              <td className="border p-2">{record.fullName}</td>
              <td className="border p-2">{record.age}</td>
              <td className="border p-2">{record.symptoms}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {children}
    </div>
  );
};

export default AdminDashboard;
