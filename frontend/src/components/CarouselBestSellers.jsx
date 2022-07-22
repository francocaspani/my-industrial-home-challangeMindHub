import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import {Pagination, Navigation } from "swiper";
import "../styles/carouselBestSellers.css";

export default function CarouselBestSellers({ product }) {
    return (
        <div className="containerCarouselBestSellers">
            <Swiper
                spaceBetween={20}
                centeredSlides={true}
                // autoplay={{
                //     delay: 6000,
                //     disableOnInteraction: false,
                // }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="containerSwiperBestSellers"
            >
                {product.extraImg.map(eachproduct =>
                    <SwiperSlide className='imageproductBestSellers' key={eachproduct._id} >
                        <div className="productNameBestSellers">
                            <img src={eachproduct} alt={eachproduct.name} />
                            <p>{eachproduct.name}</p>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
}
