import clsx from "clsx";
import s from "./ProductCard.module.scss";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";

const ProductCard = ({ stickers }) => {
  const { id, name, path, price, discount } = stickers;

  return (
    <div className={clsx("swiper-slide", s.card)}>
      <img className={s.img} src={path} alt={name} />
      <div className={s.mainBlock}>
        <div className={s.titleBlock}>
          <p className={s.title}>{name}</p>
          <IconButton color="secondary">
            <FavoriteIcon />
          </IconButton>
        </div>
        <div className={s.priceBlock}>
          <div className={s.prices}>
            <p className={s.price}>{price} грн</p>
            {discount !== 0 && <p className={s.discount}>{discount} грн/шт</p>}
          </div>
          <IconButton color="secondary">
            <ShoppingCartIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
