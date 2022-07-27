import React from "react";
import { Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/carouselProducts.css";
import { Navigation } from "swiper";
import {useSelector } from 'react-redux';
import { Link as LinkRouter } from "react-router-dom";


export default function CarouselProduct() {

    const products = useSelector((store) => store.productsReducer.products)

    return (
        // <Carousel loop mobileBreakpoint={200} className='car-wrap'>
        //     {products.map(productdetails =>
        //         <Carousel.Item key={productdetails._id}>
        //             <Box className="carousel">
        //             <img className="img-caro" alt={productdetails.name} height='200rem' width="100%" src={productdetails.img} />
        //             <div className="line"></div>
        //             <p className="price-car">${productdetails.price} USD</p>
        //             <div className="box-car">
        //                 <p className="detail-car">{productdetails.detail}</p>
        //                 <Typography>{productdetails.name}</Typography>
        //             </div>
        //             </Box>
        //         </Carousel.Item>
        //     )}
        // </Carousel>

            <Swiper
            slidesPerView={7}
            spaceBetween={25}
            slidesPerGroup={7}
            loop={true}
            loopFillGroupWithBlank={true}
            // pagination={{
            //     clickable: true,
            // }}
            navigation={true}
            modules={[Navigation]}
            className="containerSwiperNewCollection"
            >
            {products.map(productdetails =>
            
                <SwiperSlide className='carousel' key={productdetails._id}>
                     <div key={productdetails._id}>
                    <LinkRouter className="no-link" to={`/products/${productdetails._id}`} >
                        <img className="img-caro" alt={productdetails.name} src={productdetails.img} />
                    </LinkRouter>
                        <div className="line"></div>
                        <p className="price-car">${productdetails.price} USD</p>
                        <div className="box-car">
                            <p className="detail-car">{productdetails.detail}</p>
                            <p>{productdetails.name}</p>
                        </div>
                    </div>
                </SwiperSlide>
            
            )}

            </Swiper>

    );
}