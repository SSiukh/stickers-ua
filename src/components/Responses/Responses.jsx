import { useEffect, useRef, useState } from "react";
import s from "./Responses.module.scss";
import Swiper from "swiper";
import clsx from "clsx";
import responses from "../../data/responses.json";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Response from "./Response/Response";

const Responses = () => {
  const swiperRef = useRef(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        effect: "coverflow",
        slidesPerView: 4,
        slidesPerGroup: 1,
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
  }, []);

  return (
    <section id="responses" className={s.responses}>
      <div className="container">
        <h2 className={s.title}>Що говорять клієнти про наші наклейки</h2>
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
          <div className={clsx(s.prevButton, isFirstSlide && s.disabled)}>
            <IoIosArrowBack className={s.navIcons} size={40} />
          </div>
          <div className={clsx(s.nextButton, isLastSlide && s.disabled)}>
            <IoIosArrowForward className={s.navIcons} size={40} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Responses;
