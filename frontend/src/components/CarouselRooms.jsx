import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "../styles/carouselRooms.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import {useSelector} from "react-redux";
// import ambientActions from "../redux/actions/ambientActions";
import { Link as LinkRouter } from "react-router-dom";

export default function CarouselRooms() {
  const allAmbients= useSelector((store) => store.ambientsReducer.ambients)
  
  return (
    <div className="containerCarouselRooms">
     <div className="titleCaruselRooms">
      <p>Discover our Rooms</p>
      </div>
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {allAmbients.map(eachambient =>
        
          <SwiperSlide className='imageCarouselRoom' key={eachambient._id} style={{ backgroundImage: `url("${eachambient.img}")`, backgroundSize: "cover" }}>
             <LinkRouter to= "/spaces" innerRef={eachambient._id}  >
            <div className="carouselRoomName">
              <p>{eachambient.name}</p>
            </div>
            </LinkRouter>
          </SwiperSlide>

        )}
      </Swiper>
    </div>
  );
}
