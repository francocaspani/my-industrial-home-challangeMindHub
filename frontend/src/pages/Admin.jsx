import React from 'react'
import productActions from '../redux/actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import "../styles/admin.css"



export default function Admin() {

const dispatch = useDispatch()
const [selectedAmbient, setSelectedAmbient] = useState()

const ambients = useSelector(store => store.ambientsReducer.ambients)

// console.log(ambients.map(ambient => ambient._id))

    const handleSubmit = async (event) => {
        event.preventDefault()
            // console.log(event.target[6].value)
        const productData = {
            name: event.target[0].value,
            detail: event.target[1].value,
            img: event.target[2].value,
            price: event.target[3].value,
            size: event.target[4].value,
            stock: event.target[5].value,
            hashtags: event.target[6].value
        }
        const res= await dispatch(productActions.addProduct(productData))
        console.log(res)
    }

    const handleSelect = (event) => {
        setSelectedAmbient(event.target.value)
    }


    return (
        <form onSubmit={handleSubmit} className="form-admin">
            <div className="container-input">
                <input placeholder='name' type="text" id="name" className="" />
            </div>
            <div className="container-input">
                <input placeholder='detail' type="text" id="detail" className="" />
            </div>
            <div className="container-input">
                <input placeholder='img' type="text" id="img" className="" />
            </div>
            <div className="container-input">
                <input placeholder='price' type="price" id="price" className="" />
            </div>
            <div className="container-input">
                <input placeholder='size' type="size" id="size" className="" />
            </div>
            <div className="container-input">
                <input placeholder='stock' type="size" id="stock" className="" />
            </div>
            <div className="container-input">
                                <select className="country-select">
                                    <option className="option">Ambient</option>
                                    {ambients.map((ambient,key) => (
                                        <option className="option" key={key} value={ambient._id}>
                                            {ambient.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
            <button type="submit" className="submit" value="submit">
                Add your product
            </button>
        </form>
    )
}