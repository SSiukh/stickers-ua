import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Layout from "./Layout";
import Notificator from "./Notificator/Notificator";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";

const HomePage = lazy(() => import("../pages/HomePage"));
const CatalogPage = lazy(() => import("../pages/CatalogPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const WishListPage = lazy(() => import("../pages/WishListPage"));
const ProductCardPage = lazy(() =>
  import("../pages/ProductCardPage/ProductCardPage")
);
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route
            path="wishlist"
            element={<PrivateRoute component={<WishListPage />} />}
          />
          <Route path="catalog/:productId" element={<ProductCardPage />} />
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
