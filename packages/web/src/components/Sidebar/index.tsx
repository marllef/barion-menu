import { SideLink } from "./SideLink";
import { SideSection } from "./SideSection";

export const Sidebar = () => {
  return (
    <aside className="w-40 bg-white h-full">
      <SideSection title="Loja">
        <SideLink to="/admin">Dashboard</SideLink>
        <SideLink to="/admin/menu">Menu</SideLink>
        <SideLink to="/">Produtos</SideLink>
      </SideSection>
      <SideSection title="Usuários">
        <SideLink to="/">Gerenciar</SideLink>
      </SideSection>
      <SideSection title="Acesso">
        <SideLink to="/sair">Sair</SideLink>
      </SideSection>
    </aside>
  );
};
