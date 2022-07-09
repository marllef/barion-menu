import { ReactNode, useEffect, useState } from "react";
import { LoginCredentials } from "~/utils/schemas/loginSchema";
import { showError, showSuccess } from "~/utils/toastfy/toasts";
import { useApi } from "~/hooks/useApi";
import { AuthContext } from "./AuthContext";

interface Props {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string>("");
  const api = useApi();

  useEffect(() => {}, []);

  async function signIn(credentials: LoginCredentials) {
    try {
      setLoading(true);

      const mToken = await api.signIn(credentials);

      setToken(mToken);
      showSuccess("Autenticado com sucesso!");

      return mToken;
    } catch (err: any) {
      showError(err.message);

      return null;
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    await api.signOut();
  }

  const auth = {
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={{ auth, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
