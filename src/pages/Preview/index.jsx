import React from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./Preview.module.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Nav from "../../components/Nav";

const images = [
  "/images/viewers-marvel.png",
  "/images/viewers-national.png",
  "/images/viewers-starwars.png",
];

const Preview = () => {
  return (
    <div className={styles.container}>
      <Nav />
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        <div>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img alt="item" className={styles.item} src={image} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Preview;
