import { ReactNode, useEffect, useState } from "react";
import { LoginCredentials } from "~/utils/schemas/loginSchema";
import { showError, showSuccess } from "~/utils/toastfy/toasts";
import { useAuthApi } from "~/hooks/useAuthApi";
import { AuthContext } from "./AuthContext";
import { UserAPI } from "~/interfaces/api/APIUser";

interface Props {
  children?: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [user, setUser] = useState<UserAPI | null>(null);

  const authApi = useAuthApi();

  useEffect(() => {
    authApi
      .getMe()
      .then((res) => setUser(res))
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function signIn(credentials: LoginCredentials) {
    try {
      const mToken = await authApi.signIn(credentials);

      sessionStorage.setItem("@auth:token", mToken);

      const mUser = await authApi.getMe();

      setUser(mUser);

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
    try {
      await authApi.signOut();
      sessionStorage.setItem("@auth:token", "");
      setUser(null);
    } catch (err: any) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
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
