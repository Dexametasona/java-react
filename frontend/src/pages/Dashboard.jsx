import React, { useState } from "react";
import banner from "../assets/Banner.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { showLogin } from "../redux/userAuth/userAuthSlice";
import CardsCarousel from "../components/CardsCarousel";

const Dashboard = () => {
  const [filterSelected, setFilterSelected] = useState("all");
  const projects = [1, 2, 3, 4, 5, 6, 7, 8];
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

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (store) => store.userAuth
  );

  const handleApply = () =>{
    user ? navigate(`/details`) : 
    Swal.fire({
      allowOutsideClick: false,
      title: `Debe iniciar sesión para continuar`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(showLogin(true))
      }
    });
  }

  return (
    <section className="w-full">
      <figure className="mt-4 relative hover:bg-[#05050550]">
        <img className="w-full object-cover" src={banner} alt="banner" />
        <figcaption className="absolute inset-0 flex flex-col justify-center items-center w-full h-full top-0">
          <h1 className="font-bold font-title text-secondary-color md:text-4xl text-xl">
            Pick the Template You Love
          </h1>
          <p className="text-secondary-color mt-2">
            Encuentra tu proyecto perfecto
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
            onClick={() => setFilterSelected("full")}
            className={`px-8 py-2 mx-4 text-secondary-color font-semibold font-body text-base md:text-base  ${
              filterSelected == "full"
                ? "bg-highlight-color rounded-full"
                : "bg-transparent"
            }`}
          >
            {" "}
            <p
              className={` ${
                filterSelected != "full" ? "pr-4 border-r-2" : ""
              }`}
            >
              Fullstack
            </p>
          </button>
        </ul>
      </div>
      <div className="flex flex-wrap gap-3 my-8">
        {projects.length > 0
          ? projects?.map((item) => (
              <div key={item} className="w-[32%] bg-primary-color rounded-xl">
                <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
                  <h2 className="font-body font-bold text-xl text-primary-color">
                    Dexametasona Product{" "}
                  </h2>
                  <p className="font-title text-gray-card my-2 text-base">
                    Owner: Jose Perez
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
                    <button
                    onClick={()=>handleApply()}
                     className="font-semibold border-2 border-highlight-color px-4 py-1 rounded-xl text-highlight-color hover:bg-highlight-color hover:text-secondary-color">
                      Apply
                    </button>
                  </div>
                </div>
                <h4 className="m-2 text-secondary-color font-body font-bold">
                  Landing Page
                </h4>
              </div>
            ))
          : null}
      </div>
      <nav className="flex justify-center my-6">
        <ul className="flex flex-row items-center">
          <li>
            <button className="p-4 bg-transparent hover:bg-highlight-color rounded-full">
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
          <li>
            <button className="px-4 py-2 bg-highlight-color rounded-full">
              <p className="font-bold text-secondary-color ">1</p>
            </button>
          </li>
          <li>
            <button className="px-4 py-2 bg-transparent hover:bg-highlight-color rounded-full">
              <p className="font-bold text-secondary-color ">2</p>
            </button>
          </li>
          <li>
            <button className="px-4 py-2 bg-transparent hover:bg-highlight-color rounded-full">
              <p className="font-bold text-secondary-color ">...</p>
            </button>
          </li>
          <li>
            <button className="px-4 py-2 bg-transparent hover:bg-highlight-color rounded-full">
              <p className="font-bold text-secondary-color ">10</p>
            </button>
          </li>
          <li>
            <button className="px-4 py-2 bg-transparent hover:bg-highlight-color rounded-full">
              <p className="font-bold text-secondary-color ">11</p>
            </button>
          </li>
          <li>
            <button className="p-4 bg-transparent hover:bg-highlight-color rounded-full">
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
      </nav>

      <div className="">
        <h2 className="w-full text-3xl font-bold font-title text-secondary-color  text-start border-s-4 border-highlight-color ps-2 my-6">
          Populares
        </h2>
        <CardsCarousel projects={projects??null} stacks={stacks ?? null} handler={handleApply}/>
      </div>
    </section>
  );
};

export default Dashboard;
