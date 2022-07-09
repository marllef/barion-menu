import { createContext } from "react";
import { LoginCredentials } from "~/utils/schemas/loginSchema";

type AuthState = {
  token: string;
  loading: boolean;
  auth: {
    signIn: { (credentials: LoginCredentials): Promise<string | null> };
    signOut: { (): Promise<void> };
  };
};

export const AuthContext = createContext<AuthState | null>(null);
