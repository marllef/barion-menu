import { Route, Routes as Router } from "react-router-dom";
import { AdminPage } from "~/pages/Admin";
import { Estoque } from "~/pages/Admin/Estoque";
import { AdminMenu } from "~/pages/Admin/Menu";
import { HomePage } from "~/pages/Home";
import { LoginPage } from "~/pages/Login";
import { ProductPage } from "~/pages/Product";
import { SignOut } from "~/pages/SignOut";
import { Private } from "./ProtectedRoute";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<HomePage />} />

      <Route>
        <Route path="/produto/:id" element={<ProductPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/sair" element={<SignOut />} />

      <Route
        path="/admin"
        element={
          <Private>
            <AdminPage />
          </Private>
        }
      ></Route>
      <Route path="/admin/menu" element={<AdminMenu />} />
      <Route path="/admin/estoque" element={<Estoque />} />
    </Router>
  );
};
