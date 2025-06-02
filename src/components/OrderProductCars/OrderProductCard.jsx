import s from "./OrderProductCard.module.scss";

const OrderProductCard = ({ name, qty, photo, price, discount }) => {
  return (
    <div className={s.card}>
      <div className={s.cardMain}>
        <img className={s.img} src={photo} alt="product" />
        <div className={s.infoBlock}>
          <p className={s.name}>{name}</p>
          <p className={s.qtyToPrice}>
            {discount !== 0 ? discount : price} грн x {qty} од.
          </p>
        </div>
      </div>
      <p className={s.price}>
        {discount !== 0 ? qty * discount : qty * price} грн.
      </p>
    </div>
  );
};

export default OrderProductCard;
