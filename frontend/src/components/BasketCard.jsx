import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import basketActions from '../redux/actions/basketActions'
import DeleteIcon from '@mui/icons-material/Delete';
import { Link as LinkRouter } from "react-router-dom"
import "../styles/basket.css"

function BasketCard({ product, reload }) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.usersReducer.userData)
    const userBasket = useSelector(store => store.basketReducer.productsBasket)
    const [amount, setAmount] = useState(product.amount);
    const stock = [...Array(product.productId.stock).keys()]

    async function deleteBasket() {
        const productId = product._id;
        await dispatch(basketActions.deleteBasketProduct(productId));
        console.log(productId)
        reload()

        let storageProducts = JSON.parse(localStorage.getItem('basket'));
        let products = storageProducts.filter(product => product.productId !== productId);
        localStorage.setItem('basket', JSON.stringify(products));
    }


    async function modifyBasket(event) {
        event.preventDefault()
        setAmount(event.target.value);
        const toModify = {
            productId: product._id,
            amount: event.target.value,
        }
        await dispatch(basketActions.modifyBasketProduct(toModify))
        reload()
    }

    function selected(event) {
        setAmount(event.target.value);
    }

    return (
        <div className='basket'>
            <LinkRouter style={{textDecoration: 'none'}} to={`/products/${product?.productId._id}`}>
                <img style={{ width: '60px' }} alt='img-basket' src={product?.productId.img} />
            </LinkRouter>
            <div className='basket-name'>
                <p>{product.productId.name}</p>
                <p>$ {product.productId.price}</p>
            </div>
            <div className='basket-amount'>
                <p>Quantity</p>
                <div className='amount'>
                    <select onChange={modifyBasket}>

                        {stock.map((stock, index) => (
                            <option key={index}>{stock + 1}</option>
                        ))}
                    </select>
                    {/* <p id={product.productId._id} onClick={()=>modifyBasket('less', product.productId._id)} >-</p> */}
                    <p>{product.amount}</p>

                    {/* <p id={product.productId._id} onClick={()=>modifyBasket('plus', product.productId._id)}>+</p> */}
                </div>
            </div>
            <div className='basket-total'>
                <p>Total</p>
                <p>$ {product.amount * product.productId.price}</p>
            </div>
            <DeleteIcon style={{cursor: 'pointer'}} onClick={deleteBasket} />
        </div>
    )
}

export default BasketCard