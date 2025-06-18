import { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { selectRole } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import s from "./BurgerMenu.module.scss";
import { Link as ScrollLink } from "react-scroll";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const BurgerMenu = ({ closeBurger }) => {
  const overlay = useRef();
  const { pathname } = useLocation();
  const role = useSelector(selectRole);

  useEffect(() => {
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  const handleOverlayClose = (e) => {
    if (e.target !== overlay.current) {
      return;
    }

    closeBurger();
  };

  return (
    <div ref={overlay} className={s.overlay} onClick={handleOverlayClose}>
      <div className={s.container}>
        <div className={s.textBlock}>
          <p className={s.text}>Меню</p>
          <IconButton onClick={closeBurger} color="secondary">
            <CloseIcon />
          </IconButton>
        </div>
        <ul className={s.list}>
          <li onClick={closeBurger} className={s.item}>
            <NavLink to="/">Головна</NavLink>
          </li>
          {pathname === "/" && (
            <li className={s.item}>
              <ScrollLink
                onClick={closeBurger}
                to="about"
                smooth={true}
                duration={500}
              >
                Найпопулярніші
              </ScrollLink>
            </li>
          )}
          <li onClick={closeBurger} className={s.item}>
            <NavLink to="/catalog">Каталог</NavLink>
          </li>
          {pathname === "/" && (
            <li className={s.item}>
              <ScrollLink
                onClick={closeBurger}
                to="discount"
                smooth={true}
                duration={500}
              >
                Знижки
              </ScrollLink>
            </li>
          )}
          {pathname === "/" && (
            <li className={s.item}>
              <ScrollLink
                onClick={closeBurger}
                to="responses"
                smooth={true}
                duration={500}
              >
                Відгуки
              </ScrollLink>
            </li>
          )}
          <li onClick={closeBurger} className={s.item}>
            <NavLink to="/wishlist">Вподобані</NavLink>
          </li>
          {role === "manager" && (
            <li onClick={closeBurger} className={s.item}>
              <NavLink to="/manager">Кабінет</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BurgerMenu;
