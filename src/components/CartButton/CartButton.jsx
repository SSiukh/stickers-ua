import s from "./CartButton.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, IconButton } from "@mui/material";
import {
  selectCartIsOpen,
  selectCartQty,
  selectTotalPrice,
} from "../../redux/cart/selectors";
import { setIsOpen } from "../../redux/cart/slice";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import {
  selectAuthCartQty,
  selectAuthTotalPrice,
} from "../../redux/authCart/selectors";

const CartButton = () => {
  const localTotalPrice = useSelector(selectTotalPrice);
  const localQty = useSelector(selectCartQty);
  const dispatch = useDispatch();
  const isOpen = useSelector(selectCartIsOpen);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authTotalPrice = useSelector(selectAuthTotalPrice);
  const authQty = useSelector(selectAuthCartQty);

  const qty = isLoggedIn ? authQty : localQty;
  const totalPrice = isLoggedIn ? authTotalPrice : localTotalPrice;

  return (
    <div className={s.container}>
      <p className={s.price}>{totalPrice} грн</p>
      <IconButton
        onClick={() => {
          dispatch(setIsOpen(!isOpen));
        }}
      >
        <Badge badgeContent={qty} color="primary" overlap="circular">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      {isLoggedIn && (
        <IconButton onClick={() => dispatch(logout())}>
          <LogoutIcon />
        </IconButton>
      )}
    </div>
  );
};

export default CartButton;
