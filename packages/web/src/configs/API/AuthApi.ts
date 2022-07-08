import axios from "axios";

export const AuthAPI = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
});
