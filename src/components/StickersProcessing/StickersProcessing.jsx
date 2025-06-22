import { useEffect, useState } from "react";
import s from "./StickersProcessing.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/products/operations";
import { selectItems } from "../../redux/products/selectors";
import ManagerStickerItem from "../ManagerStickerItem/ManagerStickerItem";
import { api } from "../../api/axios";
import { toast } from "react-hot-toast";
import StickerEditModal from "../StickerEditModal/StickerEditModal";

const StickersProcessing = () => {
  const dispatch = useDispatch();
  const stickers = useSelector(selectItems);
  const [isModal, setIsModal] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/stickers/${id}`);
      dispatch(fetchProducts());
      toast.success("Успішно видалено");
    } catch (e) {
      toast.error("Помилка видалення");
    }
  };

  const handleEdit = (info) => {
    setModalInfo(info);
    setIsModal(true);
  };

  return (
    <div className={s.container}>
      <ul className={s.list}>
        {!stickers.length && <p className={s.noneText}>Товари відсутні</p>}
        {stickers.map((item) => (
          <li key={item._id}>
            <ManagerStickerItem
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              id={item._id}
              item={item}
            />
          </li>
        ))}
      </ul>
      {isModal && (
        <StickerEditModal close={() => setIsModal(false)} info={modalInfo} />
      )}
    </div>
  );
};

export default StickersProcessing;
