import React from 'react'
import CarouselRooms from "../components/CarouselRooms"
import CarouselNewCollection from "../components/CarouselNewCollection.jsx"
import BoxInformation from "../components/BoxInformation"
import CarouselBestSellers from "../components/CarouselBestSellers"
import { useSelector } from "react-redux";
import "../styles/carouselBestSellers.css";
import "../App.css";
import "../styles/carouselNewCollection.css";
import CarouselProduct from "../components/CarouselProduct.jsx"


function Index() {
  const products = useSelector((store) => store.productsReducer.products)
  const productsBestSellers = products.filter(eachProduct => eachProduct.extraImg.length > 0)
  // console.log(productsBestSellers)
  return (
    <div className='containerIndex'>
      <img src='https://www.porcelanosa.com/trendbook/app/uploads/2019/03/venis-ferroker_aluminio_ferroker_loft_h.jpg' alt="Hero" style={{ width: '100%', objectFit: 'cover' }} />
      <CarouselRooms />
      {/* <CarouselProduct/> */}
      <CarouselNewCollection/>
      <BoxInformation />
      <div className="titleCaruselBestSellers">
        <p>Best Sellers</p>
      </div>
      <div className='containerIndexcarouselBestSellers'>
        {productsBestSellers.map((product, index) => {
          return (
            <CarouselBestSellers product={product} key={index} />
          )
        })}
      </div>

    </div>
  )
}

export default Index