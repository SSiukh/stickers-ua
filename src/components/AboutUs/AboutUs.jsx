import s from "./AboutUs.module.scss";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import stickers from "../../data/stickers.json";
import AboutUsSlide from "./AboutUsSlide/AboutUsSlide";
import { useEffect, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  useEffect(() => {
    const swiper = new Swiper(".about-swiper", {
      effect: "coverflow",
      centeredSlides: true,
      slidesPerView: 2,
      slidesPerGroup: 1,
      initialSlide: 1,
      slideToClickedSlide: true,
      coverflowEffect: {
        scale: 0.5,
        rotate: 0,
        stretch: 75,
      },
    });

    swiper.on("slideChange", () => setActiveIndex(swiper.realIndex));

    return () => {
      swiper.off("slideChange");
      swiper.destroy();
    };
  }, []);

  const filteredStickers = stickers.filter((sticker) => sticker.onAbout);

  return (
    <section id="about" className={s.aboutUs}>
      <div className="container">
        <div className={s.aboutContainer}>
          <div className={s.aboutBlock}>
            <div className={s.textBlock}>
              <h2 className={s.aboutTitle}>
                {filteredStickers[activeIndex].name}
              </h2>
              <p className={s.aboutText}>
                {filteredStickers[activeIndex].info}
              </p>
            </div>
            <div className={s.aboutButtons}>
              <Link
                to={`/catalog/${filteredStickers[activeIndex].id}`}
                className={s.review}
              >
                Огляд
              </Link>
              <button className={s.addToCart}>
                <LuShoppingCart className={s.icon} size={25} />
              </button>
            </div>
          </div>
          <div className={s.swiper}>
            <div className="about-swiper">
              <div className="swiper-wrapper">
                {filteredStickers.map(({ id, path, name }) => {
                  return <AboutUsSlide key={id} path={path} name={name} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
