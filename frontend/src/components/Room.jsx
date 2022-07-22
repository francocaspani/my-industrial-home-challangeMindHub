import React from "react";
import "../styles/Rooms.css";

export default function Room({ eachRoom }) {
    console.log(eachRoom)
    return (
        <div className="containerRoom">
            <div className="descriptionRoom">
                <p>{eachRoom.description}</p>
            </div>
            <div className="imgEachRoom" style={{ backgroundImage: `url("${eachRoom.img}")`, backgroundSize: "cover" }} >
                <p className="roomName">{eachRoom.name}</p>
            </div>
            <div className="containerRoomProducts">
                    {eachRoom.idProduct.map(products =>
                        <div className="roomProducts"key={products._id} style={{ backgroundImage: `url("${products.img}")`, backgroundSize: "cover" }}>
                            <div>
                                <p>{products.name}</p>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}