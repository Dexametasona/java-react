import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { actionGetPopularProjects } from "../redux/projects/projectsActions";

const CardsCarousel = ({ handler }) => {
  const { popular } = useSelector((store) => store.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionGetPopularProjects());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return popular?.length > 0 ? (
    <div className="slider-container">
      {popular?.length > 1 ? (
        <Slider {...settings} className="flex gap-3">
          {popular.map((item) => (
            <div
              key={item.id}
              className="w-[20%] bg-primary-color rounded-xl p-2"
            >
              <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
                <div className="h-14 overflow-hidden flex items-center">
                  <h2 className="font-body font-bold text-xl text-primary-color">
                    {item.name}
                  </h2>
                </div>
                <p className="font-title text-gray-card my-2 text-base">
                  Owner: {item.owner}
                </p>
                <p className="font-body text-base h-12 line-clamp">
                  {item.description}
                </p>
                <div className="h-10 flex flex-row justify-between my-6">
                  <div className="flex gap-2">
                    {item.stacks?.length > 0
                      ? item.stacks?.map((stack) => (
                          <div
                            key={`stack ${stack.id}`}
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
                <div>
                  <button
                    onClick={handler}
                    className="font-semibold border-2 border-highlight-color px-4 py-1 rounded-xl text-highlight-color hover:bg-highlight-color hover:text-secondary-color"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
              <h4 className="m-2 text-secondary-color font-body font-bold">
                {item.tag.name}
              </h4>
            </div>
          ))}
        </Slider>
      ) : (
        popular.map((item) => (
          <div
            key={item.id}
            className="w-[20%] bg-primary-color rounded-xl p-2"
          >
            <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
              <div className="h-14 overflow-hidden flex items-center">
                <h2 className="font-body font-bold text-xl text-primary-color">
                  {item.name}
                </h2>
              </div>
              <p className="font-title text-gray-card my-2 text-base">
                Owner: {item.owner}
              </p>
              <p className="font-body text-base h-12 line-clamp">
                {item.description}
              </p>
              <div className="h-10 flex flex-row justify-between my-6">
                <div className="flex gap-2">
                  {item.stacks?.length > 0
                    ? item.stacks?.map((stack) => (
                        <div
                          key={`stack ${stack.id}`}
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
              <div>
                <button
                  onClick={handler}
                  className="font-semibold border-2 border-highlight-color px-4 py-1 rounded-xl text-highlight-color hover:bg-highlight-color hover:text-secondary-color"
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
      )}
    </div>
  ) : (
    <p className="text-secondary-color ms-2">No hay proyectos populares</p>
  );
};

export default CardsCarousel;
