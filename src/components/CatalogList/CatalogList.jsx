import s from "./CatalogList.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectError,
  selectIsLoading,
  selectItems,
} from "../../redux/products/selectors";
import { Link, useLocation } from "react-router-dom";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { fetchProducts } from "../../redux/products/operations";
import { setCategory, setKeyword } from "../../redux/products/slice";

const CatalogList = () => {
  const stickers = useSelector(selectItems);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);

    const type = query.get("type") || null;
    const search = query.get("search") || null;

    dispatch(setCategory(type));
    dispatch(setKeyword(search));

    dispatch(fetchProducts({ type, search }));
  }, [location.search, dispatch]);

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
