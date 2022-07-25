import React, { useRef } from 'react'
import Room from '../components/Room'
import { useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';
import "../styles/Rooms.css";

export default function Rooms() {
    const allRooms = useSelector((store) => store.ambientsReducer.ambients)
    // const scroll= ()=> window.scrollTo({behavior:'smooth', top: roomRef.current.offsetTop})
    // allRooms.map(eachRoom=> 
    //     const eachRoom._id= useRef()
    //     )
    return (
        <div className="containerAllRooms">
            <div className="containerTitleRooms">
                <p>Home and Room Decor</p>
            </div>
            <div className='general_description'>
                <p>Its industrial aura and open concept are its greatest attractions. 
                   If we add a functional deco and the perfect interior design to each space,
                   we find these lofts, which are ideal houses. What do you think of our selection?
                </p>
            </div>
            <div>
                {allRooms.map(eachRoom =>
                    <Room eachRoom={eachRoom} key={eachRoom._id} />)}
            </div>
        </div>
    )
}
