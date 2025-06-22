import { Chip, IconButton } from "@mui/material";
import s from "./OrderItem.module.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import OrderProductCard from "../OrderProductCars/OrderProductCard";

const OrderItem = ({
  id,
  item: {
    invoice,
    paymentType,
    recipientName,
    status,
    createdAt,
    products,
    comment,
  },
  handleComplete,
  handleDelete,
}) => {
  const date = new Date(createdAt).toLocaleDateString("uk-UA");
  const payTypes = {
    cash: "Післяплата",
    card: "Картка",
  };
  const statuses = {
    new: "Нова",
    completed: "Виконані",
  };

  //   const handleDelete = async () => {
  //     try {
  //       await api.delete(`/orders/${id}`);
  //     } catch (e) {
  //       toast.error("Помилка видалення");
  //     }
  //   };

  //   const handleComplete = async () => {
  //     try {
  //       await api.patch(`/orders/${id}`);
  //     } catch (e) {
  //       toast.error("Помилка зміни статусу");
  //     }
  //   };

  return (
    <div className={s.container}>
      <div className={s.headBlock}>
        <div className={s.headMainBlock}>
          <p className={s.name}>{recipientName}</p>
          <Chip label={statuses[status]} />
          <p className={s.date}>{date}</p>
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
            onClick={() => handleComplete(id)}
            aria-label="done"
            size="medium"
          >
            <DoneIcon fontSize="inherit" />
          </IconButton>
        </div>
      </div>
      <div className={s.mainBlock}>
        <div className={s.infoBlock}>
          <div className={s.infoHeadBlock}>
            <div className={s.infoHeadBlockItem}>
              <p className={s.date}>ЕН</p>
              <p className={s.value}>{invoice}</p>
            </div>
            <div className={s.infoHeadBlockItem}>
              <p className={s.date}>Тип оплати</p>
              <p className={s.value}>{payTypes[paymentType]}</p>
            </div>
          </div>
          {comment && (
            <div className={s.infoBlockItem}>
              <p className={s.date}>Коментар</p>
              <p className={s.value}>{comment}</p>
            </div>
          )}
        </div>
        <div className={s.productListWrapper}>
          <ul className={s.productList}>
            {products.map(({ _id, productId, quantity }) => (
              <li key={_id}>
                <OrderProductCard
                  name={productId.name}
                  photo={productId.photo}
                  qty={quantity}
                  price={productId.price}
                  discount={productId.discount}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
