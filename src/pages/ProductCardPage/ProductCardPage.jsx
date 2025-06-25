import s from "./ProductCardPage.module.scss";
import BackLayout from "../../components/BackLayout/BackLayout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, IconButton, SpeedDial, SpeedDialAction } from "@mui/material";
import { useMediaQuery } from "react-responsive";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectItems,
  selectCurrentItem,
} from "../../redux/products/selectors";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import { selectCartItems } from "../../redux/cart/selectors";
import { addCart } from "../../redux/cart/slice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { fetchProductById } from "../../redux/products/operations";
import Loader from "../../components/Loader/Loader";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectAuthCartItems } from "../../redux/authCart/selectors";
import { addItemToCart } from "../../redux/authCart/operations";
import { selectWishItems } from "../../redux/wish/selectors";
import { selectAuthWishItems } from "../../redux/authWish/selectors";
import { addItemToWish } from "../../redux/authWish/operations";
import { addWish } from "../../redux/wish/slice";
import { stickerTypes } from "../../utils/utils";

const ProductCardPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const stickers = useSelector(selectItems);
  const cartProducts = useSelector(selectCartItems);
  const product = useSelector(selectCurrentItem);
  const isMobile = useMediaQuery({ maxWidth: 380 });
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authCartProducts = useSelector(selectAuthCartItems);
  const localWishProducts = useSelector(selectWishItems);
  const authWishProducts = useSelector(selectAuthWishItems);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (isLoading || !product) return <Loader />;

  if (error) {
    toast.error("Помилка завантаження");
  }

  const wishProducts = isLoggedIn ? authWishProducts : localWishProducts;

  const { _id, name, price, discount, type, color, photo, info } = product;

  const isInCart = isLoggedIn
    ? authCartProducts.find((item) => item.productId._id === _id)
    : cartProducts.find((item) => item._id === _id);

  const isInWish = isLoggedIn
    ? authWishProducts.find((item) => item.productId._id === _id)
    : localWishProducts.find((item) => item._id === _id);

  const otherImages = stickers.filter((item) => item.name === name);

  const addToCart = (object) => {
    if (isLoggedIn) {
      const isExistIndex = authCartProducts.findIndex(
        (sticker) => sticker.productId._id === _id
      );

      if (isExistIndex === -1) {
        dispatch(addItemToCart({ productId: object._id, quantity: 1 }));
        return;
      }
    } else {
      const isExistIndex = cartProducts.findIndex(
        (sticker) => sticker._id === _id
      );

      if (isExistIndex === -1) {
        dispatch(addCart({ ...object, qty: 1 }));
        return;
      }
    }

    toast.error("Товар вже присутній в кошику");
  };

  const handleWish = (product) => {
    const isExistIndex = wishProducts.findIndex(
      (sticker) => sticker.id === _id
    );

    if (isExistIndex === -1) {
      if (isLoggedIn) {
        dispatch(addItemToWish(_id));
        return;
      } else {
        dispatch(addWish(product));
        return;
      }
    }

    toast.error("Товар вже присутній у вподобаних");
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <BackLayout>
        <div className={s.container}>
          <div className={s.leftBlock}>
            <div className={s.imageBlock}>
              <ul className={s.otherImages}>
                {otherImages.map((item) => (
                  <li className={s.otherImagesItem} key={item._id}>
                    <Link to={`/catalog/${item._id}`}>
                      <img
                        className={s.otherImagesImg}
                        src={item.photo}
                        alt="other images"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <img className={s.mainImage} src={photo} alt="Sticker image" />
            </div>
            <p className={s.description}>{info}</p>
          </div>
          <div className={s.rightBlock}>
            <div className={s.nameBlock}>
              <p className={s.name}>{name}</p>
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleWish({ _id, name, photo, price, discount });
                }}
                size="large"
                color="primary"
              >
                <FavoriteIcon color={isInWish && "success"} fontSize="26px" />
              </IconButton>
            </div>
            <div className={s.info}>
              <p className={s.price}>
                Ціна: {discount === 0 ? price : price - discount} грн
              </p>
              <p className={s.category}>Категорія: {stickerTypes[type]}</p>
            </div>
            <div className={s.colorBlock}>
              <p className={s.colorText}>Кольори:</p>
              <ul className={s.colors}>
                {otherImages.map((item) => (
                  <li
                    className={color === item.color && s.color}
                    key={item._id}
                  >
                    <Link to={`/catalog/${item._id}`}>
                      <IconButton sx={{ zIndex: 5 }}>
                        <FaCircle color={item.color} />
                      </IconButton>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.actionBlock}>
              <Button
                onClick={() => {
                  addToCart({ _id, name, photo, price, discount });
                }}
                size={isMobile ? "small" : "large"}
                color={isInCart ? "success" : "primary"}
                variant="contained"
              >
                {isInCart ? "Додано в кошик" : "Додати в кошик"}
              </Button>
              <SpeedDial
                ariaLabel="SpeedDial basic example"
                sx={{ zIndex: 5 }}
                icon={<PhoneEnabledIcon />}
              >
                <SpeedDialAction
                  onClick={() =>
                    window.open(
                      "https://www.instagram.com/_sticker.ua_?igsh=dmtyY20xbXp1YTFo",
                      "_blank"
                    )
                  }
                  sx={{ backgroundColor: "#eb6424" }}
                  icon={<InstagramIcon />}
                />
                <SpeedDialAction
                  onClick={() =>
                    window.open("https://t.me/moto_stickker", "_blank")
                  }
                  sx={{ backgroundColor: "#eb6424" }}
                  icon={<TelegramIcon />}
                />
                <SpeedDialAction
                  onClick={() => (window.location.href = "tel:+380XXXXXXXXX")}
                  sx={{ backgroundColor: "#eb6424" }}
                  icon={<PhoneEnabledIcon />}
                />
              </SpeedDial>
            </div>
          </div>
        </div>
      </BackLayout>
    </div>
  );
};

export default ProductCardPage;
