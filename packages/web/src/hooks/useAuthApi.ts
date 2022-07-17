import { User } from "@prisma/client";
import axios from "axios";
import { UserAPI } from "~/interfaces/api/APIUser";
import { LoginCredentials } from "~/utils/schemas/loginSchema";

export const api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem("@auth:token");

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const useAuthApi = () => ({
  signIn: async (credentials: LoginCredentials) => {
    const response = await api.post<{ token: string }>("/login", credentials);

    const token = response.data.token;

    if (!token) throw new Error("Falha na autenticação.");

    return token;
  },
  getMe: async () => {
    const response = await api.get<UserAPI>("/me");
    return response.data;
  },
  signOut: async () => {
    sessionStorage.removeItem("@auth:token");
  },
});
