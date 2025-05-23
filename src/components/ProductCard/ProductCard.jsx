import clsx from "clsx";
import s from "./ProductCard.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../redux/cart/slice";
import { selectCartItems } from "../../redux/cart/selectors";
import toast from "react-hot-toast";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const ProductCard = ({ stickers }) => {
  const { _id, name, photo, price, discount } = stickers;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartProducts = useSelector(selectCartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addToCart = (object) => {
    const isExistIndex = cartProducts.findIndex(
      (sticker) => sticker.id === _id
    );

    if (isExistIndex === -1) {
      dispatch(addCart({ ...object, qty: 1 }));
      return;
    }

    toast.error("Товар вже присутній в кошику");
  };

  const isInCart = cartProducts.find((item) => item.id === _id);
  const handleWish = () => {
    if (!isLoggedIn) {
      navigate("/login");
      toast.error("Потрібно увійти в кабінет");
      return;
    }

    console.log("Додавання в вподобан");
  };

  return (
    <div className={clsx("swiper-slide", s.card)}>
      <div className={s.imgBlock}>
        <img className={s.img} src={photo} alt={name} />
      </div>
      <div className={s.mainBlock}>
        <div className={s.titleBlock}>
          <p className={s.title}>{name}</p>
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleWish();
            }}
            color="secondary"
          >
            <FavoriteIcon />
          </IconButton>
        </div>
        <div className={s.priceBlock}>
          {discount !== 0 && (
            <div className={s.prices}>
              <p className={s.price}>{price} грн</p>
              <p className={s.discount}>{discount} грн/шт</p>
            </div>
          )}
          {discount === 0 && <p className={s.realPrice}>{price} грн</p>}
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart({ _id, name, photo, price, discount });
            }}
            color="secondary"
          >
            {isInCart ? (
              <AddShoppingCartIcon color="success" />
            ) : (
              <ShoppingCartIcon />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
