import s from "./CatalogList.module.scss";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import {
  selectCategory,
  selectColor,
  selectItems,
  selectKeyword,
} from "../../redux/products/selectors";
import { Link } from "react-router-dom";

const CatalogList = () => {
  const category = useSelector(selectCategory);
  const keyword = useSelector(selectKeyword);
  const stickers = useSelector(selectItems);
  const color = useSelector(selectColor);
  const filteredStickers =
    category === "Всі категорії"
      ? stickers.filter((item) => item.name.includes(keyword))
      : stickers.filter(
          (item) => item.type === category && item.name.includes(keyword)
        );

  const colorFiltered = !color
    ? filteredStickers
    : filteredStickers.filter((sticker) => sticker.color === color);

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {colorFiltered.map((sticker) => (
          <li className={s.item} key={sticker.id}>
            <Link to={`/catalog/${sticker.id}`}>
              <ProductCard stickers={sticker} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogList;
