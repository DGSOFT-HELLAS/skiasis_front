import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: process.env.NEXTAUTH_URL, // Replace with your API base URL
});


export default axiosInstance;

