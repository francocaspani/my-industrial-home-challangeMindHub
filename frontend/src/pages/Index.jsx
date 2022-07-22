import React from 'react'
import CarouselRooms from "../components/CarouselRooms"
import CarouselNewCollection from "../components/CarouselNewCollection"
import BoxInformation from "../components/BoxInformation"
import CarouselBestSellers from "../components/CarouselBestSellers"
import { useDispatch, useSelector } from 'react-redux';
import "../App.css"

function Index() {
  const products = useSelector(store => store.productsReducer.products)
  const productsBestSellers = products.filter(produc => produc.extraImg.length > 0)
  console.log(productsBestSellers)

  return (
    <div className='containerIndex'>
        <img src='https://www.porcelanosa.com/trendbook/app/uploads/2019/03/venis-ferroker_aluminio_ferroker_loft_h.jpg' alt= "Hero" style={{width: '100%', objectFit: 'cover'}}/>
    <CarouselRooms/>
    <CarouselNewCollection/>
    <BoxInformation/>
    {productsBestSellers.map(product => {
      return(
        <CarouselBestSellers product={product}/>
      )
      
    })}
    
    </div>
  )
}

export default Index