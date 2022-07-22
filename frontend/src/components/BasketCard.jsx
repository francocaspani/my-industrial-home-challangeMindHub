import React, {useEffect,useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import basketActions from '../redux/actions/basketActions'
import DeleteIcon from '@mui/icons-material/Delete';
import "../styles/basket.css"

function BasketCard({product, reload}) {
    const dispatch = useDispatch();
    const user = useSelector(store => store.usersReducer.userData)
    const userBasket = useSelector(store => store.basketReducer.productsBasket)
    const [amount, setAmount] = useState(product.amount);

    async function deleteBasket(e) {
        console.log('chau')
        const productId = e.target.value;
        dispatch(basketActions.deleteBasketProduct(productId));
        console.log(productId)
        reload()
    }
    async function modifyBasket(e, id) {
        // e.preventDefault()
        if(e === 'less'){
            setAmount(amount - 1)
        } else if(e === 'plus'){setAmount(amount + 1)}
        const newAmount = {
            productId: id,
            amount: amount,
        }
        {console.log(newAmount)}
        await dispatch(basketActions.modifyBasketProduct(newAmount))
        reload()
    }
    console.log(product)

  return (
    <div className='basket'>
        <img style={{width: '50px'}} alt='img-basket' src={product.productId.img} />
        <div className='basket-name'>
            <p>{product.productId.name}</p>
            <p>$ {product.productId.price}</p>
        </div>
        <div className='basket-amount'>
            <p>Quantity</p>
            <div className='amount'>
                <p id={product.productId._id} onClick={()=>modifyBasket('less', product.productId._id)} >-</p>
                <p>{amount}</p>
                <p id={product.productId._id} onClick={()=>modifyBasket('plus', product.productId._id)}>+</p>
            </div>
        </div>
        <div className='basket-total'>
            <p>Total</p>
            <p>$ {amount * product.productId.price}</p>
        </div>
        <DeleteIcon onClick={deleteBasket}/>
    </div>
  )
}

export default BasketCard