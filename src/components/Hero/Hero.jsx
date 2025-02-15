import s from "./Hero.module.scss";
import logo from "../../assets/otherImages/hero-logo.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className={s.hero}>
      <div className="container">
        <div className={s.heroContainer}>
          <div className={s.mainContent}>
            <h1 className={s.heroTitle}>
              STICKER UA - магазин якісних наклейок
            </h1>
            <p className={s.heroText}>
              Перетвори свій байк на витвір мистецтва
            </p>
            <Link to="/catalog" className={s.heroButton}>
              Переглянути наклейки
            </Link>
          </div>
          <img src={logo} alt="logotype" className={s.heroImg} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
