import s from "./Header.module.scss";
import CartButton from "../CartButton/CartButton";
import { Link, NavLink, useLocation } from "react-router-dom";
import AuthButtons from "../AuthButtons/AuthButtons";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectRole } from "../../redux/auth/selectors";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
    const isAuth = useSelector(selectIsLoggedIn);
    const { pathname } = useLocation();
    const role = useSelector(selectRole);

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
                            {pathname === "/" && (
                                <li className={s.item}>
                                    <ScrollLink
                                        to="about"
                                        smooth={true}
                                        duration={500}
                                    >
                                        Найпопулярніші
                                    </ScrollLink>
                                </li>
                            )}
                            <li className={s.item}>
                                <NavLink to="/catalog">Каталог</NavLink>
                            </li>
                            {pathname === "/" && (
                                <li className={s.item}>
                                    <ScrollLink
                                        to="discount"
                                        smooth={true}
                                        durstion={500}
                                    >
                                        Знижки
                                    </ScrollLink>
                                </li>
                            )}
                            {pathname === "/" && (
                                <li className={s.item}>
                                    <ScrollLink
                                        to="responses"
                                        smooth={true}
                                        durstion={500}
                                    >
                                        Відгуки
                                    </ScrollLink>
                                </li>
                            )}
                            <li className={s.item}>
                                <NavLink to="/wishlist">Вподобані</NavLink>
                            </li>
                            {role === "manager" && (
                                <li className={s.item}>
                                    <NavLink to="/manager">Кабінет</NavLink>
                                </li>
                            )}
                        </ul>
                    </nav>
                    <div className={s.buttonsBlock}>
                        {isAuth || pathname !== "/" ? (
                            <CartButton />
                        ) : (
                            <AuthButtons />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
