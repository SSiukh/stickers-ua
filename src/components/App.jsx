import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import Layout from "./Layout";
import Notificator from "./Notificator/Notificator";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";
import ManagerRoute from "./ManagerRoute";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../redux/auth/operations";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";
import Loader from "./Loader/Loader";
import CreateStickers from "./CreateStickers/CreateStickers";
import { fetchProducts } from "../redux/products/operations";

const HomePage = lazy(() => import("../pages/HomePage"));
const CatalogPage = lazy(() => import("../pages/CatalogPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const PersonalAccount = lazy(() => import("../pages/PersonalAccount"));
const ProductCardPage = lazy(() =>
  import("../pages/ProductCardPage/ProductCardPage")
);
const LoginPage = lazy(() => import("../pages/LoginPage"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const Order = lazy(() => import("../pages/Order/Order"));
const ManagerPage = lazy(() => import("../pages/ManagerPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(refreshUser());
    }
    dispatch(fetchProducts());
  }, [dispatch, isLoggedIn]);

  return isRefreshing ? (
    <Loader />
  ) : (
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
          <Route
            path="/manager"
            element={<ManagerRoute component={<ManagerPage />} />}
          >
            <Route path="create-stickers" element={<CreateStickers />} />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Notificator />
    </>
  );
}

export default App;
