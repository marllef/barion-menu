import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "~/hooks/useAuth";

export const SignOut = () => {
  const { auth, user } = useAuth();

  useEffect(() => {
    auth.signOut();
  }, []);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div>Saindo...</div>
      {!user && <Navigate to={"/login"} replace />}
    </div>
  );
};
