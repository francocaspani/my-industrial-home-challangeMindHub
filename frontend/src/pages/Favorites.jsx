import React from 'react'
import "../styles/Favorites.css"
import { useDispatch, useSelector } from 'react-redux';
import basketActions from '../redux/actions/basketActions';
import {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import usersActions from '../redux/actions/userActions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Favorites() {
  const [basket, setBasket] = useState(false)
  const token = localStorage.getItem('token')
  const user = useSelector(store => store.usersReducer.userData)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(basketActions.getUserBasket())
    }
  }, [basket])


  async function addBasket(id) {
    const productToAdd = {
        productId : id,
        amount : 1
    }
    dispatch(basketActions.addToBasket(productToAdd));
    setBasket(!basket)
}

const handleFavourite = async (id) => {

  if (user) {
    const res = await dispatch(usersActions.handleFavourites(id, token))
    console.log(res)
    toast(res.data.message, {
      theme: "dark",
      position: "bottom-left",
      autoClose: 4000,
    })

  } else {
    toast.error('Please log in to save this to your favourites', {
      theme: "dark",
      position: "bottom-left",
      autoClose: 4000,
    })
  }

  if (localStorage.getItem('token') !== null) {
    const token = localStorage.getItem('token')

    const verifyToken = async () => {
      const res = await dispatch(usersActions.verifyToken(token))
    }
    verifyToken()
  }
}
  return (
    <>
      <div className="containerFavourite">
        {user ? user.favourite.map(product => {
          return (
            <div className='contentFavorite'>
              <img className='imgFavorites' src={product.img} alt='foto'></img>
              <div>{product.name}</div>
              <div>{product.price}$</div>
              <div>Stock: {product.stock}</div>
              <button onClick={()=> addBasket(product._id)}><ShoppingCartIcon/></button>
              <button onClick={()=> handleFavourite(product._id) }><DeleteIcon/></button>
            </div>
          )
        }
        )
          : <div><p>Nothing here</p></div>
        }
      </div>
    </>
  )
}
