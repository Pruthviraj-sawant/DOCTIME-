import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // Change if needed

export const registerAdmin = (data) => axios.post(`${BASE_URL}/admin/register`, data);
export const loginAdmin = (data) => axios.post(`${BASE_URL}/admin/login`, data);
export const submitOpdForm = (hospitalId, data) => 
  axios.post(`${BASE_URL}/opd/${hospitalId}`, data);

// export const submitDocForm = (data) => axios.post(`${BASE_URL}/dashboard/add`, data);
export const submitDocForm = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/dashboard/add`, data);
    return response.data; // Returning the response data
  } catch (error) {
    console.error("Error submitting doctor form:", error.response?.data || error.message);
    throw error;
  }
};
// export const getOpdRecords = (token) =>
//   axios.get(`${BASE_URL}/dashboard`, { headers: { Authorization: token } });

export const getOpdRecords = (token) =>
  axios.get(`${BASE_URL}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getdoclist = (token) =>
  axios.get(`${BASE_URL}/`, { headers: { Authorization: token } });