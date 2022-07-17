import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/hooks/useAuth";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

interface Props {
  children?: ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) navigate("/login", { replace: true });
  }, [user, loading]);

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <Header />
      <div className="flex w-full h-full">
        <Sidebar />
        <main className="flex bg-slate-100 w-full h-full border-t border-l p-2 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};
