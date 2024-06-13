import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import SelectableForm from "./prueba";
import {
  projectsFail,
  resetSuccess,
  showFormProjects,
} from "../redux/projects/projectSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { actionGetTags } from "../redux/tags/tagsActions";
import { actionCreateProject } from "../redux/projects/projectsActions";
import Charging from "./Charging";

const urlRegex =/^(https?|ftp):\/\/(www\.)?([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})(:[0-9]{1,5})?(\/.*)?$/;

const FormCreateProject = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { showForm, isSuccessProjects, isLoadingProjects, errorProjects } =
    useSelector((store) => store.projects);

  const { tags } = useSelector((store) => store.tags);
  const { isAuth } = useSelector((store) => store.userAuth);

  useEffect(() => {
    dispatch(actionGetTags());
  }, [dispatch]);

  const handleOptionsChange = (options) => {
    setSelectedOptions(options);
  };


  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      channel:"",
      tagId:"",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(10, "El nombre debe contener al menos 10 caracteres")
        .required("Debe digitar un nombre para su proyecto"),
      description: Yup.string()
        .min(20, "Debe contener al menos 20 caracteres")
        .required("Debe incluir una descripción"),
      tagId: Yup.string().required("Debe seleccionar una categoría"),
      channel: Yup.string().required("Debe seleccionar un canal").matches(
        urlRegex,
        "ingrese un URL"
      ),
    }),
    onSubmit: async (values) => {
      if (selectedOptions.length > 0) {
        setError(false);
        values.stacks = selectedOptions;
        dispatch(actionCreateProject(values,isAuth))
        // dispatch(addProjects(values));
      } else {
        setError(true);
      }
    },
  });

  if (isLoadingProjects) return <Charging />;

  if (errorProjects) {
    Swal.fire({
      position: "top-end",
      allowOutsideClick: false,
      text: "Error al crear Proyecto",
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
      text: "Proyecto creado",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(showFormProjects(false));
        dispatch(resetSuccess());
      }
    });
  }
  return (
    <div className="bg-secondary-color w-2/5 px-8 py-2 rounded-xl border border-highlight-color shadow-[0px_0px_35px_4px_rgba(255,43,43,1)] h-[90%] overflow-y-auto overflow-x-hidden box-border
    ">
      <div className=" flex justify-between items-center my-2">
        <h2 className="font-title text-highlight-color text-3xl text-center font-bold my-4">
          Crear un proyecto
        </h2>
        <button
          onClick={() => dispatch(showFormProjects(false))}
          className="bg-transparent w-8 h-8 rounded-full fill-highlight-color"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
          </svg>
        </button>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full flex flex-col justify-center items-center"
      >
        <div className="mb-4 w-full">
          <label
            htmlFor="name"
            className="text-primary-color font-semibold font-body text-base"
          >
            Nombre del proyecto
          </label>
          <input
            type="text"
            id="name"
            className="h-10 bg-trasparent border border-highlight-color text-black-text text-sm rounded-xl focus:ring-highlight-color focus:border-highlight-color w-full p-2.5 "
            placeholder="Ingrese un nombre"
            {...formik.getFieldProps("name")}
          />
          {formik.touched.name && formik.errors.name ? (
            <span className="text-highlight-color text-xs font-semibold">
              {formik.errors.name}
            </span>
          ) : null}
        </div>
        <div className="mb-2 w-full">
          <label
            htmlFor="description"
            className="font-semibold font-body text-primary-color"
          >
            Descripción
          </label>
          <textarea
            id="description"
            className="h-10 bg-trasparent border border-highlight-color text-black-text text-sm rounded-xl focus:ring-highlight-color focus:border-highlight-color w-full p-2.5 "
            placeholder="Ingrese una descripción"
            {...formik.getFieldProps("description")}
          />
          {formik.touched.description && formik.errors.description ? (
            <span className="text-highlight-color text-xs font-semibold">
              {formik.errors.description}
            </span>
          ) : null}
          <SelectableForm
            onOptionsChange={handleOptionsChange}
            showError={error}
          />
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="tagId"
            className="font-semibold font-body text-primary-color"
          >
            Categoría
          </label>
          <select
            id="tagId"
            className="h-10 bg-trasparent border border-highlight-color  text-sm rounded-xl focus:ring-highlight-color focus:border-highlight-color w-full p-2 "
            onChange={formik.handleChange}
            // value={formik.values.category}
            {...formik.getFieldProps("tagId")}
          >
            <option value="" className="hidden text-gray-300">
              Seleccione una opción
            </option>
            {tags.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          {formik.touched.tagId && formik.errors.tagId ? (
            <span className="text-highlight-color text-xs font-semibold">
              {formik.errors.tagId}
            </span>
          ) : null}
        </div>
        <div className="mb-2 w-full">
          <label
            htmlFor="channel"
            className="text-primary-color font-semibold font-body text-base"
          >
            Canal de comunicación
          </label>
          <input
            type="text"
            id="channel"
            className="h-10 bg-trasparent border border-highlight-color text-black-text text-sm rounded-xl focus:ring-highlight-color focus:border-highlight-color w-full p-2.5 "
            placeholder="Ingrese un url del canal de comunicación"
            {...formik.getFieldProps("channel")}
          />
          {formik.touched.channel && formik.errors.channel ? (
            <span className="text-highlight-color text-xs font-semibold">
              {formik.errors.channel}
            </span>
          ) : null}
        </div>
        <button
          type="submit"
          className="font-body my-4 md:text-lg sm:text-base bg-highlight-color hover:bg-primary-color hover:border border-primary-color font-semibold rounded-xl w-full md:w-1/2 px-5 py-2.5 text-center text-secondary-color"
        >
          Crear
        </button>
      </form>
    </div>
  );
};

export default FormCreateProject;
