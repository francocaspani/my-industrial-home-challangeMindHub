import React from 'react'
import "../styles/Favorites.css"
import { useDispatch, useSelector } from 'react-redux';
import basketActions from '../redux/actions/basketActions';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import usersActions from '../redux/actions/userActions';
import DeleteIcon from '@mui/icons-material/Delete';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import CarouselProduct from '../components/CarouselProduct';
import { Link as LinkRouter } from "react-router-dom"

export default function Favorites() {
  const [basket, setBasket] = useState(false)
  const token = localStorage.getItem('token')
  const user = useSelector(store => store.usersReducer.userData)
  const baskets = useSelector(store => store.basketReducer.productsBasket)
  const dispatch = useDispatch()
  const basketIds = baskets?.map(prod => prod.productId._id);
  const reloaded = () => { setBasket(!basket) }
  const favsIds = user?.favourite.map(favId => favId)
  const favs = user?.favourite.map(product => product._id)
  // console.log(favsIds)





  useEffect(() => {
    if (user) {
      dispatch(basketActions.getUserBasket())
    }
  }, [basket])

  async function addBasket(id) {
    const productToAdd = {
      productId: id,
      amount: 1
    }
    dispatch(basketActions.addToBasket(productToAdd));
    reloaded()
  }

  // console.log(basket)

  const handleFavourite = async (id) => {

    if (user) {
      const res = await dispatch(usersActions.handleFavourites(id, token))
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

  function basketAlert() {
    // if (res) {
    toast('This product is already in the basket', {
      theme: "dark",
      position: "bottom-left",
      autoClose: 4000,
    })
    // }
  }

  return (
    <>
      <div className="containerFavourite">
        {
          user ?
            <>
              <p className='favMainTitle'>My favorites list</p>
              {(user?.favourite.length !== 0) ? user?.favourite.map(product => {
                return (
                  <div className='containerProdFav'>
                    <div className='contentFavorite'>
                      <div className='box-infoFav'>
                        <LinkRouter style={{ textDecoration: 'none' }} to={`/products/${product?._id}`}>
                          <img className='imgFavorites' src={product.img} alt='foto'></img>
                        </LinkRouter>
                        <div className='fav-title'>{product.name}</div>
                        <div>Stock: {product.stock}</div>
                        <div className='fav-price'>${product.price}</div>
                      </div>
                      <div className='box-buttonFav'>
                        {(basketIds?.includes(product._id)) ? (
                          //    <Button sx={{ size: "small", color: 'gray' }} onClick={basketAlert}> <AddShoppingCartIcon /></Button>
                          <button style={{ backgroundColor: 'gray' }} className='button-addFav' onClick={basketAlert} >
                            <AddShoppingCartIcon />
                            Added to cart
                          </button>
                        ) : (
                          <button className='button-addFav' onClick={() => addBasket(product._id)} >
                            <LocalGroceryStoreIcon />
                            Add to cart
                          </button>
                        )}
                        <DeleteIcon className='delete-icon' onClick={() => handleFavourite(product._id)} />
                      </div>
                    </div>
                    <div className='line'></div>
                  </div>
                )
              }
              )
                : <div style={{ margin: '15rem auto' }}>
                  <p className='no-fav'>No products have been added to the wish list</p>
                  <div className='line'></div>
                </div>
              }
            </>
            :
            <>
              <p className='favMainTitle'>Sign In to find your favourites!</p>
              <LinkRouter to={'/signin'}>
                <button style={{ padding: '.5rem', backgroundColor: 'black' }} type="submit" className="submit" value="submit">
                  Sign in
                </button>
              </LinkRouter>
            </>
        }

        <CarouselProduct basketIds={basketIds} reloaded={reloaded} favsIds={favsIds} />
      </div>
    </>
  )
}
