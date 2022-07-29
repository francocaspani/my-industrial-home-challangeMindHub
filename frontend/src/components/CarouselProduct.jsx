import React from "react";
import { Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/carouselProducts.css";
import { Navigation } from "swiper";
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from "react";
import "../styles/products.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { Link as LinkRouter } from "react-router-dom"
import usersActions from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import basketActions from '../redux/actions/basketActions';


export default function CarouselProduct({basketIds, reloaded, favsIds}) {

    const products = useSelector((store) => store.productsReducer.products)
    const [open, setOpen] = React.useState(false); // variables para el modal
    const [productModel, setProductmodel] = React.useState(1)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const token = localStorage.getItem('token')
    // let stock;
    // if(product.stock > 0) {
    //   stock = [...Array(product.stock).keys()]
    // }
    const dispatch = useDispatch()
    const user = useSelector(store => store.usersReducer.userData)
    const basket = useSelector(store => store.basketReducer.productsBasket)
  
    useEffect(() => {
      if (user) {
        dispatch(basketActions.getUserBasket())
      }
    }, [user])
  
  
    // function selected(event) {
    //   console.log(event.target.value);
    //   setProductmodel(event.target.value);
    // }
    // const basketIds = basket.map(prod => prod.productId._id);
  
    const handleFavourite = async (e) => {
  
      if (user) {
        const res = await dispatch(usersActions.handleFavourites(e, token))
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
      reloaded()
  
      if (localStorage.getItem('token') !== null) {
        const token = localStorage.getItem('token')
  
        const verifyToken = async () => {
          const res = await dispatch(usersActions.verifyToken(token))
        }
        verifyToken()
      }
    }
  
    async function addBasket(e) {
      const productToAdd = {
        productId: e,
        amount: productModel
      }
      dispatch(basketActions.addToBasket(productToAdd));
      reloaded()
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

    // function favAlert() {
    //   // if (res) {
    //   toast('This product is already in favs', {
    //     theme: "dark",
    //     position: "bottom-left",
    //     autoClose: 4000,
    //   })
    //   // }
    // }

    return (
        <Swiper
        slidesPerView={7}
            spaceBetween={25}
            slidesPerGroup={7}
            loop={true}
            loopFillGroupWithBlank={true}
            // pagination={{
                //     clickable: true,
                // }}
            navigation={true}
            modules={[Navigation]}
            className="containerSwiperNewCollection"
            >
            {products?.map(productdetails =>
            
                <SwiperSlide className='carousel' key={productdetails._id}>
                     <div key={productdetails._id}>
                    <LinkRouter className="no-link" to={`/products/${productdetails._id}`} >
                        <img className="img-caro" alt={productdetails.name} src={productdetails.img} />
                    </LinkRouter>
                        <div className="line"></div>
                        <div className="box-priceFav">
                            <p className="price-car">${productdetails.price} USD</p>
                            <div style={{display: 'flex'}}>
                              {
                                (favsIds?.includes(productdetails._id)) ? (
                                  <Button sx={{ size: "small", color: '#000000' }} onClick={()=>handleFavourite(productdetails._id)}><FavoriteIcon /></Button>
                                  ) : (
                                    <Button sx={{ size: "small", color: '#000000' }} onClick={()=>handleFavourite(productdetails._id)}> <FavoriteBorderIcon /></Button>
                                )
                              }
                                {(basketIds.includes(productdetails._id)) ? (
                                <Button sx={{ size: "small", color: 'gray' }} onClick={basketAlert}> <AddShoppingCartIcon /></Button>
                                ) : (
                                <Button sx={{ size: "small", color: '#000000' }} onClick={()=>addBasket(productdetails._id)}> <LocalGroceryStoreIcon /></Button>
                                )}
                            </div>
                        </div>
                        <div className="box-car">
                            <p className="detail-car">{productdetails.detail}</p>
                            <p>{productdetails.name}</p>
                        </div>
                    </div>
                </SwiperSlide>
            
            )}

            </Swiper>

    );
}