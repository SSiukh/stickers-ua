import { useSelector } from "react-redux";
import s from "./WishList.module.scss";
import { selectWishItems } from "../../redux/wish/selectors";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";

const WishList = () => {
  const items = useSelector(selectWishItems);

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {items.map((sticker) => (
          <li className={s.item} key={sticker._id}>
            <Link to={`/catalog/${sticker._id}`}>
              <ProductCard stickers={sticker} isWishCard={true} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;
