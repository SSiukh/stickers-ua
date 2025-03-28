import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import stickers from "../../data/stickers.json";
import s from "./Discount.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

const Discount = () => {
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Navigation],
        slidesPerView: 3,
        slidesPerGroup: 1,
        spaceBetween: 50,
        pagination: { clickable: true },
        on: {
          slideChange: () => {
            setIsFirstSlide(swiper.isBeginning);
            setIsLastSlide(swiper.isEnd);
          },
        },
      });
      setSwiperInstance(swiper);

      return () => swiper.destroy();
    }
  }, []);

  const filteredStickers = stickers.filter((sticker) => sticker.discount > 0);

  return (
    <section id="discount" className={s.discount}>
      <div className="container">
        <div className={s.main}>
          <div className={s.container}>
            <div className="discount-swiper" ref={swiperRef}>
              <div className="swiper-wrapper">
                {filteredStickers.map((sticker) => (
                  <div key={sticker.id} className="swiper-slide">
                    <Link to={`/catalog/${sticker.id}`}>
                      <ProductCard stickers={sticker} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            onClick={() => swiperInstance?.slidePrev()}
            className={s.prevButton}
          >
            <IconButton disabled={isFirstSlide} color="primary">
              <IoIosArrowBack size={35} />
            </IconButton>
          </div>
          <div
            onClick={() => swiperInstance?.slideNext()}
            className={s.nextButton}
          >
            <IconButton disabled={isLastSlide} color="primary">
              <IoIosArrowForward size={35} />
            </IconButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discount;
