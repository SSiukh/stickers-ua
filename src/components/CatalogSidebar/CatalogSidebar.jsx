import s from "./CatalogSidebar.module.scss";
import Category from "../Category/Category";
import { MdFilterList } from "react-icons/md";
import { PiSticker } from "react-icons/pi";
import { PiGradient } from "react-icons/pi";
import { GiCheckeredDiamond } from "react-icons/gi";
import { BiSolidLeaf } from "react-icons/bi";
import { WiStars } from "react-icons/wi";
import { MdOutlineTexture } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

const categories = [
  { id: 1, name: "all", icon: <MdFilterList /> },
  { id: 2, name: "standard", icon: <PiSticker /> },
  { id: 3, name: "holographic", icon: <PiGradient /> },
  { id: 4, name: "chrome", icon: <GiCheckeredDiamond /> },
  { id: 5, name: "mat", icon: <BiSolidLeaf /> },
  { id: 6, name: "space", icon: <WiStars /> },
  { id: 7, name: "texture", icon: <MdOutlineTexture /> },
];

const CatalogSidebar = () => {
  const isTablet = useMediaQuery({ maxWidth: 1000 });

  return (
    <div className={s.container}>
      {!isTablet && <p className={s.title}>Категорії</p>}
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
