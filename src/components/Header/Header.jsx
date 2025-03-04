import s from "./Header.module.scss";
import CartButton from "../CartButton/CartButton";
import { Link, NavLink } from "react-router-dom";
import AuthButtons from "../AuthButtons/AuthButtons";
import { useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

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
                <NavLink to="/">Головна</NavLink>
              </li>
              <li className={s.item}>
                <HashLink to="/#about">Найпопулярніші</HashLink>
              </li>
              <li className={s.item}>
                <NavLink to="/catalog">Каталог</NavLink>
              </li>
              <li className={s.item}>
                <HashLink to="/#discount">Знижки</HashLink>
              </li>
              <li className={s.item}>
                <HashLink to="/#responses">Відгуки</HashLink>
              </li>
              <li className={s.item}>
                <NavLink to="/wishlist">Вподобані</NavLink>
              </li>
            </ul>
          </nav>
          <div className={s.buttonsBlock}>
            {isAuth ? <CartButton /> : <AuthButtons />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
