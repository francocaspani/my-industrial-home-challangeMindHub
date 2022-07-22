import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useDispatch, useSelector } from 'react-redux';
import '../styles/bestSeller.css'


// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

export default function CarouselBestSellers({ product }) {

  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {product.extraImg.map(img => {
          return(
            <SwiperSlide>
            <img className="img2" src={img} alt="" />
          </SwiperSlide>
          )
          
        })}

      </Swiper>
    </div>
  );
}
