import { NavLink } from "react-router-dom";
import s from "./ManagerSidebar.module.scss";
import PersonIcon from "@mui/icons-material/Person";
import { useSelector } from "react-redux";
import { MdAddChart } from "react-icons/md";
import ApprovalIcon from "@mui/icons-material/Approval";
import { selectEmail, selectName } from "../../redux/auth/selectors";
import { setNavClass } from "../../utils/utils";

const ManagerSidebar = () => {
  const name = useSelector(selectName);
  const email = useSelector(selectEmail);

  return (
    <div className={s.container}>
      <div className={s.userInfo}>
        <PersonIcon fontSize="medium" className={s.infoIcon} />
        <div className={s.mainInfo}>
          <p className={s.name}>{name}</p>
          <p className={s.email}>{email}</p>
        </div>
      </div>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink
            className={(isActive) => setNavClass(isActive, s)}
            to="create-stickers"
          >
            <MdAddChart className={s.itemIcon} size={25} />
            Додати стікери
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink
            className={(isActive) => setNavClass(isActive, s)}
            to="orders-processing"
          >
            <ApprovalIcon className={s.itemIcon} size={25} />
            Обробка замовлень
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ManagerSidebar;
