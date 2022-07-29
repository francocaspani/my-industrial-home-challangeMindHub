import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import basketActions from '../redux/actions/basketActions'
import BasketCard from '../components/BasketCard'
import "../styles/basket.css"
import { Link as LinkRouter } from 'react-router-dom'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import PayPal from '../components/PayForm/PayPal'
import DeleteIcon from '@mui/icons-material/Delete';


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



    let subtotals = []
    if (basket) {
        (basket?.map(product => {
            subtotals.push(product.productId.price * product.amount)
        }))
    }

    // function para borrar basketLocalStg

    function basketLocal(e) {
        const productIndex = productLocal.indexOf(e)
        productLocal.splice(productIndex, 1)
        let stringiFied = JSON.stringify(productLocal)
        localStorage.setItem('basket', stringiFied)
        setBasketReload(!basketReload)
    }
    //----

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
    let productLocal = JSON.parse(localStorage.getItem('basket'))
    return (
        <div className="main-container-basket">
            {/* desde aca */}
            {
                (!user) ?
                    (productLocal?.length > 0) ?
                        (<div className='container-basket'>
                            {
                                productLocal?.map(product => (
                                    <div className='basket'>
                                        <LinkRouter style={{ textDecoration: 'none' }} to={`/products/${product?.productId._id}`}>
                                            <img style={{ width: '60px' }} alt='img-basket' src={product.img} />
                                        </LinkRouter>
                                        <div className='basket-name'>
                                            <p>{product.name}</p>
                                            <p>$ {product.price}</p>
                                        </div>
                                        <div className='basket-amount'>
                                            <p>Quantity</p>
                                            <div className='amount'>
                                                {/* <select onChange={modifyBasket}>

                                            {stock.map((stock, index) => (
                                                <option key={index}>{stock + 1}</option>
                                            ))}
                                        </select> */}
                                                {/* <p id={product.productId._id} onClick={()=>modifyBasket('less', product.productId._id)} >-</p> */}
                                                <p>{product.amount}</p>

                                                {/* <p id={product.productId._id} onClick={()=>modifyBasket('plus', product.productId._id)}>+</p> */}
                                            </div>
                                        </div>
                                        <div className='basket-total'>
                                            <p>Total</p>
                                            <p>$ {product.amount * product.price}</p>
                                        </div>
                                        <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => basketLocal(product.productId)} />
                                    </div>
                                ))
                            }
                        </div>) : (<div className='container-basket'><p className='empty-basket'>Your basket is empty.</p></div>) : <></>}
            {/* hasta aca */}
            {
                (user) ?
                    (basket?.length !== 0) ?
                        (<div className='container-basket'>
                            {
                                basket?.map(product => (
                                    <BasketCard product={product} reload={reload} />
                                ))
                            }
                        </div>) : (<div className='container-basket'><p className='empty-basket'>Your basket is empty.</p></div>) : <></>
            }
            {(user) ?
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
                        <p>$ {totalBasket}</p>
                    </div>
                    <div className='container-buttons'>
                        {/* <LinkRouter to='' className='linkRouter'>
                        <div className='button-continue'>Proceed to checkout</div>
                    </LinkRouter> */}
                        {basket?.length !== 0 ?
                            <PayPal className='paypal-butt' total={totalBasket} shipping={shipping} subTotal={subTotalBasket} />
                            :
                            <></>
                        }
                        <LinkRouter to='/products' className='linkRouter'>
                            <div className='button-continue'>Continue shopping</div>
                        </LinkRouter>
                    </div>
                </div> :

                <div className='main-container-sub'>
                    <div>
                        <p style={{ fontSize: '1rem' }}>To confirm the purchase, we ask you to please log in</p>
                        <LinkRouter to={'/signin'}>
                            <button style={{ padding: '.5rem', backgroundColor: 'black' }} type="submit" className="submit" value="submit">
                                Sign in
                            </button>
                        </LinkRouter>
                    </div>
                    <div className='containerBasketLocalStg'>
                        <p style={{ fontSize: '1rem' }}>If you do not have an account, register here</p>
                        <LinkRouter to={'/signup'}>
                            <button style={{ padding: '.5rem', backgroundColor: 'black', marginBottom: '1.5rem' }} type="submit" className="submit" value="submit">
                                Sign up
                            </button>
                        </LinkRouter>
                        <LinkRouter to='/products' className='linkRouter'>
                            <div className='button-continue'>Continue shopping</div>
                        </LinkRouter>
                    </div>
                </div>
            }
        </div>
    )
}

export default Basket