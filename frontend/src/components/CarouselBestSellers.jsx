import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link as LinkRouter } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import {Pagination, Navigation } from "swiper";
import "../styles/carouselBestSellers.css";


export default function CarouselBestSellers({product}) { 
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
                <div>
              
                    <SwiperSlide className='imageproductBestSellers'  key={product._id}>  
                        <div className="productNameBestSellers">
                            <LinkRouter  to={`/products/${product._id}`}  >
                            <img className="imageBestSellers" src={eachproduct} alt={product.name} />
                            </LinkRouter>
                            {/* <p>{product.name}</p> */}
                        </div>
                       
                    </SwiperSlide>
                
                </div>
                )}
            </Swiper>
        </div>
    );
}
