import { Button } from "@mui/material";
import BackLayout from "../../components/BackLayout/BackLayout";
import s from "./Order.module.scss";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartQty,
  selectTotalPrice,
} from "../../redux/cart/selectors";
import OrderProductCard from "../../components/OrderProductCars/OrderProductCard";
import { getNounForm } from "../../utils/getNounForm";
import ContactForm from "../../components/ContactForm/ContactForm";
import LocationForm from "../../components/LocationForm/LocationForm";

const Order = () => {
  const products = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const qty = useSelector(selectCartQty);

  return (
    <div>
      <BackLayout>
        <div className={s.container}>
          <div className={s.mainBlock}>
            <h1 className={s.mainTitle}>Оформлення замовлення</h1>
            <div className={s.formBlock}>
              <ContactForm />
              <LocationForm />
              {/* {location} */}
              <h2 className={s.title}>Доставка</h2>
              {/* form delivery */}
              <h2 className={s.title}>Оплата</h2>
              {/* Payment form */}
              <h2 className={s.title}>Отримувач</h2>
              {/* форма яку можна змінити натиском, ПІБ, телефон */}
              <h2 className={s.title}>Додати коментар до замовлення</h2>
              {/* comment form */}
              <p className={s.mainSign}>
                Інтернет магазин &quot;STICKER UA&quot;
              </p>
            </div>
          </div>
          <div className={s.helpBlock}>
            <h2 className={s.title}>Замовлення</h2>
            <div className={s.block}>
              <p className={s.text}>
                {getNounForm(qty, "товар", "товари", "товарів")} на суму
              </p>
              <p className={s.value}>{totalPrice} грн.</p>
            </div>
            <ul className={s.productsList}>
              {products.map(({ id, name, qty, photo, price, discount }) => (
                <li key={id}>
                  <OrderProductCard
                    name={name}
                    qty={qty}
                    photo={photo}
                    price={price}
                    discount={discount}
                  />
                </li>
              ))}
            </ul>
            <div className={s.block}>
              <p className={s.text}>Вартість доставки</p>
              <p className={s.value}>За тарифами перевізника</p>
            </div>
            <div className={s.block}>
              <p className={s.text}>До сплати</p>
              <p className={s.totalPrice}>{totalPrice} грн.</p>
            </div>
            <Button
              className={s.button}
              fullWidth
              size="large"
              color="primary"
              variant="contained"
            >
              Замовлення підтверджую
            </Button>
          </div>
        </div>
      </BackLayout>
    </div>
  );
};

export default Order;
