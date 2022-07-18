import { Route, Routes as Router } from "react-router-dom";
import { AdminPage } from "~/pages/Admin";
import { AdminCategorias } from "~/pages/Admin/Categorias";
import { AdminProdutos } from "~/pages/Admin/Produtos";
import { HomePage } from "~/pages/Home";
import { LoginPage } from "~/pages/Login";
import { ProductPage } from "~/pages/Product";
import { SignOut } from "~/pages/SignOut";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<HomePage />} />

      <Route>
        <Route path="/produto/:id" element={<ProductPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/sair" element={<SignOut />} />

      <Route path="/admin" element={<AdminPage />}></Route>
      <Route path="/admin/menu" element={<AdminProdutos />} />
      <Route path="/admin/categoria" element={<AdminCategorias />} />
    </Router>
  );
};
