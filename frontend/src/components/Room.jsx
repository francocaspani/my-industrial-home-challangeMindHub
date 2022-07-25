import React from "react";
import "../styles/Rooms.css";
import { Link as LinkRouter } from "react-router-dom";

export default function Room({ eachRoom }) {

    return (
        <div className="container_room">
            <div>
                <p className="roomName">{eachRoom.name}</p>
            </div>
            <div className="containerRoomProducts">
                <div className="image-wrapper">
                    {eachRoom.idProduct.map(item => (
                        <div key={item._id} className="pin-wrapper" style={{ left: `${item.left}%`, bottom: `${item.bottom}%` }}>
                            <div className="pin">
                                <div className="cardRoom">
                                    <img src={item.img} alt={item.name} className='card-image' />
                                    <div>
                                        <div className="card-title">{item.name}</div>
                                        <LinkRouter to={`/spaces/${item._id}`}><button className="card-button">Know more</button></LinkRouter>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <img className="main-image" src={eachRoom.img} alt={eachRoom.name} />
                </div>
            </div>

            <div className="descriptionRoom">
                <p>{eachRoom.description}</p>
            </div>
        </div>











    )
}




