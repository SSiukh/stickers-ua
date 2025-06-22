import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import BackLayout from "../../components/BackLayout/BackLayout";
import s from "./Order.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartQty,
  selectTotalPrice,
} from "../../redux/cart/selectors";
import OrderProductCard from "../../components/OrderProductCars/OrderProductCard";
import { getNounForm } from "../../utils/getNounForm";
import ContactForm from "../../components/ContactForm/ContactForm";
import LocationForm from "../../components/LocationForm/LocationForm";
import WarehouseForm from "../../components/Warehouse/WarehouseForm";
import {
  selectAuthCartItems,
  selectAuthCartQty,
  selectAuthTotalPrice,
} from "../../redux/authCart/selectors";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useState } from "react";
import {
  selectContactData,
  selectLocation,
  selectWarehouse,
} from "../../redux/order/selectors";
import { api } from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/authCart/operations";
import { clearLocalCart } from "../../redux/cart/slice";

const Order = () => {
  const localeProducts = useSelector(selectCartItems);
  const authProducts = useSelector(selectAuthCartItems);
  const localeTotalPrice = useSelector(selectTotalPrice);
  const authTotalPrice = useSelector(selectAuthTotalPrice);
  const localeQty = useSelector(selectCartQty);
  const authLocaleQty = useSelector(selectAuthCartQty);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [paymentType, setPaymentType] = useState("card");
  const [comment, setComment] = useState("");
  const contactData = useSelector(selectContactData);
  const warehouse = useSelector(selectWarehouse);
  const location = useSelector(selectLocation);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = isLoggedIn ? authProducts : localeProducts;
  const totalPrice = isLoggedIn ? authTotalPrice : localeTotalPrice;
  const qty = isLoggedIn ? authLocaleQty : localeQty;

  const handleOrder = async () => {
    let orderProducts = [];
    if (isLoggedIn) {
      orderProducts = products.map(({ productId, quantity }) => ({
        productId: productId._id,
        quantity,
      }));
    } else {
      orderProducts = products.map(({ _id, qty }) => ({
        productId: _id,
        quantity: qty,
      }));
    }

    const requestBody = {
      recipientName: `${contactData.lastName} ${contactData.firstName} ${contactData.middleName}`,
      phone: `0${contactData.phoneNumber}`,
      cityName: location.MainDescription,
      warehouseIndex: warehouse.Number,
      areaName: location.Area,
      settlementType: warehouse.SettlementTypeDescription,
      paymentType,
      comment,
      products: orderProducts,
    };

    try {
      await api.post("/np/create", requestBody);
    } catch (e) {
      toast.error("Помилка оформлення");
      console.error(e);
      return;
    }

    dispatch(clearCart());
    dispatch(clearLocalCart());

    navigate("/catalog");
  };

  return (
    <div>
      <BackLayout>
        <div className={s.container}>
          <div className={s.mainBlock}>
            <h1 className={s.mainTitle}>Оформлення замовлення</h1>
            <div className={s.formBlock}>
              <ContactForm />
              <LocationForm />
              <WarehouseForm />
              <h2 className={s.title}>Оплата</h2>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  value={paymentType}
                  onChange={(event) => setPaymentType(event.target.value)}
                >
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="Післяплата"
                    sx={{ color: "#f2e8cf", fontWeight: 600 }}
                  />
                  <FormControlLabel
                    value="card"
                    control={<Radio />}
                    label="Банківською карткою"
                    sx={{ color: "#f2e8cf", fontWeight: 600 }}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl>
                <TextField
                  label="Залишити коментар"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  sx={{ marginTop: "25px", marginBottom: "25px" }}
                />
              </FormControl>
              <div className={s.buttonContainer}>
                <Button
                  className={s.button}
                  size="large"
                  color="primary"
                  variant="contained"
                  sx={{ width: "50%" }}
                  onClick={handleOrder}
                >
                  Підтвердити замовлення
                </Button>
              </div>

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
              {products.map((item) => {
                if (isLoggedIn) {
                  const {
                    productId: { _id, name, photo, price, discount },
                    quantity,
                  } = item;

                  return (
                    <li key={_id}>
                      <OrderProductCard
                        name={name}
                        qty={quantity}
                        photo={photo}
                        price={price}
                        discount={discount}
                      />
                    </li>
                  );
                }

                const { _id, name, qty, photo, price, discount } = item;

                return (
                  <li key={_id}>
                    <OrderProductCard
                      name={name}
                      qty={qty}
                      photo={photo}
                      price={price}
                      discount={discount}
                    />
                  </li>
                );
              })}
            </ul>
            <div className={s.block}>
              <p className={s.text}>Вартість доставки</p>
              <p className={s.value}>За тарифами перевізника</p>
            </div>
            <div className={s.block}>
              <p className={s.text}>До сплати</p>
              <p className={s.totalPrice}>{totalPrice} грн.</p>
            </div>
          </div>
        </div>
      </BackLayout>
    </div>
  );
};

export default Order;
