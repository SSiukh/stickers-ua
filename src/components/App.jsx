import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Layout from "./Layout";
import Notificator from "./Notificator/Notificator";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";

const HomePage = lazy(() => import("../pages/HomePage"));
const CatalogPage = lazy(() => import("../pages/CatalogPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const PersonalAccount = lazy(() => import("../pages/PersonalAccount"));
const ProductCardPage = lazy(() =>
  import("../pages/ProductCardPage/ProductCardPage")
);
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const Order = lazy(() => import("../pages/Order"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route
            path="myaccount"
            element={<PrivateRoute component={<PersonalAccount />} />}
          />
          <Route path="catalog/:productId" element={<ProductCardPage />} />
          <Route path="order" element={<Order />} />
          <Route
            path="/login"
            element={<RestrictedRoute component={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<RestrictedRoute component={<RegisterPage />} />}
          />
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Notificator />
    </>
  );
}

export default App;
