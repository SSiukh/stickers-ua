import s from "./AboutUs.module.scss";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";
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
import { selectItems } from "../../redux/products/selectors";
import { useMediaQuery } from "react-responsive";
import { selectAuthCartItems } from "../../redux/authCart/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { addItemToCart } from "../../redux/authCart/operations";

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const dispatch = useDispatch();
  const localCartProducts = useSelector(selectCartItems);
  const authCartProducts = useSelector(selectAuthCartItems);
  const stickers = useSelector(selectItems);
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!stickers.length) return;

    const swiper = new Swiper(".about-swiper", {
      effect: "coverflow",
      centeredSlides: true,
      slidesPerView: !isMobile ? 2 : 1,
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
  }, [stickers, isMobile]);

  if (!stickers.length) return null;

  const cartProducts = isLoggedIn ? authCartProducts : localCartProducts;

  const filteredStickers = stickers.filter((sticker) => sticker.onAbout);

  const addToCart = (object) => {
    const isExistIndex = cartProducts.findIndex(
      (sticker) => sticker._id === filteredStickers[activeIndex]._id
    );
    if (isLoggedIn) {
      if (isExistIndex === -1) {
        dispatch(addItemToCart({ productId: object.id, quantity: 1 }));
        return;
      }
    } else {
      if (isExistIndex === -1) {
        dispatch(
          addCart({
            ...object,
            qty: 1,
          })
        );
        return;
      }
    }

    toast.error("Товар вже присутній в кошику");
  };

  const isInCart = isLoggedIn
    ? authCartProducts.find(
        (item) => item.productId._id === filteredStickers[activeIndex]._id
      )
    : cartProducts.find(
        (item) => item._id === filteredStickers[activeIndex]._id
      );

  return (
    stickers.length && (
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
                  to={`/catalog/${filteredStickers[activeIndex]._id}`}
                  className={s.review}
                >
                  Огляд
                </Link>
                <IconButton
                  onClick={() =>
                    addToCart({
                      id: filteredStickers[activeIndex]._id,
                      name: filteredStickers[activeIndex].name,
                      photo: filteredStickers[activeIndex].photo,
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
                  {filteredStickers.map(({ _id, photo, name }) => {
                    return <AboutUsSlide key={_id} photo={photo} name={name} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default AboutUs;
