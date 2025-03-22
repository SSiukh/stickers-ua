import clsx from "clsx";
import * as Yup from "yup";

export const setNavClass = ({ isActive }, s) => {
  return clsx(s.link, isActive && s.active);
};

export const regexes = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;<>.,?/~`|-]{8,}$/,
};

export const validationSchemas = {
  login: {
    email: Yup.string()
      .matches(regexes.email, "Некоректний email")
      .required("Електронна пошта обов'язкова до заповнення"),
    password: Yup.string()
      .min(8, "Пароль повинен складатись принаймні із 8 символів")
      .required("Пароль обов'язковий до заповнення"),
  },
  registration: {
    name: Yup.string()
      .min(2, "Занадто коротке")
      .max(50, "Занадто довге")
      .required("Ім'я обов'язкове до заповнення"),
    email: Yup.string()
      .matches(regexes.email, "Incorrect email")
      .required("Електронна пошта обов'язкова до заповнення"),
    password: Yup.string()
      .matches(
        regexes.password,
        "Пароль повинен складатись із великих та малих літер з цифрами"
      )
      .min(8, "Пароль повинен складатись принаймні із 8 символів")
      .required("Пароль обов'язковий до заповнення"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Паролі повинні співпадати")
      .required("Паролі повинні співпадати"),
  },
};
