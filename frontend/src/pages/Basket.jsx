import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import basketActions from '../redux/actions/basketActions'
import DeleteIcon from '@mui/icons-material/Delete';
import BasketCard from '../components/BasketCard'
import "../styles/basket.css"
import {Link as LinkRouter } from 'react-router-dom'

function Basket(props) {

    const [basketReload, setBasketReload] = useState(null)
    const [basket , setBasket] = useState(null)
    const dispatch = useDispatch();
    const user = useSelector(store => store.usersReducer.userData)
    const userBasket = useSelector(store => store.basketReducer.productsBasket)

    const reload = ()=>{setBasketReload(!basketReload)}

    useEffect(() => {
        if(user) {
            dispatch(basketActions.getUserBasket()).then(res=>setBasket(res))
        }
      },[basketReload])

    console.log(userBasket)
    // const basketload = useSelector(store => store.addToBasket())

    return (
        <div className="main-container-basket">
            <h2>Basket</h2>
            <div className='container-basket'>
                {
                     basket && basket?.map(product => (
                       <BasketCard product={product} reload={reload}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Basket