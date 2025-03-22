import s from "./BackLayout.module.scss";

const BackLayout = ({ children }) => {
  return (
    <div className={s.layout}>
      <div className="container">
        <div className={s.container}>{children}</div>
      </div>
    </div>
  );
};

export default BackLayout;
