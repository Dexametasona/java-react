import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetRoles } from "../redux/request/requestsActions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { actionCreatePosition } from "../redux/projects/projectsActions";
import Charging from "./Charging";
import Swal from "sweetalert2";
import { projectsFail, resetSuccess } from "../redux/projects/projectSlice";

const FormSearchRol = ({ idProject }) => {
  const dispatch = useDispatch();
  const { roles } = useSelector((store) => store.requests);
  const { isSuccessProjects, isLoadingProjects, errorProjects } =
    useSelector((store) => store.projects);
  const { isAuth } = useSelector(
    (store) => store.userAuth
  );

  useEffect(() => {
    dispatch(actionGetRoles());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      proyectoRole: "",
      quantity: "",
      description: "",
    },
    validationSchema: Yup.object({
      proyectoRole: Yup.string().required("Debe seleccionar un rol"),
      quantity: Yup.number()
        .required("Debe ingresar una cantidad")
        .min(1, "La cantidad debe ser mayor a cero"),
      description: Yup.string()
        .required("Debe ingrese una descripción")
        .min(10, "Debe contener al menos 10 caracteres")
        .max(255, "Excedio el numero maximo de caracteres"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (idProject) {
        values.idProyecto = parseInt(idProject);
        dispatch(actionCreatePosition(values,isAuth))
      }
      resetForm();
    },
  });

  if (isLoadingProjects) return <Charging />;

  if (errorProjects) {
    Swal.fire({
      position: "top-end",
      allowOutsideClick: false,
      text: "Error al crear rol",
      icon: "error",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(projectsFail(null));
      }
    });
  }

  if (isSuccessProjects) {
    Swal.fire({
      position: "top-end",
      allowOutsideClick: false,
      text: "Rol creado",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetSuccess());
      }
    });
  }



  return (
    <div className="w-1/3 bg-secondary-color p-4 rounded-xl">
      <h2 className="font-title text-highlight-color text-2xl text-start font-bold mb-4">
        ¿Que estas buscando para tu proyecto?
      </h2>
      <form className="" onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="quantity"
            className="text-primary-color font-semibold font-body text-base ms-1"
          >
            ¿Cuantas personas necesitas para este rol?
          </label>
          <input
            type="number"
            id="quantity"
            className="h-8 bg-trasparent border border-highlight-color text-black-text text-sm rounded-lg focus:ring-highlight-color focus:border-highlight-color w-full p-2.5 "
            placeholder="Ingrese una cantidad"
            {...formik.getFieldProps("quantity")}
          />
          {formik.touched.quantity && formik.errors.quantity ? (
            <span className="text-highlight-color text-xs font-semibold">
              {formik.errors.quantity}
            </span>
          ) : null}
        </div>
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
              <option key={`role-${index}`} value={option.role}>
                {option.role}
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
            htmlFor="description"
            className="font-semibold font-body text-primary-color"
          >
            ¿Que buscas de este rol?
          </label>
          <textarea
            id="description"
            className="mt-1 h-8 bg-trasparent border border-highlight-color text-black-text text-sm rounded-xl focus:ring-highlight-color focus:border-highlight-color w-full p-2.5 "
            placeholder="Ingrese una descripción"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <span className="text-highlight-color text-xs font-semibold">
              {formik.errors.description}
            </span>
          ) : null}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="font-body sm:w-1/2 w-full mb-2 md:text-base text-sm bg-highlight-color hover:bg-primary-color hover:border border-primary-color font-semibold rounded-xl px-5 py-2.5 text-center text-secondary-color"
          >
            Añadir rol
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSearchRol;
