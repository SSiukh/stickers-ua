import { IconButton } from "@mui/material";
import s from "./CartProductCard.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { decreaseQty, addQty, removeCart } from "../../redux/cart/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import {
  getCartItems,
  patchCartItem,
  removeCartItem,
} from "../../redux/authCart/operations";
import toast from "react-hot-toast";

const CartProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!data) return null;

  const product = isLoggedIn ? data.productId : data;
  if (!product) return null;

  const { _id, name, photo, price, discount } = product;
  const qty = isLoggedIn ? data.quantity : data.qty;

  const handleDelete = () => {
    if (isLoggedIn) {
      dispatch(removeCartItem(_id))
        .unwrap()
        .then(() => dispatch(getCartItems()))
        .catch(() => {});
    } else {
      dispatch(removeCart(_id));
    }
  };

  const handleDecreseQty = () => {
    if (isLoggedIn) {
      if (qty > 1) {
        dispatch(patchCartItem({ productId: _id, quantity: qty - 1 }));
      } else {
        toast.error("Неможливо зменшити");
      }
    } else {
      dispatch(decreaseQty(_id));
    }
  };

  const handleAddQty = () => {
    if (isLoggedIn) {
      dispatch(patchCartItem({ productId: _id, quantity: qty + 1 }));
    } else {
      dispatch(addQty(_id));
    }
  };

  return (
    <div className={s.card}>
      <div className={s.cardTop}>
        <div className={s.cardTopMain}>
          <img className={s.img} src={photo} alt="card product" />
          <p className={s.name}>{name}</p>
        </div>
        <IconButton
          onClick={handleDelete}
          className={s.deleteButton}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <div className={s.cardBottom}>
        <p className={s.price}>
          {discount === 0 ? price : price - discount} грн
        </p>
        <div className={s.qtyBlock}>
          <IconButton onClick={handleDecreseQty} size="small" color="secondary">
            <RemoveIcon />
          </IconButton>
          <p className={s.qty}>{qty}</p>
          <IconButton onClick={handleAddQty} size="small" color="secondary">
            <AddIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
