import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginFail, loginSucess, showLogin } from "../redux/userAuth/userAuthSlice";
import Charging from "./Charging";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { actionLogin} from "../redux/userAuth/userAuthActions";

const Login = () => {
  const { user, isAuth, isLoading, error } = useSelector(
    (store) => store.userAuth
  );
  
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Por ingrese un correo válido")
        .required("Debe digitar su correo electrónico"),
      password: Yup.string().required("Debe digitar una contraseña"),
    }),
    onSubmit: async (values) => {
      // console.log(values)
      // dispatch(loginSucess(values))
      dispatch(actionLogin(values))
      // dispatch(actionLoginWithEmailAndPassword(values));
    },
  });

  if (isLoading)
    return (
      <Charging/>
    );

  if (error) {
    Swal.fire({
      position: "top-end",
      allowOutsideClick: false,
      title: "Error al iniciar sesión",
      text:"Verifique sus datos",
      icon: "error",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(loginFail(null));
      }
    });
  }
  
  if (isAuth !=null && user != null) {
    Swal.fire({
      allowOutsideClick: false,
      title: `Bienvenido ${user.userName}`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(showLogin(false))
      }
    });
  }

  return (
    <div className="bg-secondary-color w-2/5 px-8 py-2 rounded-xl border border-highlight-color shadow-[0px_0px_35px_4px_rgba(255,43,43,1)]">
      <h2 className="font-title text-highlight-color text-4xl text-center font-bold my-4">Sing In</h2>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col justify-center"
      >
        <div className="mb-5">
          <label htmlFor="email" className="text-primary-color font-semibold font-body">Correo</label>
          <input
            type="email"
            id="email"
            className="bg-trasparent border border-highlight-color text-black-text text-sm rounded-xl focus:ring-highlight-color focus:border-highlight-color w-full p-2.5 "            placeholder="name@email.com"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <span className="text-highlight-color text-xs font-semibold">
              {formik.errors.email}
            </span>
          ) : null}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="font-semibold font-body text-primary-color">Contraseña</label>
          <input
            type="password"
            id="password"
            className="bg-trasparent border border-highlight-color text-black-text text-sm rounded-xl focus:ring-highlight-color focus:border-highlight-color w-full p-2.5 "
            placeholder="xxxxxxxx"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="text-highlight-color text-xs font-semibold">
              {formik.errors.password}
            </span>
          ) : null}
        </div>
        <button
          type="submit"
          className="font-body mb-6 md:text-lg sm:text-base bg-highlight-color hover:bg-primary-color hover:border border-primary-color font-semibold rounded-xl w-full sm:w-auto px-5 py-2.5 text-center text-secondary-color"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};
export default Login;
