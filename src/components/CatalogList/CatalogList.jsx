import s from "./CatalogList.module.scss";
import stickers from "../../data/stickers.json";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import {
  selectCategory,
  selectColor,
  selectKeyword,
} from "../../redux/products/selectors";

const CatalogList = () => {
  const category = useSelector(selectCategory);
  const keyword = useSelector(selectKeyword);
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
            <ProductCard stickers={sticker} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogList;
