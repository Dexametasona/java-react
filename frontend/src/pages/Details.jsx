import React from "react";
import banner from "../assets/imgDetails.svg";
import imgCard from "../assets/imgCard.jpeg";
import FormRequest from "../components/FormRequest";
import CardsCarousel from "../components/CardsCarousel";
import FormSearchRol from "../components/FormSearchRol";
const Details = () => {
  //solicitud -> si el id del dueño del proyecto es diferente del userAuth y no hace parte de colaboradore
  //infoProyecto -> si el id del dueño del proyecto es diferente del userAuth y hace parte de colaboradore
  //Edicion -> si el id del dueño del proyecto es igual al userAuth

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

  const roles = [1,2]

  return (
    <div className="mt-12">
      <div className="mt-4 flex flex-row">
        <div className="flex flex-col w-full">
          <p className="ms-3 font-title text-gray-card mt-2 text-base text-start">
            Porfolio
          </p>
          <h2 className="w-full text-3xl font-bold font-title text-secondary-color  text-start border-s-4 border-highlight-color ps-2 my-2">
            Productos Gran hermano
          </h2>
          <p className="ms-3 font-title text-gray-card mb-2 text-base">
            Creado: 17/08/2024
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
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
            delectus autem repudiandae tenetur corrupti amet architecto dolorem
            soluta adipisci perspiciatis possimus, vel blanditiis excepturi est
            cupiditate quos explicabo veniam obcaecati.
          </p>
          <h2 className="font-title text-primary-color text-2xl text-start font-bold my-4">
            Requerimientos
          </h2>
          <div>
            {stacks.length > 0
              ? stacks?.map((item) => (
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
        {/* <FormRequest /> */}
        <FormSearchRol/>
      </div>
      <div className="">
        <h2 className="w-full text-3xl font-bold font-title text-secondary-color  text-start border-s-4 border-highlight-color ps-2  mt-10 mb-6">
          Estamos buscando
        </h2>
        <div className="flex flex-wrap">
        {roles?.length > 0 ? roles?.map((item) => (
              <div
                key={item}
                className="w-1/3 bg-primary-color rounded-xl p-2"
              >
                <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
                  <h2 className="font-body font-bold text-lg text-highlight-color mb-2">
                    Frontend developer (2)
                  </h2>            
                  <p className="font-body text-sm">
                    Consectetur adipisicing esse commodo mollit laboris culpa et
                    officia quis dolore velit duis ut ullamco
                  </p>
                </div>

              </div>
            )) : (
          <p className="text-secondary-color ms-2">
            No tienes roles a buscar en este momento
          </p>
        )}
        </div>
      </div>
    </div>
  );
};

export default Details;
