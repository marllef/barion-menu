import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "~/hooks/useAuth";

interface Props {
  children: JSX.Element;
}

export const Private = ({ children }: Props) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) navigate("/login", { replace: true });
  }, [user, loading]);

  return children;
};
