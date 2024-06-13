import React, { useEffect, useState } from "react";
import CardsCarousel from "../components/CardsCarousel";
import FormCreateProject from "../components/FormCreateProject";
import { useDispatch, useSelector } from "react-redux";
import { showFormProjects } from "../redux/projects/projectSlice";
import {
  actionGetRequestUser,
  actionGetUserProject,
} from "../redux/projects/projectsActions";
import CarouselRequest from "../components/CarouselRequest";
import Swal from "sweetalert2";
import { actionCancelRequest } from "../redux/request/requestsActions";
import Charging from "../components/Charging";
import {
  requestsFail,
  resetSuccessRequests,
} from "../redux/request/requestsSlice";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { userProjects, showForm } = useSelector((store) => store.projects);
  const { user, isAuth } = useSelector((store) => store.userAuth);

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(actionGetUserProject(user.email, isAuth));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(actionGetRequestUser(isAuth));
  // }, [dispatch]);


  const handlerDeleteProject = () => {
    console.log("click borrar proyecto");
  };

  return (
    <div className="mt-12">
      <div className="">
        <div className="flex justify-between items-center">
          <h2 className="w-full text-3xl font-bold font-title text-secondary-color  text-start border-s-4 border-highlight-color ps-2 my-6">
            Tus Proyectos
          </h2>
          <button
            onClick={() => dispatch(showFormProjects(true))}
            className="bg-highlight-color rounded-full w-10 h-10 p-1.5 "
          >
            <svg
              className="fill-secondary-color"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
          </button>
        </div>
        {userProjects?.length > 0 ? (
          userProjects?.map((item) => (
            <div
              key={`myProjects${item.id}`}
              className="w-full bg-primary-color p-2 flex justify-between"
            >
              <div className="w-2/5 bg-primary-color rounded-xl p-2">
                <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <button onClick={()=>navigate(`/details/${item.id}`)} className="font-body font-bold text-xl text-primary-color">
                      {item.name}
                    </button>
                    <div className="ms-2 flex">
                      <button className="bg-transparent w-8 h-8 hover:opacity-60">
                        <svg
                          className="w-6 h-6 fill-highlight-color "
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path>
                          <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => handlerDeleteProject()}
                        className="bg-transparent w-8 h-8 hover:opacity-60"
                      >
                        <svg
                          className="w-6 h-6 fill-highlight-color"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                          <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="font-title text-gray-card my-2 text-base">
                    {item.status}
                  </p>
                  <p className="font-body truncate">{item.description}</p>
                  <div className="flex flex-row justify-between my-4 overflow-hidden">
                    <div className="flex gap-2">
                      {item.stacks.length > 0
                        ? item.stacks?.map((stack) => (
                            <div
                              key={`stack-${stack.id}`}
                              className="flex items-center"
                            >
                              <div
                                className={`w-2 h-2 mx-2 rounded-full`}
                                style={{
                                  backgroundColor: stack.color,
                                  borderColor: stack.color,
                                }}
                              ></div>
                              <p>{stack.name}</p>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-3/5 bg-primary-color rounded-xl p-2">
                <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
                  <h2 className="font-body font-bold text-xl text-primary-color">
                    Solicitudes
                  </h2>
                  <div
                    className={`w-full flex justify-between mb-2 pb-1 ${
                      item.joinRequests?.length > 0 ? "h-36" : "h-10"
                    } overflow-y-auto `}
                  >
                    <div className="w-full flex flex-col gap-2 my-1">
                      {item.joinRequests?.length > 0 ? (
                        item.joinRequests?.map((request) => (
                          <div
                            key={`request-${request.id}`}
                            className="w-[95%] flex items-center shadow-lg p-2 m-1 rounded-xl mb-4"
                          >
                            <div className="w-2/5 ">
                              <h4 className="font-title font-bold">
                                {request.proyectoRole}
                              </h4>
                              <p className="font-title text-gray-card my-2 text-base">
                                {request.user}
                              </p>
                              <div className="flex gap-3 ms-2 mb-2">
                                <button
                                  onClick={() => console.log("aceptar")}
                                  className="bg-highlight-color w-8 h-8 p-1 rounded-full fill-secondary-color"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
                                  </svg>
                                </button>
                                <button
                                  onClick={() => console.log("rechazar")}
                                  className="bg-highlight-color w-8 h-8 p-1 rounded-full fill-secondary-color"
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
                            </div>
                            <div className="w-3/5 ps-2">
                              <p className="font-body text-sm text-truncate">
                                {request.message}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-primary-color mt-3 ms-2">
                          No tienes solicitudes en este momento
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-secondary-color ms-2">
            No tienes Proyectos en este momento
          </p>
        )}
      </div>
      <div className="">
        <h2 className="w-full text-3xl font-bold font-title text-secondary-color  text-start border-s-4 border-highlight-color ps-2 my-6">
          Tus Solicitudes
        </h2>
        <CarouselRequest />
      </div>
      {showForm ? (
        <span className=" fixed top-0 right-0 flex justify-center items-center bg-modal w-screen h-screen">
          <FormCreateProject />
        </span>
      ) : null}
    </div>
  );
};

export default Profile;
