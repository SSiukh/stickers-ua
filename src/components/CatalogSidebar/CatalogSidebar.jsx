import s from "./CatalogSidebar.module.scss";
import Category from "../Category/Category";
import { MdFilterList } from "react-icons/md";
import { PiSticker } from "react-icons/pi";
import { PiGradient } from "react-icons/pi";
import { GiCheckeredDiamond } from "react-icons/gi";
import { BiSolidLeaf } from "react-icons/bi";
import { WiStars } from "react-icons/wi";
import { MdOutlineTexture } from "react-icons/md";

const categories = [
  { id: 1, name: "Всі категорії", icon: <MdFilterList /> },
  { id: 2, name: "Стандартні", icon: <PiSticker /> },
  { id: 3, name: "Голографічні", icon: <PiGradient /> },
  { id: 4, name: "Хромові", icon: <GiCheckeredDiamond /> },
  { id: 5, name: "Матові", icon: <BiSolidLeaf /> },
  { id: 6, name: "Космічні", icon: <WiStars /> },
  { id: 7, name: "Текстурні", icon: <MdOutlineTexture /> },
];

const CatalogSidebar = () => {
  return (
    <div className={s.container}>
      <p className={s.title}>Категорії</p>
      <ul className={s.list}>
        {categories.map((category) => (
          <li key={category.id}>
            <Category category={category.name} icon={category.icon} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogSidebar;
