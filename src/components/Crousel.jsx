import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import data from "../data/data.json";

const Crousel = () => {
  return (
    <div className="w-full flex justify-center items-center mt-20">
      <div className="w-[800px]">
        <Swiper
          spaceBetween={30}
          speed={800}
          slidesPerView={1}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          modules={[Autoplay, EffectFade]}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>

              <div className="relative w-full h-[300px]">

                <img
                  src={item.image}
                  alt={item.heading}
                  className="w-full h-full object-cover rounded-xl"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-start px-10 bg-black/40 text-white rounded-xl">

                  <h1 className="text-2xl md:text-4xl font-bold mb-2">
                    {item.heading}
                  </h1>

                  <p className="max-w-md text-sm md:text-base">
                    {item.description}
                  </p>

                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>
  );
};

export default Crousel;