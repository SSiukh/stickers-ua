import { useLocation } from "react-router-dom";
import s from "./AuthButtons.module.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const AuthButtons = () => {
  const { pathname } = useLocation();

  return (
    <div className={s.block}>
      {pathname !== "/login" && (
        <Button size="large" variant="contained">
          <Link to="/login">Увійти</Link>
        </Button>
      )}
      {pathname !== "/register" && (
        <Button size="large" variant="contained">
          <Link to="/register">Зареєструватись</Link>
        </Button>
      )}
    </div>
  );
};

export default AuthButtons;
