import s from "./ProductCardPage.module.scss";
import BackLayout from "../../components/BackLayout/BackLayout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Button, IconButton, SpeedDial, SpeedDialAction } from "@mui/material";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../../redux/products/selectors";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import { selectCartItems } from "../../redux/cart/selectors";
import { addCart } from "../../redux/cart/slice";
import toast from "react-hot-toast";

const ProductCardPage = () => {
  const stickers = useSelector(selectItems);
  const { productId } = useParams();
  const cartProducts = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const { id, name, price, discount, type, color, path, info } = stickers.find(
    (item) => item.id === +productId
  );
  const isInCart = cartProducts.find((item) => item.id === id);

  const otherImages = stickers.filter((item) => item.name === name);

  const addToCart = (object) => {
    const isExistIndex = cartProducts.findIndex((sticker) => sticker.id === id);

    if (isExistIndex === -1) {
      dispatch(addCart({ ...object, qty: 1 }));
      return;
    }

    toast.error("Товар вже присутній в кошику");
  };

  return (
    <div>
      <BackLayout>
        <div className={s.container}>
          <div className={s.leftBlock}>
            <div className={s.imageBlock}>
              <ul className={s.otherImages}>
                {otherImages.map((item) => (
                  <li className={s.otherImagesItem} key={item.id}>
                    <Link to={`/catalog/${item.id}`}>
                      <img
                        className={s.otherImagesImg}
                        src={`../${item.path}`}
                        alt="other images"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
              <img
                className={s.mainImage}
                src={`../${path}`}
                alt="Sticker image"
              />
            </div>
            <p className={s.description}>{info}</p>
          </div>
          <div className={s.rightBlock}>
            <div className={s.nameBlock}>
              <p className={s.name}>{name}</p>
              <IconButton size="large" color="primary">
                <FavoriteIcon fontSize="26px" />
              </IconButton>
            </div>
            <div className={s.info}>
              <p className={s.price}>
                Ціна: {discount === 0 ? price : discount}
              </p>
              <p className={s.category}>Категорія: {type}</p>
            </div>
            <div className={s.colorBlock}>
              <p className={s.colorText}>Кольори:</p>
              <ul className={s.colors}>
                {otherImages.map((item) => (
                  <li className={color === item.color && s.color} key={item.id}>
                    <Link to={`/catalog/${item.id}`}>
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
                  addToCart({ id, name, path, price, discount });
                }}
                size="large"
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
