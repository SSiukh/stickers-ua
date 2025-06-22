import { Chip, IconButton } from "@mui/material";
import s from "./ManagerStickerItem.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { stickerTypes } from "../../utils/utils";

const ManagerStickerItem = ({ id, handleDelete, handleEdit, item }) => {
  return (
    <div className={s.container}>
      <img className={s.photo} src={item.photo} alt="product image" />
      <div className={s.mainBlock}>
        <div className={s.headBlock}>
          <div className={s.headMainBlock}>
            <p className={s.name}>{item.name}</p>
            <Chip label={`${item.price} грн`} />
            <Chip color="error" label={`${item.discount} грн`} />
            <Chip label={stickerTypes[item.type]} />
            <span
              style={{ backgroundColor: item.color }}
              className={s.color}
            ></span>
          </div>
          <div className={s.buttons}>
            <IconButton
              onClick={() => handleDelete(id)}
              aria-label="delete"
              size="medium"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={() => handleEdit(item)}
              aria-label="done"
              size="medium"
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        <p className={s.info}>{item.info}</p>
      </div>
    </div>
  );
};

export default ManagerStickerItem;
