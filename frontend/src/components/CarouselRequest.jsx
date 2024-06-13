import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetRequestUser } from "../redux/projects/projectsActions";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { actionCancelRequest, actionFillRequestUser } from "../redux/request/requestsActions";
import Charging from "./Charging";
import { requestsFail, resetSuccessRequests } from "../redux/request/requestsSlice";
import Swal from "sweetalert2";

const CarouselRequest = () => {
  const { isAuth } = useSelector((store) => store.userAuth);
  const { requests,errorRequests, isLoadingRequests, isSuccessRequests} = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionFillRequestUser(isAuth));
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const handler = (id) => {
    Swal.fire({
      allowOutsideClick: false,
      title: "¿Esta por cancelar su solicitud?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(actionCancelRequest(id, isAuth));
      }
    });
  };
  if (isLoadingRequests)
    return (
      <Charging/>
    );

  if (errorRequests) {
    Swal.fire({
      position: "top-end",
      allowOutsideClick: false,
      title: "Error al cancelar solcitud",
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
      text: "Solicitud cancelada",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetSuccessRequests());
      }
    });
  }

  return requests?.length > 0 ? (
    <div className="slider-container">
      {requests?.length > 1 ? (
        <Slider {...settings} className="flex gap-3">
          {requests.map((item) => (
            <div
              key={`${item.id}`}
              className="w-[30%] bg-primary-color rounded-xl p-2"
            >
              <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
                <div className="h-14 overflow-hidden flex items-center">
                  <h2 className="font-body font-bold text-xl text-primary-color">
                    {item.proyectoTarget}
                  </h2>
                </div>
                <p className="font-title text-gray-card my-2 text-base">
                  Destinatario: {item.user}
                </p>
                <p className="font-body text-base h-12 line-clamp">
                  {item.message}
                </p>
                <p className="font-body my-2 text-base ">{item.proyectoRole}</p>
                <div>
                  <button
                    onClick={() => handler(item.id)}
                    className="font-semibold border-2 border-highlight-color px-4 py-1 rounded-xl text-highlight-color hover:bg-highlight-color hover:text-secondary-color"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        requests.map((item) => (
          <div
            key={`${item.id}`}
            className="w-[35%] bg-primary-color rounded-xl p-2"
          >
            <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
              <div className="h-14 overflow-hidden flex items-center">
                <h2 className="font-body font-bold text-xl text-primary-color">
                  {item.proyectoTarget}
                </h2>
              </div>
              <p className="font-title text-gray-card my-2 text-base">
                Destinatario: {item.user}
              </p>
              <p className="font-body text-base h-12 line-clamp">
                {item.message}
              </p>
              <p className="font-body my-4 text-base ">
                Aplico al rol: {item.proyectoRole}
              </p>

              <div>
                <button
                  onClick={handler}
                  className="font-semibold border-2 border-highlight-color px-4 py-1 rounded-xl text-highlight-color hover:bg-highlight-color hover:text-secondary-color"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  ) : (
    <p className="text-secondary-color ms-2">
      No has realizado solicitudes a proyectos
    </p>
  );
};

export default CarouselRequest;
