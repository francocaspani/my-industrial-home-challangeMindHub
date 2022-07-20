import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

import "../styles/carouselRooms.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import {useSelector} from "react-redux";
// import ambientActions from "../redux/actions/ambientActions";

export default function CarouselRooms() {
  const ambient= useSelector((store) => store.ambientsReducer.ambients)
  console.log(ambient)

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 600,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {ambient.map(eachambient =>
          <SwiperSlide key={eachambient.id} style={{ backgroundImage: `url("${eachambient.img}")`, backgroundSize: "cover" }}>
            <div>
              <p>{eachambient.name}</p>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
}
