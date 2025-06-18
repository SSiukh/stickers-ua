import { useSelector } from "react-redux";
import s from "./Loader.module.scss";

const Loader = () => {
  const isLoading = useSelector((state) => state.loader.loading);

  if (!isLoading) return null;

  return (
    <div className={s.backdrop}>
      <div className={s.spinner}></div>
    </div>
  );
};

export default Loader;
