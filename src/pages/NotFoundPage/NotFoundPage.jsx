import { Button } from "@mui/material";
import BackLayout from "../../components/BackLayout/BackLayout";
import s from "./NotFoundPage.module.scss";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <BackLayout>
        <div className="container">
          <div className={s.container}>
            <p className={s.code}>404</p>
            <p className={s.text}>Сторінка не доступна :(</p>
            <Button size="large" color="primary" variant="contained">
              <Link to="/">Повернутись</Link>
            </Button>
          </div>
        </div>
      </BackLayout>
    </>
  );
};

export default NotFoundPage;
