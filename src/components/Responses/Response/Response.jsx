import s from "./Response.module.scss";

const Response = ({ path }) => {
  return (
    <div className={s.response}>
      <img src={path} alt="response" />
    </div>
  );
};

export default Response;
