import s from "./AboutUs.module.scss";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import stickers from "../../data/stickers.json";
import AboutUsSlide from "./AboutUsSlide/AboutUsSlide";
import { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../redux/cart/slice";
import { selectCartItems } from "../../redux/cart/selectors";
import toast from "react-hot-toast";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const dispatch = useDispatch();
  const cartProducts = useSelector(selectCartItems);

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

  const addToCart = (id, object) => {
    const isExistIndex = cartProducts.findIndex((sticker) => sticker.id === id);

    if (isExistIndex === -1) {
      dispatch(addCart({ ...object, qty: 1 }));
      return;
    }

    toast.error("Товар вже присутній в кошику");
  };

  const isInCart = cartProducts.find(
    (item) => item.id === filteredStickers[activeIndex].id
  );

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
              <IconButton
                onClick={() =>
                  addToCart(filteredStickers[activeIndex].id, {
                    id: filteredStickers[activeIndex].id,
                    name: filteredStickers[activeIndex].name,
                    path: filteredStickers[activeIndex].path,
                    price: filteredStickers[activeIndex].price,
                    discount: filteredStickers[activeIndex].discount,
                  })
                }
                color="secondary"
                size="large"
              >
                {isInCart ? (
                  <AddShoppingCartIcon color="success" />
                ) : (
                  <ShoppingCartIcon />
                )}
              </IconButton>
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
