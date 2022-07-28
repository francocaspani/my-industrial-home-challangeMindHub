import React from 'react'
import "../styles/Favorites.css"
import { useDispatch, useSelector } from 'react-redux';
import basketActions from '../redux/actions/basketActions';
import {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import usersActions from '../redux/actions/userActions';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CarouselProduct from '../components/CarouselProduct';
import { Link as LinkRouter } from "react-router-dom"

export default function Favorites() {
  const [basket, setBasket] = useState(false)
  const token = localStorage.getItem('token')
  const user = useSelector(store => store.usersReducer.userData)
  const baskets = useSelector(store => store.basketReducer.productsBasket)
  const dispatch = useDispatch()
  const basketIds = baskets?.map(prod => prod._id);
  const reloaded = () => { setBasket(!basket) }
  console.log(basketIds)
  const favsIds = user?.favourite.map(favId => favId._id)
  console.log(favsIds)



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

console.log(basket)

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
console.log(handleFavourite)
  return (
    <>
      <div className="containerFavourite">
        <p className='favMainTitle'>My favorites list</p>
        {(user?.favourite.length !== 0) ? user?.favourite.map(product => {
          return (
            <div className='containerProdFav'>
              <div className='contentFavorite'>
                <LinkRouter style={{textDecoration: 'none'}} to={`/products/${product?._id}`}>
                  <img className='imgFavorites' src={product.img} alt='foto'></img>
                </LinkRouter>
                <div className='fav-title'>{product.name}</div>
                <div>Stock: {product.stock}</div>
                <div className='fav-price'>${product.price}</div>
                {/* <button onClick={()=> addBasket(product._id)}><ShoppingCartIcon/></button> */}
                <div className='box-buttonFav'>
                  <button className='button-add' onClick={()=> addBasket(product._id)}>
                                            <AddShoppingCartIcon />
                                            ⠀⠀Add to cart
                                        </button>
                  <DeleteIcon className='delete-icon' onClick={()=> handleFavourite(product._id) }/>
                </div>
              </div>
              <div className='line'></div>
            </div>
          )
        }
        )
        : <div style={{margin: '15rem auto'}}>
            <p className='no-fav'>No products have been added to the wish list</p>
            <div className='line'></div>
          </div>
      }
      <CarouselProduct basketIds={basketIds} reloaded={reloaded} favsIds={favsIds}/>
      </div>
    </>
  )
}
