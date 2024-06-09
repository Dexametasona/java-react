import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardsCarousel = ({ projects, stacks, cancel, handler}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div className="slider-container">
      <Slider {...settings} className="flex gap-3">
        {projects.length > 0
          ? projects?.map((item) => (
              <div
                key={item}
                className="w-[20%] bg-primary-color rounded-xl p-2"
              >
                <div className="w-full bg-secondary-color py-4 px-6 rounded-xl">
                  <h2 className="font-body font-bold text-xl text-primary-color">
                    Dexametasona Product
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
                    {cancel ? (
                      <button
                        onClick={handler}
                        className="font-semibold border-2 border-highlight-color px-4 py-1 rounded-xl text-highlight-color hover:bg-highlight-color hover:text-secondary-color"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        onClick={handler}
                        className="font-semibold border-2 border-highlight-color px-4 py-1 rounded-xl text-highlight-color hover:bg-highlight-color hover:text-secondary-color"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>
                <h4 className="m-2 text-secondary-color font-body font-bold">
                  Landing Page
                </h4>
              </div>
            ))
          : null}
      </Slider>
    </div>
  );
};

export default CardsCarousel;
