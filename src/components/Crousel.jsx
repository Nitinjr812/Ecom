import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";

import { Autoplay, EffectFade } from "swiper/modules";

import data from "../data/data.json";

const Crousel = () => {
  return (
    <div className="w-full  h-fit  mt-20  ">
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
            <div className="main w-full h-100  items-center   flex justify-center">
              <img
                src={item.image}
                alt={item.heading}
                className="w-fit h-fit  object-cover"
              />
              <div className="content absolute top-50  right-170 wrap ">
                <h1>{item.heading}</h1>
                <p>{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Crousel;