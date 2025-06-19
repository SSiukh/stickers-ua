import { useDispatch, useSelector } from "react-redux";
import s from "./WishList.module.scss";
import { selectWishItems } from "../../redux/wish/selectors";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { selectAuthWishItems } from "../../redux/authWish/selectors";
import { useEffect } from "react";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { getWishItems } from "../../redux/authWish/operations";

const WishList = () => {
  const dispatch = useDispatch();
  const localItems = useSelector(selectWishItems);
  const authItems = useSelector(selectAuthWishItems);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getWishItems());
    }
  }, [dispatch, isLoggedIn]);

  const items = authItems.length
    ? authItems.map((item) => item.productId)
    : localItems;

  return (
    <div className={s.container}>
      {!items.length && <p className={s.noneText}>Відсутні обрані продукти</p>}
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
