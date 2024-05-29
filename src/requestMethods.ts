import axios from "axios";

// const BASE_URL = import.meta.env.VITE_BASE_URL as string;
// const BASE_URL = "http://localhost:5000/api";
const BASE_URL = "https://syncview-backend.onrender.com/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

// export const userRequest = axios.create({
// 	baseURL: BASE_URL,
// 	headers: { token: `Bearer ${TOKEN}` },
// });
