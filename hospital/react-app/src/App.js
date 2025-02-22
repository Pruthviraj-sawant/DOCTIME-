import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OpdForm from "./components/OpdForm";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from './components/Navbar';
import ProtectedRoute  from "./components/Protectedroutes";
import Doclist from "./components/doclist";
import DoctorForm from "./components/Docform";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<><Navbar/> <OpdForm /> <Doclist/></>} />
          <Route path="/dashboard" element={<ProtectedRoute element={<AdminDashboard><DoctorForm/></AdminDashboard> } />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
