import { SideLink } from "./SideLink";
import { SideSection } from "./SideSection";

export const Sidebar = () => {
  return (
    <aside className="w-40 bg-white h-full">
      <SideSection title="Loja">
        <SideLink to="/">Dashboard</SideLink>
        <SideLink to="/">Menu</SideLink>
        <SideLink to="/">Dashboard</SideLink>
      </SideSection>
      <SideSection title="Usuários">
        <SideLink to="/">Gerenciar</SideLink>
      </SideSection>
    </aside>
  );
};
