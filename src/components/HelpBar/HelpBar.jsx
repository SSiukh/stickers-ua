import { TextField } from "@mui/material";
import s from "./HelpBar.module.scss";

const HelpBar = () => {
  return (
    <div className={s.container}>
      <TextField
        size="small"
        label="Пошук"
        variant="outlined"
        color="primary"
        fullWidth
      />
    </div>
  );
};

export default HelpBar;
