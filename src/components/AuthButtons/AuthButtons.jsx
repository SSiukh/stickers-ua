import { useLocation } from "react-router-dom";
import s from "./AuthButtons.module.scss";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";

const AuthButtons = () => {
  const { pathname } = useLocation();
  const isMobile = useMediaQuery({ maxWidth: 520 });

  return (
    <div className={s.block}>
      {pathname !== "/login" && (
        <Button size={isMobile ? "small" : "large"} variant="contained">
          {isMobile ? <LoginIcon /> : <Link to="/login">Увійти</Link>}
        </Button>
      )}
      {pathname !== "/register" && (
        <Button size={isMobile ? "small" : "large"} variant="contained">
          {isMobile ? (
            <HowToRegIcon />
          ) : (
            <Link to="/register">Зареєструватись</Link>
          )}
        </Button>
      )}
    </div>
  );
};

export default AuthButtons;
