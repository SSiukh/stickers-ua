import s from "./CatalogList.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategory,
  selectColor,
  selectError,
  selectIsLoading,
  selectItems,
  selectKeyword,
} from "../../redux/products/selectors";
import { Link, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/products/operations";
import { setCategory, setColor, setKeyword } from "../../redux/products/slice";

const CatalogList = () => {
  const category = useSelector(selectCategory);
  const keyword = useSelector(selectKeyword);
  const stickers = useSelector(selectItems);
  const color = useSelector(selectColor);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    dispatch(setCategory(query.get("type") || null));
    dispatch(setColor(query.get("color") || null));
    dispatch(setKeyword(query.get("search") || null));
  }, [location.search, dispatch]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        type: category,
        color,
        search: keyword,
      })
    );
  }, [category, color, keyword, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    toast.error("Помилка завантаження");
    return null;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className={s.container}>
      <ul className={s.list}>
        {stickers.map((sticker) => (
          <li className={s.item} key={sticker._id}>
            <Link to={`/catalog/${sticker._id}`}>
              <ProductCard stickers={sticker} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogList;
