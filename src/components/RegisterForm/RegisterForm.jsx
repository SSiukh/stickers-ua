import { useDispatch } from "react-redux";
import * as Yup from "yup";
import s from "./RegisterForm.module.scss";
import { validationSchemas } from "../../utils/utils";
import { register } from "../../redux/auth/slice";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape(validationSchemas.registration);

  const handleSubmit = (values, actions) => {
    dispatch(register(values));
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section className={s.section}>
      <div className="container">
        <div className={s.container}>
          <form className={s.form} onSubmit={formik.handleSubmit}>
            <p className={s.formText}>Введіть дані для реєстрації</p>
            <TextField
              label="Ім'я"
              variant="outlined"
              type="name"
              name="name"
              color="primary"
              fullWidth
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              name="email"
              color="primary"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              label="Пароль"
              variant="outlined"
              type="password"
              name="password"
              color="primary"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              label="Повторіть пароль"
              variant="outlined"
              type="password"
              name="repeatPassword"
              color="primary"
              fullWidth
              value={formik.values.repeatPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.repeatPassword &&
                Boolean(formik.errors.repeatPassword)
              }
              helperText={
                formik.touched.repeatPassword && formik.errors.repeatPassword
              }
            />
            <p className={s.unsigned}>
              Вже зареєстровані?{" "}
              <Link className={s.login} to="/register">
                Увійдіть.
              </Link>
            </p>
            <Button
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Зареєструватись
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
