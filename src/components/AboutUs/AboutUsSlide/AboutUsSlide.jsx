import clsx from "clsx";
import s from "./AboutUsSlide.module.scss";

const AboutUsSlide = ({ photo, name }) => {
  return (
    <div className={clsx("swiper-slide", s.slide)}>
      <img className={s.img} src={photo} alt={name} />
    </div>
  );
};

export default AboutUsSlide;
