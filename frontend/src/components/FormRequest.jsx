import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  addRequest,
  requestsFail,
  resetSuccessRequests,
} from "../redux/request/requestsSlice";
import Charging from "./Charging";
import Swal from "sweetalert2";
import { actionCreateRequest } from "../redux/request/requestsActions";

const FormRequest = ({ idProject}) => {
  const [request, setRequest] = useState(false);
  const [roles, setRoles] = useState([]);

  const { detailsProject} = useSelector((store) => store.projects);
  const {user} = useSelector((store) => store.userAuth);

  useEffect(() => {
    if (detailsProject) {
      setRequest(
        detailsProject.joinRequests.some((request) => request.user === user.email)
      );
      setRoles(detailsProject.positions);
    }
  }, [detailsProject]);

  const dispatch = useDispatch();
  const { isSuccessRequests, isLoadingRequests, errorRequests } = useSelector(
    (store) => store.requests
  );
  const { isAuth } = useSelector((store) => store.userAuth);

  const formik = useFormik({
    initialValues: {
      proyectoRole: "",
      message: "",
    },
    validationSchema: Yup.object({
      proyectoRole: Yup.string().required("Debe seleccionar un rol"),
      message: Yup.string()
        .required("Debe incluir una descripción")
        .min(10, "Debe contener al menos 10 caracteres")
        .max(255, "Excedio el numero maximo de caracteres"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (idProject) {
        values.proyectoTarget = parseInt(idProject);
        dispatch(actionCreateRequest(values, isAuth));
        resetForm();
        setRequest(true);
      }
    },
  });

  if (isLoadingRequests) return <Charging />;

  if (errorRequests) {
    Swal.fire({
      position: "top-end",
      allowOutsideClick: false,
      text: "Error al crear solicitud",
      icon: "error",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(requestsFail(null));
      }
    });
  }

  if (isSuccessRequests) {
    Swal.fire({
      position: "top-end",
      allowOutsideClick: false,
      text: "Solicitud creada",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetSuccessRequests());
      }
    });
  }

  return request ? (
    <div className="w-1/3 bg-secondary-color p-4 rounded-xl flex justify-center items-center h-24">
      <h2 className="w-full font-title text-highlight-color text-xl text-center font-bold mb-4">
        Usted ya solicito unirse a este proyecto
      </h2>
    </div>
  ) : roles.length > 0 ? (
    <div className="w-1/3 bg-secondary-color p-4 rounded-xl h-80">
      <h2 className="font-title text-highlight-color text-2xl text-start font-bold mb-4">
        Crear una solicitud
      </h2>
      <form className="" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="proyectoRole"
            className="text-primary-color font-semibold font-body text-base ms-1"
          >
            Rol
          </label>
          <select
            id="proyectoRole"
            className="h-10 bg-trasparent border border-highlight-color  text-sm rounded-xl focus:ring-highlight-color focus:border-highlight-color w-full p-2 "
            onChange={formik.handleChange}
            // value={formik.values.category}
            {...formik.getFieldProps("proyectoRole")}
          >
            <option value="" className="hidden text-gray-300">
              Seleccione una opción
            </option>
            {roles.map((option, index) => (
              <option key={`role-${index}`} value={option.proyectoRole}>
                {option.proyectoRole}
              </option>
            ))}
          </select>
          {formik.touched.proyectoRole && formik.errors.proyectoRole ? (
            <span className="text-highlight-color text-xs font-semibold">
              {formik.errors.proyectoRole}
            </span>
          ) : null}
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="font-semibold font-body text-primary-color"
          >
            ¿Porque quieres participar en este proyecto?
          </label>
          <textarea
            id="message"
            className="mt-1 h-8 bg-trasparent border border-highlight-color text-black-text text-sm rounded-xl focus:ring-highlight-color focus:border-highlight-color w-full p-2.5 "
            placeholder="Ingrese una descripción"
            {...formik.getFieldProps("message")}
          />
          {formik.touched.message && formik.errors.message ? (
            <span className="text-highlight-color text-xs font-semibold">
              {formik.errors.message}
            </span>
          ) : null}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="font-body sm:w-1/2 w-full mb-2 md:text-base text-sm bg-highlight-color hover:bg-primary-color hover:border border-primary-color font-semibold rounded-xl px-5 py-2.5 text-center text-secondary-color"
          >
            Solicitar unirse
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div className="w-1/3 bg-secondary-color p-4 rounded-xl flex justify-center items-center h-24">
      <h2 className="w-full font-title text-highlight-color text-xl text-center font-bold mb-4">
        Este proyecto no esta recibiendo solicitudes en este momento
      </h2>
    </div>
  );
};

export default FormRequest;
