import s from "./CatalogList.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import {
  selectCategory,
  selectColor,
  selectError,
  selectIsLoading,
  selectItems,
  selectKeyword,
} from "../../redux/products/selectors";
import { Link } from "react-router-dom";
import { stickerTypes } from "../../utils/utils";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";

const CatalogList = () => {
  const category = useSelector(selectCategory);
  const keyword = useSelector(selectKeyword);
  const stickers = useSelector(selectItems);
  const color = useSelector(selectColor);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  if (!stickers?.length) {
    return <Loader />;
  }
  if (error) {
    toast.error("Помилка завантаження");
  }

  const filteredStickers =
    category === "Всі категорії"
      ? stickers.filter((item) => item.name.includes(keyword))
      : stickers.filter(
          (item) =>
            stickerTypes[item.type] === category && item.name.includes(keyword)
        );

  const colorFiltered = !color
    ? filteredStickers
    : filteredStickers.filter((sticker) => sticker.color === color);

  return isLoading ? (
    <Loader />
  ) : (
    <div className={s.container}>
      <ul className={s.list}>
        {colorFiltered.map((sticker) => (
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
