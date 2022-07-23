import React from 'react'
import Room from '../components/Room'
import { useSelector } from 'react-redux';
// import { useState, useEffect } from 'react';
import "../styles/Rooms.css";

export default function Rooms() {
    const allRooms = useSelector((store) => store.ambientsReducer.ambients)
    
    return (
        <div className="containerAllRooms">
            <div className="containerTitleRooms">
                <p>Home and Room Decor</p>
            </div>
            <div>
                {allRooms.map(eachRoom =>
                    <Room eachRoom={eachRoom} key={eachRoom._id} />)}
            </div>
        </div>
    )
}
