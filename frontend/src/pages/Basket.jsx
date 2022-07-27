import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import basketActions from '../redux/actions/basketActions'
import BasketCard from '../components/BasketCard'
import "../styles/basket.css"
import { Link as LinkRouter } from 'react-router-dom'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import PayPal from '../components/PayForm/PayPal'

function Basket(props) {

    const [basketReload, setBasketReload] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector(store => store.usersReducer.userData)
    const basket = useSelector(store => store.basketReducer.productsBasket)


    useEffect(() => {
        if (user) {
            dispatch(basketActions.getUserBasket())
        }
    }, [basketReload, user])


    const reload = () => { setBasketReload(!basketReload) }

    console.log(basket)


    let subtotals = []
    if (basket) {
        (basket?.map(product => {
            subtotals.push(product.productId.price * product.amount)
        }))
    }


    let subTotalBasket = 0;
    function addTotal() {
        for (let i = 0; i < subtotals.length; i++) {
            subTotalBasket = subtotals[i] + subTotalBasket;
        }
        return subTotalBasket;
    }
    addTotal()
    let shipping = (basket.length !== 0) ? 15 : 0;
    let totalBasket = shipping + subTotalBasket;

    return (
        <div className="main-container-basket">
            {
                basket?.length !== 0 ?
                    (<div className='container-basket'>
                        {
                            basket?.map(product => (
                                <BasketCard product={product} reload={reload} />
                            ))
                        }
                    </div>) : (<div className='container-basket'><p className='empty-basket'>Your basket is empty.</p></div>)
            }
            <div className='main-container-sub'>
                <div className='container-subtotal'>
                    <p>Subtotal:</p>
                    <p>${subTotalBasket}</p>
                </div>
                <div className='container-subtotal'>
                    <p>Shipping:</p>
                    <p>${shipping}</p>
                </div>
                <div className='container-total'>
                    <p>Total:</p>
                    <p>{totalBasket}</p>
                </div>
                <div className='container-buttons'>
                    {/* <LinkRouter to='' className='linkRouter'>
                        <div className='button-continue'>Proceed to checkout</div>
                    </LinkRouter> */}
                    <PayPal className='paypal-butt' total={totalBasket} shipping={shipping} subTotal={subTotalBasket}/>
                    <LinkRouter to='/products' className='linkRouter'>
                        <div className='button-continue'>Continue shopping</div>
                    </LinkRouter>
                </div>
            </div>
        </div>
    )
}

export default Basket