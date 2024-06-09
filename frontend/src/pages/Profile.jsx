import React, { useState } from "react";
import CardsCarousel from "../components/CardsCarousel";
import FormCreateProject from "../components/FormCreateProject";
import { useDispatch, useSelector } from "react-redux";
import { showFormProjects } from "../redux/projects/projectSlice";

const Profile = () => {
  const projects = [1, 2, 3, 4, 5];
  const request = [11,22];
  const stacks = [
    {
      id: "1A23C",
      name: "React",
      color: "#4C8DFF",
    },
    {
      id: "9A2E7",
      name: "Spring",
      color: "#6CB23E",
    },
  ];
  const dispatch = useDispatch();
  // const {projects, showForm } = useSelector(
  //   (store) => store.projects
  // );
  const {showForm } = useSelector(
    (store) => store.projects
  );
  console.log(projects)
  console.log(projects.length)
  const handler = () => {
    console.log("click cancel");
  };

  return (
    <div className="mt-12">
      <div className="">
        <div className="flex justify-between items-center">
          <h2 className="w-full text-3xl font-bold font-title text-secondary-color  text-start border-s-4 border-highlight-color ps-2 my-6">
            Tus Proyectos
          </h2>
          <button
            onClick={()=> dispatch(showFormProjects(true))}
           className="bg-highlight-color rounded-full w-10 h-10 p-1.5 ">
            <svg
              className="fill-secondary-color"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
            </svg>
          </button>
        </div>
        {projects?.length > 0 ? (
          projects?.map((item) => (
            <div
              key={item}
              className="w-full bg-primary-color p-2 flex justify-between"
            >
              <div className="w-2/5 bg-primary-color rounded-xl p-2">
                <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <h2 className="font-body font-bold text-xl text-primary-color">
                      Dexametasona Product{" "}
                    </h2>
                    <div className="flex">
                      <svg
                        className="w-6 h-6 fill-highlight-color "
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="m7 17.013 4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z"></path>
                        <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z"></path>
                      </svg>
                      <svg
                        className="w-6 h-6 fill-highlight-color"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                        <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="font-title text-gray-card my-2 text-base">
                    Creado: 17/08/2024
                  </p>
                  <p>
                    Consectetur adipisicing esse commodo mollit laboris culpa et
                    officia quis dolore velit duis ut ullamco{" "}
                  </p>
                  <div className="flex flex-row justify-between my-6">
                    <div className="flex gap-2">
                      {stacks.length > 0
                        ? stacks?.map((item) => (
                            <div key={item.id} className="flex items-center">
                              <div
                                className={`w-2 h-2 mx-2 rounded-full`}
                                style={{
                                  backgroundColor: item.color,
                                  borderColor: item.color,
                                }}
                              ></div>
                              <p>{item.name}</p>
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
                  <div className="flex justify-between mb-2 pb-1 h-36 overflow-y-auto">
                    <div className="flex flex-col gap-2">
                      {request.length > 0
                        ? request?.map((item) => (
                            <div
                              key={item}
                              className="w-full flex items-start shadow-lg p-2 m-1rounded-xl mb-4"
                            >
                              <div className="w-1/4 ">
                                <h4 className="font-title font-bold">
                                  Frontend
                                </h4>
                                <p className="font-title text-gray-card my-2 text-base">
                                  Elizabeth Taylor
                                </p>
                                <div className="flex gap-3 ms-2 mb-2">
                                  <button className="bg-highlight-color w-8 h-8 p-1 rounded-full fill-secondary-color">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
                                    </svg>
                                  </button>
                                  <button className="bg-highlight-color w-8 h-8 p-1 rounded-full fill-secondary-color">
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
                              <div className="w-3/4">
                                <p className="font-body text-sm text-truncate">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Incidunt, nesciunt aut!
                                  Alias deserunt consequatur quod quaerat at
                                  eaque dicta? Eum voluptatem reprehenderit
                                  asperiores, in laborum quia magni doloribus
                                  accusamus ut? Itaque nostrum dolorum nemo
                                  explicabo in eius rerum voluptatum, doloribus
                                  et rem ratione maiores debitis amet
                                  praesentium esse obcaecati. Aperiam odit
                                  voluptatum facilis beatae consequuntur, quis
                                  perferendis necessitatibus porro excepturi.
                                </p>
                              </div>
                            </div>
                          ))
                        : null}
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
        {projects?.length > 0 ? (
          <CardsCarousel
            projects={projects}
            stacks={stacks ?? null}
            cancel={true}
            handler={handler}
          />
        ) : (
          <p className="text-secondary-color ms-2">
            No tienes solicitudes en este momento
          </p>
        )}
      </div>
      {showForm ? (
      <span
        className=" fixed top-0 right-0 flex justify-center items-center bg-modal w-screen h-screen"
      >
        <FormCreateProject/>
      </span>
    ) : null}
    </div>
  );
};

export default Profile;
