import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL as string;
console.log(BASE_URL);

export const publicRequest = axios.create({
  baseURL: BASE_URL + "/api",
});

// export const userRequest = axios.create({
// 	baseURL: BASE_URL,
// 	headers: { token: `Bearer ${TOKEN}` },
// });
