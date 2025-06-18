import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import s from "./Discount.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectItems } from "../../redux/products/selectors";
import { useMediaQuery } from "react-responsive";

const Discount = () => {
  const swiperRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [slides, setSlides] = useState(3);
  const stickers = useSelector(selectItems);
  const isTablet = useMediaQuery({ maxWidth: 990 });
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    if (isMobile) {
      setSlides(1);
    } else if (isTablet) {
      setSlides(2);
    } else {
      setSlides(3);
    }
  }, [isTablet, isMobile]);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Navigation],
        slidesPerView: slides,
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
  }, [slides]);

  const filteredStickers = stickers.filter((sticker) => sticker.discount > 0);

  return (
    <section id="discount" className={s.discount}>
      <div className="container">
        <div className={s.main}>
          <div className={s.container}>
            <div className="discount-swiper" ref={swiperRef}>
              <div className="swiper-wrapper">
                {filteredStickers.map((sticker) => (
                  <div key={sticker._id} className="swiper-slide">
                    <Link to={`/catalog/${sticker._id}`}>
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
