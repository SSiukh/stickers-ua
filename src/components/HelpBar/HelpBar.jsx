import { Button, IconButton, TextField } from "@mui/material";
import s from "./HelpBar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectKeyword } from "../../redux/products/selectors";
import { setColor, setKeyword } from "../../redux/products/slice";
import stickers from "../../data/stickers.json";
import { FaCircle } from "react-icons/fa";

const HelpBar = () => {
  const dispatch = useDispatch();
  const keyword = useSelector(selectKeyword);
  const allColors = stickers.map((item) => item.color);
  const colors = [...new Set(allColors)];

  return (
    <div className={s.container}>
      <TextField
        type="text"
        size="small"
        label="Пошук"
        variant="outlined"
        color="primary"
        fullWidth
        onChange={(e) => dispatch(setKeyword(e.target.value))}
        value={keyword}
      />
      <div className={s.colorPicker}>
        <div>
          <p className={s.colorText}>Виберіть кольори: </p>
          <ul className={s.colorsList}>
            {colors.map((color) => (
              <li className={s.colorItem} key={color}>
                <IconButton onClick={() => dispatch(setColor(color))}>
                  <FaCircle color={color} />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
        <Button
          onClick={() => dispatch(setColor(""))}
          size="small"
          color="secondary"
          variant="outlined"
        >
          Очистити
        </Button>
      </div>
    </div>
  );
};

export default HelpBar;
