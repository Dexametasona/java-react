import React, { useEffect, useRef, useState } from "react";
import banner from "../assets/Banner.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { showLogin } from "../redux/userAuth/userAuthSlice";
import CardsCarousel from "../components/CardsCarousel";
import { actionGetFilteredProjects, actionGetProjects } from "../redux/projects/projectsActions";

const Dashboard = () => {
  const [filterSelected, setFilterSelected] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.userAuth);
  const { projects } = useSelector((store) => store.projects);
  const [currentPage, setCurrentPage] = useState(0);
  
  const pageSize = 9;
  const totalPages = projects?.totalPages ??  Math.ceil((projects?.length || 0) / pageSize) ;
  
  useEffect(() => {
    switch (filterSelected) {
      case "all":
        dispatch(actionGetProjects(currentPage, pageSize));
        break;
      case "front":
        dispatch(actionGetFilteredProjects("FRONTEND"));
        break;
      case "back":
        dispatch(actionGetFilteredProjects("BACKEND"));
        break;
      case "devops":
        dispatch(actionGetFilteredProjects("DEVOPS"));
        break;
      default:
        dispatch(actionGetProjects(currentPage, pageSize));
        break;
    }
  }, [currentPage,filterSelected, dispatch]);

  const handleApply = (idProject) => {
    user
      ? navigate(`/details/${idProject}`)
      : Swal.fire({
          allowOutsideClick: false,
          title: `Debe iniciar sesión para continuar`,
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(showLogin(true));
          }
        });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const firstCardRef = useRef(null);
  useEffect(() => {
    if (firstCardRef.current) {
      firstCardRef.current.focus();
    }
  }, [projects]);


  return (
    <section className="w-full">
      {/* <figure className="mt-4 relative hover:bg-[#05050550]"> */}
      <figure className="mt-4 relative">
        <img className="w-full object-cover" src={banner} alt="banner" />
        <figcaption className="absolute inset-0 flex flex-col justify-center items-center w-full h-full top-0">
          <h1 className="font-bold font-title text-secondary-color md:text-4xl text-xl">
            Encuentra tu proyecto perfecto
          </h1>
          <p className="text-secondary-color mt-2">
            Para crecer tu perfil profesional
          </p>
        </figcaption>
      </figure>
      <div className="w-full flex justify-center items-center">
        <ul className="my-6 w-4/5 flex justify-center">
          <button
            onClick={() => setFilterSelected("all")}
            className={`px-8 py-2 mx-4 text-secondary-color font-semibold font-body text-sm md:text-base ${
              filterSelected == "all"
                ? "bg-highlight-color rounded-full"
                : "bg-transparent"
            }`}
          >
            <p
              className={` ${filterSelected != "all" ? "pr-4 border-r-2" : ""}`}
            >
              All
            </p>
          </button>
          <button
            onClick={() => setFilterSelected("front")}
            className={`px-8 py-2 mx-4 text-secondary-color font-semibold font-body text-base md:text-base  ${
              filterSelected == "front"
                ? "bg-highlight-color rounded-full"
                : "bg-transparent"
            }`}
          >
            <p
              className={` ${
                filterSelected != "front" ? "pr-4 border-r-2" : ""
              }`}
            >
              Frontend
            </p>
          </button>
          <button
            onClick={() => setFilterSelected("back")}
            className={`px-8 py-2 mx-4 text-secondary-color font-semibold font-body text-base md:text-base  ${
              filterSelected == "back"
                ? "bg-highlight-color rounded-full"
                : "bg-transparent"
            }`}
          >
            <p
              className={` ${
                filterSelected != "back" ? "pr-4 border-r-2" : ""
              }`}
            >
              Backend
            </p>
          </button>
          <button
            onClick={() => setFilterSelected("devops")}
            className={`px-8 py-2 mx-4 text-secondary-color font-semibold font-body text-base md:text-base  ${
              filterSelected == "devops"
                ? "bg-highlight-color rounded-full"
                : "bg-transparent"
            }`}
          >
            <p
              className={` ${
                filterSelected != "devops" ? "pr-4 " : ""
              }`}
            >
              DevOps
            </p>
          </button>
        </ul>
      </div>
      <div className="flex flex-wrap gap-3 my-8">
        {projects.content?.length > 0 
          ? projects.content?.map((item, index) => (
              <div
                ref={index === 0 ? firstCardRef : null}
                tabIndex={index === 0 ? -1 : null}
                key={item.id}
                className="w-[32%] bg-primary-color rounded-xl mb-2 focus:outline-none focus:border-transparent"
              >
                <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
                  <div className="h-14 overflow-hidden flex items-center">
                    <h2 className="font-body font-bold text-xl text-primary-color">
                      {item.name}
                    </h2>
                  </div>
                  <p className="font-title text-gray-card pt-1 mb-2 text-base italic truncate">
                    Owner: {item.owner}
                  </p>

                  <p className="font-body text-base h-12 line-clamp">{item.description}</p>
                  <div className="flex flex-row justify-between my-4 h-8 overflow-hidden hover:overflow-y-auto hover:opacity-60">
                    <div className="flex flex-wrap gap-2">
                      {item.stacks.length > 0
                        ? item.stacks?.map((item) => (
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
                  <div className="flex justify-between">
                    <p className="font-body italic text-end text-highlight-color text-sm opacity-80">
                      {item.status}
                    </p>
                    <button
                      onClick={() => handleApply(item.id)}
                      className="animate__animated animate__shakeX animate__slow animate__delay-2s font-semibold border-2 border-highlight-color px-4 py-1 rounded-xl text-highlight-color hover:bg-highlight-color hover:text-secondary-color"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
                <h4 className="m-2 text-secondary-color font-body font-bold">
                  {item.tag.name}
                </h4>
              </div>
            ))
          : <p className="text-secondary-color ms-2 mb-4 font-semibold">No hay proyectos disponibles</p> }
      </div>
      {projects.content?.length > 0 ?
      <nav className="flex justify-center my-6">
        <ul className="flex flex-row items-center">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`p-4 bg-transparent hover:bg-highlight-color rounded-full ${
                currentPage === 0 ? "hidden" : "flex"
              } `}
            >
              <svg
                className="w-3 h-3 rtl:rotate-180 stroke-secondary-color"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index)}
                className={`px-4 py-2 rounded-full ${
                  index === currentPage
                    ? "bg-highlight-color"
                    : "bg-transparent hover:bg-highlight-color"
                }`}
              >
                <p className="font-bold text-secondary-color ">{index + 1}</p>
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`p-4 bg-transparent hover:bg-highlight-color rounded-full ${
                currentPage === totalPages - 1 ? "hidden" : "flex"
              }`}
            >
              <svg
                className="w-3 h-3 rtl:rotate-180 stroke-secondary-color"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav> : null}
      <div className="">
        <h2 className="w-full text-3xl font-bold font-title text-secondary-color  text-start border-s-4 border-highlight-color ps-2 my-6">
          Populares
        </h2>
        <CardsCarousel handler={handleApply} />
      </div>
    </section>
  );
};

export default Dashboard;
