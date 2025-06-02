import { IconButton } from "@mui/material";
import s from "./CartProductCard.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { decreaseQty, addQty, removeCart } from "../../redux/cart/slice";
import { useDispatch } from "react-redux";

const CartProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const { id, photo, name, price, discount, qty } = data;

  return (
    <div className={s.card}>
      <div className={s.cardTop}>
        <div className={s.cardTopMain}>
          <img className={s.img} src={photo} alt="card product" />
          <p className={s.name}>{name}</p>
        </div>
        <IconButton
          onClick={() => dispatch(removeCart(id))}
          className={s.deleteButton}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <div className={s.cardBottom}>
        <p className={s.price}>{discount === 0 ? price : discount} грн</p>
        <div className={s.qtyBlock}>
          <IconButton
            onClick={() => dispatch(decreaseQty(id))}
            size="small"
            color="secondary"
          >
            <RemoveIcon />
          </IconButton>
          <p className={s.qty}>{qty}</p>
          <IconButton
            onClick={() => dispatch(addQty(id))}
            size="small"
            color="secondary"
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
