import { useEffect, useRef, useState } from "react";
import s from "./Responses.module.scss";
import Swiper from "swiper";
import responses from "../../data/responses.json";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Response from "./Response/Response";
import { IconButton } from "@mui/material";
import { useMediaQuery } from "react-responsive";

const Responses = () => {
  const swiperRef = useRef(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [slides, setSlides] = useState(4);
  const isTablet = useMediaQuery({ maxWidth: 990 });
  const isMobile = useMediaQuery({ maxWidth: 640 });

  useEffect(() => {
    if (isMobile) {
      setSlides(1);
    } else if (isTablet) {
      setSlides(2);
    } else {
      setSlides(4);
    }
  }, [isTablet, isMobile]);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        effect: "coverflow",
        slidesPerView: slides,
        slidesPerGroup: slides,
        spaceBetween: 50,
        slideToClickedSlide: true,
        coverflowEffect: {
          scale: 1,
          rotate: 0,
          stretch: 75,
          modifier: 0,
        },
        navigation: {
          nextEl: `.${s.nextButton}`,
          prevEl: `.${s.prevButton}`,
        },
      });

      swiper.on("slideChange", () => {
        setIsFirstSlide(swiper.isBeginning);
        setIsLastSlide(swiper.isEnd);
      });

      return () => swiper.destroy();
    }
  }, [slides]);

  return (
    <section id="responses" className={s.responses}>
      <div className="container">
        <h2 className={s.title}>
          {isMobile ? "Відгуки" : "Що говорять клієнти про наші наклейки"}
        </h2>
        <div className={s.container}>
          <div className={s.swiper}>
            <div className="responses-swiper" ref={swiperRef}>
              <div className="swiper-wrapper">
                {responses.map((response) => (
                  <div key={response.id} className="swiper-slide">
                    <Response path={response.path} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={s.prevButton}>
            <IconButton disabled={isFirstSlide} color="primary">
              <IoIosArrowBack size={35} />
            </IconButton>
          </div>
          <div className={s.nextButton}>
            <IconButton disabled={isLastSlide} color="primary">
              <IoIosArrowForward size={35} />
            </IconButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Responses;
