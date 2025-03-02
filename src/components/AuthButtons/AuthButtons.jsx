import s from "./AuthButtons.module.scss";
import { Link } from "react-router-dom";

const AuthButtons = () => {
  return (
    <div className={s.block}>
      <Link className={s.loginButton} to="/login">
        Увійти
      </Link>
      <Link className={s.registerButton} to="/register">
        Зареєструватись
      </Link>
    </div>
  );
};

export default AuthButtons;
