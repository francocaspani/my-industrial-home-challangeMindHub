import React from 'react'
import CarouselRooms from "../components/CarouselRooms"
import CarouselNewCollection from "../components/CarouselNewCollection"
import BoxInformation from "../components/BoxInformation"
import CarouselBestSellers from "../components/CarouselBestSellers"
import "../App.css"

function Index() {

  return (
    <div className='containerIndex'>
        <img src='https://www.porcelanosa.com/trendbook/app/uploads/2019/03/venis-ferroker_aluminio_ferroker_loft_h.jpg' alt= "Hero" style={{width: '100%', objectFit: 'cover'}}/>
    <CarouselRooms/>
    <CarouselNewCollection/>
    <BoxInformation/>
    {/* <CarouselBestSellers/> */}
    </div>
  )
}

export default Index