import { useFormik } from "formik";
import { api } from "../../api/axios";
import s from "./StickerEditModal.module.scss";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { stickerTypes } from "../../utils/utils";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/products/operations";

const StickerEditModal = ({ close, info }) => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await api.patch(`/stickers/${info._id}`, values);
      toast.success("Успішно внесено зміни");
      resetForm();
      close();
      dispatch(fetchProducts());
    } catch (e) {
      toast.error("Помилка");
      console.log(e.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: info.name,
      type: info.type,
      info: info.info,
      price: info.price,
      discount: info.discount,
      quantity: info.quantity,
      onAbout: info.onAbout,
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.mainInfo}>
          <div className={s.generalInfo}>
            <div className={s.close}>
              <IconButton onClick={() => close()}>
                <CloseIcon />
              </IconButton>
            </div>
            <h2 className={s.title}>Інформація про наклейку</h2>
            <div className={s.rowBlock}>
              <TextField
                label="Назва"
                variant="outlined"
                type="text"
                name="name"
                color="primary"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <FormControl
                fullWidth
                error={formik.touched.type && Boolean(formik.errors.type)}
              >
                <InputLabel id="type-label">Тип</InputLabel>
                <Select
                  id="multiple-type"
                  labelId="type-label"
                  name="type"
                  multiple
                  multiline
                  value={formik.values.type}
                  input={<OutlinedInput multiline label="Тип" />}
                  onBlur={formik.handleBlur}
                  onChange={(e) => formik.setFieldValue("type", e.target.value)}
                >
                  {Object.entries(stickerTypes).map(([key, value]) => (
                    <MenuItem key={value} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.type && formik.errors.type}
                </FormHelperText>
              </FormControl>
            </div>
            <TextField
              label="Опис"
              variant="outlined"
              type="text"
              name="info"
              color="primary"
              fullWidth
              multiline
              value={formik.values.info}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.info && Boolean(formik.errors.info)}
              helperText={formik.touched.info && formik.errors.info}
            />
            <div className={s.rowBlock}>
              <TextField
                label="Ціна"
                variant="outlined"
                type="number"
                name="price"
                color="primary"
                fullWidth
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">UAH</InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Знижка"
                variant="outlined"
                type="number"
                name="discount"
                color="primary"
                fullWidth
                value={formik.values.discount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.discount && Boolean(formik.errors.discount)
                }
                helperText={formik.touched.discount && formik.errors.discount}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">UAH</InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Кількість"
                variant="outlined"
                type="number"
                name="quantity"
                color="primary"
                fullWidth
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.quantity && Boolean(formik.errors.quantity)
                }
                helperText={formik.touched.quantity && formik.errors.quantity}
              />
            </div>
            <FormControlLabel
              className={s.isOnAbout}
              control={
                <Checkbox
                  name="onAbout"
                  checked={formik.values.onAbout}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label="Відображається в блоці найпопулярніших"
            />
            <Button
              className={s.button}
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Завантажити
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StickerEditModal;
