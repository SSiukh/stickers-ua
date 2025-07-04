import s from "./Header.module.scss";
import CartButton from "../CartButton/CartButton";
import { Link, NavLink, useLocation } from "react-router-dom";
import AuthButtons from "../AuthButtons/AuthButtons";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectRole } from "../../redux/auth/selectors";
import { Link as ScrollLink } from "react-scroll";
import { setNavClass } from "../../utils/utils";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect } from "react";
import { getCartItems } from "../../redux/authCart/operations";

const Header = ({ openBurger }) => {
  const isAuth = useSelector(selectIsLoggedIn);
  const { pathname } = useLocation();
  const role = useSelector(selectRole);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCartItems());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <header className={s.header}>
      <div className="container">
        <div className={s.container}>
          <Link className={s.logo} to="/">
            sticker ua
          </Link>
          <nav className={s.navigation}>
            <ul className={s.list}>
              <li className={s.item}>
                <NavLink
                  className={(isActive) => setNavClass(isActive, s)}
                  to="/"
                >
                  Головна
                </NavLink>
              </li>
              {pathname === "/" && (
                <li className={s.item}>
                  <ScrollLink to="about" smooth={true} duration={500}>
                    Найпопулярніші
                  </ScrollLink>
                </li>
              )}
              <li className={s.item}>
                <NavLink
                  className={(isActive) => setNavClass(isActive, s)}
                  to="/catalog"
                >
                  Каталог
                </NavLink>
              </li>
              {pathname === "/" && (
                <li className={s.item}>
                  <ScrollLink to="discount" smooth={true} durstion={500}>
                    Знижки
                  </ScrollLink>
                </li>
              )}
              {pathname === "/" && (
                <li className={s.item}>
                  <ScrollLink to="responses" smooth={true} durstion={500}>
                    Відгуки
                  </ScrollLink>
                </li>
              )}
              <li className={s.item}>
                <NavLink
                  className={(isActive) => setNavClass(isActive, s)}
                  to="/wishlist"
                >
                  Вподобані
                </NavLink>
              </li>
              {role === "manager" && (
                <li className={s.item}>
                  <NavLink
                    className={(isActive) => setNavClass(isActive, s)}
                    to="/manager"
                  >
                    Кабінет
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
          <div className={s.buttonsBlock}>
            {isAuth || pathname !== "/" ? <CartButton /> : <AuthButtons />}
          </div>
          <IconButton onClick={openBurger} className={s.burgerButton}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>
    </header>
  );
};

export default Header;
