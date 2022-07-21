import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/carouselNewCollection.css";

// import required modules
import {Navigation} from "swiper";

import { useSelector } from "react-redux";

export default function App() {
    const product = useSelector((store) => store.productsReducer.products)
    return (
        <div className="containerCarouselNewCollection">
            <div className="titleCaruselNewCollection">
                <p>New Collection</p>
            </div>
            <Swiper
                slidesPerView={5}
                spaceBetween={25}
                slidesPerGroup={3}
                loop={true}
                loopFillGroupWithBlank={true}
                // pagination={{
                //     clickable: true,
                // }}
                navigation={true}
                modules={[Navigation]}
                className="containerSwiperNewCollection"
            >
                {product.map(eachproduct =>
                    <SwiperSlide className='imageproduct' key={eachproduct._id}>
                        <div className="productName">
                            <img src= {eachproduct.img} alt={eachproduct.name} />
                            <p>{eachproduct.name}</p>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
}
