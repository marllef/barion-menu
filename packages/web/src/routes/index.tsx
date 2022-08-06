import { Route, Routes as Router } from "react-router-dom";
import { AdminCardapios } from "~/pages/Admin/Cardapios";
import { AdminCategorias } from "~/pages/Admin/Categorias";
import { AdminDashboard } from "~/pages/Admin/Dashboard";
import { AdminProdutos } from "~/pages/Admin/Produtos";
import { MenuPage } from "~/pages/Menu";
import { LoginPage } from "~/pages/Login";
import { NotFound } from "~/pages/NotFound";
import { ProductPage } from "~/pages/Product";
import { SignOut } from "~/pages/SignOut";
import { HomePage } from "~/pages/Home";

export const Routes = () => {
  return (
    <Router>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/sair" element={<SignOut />} />

      <Route path="/:code">
        <Route path="" element={<MenuPage />} />
        <Route path=":id" element={<ProductPage />} />
      </Route>

      <Route path="/admin">
        <Route path="" element={<AdminDashboard />} />
        <Route path="produtos" element={<AdminProdutos />} />
        <Route path="categoria" element={<AdminCategorias />} />
        <Route path="cardapios" element={<AdminCardapios />} />
      </Route>
    </Router>
  );
};
