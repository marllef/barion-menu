import { SideLink } from "./SideLink";
import { SideSection } from "./SideSection";
import {
  MdFastfood,
  MdSpaceDashboard,
  MdPeople,
  MdLogout,
  MdStyle,
} from "react-icons/md";

export const Sidebar = () => {
  return (
    <aside className="w-full max-w-[12rem] bg-white h-full px-2 space-y-1">
      <SideLink to="/admin" icon={MdSpaceDashboard}>
        Dashboard
      </SideLink>

      <SideSection title="Estabelecimento">
        <SideLink to="/admin/categoria" icon={MdStyle}>
          Categorias
        </SideLink>
        <SideLink to="/admin/menu" icon={MdFastfood}>
          Produtos
        </SideLink>
      </SideSection>

      <SideSection title="Usuários" defaultClose={true}>
        <SideLink to="/" icon={MdPeople}>
          Gerenciar
        </SideLink>
      </SideSection>

      <SideLink to="/sair" icon={MdLogout}>
        Sair
      </SideLink>
    </aside>
  );
};
