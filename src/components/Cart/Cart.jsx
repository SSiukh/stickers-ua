import { useDispatch, useSelector } from "react-redux";
import s from "./Cart.module.scss";
import { selectCartItems, selectTotalPrice } from "../../redux/cart/selectors";
import CartProductCard from "../CartProductCard/CartProductCard";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setIsOpen } from "../../redux/cart/slice";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const overlay = useRef();
  const totalPrice = useSelector(selectTotalPrice);
  const elements = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOverlayClose = (e) => {
    if (e.target !== overlay.current) {
      return;
    }

    dispatch(setIsOpen(false));
  };

  const handleOrder = () => {
    if (!elements.length) {
      toast.error("Додайте товари в кошик");
      return;
    }

    navigate("/order");
  };

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
            {elements.map((sticker) => (
              <li key={sticker.id}>
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
