import Header from "./Header/Header";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import Cart from "./Cart/Cart";
import { selectCartIsOpen } from "../redux/cart/selectors";
import { useSelector } from "react-redux";
import Loader from "./Loader/Loader";
import BurgerMenu from "./BurgerMenu/BurgerMenu";

const Layout = () => {
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const cartIsOpen = useSelector(selectCartIsOpen);

  return (
    <div>
      <Header openBurger={() => setBurgerIsOpen(true)} />
      {cartIsOpen && <Cart />}
      {burgerIsOpen && (
        <BurgerMenu closeBurger={() => setBurgerIsOpen(false)} />
      )}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;
