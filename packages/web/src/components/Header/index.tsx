import { useAuth } from "~/hooks/useAuth";

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="flex w-full h-12 bg-white justify-between items-center px-14 py-2 select-none text-xs">
      <div className="text-slate-800 italic">
        <span>Barion</span>
        <span className="text-sky-600 font-bold">Project</span>
      </div>

      <div className=" text-xs text-slate-700 italic py-1">
        <span className="px-1">{user?.name.split(" ")[0]}</span>
        <span className="text-white font-semibold rounded bg-sky-600 hover:bg-sky-700 transition-colors py-1 px-2 rounded-tl-full rounded-br-full">
          {user?.roles[0]}
        </span>
      </div>
    </header>
  );
};
