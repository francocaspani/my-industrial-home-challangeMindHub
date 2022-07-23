import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import basketActions from '../redux/actions/basketActions'
import BasketCard from '../components/BasketCard'
import "../styles/basket.css"
import { Link as LinkRouter } from 'react-router-dom'

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



    //   let prices;
    //   useEffect(()=>{
    //     if(basket) {
    //         console.log(basket)
    //         prices = basket?.map(product => product.productId.price) 
    //     }
    //   },[basket])
    // // console.log(userBasket)
    // console.log(basket.length)


    // console.log(prices)
    // let totalBasket = 0;
    // function addTotal() {
    //     for(let i=0; i < prices; i++){
    //       totalBasket = prices + totalBasket;
    //     }
    //     return totalBasket;
    // }
    // addTotal()
    // console.log(totalBasket)
    // const basketload = useSelector(store => store.addToBasket())

    return (
        <div className="main-container-basket">
            <h2>Basket</h2>
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
                    <p>$234</p>
                </div>
                <div className='container-shipping'>Shipping</div>
                <div className='container-total'>
                    <p>Total:</p>
                    <p>$234</p>
                </div>
                <div className='container-buttons'>
                    <div className='button-finish'>Proceed to checkout</div>
                    <div className='button-continue'>Continue shopping</div>
                </div>
            </div>
        </div>
    )
}

export default Basket