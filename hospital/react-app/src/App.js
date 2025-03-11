import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OpdForm from "./components/OpdForm";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from './components/Navbar';
import ProtectedRoute  from "./components/Protectedroutes";
import Doclist from "./components/doclist";
import DoctorForm from "./components/Docform";
import Dashboard   from "./components/home";
import './App.css';

function App() {
  return (
    <Router>
      <Navbar/> 
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
        <Routes>
          <Route path="/" element={<> <OpdForm/></>} />
          <Route path="/doctors" element={<Doclist/>}></Route>
          <Route path="/dashboard" element={<ProtectedRoute><AdminDashboard></AdminDashboard><DoctorForm/></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
