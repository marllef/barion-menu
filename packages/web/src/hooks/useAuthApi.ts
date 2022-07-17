import { api } from "~/configs/api";
import { UserAPI } from "~/interfaces/api/APIUser";
import { LoginCredentials } from "~/utils/schemas/loginSchema";

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
    const response = await api.post<{ token: string }>(
      "/api/auth/login",
      credentials
    );

    const token = response.data.token;

    if (!token) throw new Error("Falha na autenticação.");

    return token;
  },
  getMe: async () => {
    const response = await api.get<UserAPI>("/api/auth/me");
    return response.data;
  },
  signOut: async () => {
    sessionStorage.removeItem("@auth:token");
  },
});
