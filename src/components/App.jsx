import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./Loader/Loader";

const HomePage = lazy(() => import("../pages/HomePage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CatalogPage = lazy(() => import("../pages/CatalogPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));
const WishListPage = lazy(() => import("../pages/WishListPage"));
const ProductCardPage = lazy(() => import("../pages/ProductCardPage"));

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/wishlist" element={<WishListPage />} />
          <Route path="/catalog/:productId" element={<ProductCardPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
}

export default App;
