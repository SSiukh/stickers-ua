import clsx from "clsx";
import s from "./ProductCard.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../redux/cart/slice";
import { selectCartItems } from "../../redux/cart/selectors";
import toast from "react-hot-toast";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addWish, removeWish } from "../../redux/wish/slice";
import { selectWishItems } from "../../redux/wish/selectors";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { selectAuthCartItems } from "../../redux/authCart/selectors";
import { addItemToCart } from "../../redux/authCart/operations";
import { selectAuthWishItems } from "../../redux/authWish/selectors";
import { addItemToWish, removeWishItem } from "../../redux/authWish/operations";

const ProductCard = ({ stickers, isWishCard }) => {
  const { _id, name, photo, price, discount } = stickers;
  const cartProducts = useSelector(selectCartItems);
  const authCartProducts = useSelector(selectAuthCartItems);
  const localWishProducts = useSelector(selectWishItems);
  const authWishProducts = useSelector(selectAuthWishItems);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const wishProducts = isLoggedIn ? authWishProducts : localWishProducts;
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

  const isInCart = isLoggedIn
    ? authCartProducts.find((item) => item.productId._id === _id)
    : cartProducts.find((item) => item._id === _id);

  const isInWish = isLoggedIn
    ? authWishProducts.find((item) => item.productId._id === _id)
    : localWishProducts.find((item) => item._id === _id);

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

  const handleWishDelete = (id) => {
    if (isLoggedIn) {
      dispatch(removeWishItem(id));
    } else {
      dispatch(removeWish(id));
    }
  };

  return (
    <div className={clsx("swiper-slide", s.card)}>
      <div className={s.imgBlock}>
        <img className={s.img} src={photo} alt={name} />
      </div>
      <div className={s.mainBlock}>
        <div className={s.titleBlock}>
          <p className={s.title}>{name}</p>
          {isWishCard ? (
            <Tooltip title="Видалити з обраного">
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleWishDelete(_id);
                }}
              >
                <DeleteIcon color="primary" />
              </IconButton>
            </Tooltip>
          ) : (
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWish({ _id, name, photo, price, discount });
              }}
              color="secondary"
            >
              <FavoriteIcon color={isInWish && "success"} />
            </IconButton>
          )}
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
