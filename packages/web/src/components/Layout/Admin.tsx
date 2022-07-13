import { ReactNode } from "react";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

interface Props {
  children?: ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden">
      <Header />
      <div className="flex w-full h-full">
        <Sidebar />
        <main className="bg-slate-100 w-full h-full border-t border-l">
          {children}
        </main>
      </div>
    </div>
  );
};
