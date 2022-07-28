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
                slidesPerView={11}
                spaceBetween={25}
                slidesPerGroup={11}
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
                 
                    <SwiperSlide className='containerimageproduct' key={eachproduct._id}>
                        <LinkRouter className="no-link imageproduct" to={`/products/${eachproduct._id}`}>
                        {/* <div className="containerProductImageName"> */}
                            <img className="imageproduct"src= {eachproduct.img} alt={eachproduct.name}/>
                           <div className="name_product_carouselNewC">
                            <p style={{marginBottom: '0px'}}>{eachproduct.name}</p>
                            </div>
                        {/* </div> */}
                        </LinkRouter>
                    </SwiperSlide>
                 
                )}
           
            </Swiper>
        </div>
    )

}
