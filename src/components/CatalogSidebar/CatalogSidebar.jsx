import s from "./CatalogSidebar.module.scss";
import categories from "../../data/categories.json";
import Category from "../Category/Category";

const CatalogSidebar = () => {
  const { one, two } = categories;
  return (
    <div className={s.container}>
      <p className={s.title}>Категорії</p>
      <ul className={s.list}>
        {one.map((category) => (
          <li key={category}>
            <Category category={category} />
          </li>
        ))}
      </ul>
      <ul className={s.list}>
        {two.map((category) => (
          <li key={category}>
            <Category category={category} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogSidebar;
