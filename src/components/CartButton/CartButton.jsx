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
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const CartButton = () => {
  const totalPrice = useSelector(selectTotalPrice);
  const qty = useSelector(selectCartQty);
  const dispatch = useDispatch();
  const isOpen = useSelector(selectCartIsOpen);
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
        <Link to="/myaccount">
          <IconButton>
            <PersonIcon />
          </IconButton>
        </Link>
      )}
    </div>
  );
};

export default CartButton;
