import axios from "axios";

const axiosInstance = axios.create({
  // backend mounts API routes under /api (see Backend/index.js)
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

export default axiosInstance;
