import { useState } from "react";
import { FaHospital, FaUserMd, FaClipboardList, FaBars } from "react-icons/fa";
import OpdForm from "./OpdForm";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white relative">
      {/* Animated Lights */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 via-blue-600 to-black opacity-50 blur-3xl"></div>
      
      {/* Sidebar */}
      <div className={`bg-black bg-opacity-80 w-64 p-6 space-y-6 fixed h-full ${sidebarOpen ? "block" : "hidden"} md:block shadow-xl border-r border-gray-700 z-10`}>
        <h2 className="text-2xl font-extrabold text-blue-400">🔥 DocTime Dashboard 🔥</h2>
        <ul className="space-y-4 mt-6">
          <li className="flex items-center space-x-2 hover:text-gray-400 cursor-pointer">
            <FaHospital className="text-red-500" /> <span>Hospitals</span>
          </li>
          <li className="flex items-center space-x-2 hover:text-gray-400 cursor-pointer">
            <FaUserMd className="text-green-500" /> <span>Doctors</span>
          </li>
          <li className="flex items-center space-x-2 hover:text-gray-400 cursor-pointer">
            <FaClipboardList className="text-yellow-500" /> <span>Appointments</span>
          </li>
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 z-0 relative">
        {/* Top Bar */}
        <div className="bg-black bg-opacity-60 p-4 shadow flex items-center justify-between border-b border-gray-700">
          <FaBars className="md:hidden text-xl cursor-pointer text-blue-400" onClick={() => setSidebarOpen(!sidebarOpen)} />
          <h1 className="text-2xl font-extrabold text-yellow-400">🚀 Dashboard 🚀</h1>
        </div>

        {/* Dashboard Cards */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 shadow-lg rounded-lg text-center border border-gray-700 hover:scale-105 transition">
            <FaHospital className="text-blue-500 text-5xl mx-auto" />
            <h3 className="text-lg font-semibold mt-2">Total Hospitals</h3>
            <p className="text-gray-400 text-xl">15</p>
          </div>
          <div className="bg-gray-800 p-6 shadow-lg rounded-lg text-center border border-gray-700 hover:scale-105 transition">
            <FaUserMd className="text-green-500 text-5xl mx-auto" />
            <h3 className="text-lg font-semibold mt-2">Available Doctors</h3>
            <p className="text-gray-400 text-xl">50</p>
          </div>
          <div className="bg-gray-800 p-6 shadow-lg rounded-lg text-center border border-gray-700 hover:scale-105 transition">
            <FaClipboardList className="text-red-500 text-5xl mx-auto" />
            <h3 className="text-lg font-semibold mt-2">Appointments Today</h3>
            <p className="text-gray-400 text-xl">120</p>
          </div>
        </div>

        {/* OPD Form Section */}
        <div className="p-10 flex justify-center items-center mt-10">
          <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-2xl border border-gray-600 w-full max-w-2xl text-center transform hover:scale-105 transition">
            <h2 className="text-3xl font-bold text-blue-400 mb-4">🩺 Add OPD Form 🩺</h2>
            <OpdForm/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
