import { Route, Routes as Router } from "react-router-dom";
import { AdminPage } from "~/pages/Admin";
import { HomePage } from "~/pages/Home";
import { LoginPage } from "~/pages/Login";
import { SignOut } from "~/pages/SignOut";
import { Private } from "./ProtectedRoute";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<HomePage />}>
        <Route path="/:id" element={<HomePage />} />
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
      />
    </Router>
  );
};
