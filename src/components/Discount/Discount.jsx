import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import stickers from "../../data/stickers.json";
import s from "./Discount.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";

const Discount = () => {
  const swiperRef = useRef(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Navigation],
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 50,
        pagination: { clickable: true },
        navigation: {
          nextEl: `.${s.nextButton}`,
          prevEl: `.${s.prevButton}`,
        },
        on: {
          slideChange: () => {
            setIsFirstSlide(swiper.isBeginning);
            setIsLastSlide(swiper.isEnd);
          },
        },
      });

      return () => swiper.destroy();
    }
  }, []);

  const filteredStickers = stickers.filter((sticker) => sticker.discount > 0);

  return (
    <section id="discount" className={s.discount}>
      <div className="container">
        <div className={s.container}>
          <div className="discount-swiper" ref={swiperRef}>
            <div className="swiper-wrapper">
              {filteredStickers.map((sticker) => (
                <div key={sticker.id} className="swiper-slide">
                  <ProductCard stickers={sticker} />
                </div>
              ))}
            </div>
            <div className={s.buttons}>
              <div className={clsx(s.prevButton, isFirstSlide && s.disabled)}>
                <IoIosArrowBack className={s.navIcons} size={40} />
              </div>
              <div className={clsx(s.nextButton, isLastSlide && s.disabled)}>
                <IoIosArrowForward className={s.navIcons} size={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discount;
