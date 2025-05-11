import clsx from "clsx";
import * as Yup from "yup";

export const setNavClass = ({ isActive }, s) => {
  return clsx(s.link, isActive && s.active);
};

export const regexes = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+={}\[\]:;<>.,?/~`|-]{8,}$/,
  phoneNumber: /^\d{7,10}$/,
};

export const stickerTypes = {
  standard: "Стандартні",
  holographic: "Голографічні",
  chrome: "Хромові",
  mat: "Матові",
  space: "Космічні",
  texture: "Текстурні",
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
  contact: {
    lastName: Yup.string()
      .min(2, "Занадто коротке")
      .max(50, "Занадто довге")
      .required("Прізвище обов'язкове до заповнення"),
    firstName: Yup.string()
      .min(2, "Занадто коротке")
      .max(50, "Занадто довге")
      .required("Ім'я обов'язкове до заповнення"),
    middleName: Yup.string().min(2, "Занадто коротке").max(50, "Занадто довге"),
    phoneNumber: Yup.string()
      .matches(regexes.phoneNumber, "Номер повинен складатись із 9 цифр")
      .required("Номер телефону обов'язковий до заповнення"),
  },
  sticker: {
    name: Yup.string().required("Обов'язкове поле"),
    type: Yup.array()
      .of(Yup.string().oneOf(Object.keys(stickerTypes), "Недопустиме значення"))
      .min(1, "Оберіть хоча б один тип")
      .required("Обов'язкове поле"),
    info: Yup.string()
      .min(30, "Занадто короткий")
      .max(300, "занадто довгий")
      .required("Обов'язкове поле"),
    price: Yup.number().required("Обов'язкове поле"),
    discount: Yup.number().required("Обов'язкове поле"),
    quantity: Yup.number().required("Обов'язкове поле"),
    photo: Yup.mixed().required("Оберіть фото"),
    color: Yup.string().required("Обов'язкове поле"),
    onAbout: Yup.boolean().required("Обов'язкове поле"),
  },
};

export const setScroll = (status) => {
  status
    ? (document.body.style.overflow = "unset")
    : (document.body.style.overflow = "hidden");
};
