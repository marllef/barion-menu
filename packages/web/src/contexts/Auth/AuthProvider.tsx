import { ReactNode, useEffect, useState } from "react";
import { LoginCredentials } from "~/utils/schemas/loginSchema";
import { showError, showSuccess } from "~/utils/toastfy/toasts";
import { useAuthApi } from "~/hooks/useAuthApi";
import { AuthContext } from "./AuthContext";
import { User } from "@prisma/client";
import axios from "axios";

interface Props {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string>("");
  const api = useAuthApi();

  useEffect(() => {
    const mToken = sessionStorage.getItem("@auth:token");

    if (mToken) {
      api.getMe().then((res) => setUser(res));
    }
  }, []);

  async function signIn(credentials: LoginCredentials) {
    try {
      setLoading(true);

      const mToken = await api.signIn(credentials);

      sessionStorage.setItem("@auth:token", mToken);

      setToken(mToken);

      showSuccess("Autenticado com sucesso!");

      return true;
    } catch (err: any) {
      showError(err.message);

      return false;
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await api.signOut();
    sessionStorage.setItem("@auth:token", "");
    setToken("");
    setUser(null);
  }

  const auth = {
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={{ auth, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
