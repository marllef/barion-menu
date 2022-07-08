import { Route, Routes as Router } from "react-router-dom";
import { HomePage } from "~/pages/HomePage";
import { LoginPage } from "~/pages/LoginPage";

export const Routes = () => {
  return (
    <Router>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
    </Router>
  );
};
