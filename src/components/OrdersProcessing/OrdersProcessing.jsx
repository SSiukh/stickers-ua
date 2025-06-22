import { useEffect, useState } from "react";
import s from "./OrdersProcessing.module.scss";
import { api } from "../../api/axios";
import { Tab, Tabs } from "@mui/material";
import OrderItem from "../OrderItem/OrderItem";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

const OrdersProcessing = () => {
  const [orders, setOrders] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get("status") || "";

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders", {
        params: { status },
      });
      setOrders(data.data);
    } catch (e) {
      toast.error("Помилка завантаження замовлень");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders", {
          params: { status },
        });
        setOrders(data.data);
      } catch (e) {
        toast.error("Помилка завантаження замовлень");
      }
    };

    fetchOrders();
  }, [status]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      toast.success("Замовлення видалено");
      fetchOrders();
    } catch (e) {
      toast.error("Помилка видалення");
    }
  };

  const handleComplete = async (id) => {
    try {
      await api.patch(`/orders/${id}`);
      toast.success("Статус змінено");
      fetchOrders();
    } catch (e) {
      toast.error("Помилка зміни статусу");
    }
  };

  const handleTabChange = (event, newValue) => {
    if (newValue) {
      setSearchParams({ status: newValue });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={s.container}>
      <Tabs
        value={status}
        onChange={handleTabChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="" label="Всі" />
        <Tab value="new" label="Нові" />
        <Tab value="completed" label="Виконані" />
      </Tabs>
      <ul className={s.list}>
        {!orders.length && <p className={s.noneText}>Замовлення відсутні</p>}
        {orders.map((item) => (
          <li key={item._id}>
            <OrderItem
              handleDelete={handleDelete}
              handleComplete={handleComplete}
              id={item._id}
              item={item}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersProcessing;
