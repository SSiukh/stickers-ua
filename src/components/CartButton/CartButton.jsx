import s from "./CartButton.module.scss";
import { FaOpencart } from "react-icons/fa6";
import { useSelector } from "react-redux";

const CartButton = () => {
  const totalPrice = useSelector((state) => state.cart.info.totalPrice);
  const qty = useSelector((state) => state.cart.info.qty);

  return (
    <div className={s.container}>
      <p className={s.price}>{totalPrice} ГРН</p>
      <button className={s.button}>
        <FaOpencart className={s.icon} />
        <span className={s.qty}>{qty}</span>
      </button>
    </div>
  );
};

export default CartButton;
