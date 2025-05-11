import s from "./CreateStickers.module.scss";
import * as Yup from "yup";
import { stickerTypes, validationSchemas } from "../../utils/utils";
import { useFormik } from "formik";
import { HexColorPicker } from "react-colorful";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
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
import { useRef } from "react";
import { addProduct } from "../../redux/products/operations";

const CreateStickers = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape(validationSchemas.sticker);
  const fileInputRef = useRef();

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("type", JSON.stringify(values.type));
    formData.append("info", values.info);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("quantity", values.quantity);
    formData.append("onAbout", values.onAbout);
    formData.append("color", values.color);
    formData.append("photo", values.photo);

    try {
      dispatch(addProduct(formData));
      resetForm();
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      type: [],
      info: "",
      price: 0,
      discount: 0,
      quantity: 1,
      photo: "",
      color: "",
      onAbout: false,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={formik.handleSubmit}>
        <div className={s.mainInfo}>
          <div className={s.generalInfo}>
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
          </div>
          <div className={s.additionInfo}>
            <p className={s.title}>Додаткова інформація</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(event) => {
                const file = event.currentTarget.files[0];
                if (file) {
                  formik.setFieldValue("photo", file);
                }
              }}
              style={{ display: "none" }}
              accept=".jpg,.jpeg,.png"
            />
            <Button fullWidth variant="contained" onClick={handleButtonClick}>
              Обрати фото
            </Button>
            {formik.touched.photo && formik.errors.photo && (
              <FormHelperText error>
                {formik.touched.photo && formik.errors.photo}
              </FormHelperText>
            )}
            {formik.values.photo && (
              <div className={s.pickedPhoto}>
                <p className={s.photoName}>{formik.values.photo.name}</p>
                <IconButton
                  onClick={() => {
                    formik.setFieldValue("photo", "");
                    if (fileInputRef.current) {
                      fileInputRef.current.value = null;
                    }
                  }}
                  aria-label="delete"
                >
                  <ClearIcon />
                </IconButton>
              </div>
            )}

            <HexColorPicker
              className={s.colorPicker}
              color={formik.values.color}
              onChange={(color) => formik.setFieldValue("color", color)}
            />
            <div className={s.additionSummary}>
              <div className={s.section}>
                <p className={s.label}>Обраний колір:</p>
                <div
                  className={s.pickedColor}
                  style={{
                    backgroundColor: formik.values.color,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <Button
          className={s.button}
          size="large"
          type="submit"
          variant="contained"
          color="primary"
        >
          Завантажити
        </Button>
      </form>
    </div>
  );
};

export default CreateStickers;
