import * as Yup from "yup";

export const validatorDataUser = Yup.object().shape(
  {
    nama_lengkap: Yup.string().required("Level tidak boleh kosong"),
    level: Yup.string().required("Level tidak boleh kosong"),
    email: Yup.string()
      .required("Email tidak boleh kosong")
      .email("Email tidak sesuai"),
    username: Yup.string().required("Username tidak boleh kosong"),
    password: Yup.string().when("password", (val, schema) => {
      console.log(val === "" ? 'Masuk' : "tidakkkk")
      if (val === "") {
        return Yup.string().nullable().optional();
      } else {
        return (
          Yup.string()
            .matches(
              RegExp("(.*[a-z].*)"),
              "Password harus mengandung karakter, angka, dan simbol"
            )
            .matches(
              RegExp("(.*[A-Z].*)"),
              "Password harus mengandung karakter, angka, dan simbol"
            )
            .matches(
              RegExp("(.*\\d.*)"),
              "Password harus mengandung karakter, angka, dan simbol"
            )
            .matches(
              RegExp('[!@#$%^&*(),.?":{}|<>]'),
              "Password harus mengandung karakter, angka, dan simbol"
            )
            // .required("Password tidak boleh kosong")
            .min(6, "Password harus lebih dari 6 karakter")
        );
      }
    }),
    c_password: Yup.string().when("password", (val, schema) => {
      if (val === "") {
        return Yup.string().nullable().optional();
      } else {
        return (
          Yup.string()
            .matches(
              RegExp("(.*[a-z].*)"),
              "Password harus mengandung karakter, angka, dan simbol"
            )
            .matches(
              RegExp("(.*[A-Z].*)"),
              "Password harus mengandung karakter, angka, dan simbol"
            )
            .matches(
              RegExp("(.*\\d.*)"),
              "Password harus mengandung karakter, angka, dan simbol"
            )
            .matches(
              RegExp('[!@#$%^&*(),.?":{}|<>]'),
              "Password harus mengandung karakter, angka, dan simbol"
            )
            // .required("Password tidak boleh kosong")
            .min(6, "Password harus lebih dari 6 karakter")
            .oneOf([Yup.ref("password")], "Passwords tidak sama")
        );
      }
    }),
  },
  [
    ["password", "password"],
    ["c_password", "c_password"],
  ]
);

export const defaultvalueUser = {
  id: "",
  nama_lengkap: "",
  username: "",
  role: "",
  level: "",
  email: "",
  password: "",
  c_password: "",
  password_old: "",
};
