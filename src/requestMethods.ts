import axios from "axios";
import { getToken, removeAuth, setRedirectUrl } from "./utils/utils";

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

userRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const res = error.response;
    setTimeout(() => {
      if (res.status === 403) {
        removeAuth();
        setRedirectUrl(window.location.pathname);
        window.location.href = "/login";
      }
    }, 2000);
  }
);
