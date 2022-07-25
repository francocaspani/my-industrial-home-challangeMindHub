import { Typography } from "@mui/material";
import React from "react";
import Carousel from 'react-grid-carousel'
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import '../styles/carouselProducts.css'
import {Box}  from '@mui/material';

export default function CarouselProduct() {

    const products = useSelector((store) => store.productsReducer.products)


    return (
        <Carousel cols={3} rows={1} gap={10} loop autoplay={4000} mobileBreakpoint={200}>
            {products.map(productdetails =>
                <Carousel.Item key={productdetails._id}>
                    <Box className="carousel">
                    <img className="img-caro" alt={productdetails.name} height='200rem' width="100%" src={productdetails.img} />
                    <Typography>{productdetails.name}</Typography>
                    </Box>
                </Carousel.Item>
            )}
        </Carousel>

    );
}