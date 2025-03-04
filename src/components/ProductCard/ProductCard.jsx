import clsx from "clsx";
import s from "./ProductCard.module.scss";
import { FaHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";

const ProductCard = ({ stickers }) => {
  const { id, name, path, price, discount } = stickers;

  return (
    <div className={clsx("swiper-slide", s.card)}>
      <img className={s.img} src={path} alt={name} />
      <div className={s.mainBlock}>
        <div className={s.titleBlock}>
          <p className={s.title}>{name}</p>
          <button className={s.wishButton}>
            <FaHeart size={20} className={s.wishIcon} />
          </button>
        </div>
        <div className={s.priceBlock}>
          <div className={s.prices}>
            <p className={s.price}>{price}</p>
            {discount !== 0 && <p className={s.discount}>{discount} грн/шт</p>}
          </div>
          <button className={s.cartButton}>
            <LuShoppingCart size={22} className={s.cartIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
