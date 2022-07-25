import React from "react";
import { Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/carouselNewCollection.css";
import { Navigation } from "swiper";
import {useSelector } from 'react-redux';
import { Link as LinkRouter } from "react-router-dom";




export default function CarouselNewCollection() {
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
                        <LinkRouter  to={`/products/${eachproduct._id}`} >
                        <div className="containerProductImageName">
                            <img className="imageCarouselNewCollection"src= {eachproduct.img} alt={eachproduct.name}/>
                            <p>{eachproduct.name}</p>
                        </div>
                        </LinkRouter>
                    </SwiperSlide>
                 
                )}
           
            </Swiper>
        </div>
    )

}
