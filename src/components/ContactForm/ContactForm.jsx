// ДОРОБИТИ АВТОЗАПОВНЕННЯ

import s from "./ContactForm.module.scss";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { validationSchemas } from "../../utils/utils";
import { setContactData } from "../../redux/order/slice";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import clsx from "clsx";
import { FaRegUser } from "react-icons/fa6";
import { selectContactData } from "../../redux/order/selectors";

const ContactForm = () => {
  const dispatch = useDispatch();
  const [formIsOpen, setFormIsOpen] = useState(true);
  const { firstName, lastName, middleName, phoneNumber } =
    useSelector(selectContactData);

  const validationSchema = Yup.object().shape(validationSchemas.contact);

  const handleSubmit = (values) => {
    dispatch(setContactData(values));
    setFormIsOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      lastName: "",
      firstName: "",
      middleName: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className={clsx(s.container, !formIsOpen && s.infoContainer)}>
      {formIsOpen ? (
        <form className={s.form} onSubmit={formik.handleSubmit}>
          <h2 className={s.title}>Ваші контактні дані</h2>
          <TextField
            label="Прізвище"
            variant="outlined"
            type="text"
            name="lastName"
            color="primary"
            fullWidth
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
          <TextField
            label="Ім'я"
            variant="outlined"
            type="text"
            name="firstName"
            color="primary"
            fullWidth
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            label="По батькові (не обов'язково)"
            variant="outlined"
            type="text"
            name="middleName"
            color="primary"
            fullWidth
            value={formik.values.middleName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.middleName && Boolean(formik.errors.middleName)
            }
            helperText={formik.touched.middleName && formik.errors.middleName}
          />
          <TextField
            label="Номер телефону"
            variant="outlined"
            type="tel"
            name="phoneNumber"
            color="primary"
            fullWidth
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">+380</InputAdornment>
                ),
              },
            }}
            error={
              formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
            }
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <Button
            className={s.button}
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            Підтвердити дані
          </Button>
        </form>
      ) : (
        <div className={s.infoBlock}>
          <div className={s.mainInfoBlock}>
            <FaRegUser size={20} className={s.icon} />
            <div className={s.textBlock}>
              <p className={s.fullname}>
                {lastName} {firstName} {middleName}
              </p>
              <p className={s.phoneNumber}>+380{phoneNumber}</p>
            </div>
          </div>
          <Button onClick={() => setFormIsOpen(true)}>Змінити</Button>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
