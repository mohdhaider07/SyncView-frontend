import axios from "axios";
import { getToken } from "./utils/utils";

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL as string;
const TOKEN = getToken();
export const publicRequest = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const userRequest = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});
