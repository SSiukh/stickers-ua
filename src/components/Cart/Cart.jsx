import { useDispatch, useSelector } from "react-redux";
import s from "./Cart.module.scss";
import { selectCartItems, selectTotalPrice } from "../../redux/cart/selectors";
import CartProductCard from "../CartProductCard/CartProductCard";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setIsOpen } from "../../redux/cart/slice";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getCartItems } from "../../redux/authCart/operations";
import {
  selectAuthCartItems,
  selectAuthTotalPrice,
} from "../../redux/authCart/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const Cart = () => {
  const overlay = useRef();
  const elements = useSelector(selectCartItems);
  const authProducts = useSelector(selectAuthCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const localTotalPrice = useSelector(selectTotalPrice);
  const authTotalPrice = useSelector(selectAuthTotalPrice);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCartItems());
    }
  }, [dispatch, isLoggedIn]);

  const handleOverlayClose = (e) => {
    if (e.target !== overlay.current) {
      return;
    }

    dispatch(setIsOpen(false));
  };

  const handleOrder = () => {
    if (!elements.length && !authProducts.length) {
      toast.error("Додайте товари в кошик");
      return;
    }

    navigate("/order");
  };

  const products = authProducts.length ? authProducts : elements;
  const totalPrice = isLoggedIn ? authTotalPrice : localTotalPrice;

  return (
    <div ref={overlay} className={s.overlay} onClick={handleOverlayClose}>
      <div className={s.container}>
        <div className={s.topBlock}>
          <div className={s.textBlock}>
            <p className={s.text}>Корзина</p>
            <IconButton
              onClick={() => dispatch(setIsOpen(false))}
              color="secondary"
            >
              <CloseIcon />
            </IconButton>
          </div>
          <ul className={s.list}>
            {products.map((sticker) => (
              <li key={sticker._id}>
                <CartProductCard data={sticker} />
              </li>
            ))}
          </ul>
        </div>
        <div className={s.priceBlock}>
          <div className={s.priceTextBlock}>
            <p className={s.allPriceText}>Загальна сума</p>
            <p className={s.allPrice}>{totalPrice} грн</p>
          </div>
          <Button
            fullWidth={true}
            size="large"
            color="primary"
            variant="contained"
            onClick={() => {
              dispatch(setIsOpen(false));
              handleOrder();
            }}
          >
            Оформити замовлення
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
