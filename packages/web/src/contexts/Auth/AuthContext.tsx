import { User } from "@prisma/client";
import { createContext } from "react";
import { UserAPI } from "~/interfaces/api/APIUser";
import { LoginCredentials } from "~/utils/schemas/loginSchema";

type AuthState = {
  loading: boolean;
  user: UserAPI | null;
  auth: {
    signIn: { (credentials: LoginCredentials): Promise<boolean> };
    signOut: { (): Promise<void> };
  };
};

export const AuthContext = createContext<AuthState | null>(null);
