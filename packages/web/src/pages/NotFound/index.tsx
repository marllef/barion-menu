import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-slate-200 select-none space-y-2">
      <div className="flex flex-col justify-center items-center border-b border-slate-300 py-2">
        <h1 className="text-slate-500 text-6xl">404</h1>
        <h1 className="text-slate-500 text-3xl">Page Not Found</h1>
      </div>

      <div className="flex space-x-2">
        <Link className="hover:text-slate-500 text-slate-700" to={"/"}>
          Retornar ao Inicio
        </Link>
      </div>
    </div>
  );
};
