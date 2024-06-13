import React, { useEffect, useState } from "react";
import banner from "../assets/imgDetails.svg";
import imgCard from "../assets/imgCard.jpeg";
import FormRequest from "../components/FormRequest";
import FormSearchRol from "../components/FormSearchRol";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionDetailsProject } from "../redux/projects/projectsActions";
import Charging from "../components/Charging";
import { format } from "date-fns";

const Details = () => {
  //solicitud -> si el id del dueño del proyecto es diferente del userAuth y no hace parte de colaboradore
  //infoProyecto -> si el id del dueño del proyecto es diferente del userAuth y hace parte de colaboradore
  //Edicion -> si el id del dueño del proyecto es igual al userAuth
  const { idProject } = useParams();
  const dispatch = useDispatch();

  const { isAuth, user } = useSelector((store) => store.userAuth);
  const { detailsProject } = useSelector((store) => store.projects);
  const [viewType, setViewType] = useState(null);

  useEffect(() => {
    dispatch(actionDetailsProject(idProject, isAuth));
  }, [dispatch]);

  useEffect(() => {
    if (detailsProject) {
      const owner = detailsProject.collaborators?.find(
        (collaborator) => collaborator.proyectoRole === "OWNER"
      );

      if (owner.userId === user.id) {
        console.log("edition");
        setViewType("edition");
      } else {
        const collaborator = detailsProject.collaborators?.find(
          (collaborator) =>
            (collaborator.userId === user.id) &
            (collaborator.proyectoRole != "OWNER")
        );
        if (collaborator) {
          console.log("collaborator", collaborator);
          setViewType("collaborator");
        } else {
          console.log("request");
          setViewType("request");
        }
      }
    }
  }, [detailsProject]);

  console.log("detailsProject", detailsProject)
  return detailsProject ? (
    <div className="mt-12">
      <div className="mt-4 flex flex-row">
        <div className="flex flex-col w-full">
          <p className="ms-3 font-title text-gray-card mt-2 text-base text-start">
            {detailsProject.tag.name}
          </p>
          <h2 className="w-full text-3xl font-bold font-title text-secondary-color  text-start border-s-4 border-highlight-color ps-2 my-2">
            {detailsProject.name}
          </h2>
          <p className="ms-3 font-title text-gray-card mb-2 text-base">
            Creado: {format(new Date(detailsProject.createdAt), "dd/MM/yyyy")}
          </p>
        </div>
        <img className="w-24 object-cover" src={banner} alt="banner" />
      </div>
      <div className="flex justify-between mt-10">
        <div className="w-3/5 bg-secondary-color p-4 rounded-xl">
          {/* <img className="w-full h-32 mb-2 object-cover rounded-xl" src={imgCard} alt="card" /> */}
          <h2 className="font-title text-primary-color text-2xl text-start font-bold mb-4">
            Descripción
          </h2>
          <p>{detailsProject.description}</p>
          <h2 className="font-title text-primary-color text-2xl text-start font-bold my-4">
            Requerimientos
          </h2>
          <div>
            {detailsProject.stacks.length > 0
              ? detailsProject.stacks?.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <svg
                      className="w-6 h-6 fill-check mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
                    </svg>
                    <p>{item.name}</p>
                  </div>
                ))
              : null}
          </div>
        </div>
        {viewType === "edition" ? (
          <FormSearchRol />
        ) : viewType === "request" ? (
          <FormRequest roles={detailsProject.positions} idProject={idProject} request={detailsProject.joinRequests.some(request => request.user === user.email )         } />
        ) : (
          <div className="w-1/3 bg-secondary-color p-4 rounded-xl h-48">
            <h2 className="font-title text-highlight-color text-2xl text-center font-bold mb-4">
              Canal de Comunicación
            </h2>
            <div className="flex flex-col justify-center items-center">
              <p className="mb-2 w-full">
                Para contactar al dueño del proyecto y a sus colaboradores:
              </p>
              <Link
                to={detailsProject.channel}
                className="bg-highlight-color w-1/2 p-2 rounded-lg flex justify-center mt-2"
              >
                <p className="text-secondary-color font-bold italic text-center">
                  Ingresa aqui
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="">
        <h2 className="w-full text-3xl font-bold font-title text-secondary-color  text-start border-s-4 border-highlight-color ps-2  mt-10 mb-6">
          {viewType === "collaborator"
            ? "Colaboradores"
            : viewType === "edition"
            ? "Estas Buscando"
            : "Estamos Buscando"}
        </h2>
        <div className="flex flex-wrap">
          {viewType === "collaborator" ? (
            detailsProject.collaborators.map((item) => {
              item.proyectoRole != "OWNER" && item.userId != user.id ? (
                <div
                  key={item.userId}
                  className="w-1/3 bg-primary-color rounded-xl p-2"
                >
                  <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
                    <h2 className="font-body font-bold text-lg text-highlight-color mb-2">
                      {item.proyectoRole}
                    </h2>
                    <p className="font-body text-sm">{item.userName}</p>
                  </div>
                </div>
              ) : (
                <p className="text-secondary-color ms-2">
                  Este proyecto no tiene otros colaboradores en este momento
                </p>
              );
            })
          ) : // aqui debo poner la informacion de las positions
          detailsProject.positions?.length > 0 ? (
            detailsProject.positions?.map((role) => (
              <div key={`role${role.id}`} className="w-1/3 bg-primary-color rounded-xl p-2">
                <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
                  <h2 className="font-body font-bold text-lg text-highlight-color mb-2">
                    {role.proyectoRole}({role.quantity})
                  </h2>
                  <p className="font-body text-sm">
                    {role.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-secondary-color ms-2">
              {viewType === "edition"
                ? "No tienes roles a buscar en este momento"
                : "No estamos buscando colaboradores en este momento"}
            </p>
          )}
        </div>
      </div>
      {viewType === "edition" ? (
        <div className="">
          <h2 className="w-full text-3xl font-bold font-title text-secondary-color  text-start border-s-4 border-highlight-color ps-2  mt-10 mb-6">
            Colaboradores
          </h2>
          <div className="flex flex-wrap">
            {detailsProject.collaborators.map((colaborator) => (
              
              colaborator.proyectoRole != "OWNER" && colaborator.userId != user.id ? (
                <div
                  key={`collaborator-${colaborator.userId}`}
                  className="w-1/3 bg-primary-color rounded-xl p-2"
                >
                  <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
                    <h2 className="font-body font-bold text-lg text-highlight-color mb-2">
                      {colaborator.proyectoRole}
                    </h2>
                    <p className="font-body text-sm">{colaborator.userName}</p>
                  </div>
                </div>
              ) : (
                <p className="text-secondary-color ms-2">
                  Aun no tienes colaboradores en este proyecto
                </p>
              )
            ))}
          </div>
        </div>
      ) : null}
    </div>
  ) : (
    <Charging />
  );
};

export default Details;
