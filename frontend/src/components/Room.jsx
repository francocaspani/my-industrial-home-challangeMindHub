import React, {useRef} from "react";
import "../styles/Rooms.css";
import { Link as LinkRouter } from "react-router-dom";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function Room({ eachRoom }) {
        
    
    const id= useRef(eachRoom._id)
    return (
        <div className="container_room">

            <div className="containerRoomProducts">
                <div className="image-wrapper">
               
                    {eachRoom.idProduct.map(item => (
                        <div key={item._id} className="pin-wrapper" style={{ left: `${item.left}%`, bottom: `${item.bottom}%` }}>
                            <div className="pin">
                                <div className="cardRoom">
                                    {/* <img src={item.img} alt={item.name} className='card-image' /> */}
                                    <div>
                                        <div className="card-title">
                                                <p>{item.name}</p>
                                                <p>${item.price}</p>
                                        </div >
                                        <LinkRouter className="details-icon" to={`/spaces/${item._id}`}>
                                            <p className="knowMore">Know More</p> 
                                            <KeyboardArrowRightIcon className="card-icon"/>
                                        </LinkRouter>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    ))}

                    <img className="main-image" ref={id} src={eachRoom.img} alt={eachRoom.name} />
                </div>
            </div>
            <div className="container_name_description">
                <div>
                    <p className="roomName">{eachRoom.name}</p>
                </div>
                <div className="descriptionRoom">
                    <p>{eachRoom.description}</p>
                </div>
            </div>
        </div>











    )
}




