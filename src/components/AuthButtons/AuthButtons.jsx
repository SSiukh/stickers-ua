import s from "./AuthButtons.module.scss";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modalsSlice";

const AuthButtons = () => {
  const dispatch = useDispatch();

  return (
    <div className={s.block}>
      <button
        onClick={() => dispatch(openModal("login"))}
        className={s.loginButton}
      >
        Увійти
      </button>
      <button
        onClick={() => dispatch(openModal("register"))}
        className={s.registerButton}
      >
        Зареєструватись
      </button>
    </div>
  );
};

export default AuthButtons;
