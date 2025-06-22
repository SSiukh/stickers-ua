import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import Layout from "./Layout";
import Notificator from "./Notificator/Notificator";
import RestrictedRoute from "./RestrictedRoute";
import ManagerRoute from "./ManagerRoute";
import { useDispatch } from "react-redux";
import { refreshUser } from "../redux/auth/operations";
import CreateStickers from "./CreateStickers/CreateStickers";
import { fetchProducts } from "../redux/products/operations";
import OrdersProcessing from "./OrdersProcessing/OrdersProcessing";
import StickersProcessing from "./StickersProcessing/StickersProcessing";

const HomePage = lazy(() => import("../pages/HomePage"));
const CatalogPage = lazy(() => import("../pages/CatalogPage/CatalogPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const WishListPage = lazy(() => import("../pages/WishListPage"));
const ProductCardPage = lazy(() =>
  import("../pages/ProductCardPage/ProductCardPage")
);
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const Order = lazy(() => import("../pages/Order/Order"));
const ManagerPage = lazy(() => import("../pages/ManagerPage"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
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
          <Route
            path="/manager"
            element={<ManagerRoute component={<ManagerPage />} />}
          >
            <Route path="create-stickers" element={<CreateStickers />} />
            <Route path="orders-processing" element={<OrdersProcessing />} />
            <Route
              path="stickers-processing"
              element={<StickersProcessing />}
            />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Notificator />
    </>
  );
}

export default App;
