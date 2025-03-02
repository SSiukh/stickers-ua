import clsx from "clsx";
import s from "./AboutUsSlide.module.scss";

const AboutUsSlide = ({ path, name }) => {
  return (
    <div className={clsx("swiper-slide", s.slide)}>
      <img className={s.img} src={path} alt={name} />
    </div>
  );
};

export default AboutUsSlide;
