import Header from "./Header/Header";
import { Suspense } from "react";
import Loader from "./Loader/Loader";
import { Outlet } from "react-router-dom";
import Cart from "./Cart/Cart";
import { selectCartIsOpen } from "../redux/cart/selectors";
import { useSelector } from "react-redux";

const Layout = () => {
  const cartIsOpen = useSelector(selectCartIsOpen);

  return (
    <div>
      <Header />
      {cartIsOpen && <Cart />}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
