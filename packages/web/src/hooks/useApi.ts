import axios from "axios";
import { LoginCredentials } from "~/utils/schemas/loginSchema";

const api = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
});

export const useApi = () => ({
  signIn: async (credentials: LoginCredentials) => {
    const response = await api.post<{ token: string }>("/login", credentials);

    const token = response.data.token;

    if (!token) throw new Error("Falha na autenticação.");

    sessionStorage.setItem("@auth:token", token);
    return token;
  },
  signOut: async () => {
    sessionStorage.removeItem("@auth:token");
  },
});
