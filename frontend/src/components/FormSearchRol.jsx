import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const FormSearchRol = () => {
  const dispatch = useDispatch();
  const {roles} = useSelector ( (store) => store.requests)

  useEffect(()=>{
    dispatch(actionGetRoles())
  },[dispatch])
    return (
        <div className="w-1/3 bg-secondary-color p-4 rounded-xl">
          <h2 className="font-title text-highlight-color text-2xl text-start font-bold mb-4">
            ¿Que estas buscando para tu proyecto?
          </h2>
          <form className="">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="text-primary-color font-semibold font-body text-base ms-1"
              >
                ¿Cuantas personas necesitas para este rol?
              </label>
              <input
                type="text"
                id="name"
                className="h-8 bg-trasparent border border-highlight-color text-black-text text-sm rounded-lg focus:ring-highlight-color focus:border-highlight-color w-full p-2.5 "
                placeholder="Ingrese un nombre"
                // {...formik.getFieldProps("name")}
              />
              {/* {formik.touched.name && formik.errors.name ? (
                <span className="text-highlight-color text-xs font-semibold">
                  {formik.errors.name}
                </span>
              ) : null} */}
            </div>
            <div className="mb-4">
            <label
            htmlFor="proyectoRol"
            className="text-primary-color font-semibold font-body text-base ms-1"
          >
            Rol
          </label>
          <select
            id="proyectoRole"
            className="h-10 bg-trasparent border border-highlight-color  text-sm rounded-xl focus:ring-highlight-color focus:border-highlight-color w-full p-2 "
            onChange={formik.handleChange}
            // value={formik.values.category}
            // {...formik.getFieldProps("proyectoRol")}
          >
            <option value="" className="hidden text-gray-300">
              Seleccione una opción
            </option>
            {roles.map((option,index) => (
              <option key={`role-${index}`} value={option.role}>
                {option.role}
              </option>
            ))}
          </select>
          {/* {formik.touched.proyectoRol && formik.errors.proyectoRol ? (
            <span className="text-highlight-color text-xs font-semibold">
              {formik.errors.proyectoRol}
            </span>
          ) : null} */}
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
                // {...formik.getFieldProps("description")}
              />
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
      );
}

export default FormSearchRol
