import { Typography } from "@mui/material";
import React from "react";
import Carousel from 'react-grid-carousel'
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import '../styles/carouselProducts.css'

export default function CarouselProduct() {

    const products = useSelector((store) => store.productsReducer.products)


    return (
        <Carousel cols={3} rows={1} gap={10} loop autoplay={4000} mobileBreakpoint={200}>
            {products.map(productdetails =>
                <Carousel.Item key={productdetails._id}>
                    <Card className="carousel">
                    <img className="img-caro" alt={productdetails.name} height='300rem' width="100%" src={productdetails.img} />
                    <Typography>{productdetails.name}</Typography>
                    </Card>
                </Carousel.Item>
            )}
        </Carousel>

    );
}