import s from "./LoginForm.module.scss";
import { validationSchemas } from "../../utils/utils";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { login } from "../../redux/auth/slice";

const LoginForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape(validationSchemas.login);

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <section className={s.section}>
      <div className="container">
        <div className={s.container}>
          <form className={s.form} onSubmit={formik.handleSubmit}>
            <p className={s.formText}>Вітаємо! Увійдіть, щоб розпочати.</p>
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
            <p className={s.unregistered}>
              Не зареєстровані?{" "}
              <Link className={s.register} to="/register">
                Створіть аккаунт.
              </Link>
            </p>
            <Button
              size="large"
              type="submit"
              variant="contained"
              color="primary"
            >
              Увійти
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
