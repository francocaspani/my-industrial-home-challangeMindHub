import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import CarouselProduct from '../components/CarouselProduct'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import productActions from '../redux/actions/productActions';
import basketActions from '../redux/actions/basketActions';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import RatingReview from '../components/RatingReview'
import usersActions from '../redux/actions/userActions';
import { toast } from 'react-toastify';
import '../styles/productDetails.css'


export default function Product(props) {

    const token = localStorage.getItem('token')
    const [reload, setReload] = useState(false)
    const [card, setCard] = useState()
    const [magia, setMagia] = useState(0)
    const [productModel, setProductmodel] = React.useState(1)
    const { id } = useParams()
    const dispatch = useDispatch()
    const [basket, setBasket] = useState(false)
    const user = useSelector(store => store.usersReducer.userData)
    const rating = useSelector(store => store.productsReducer.rating)
    const prodBasket = useSelector(store => store.basketReducer.productsBasket)
    const basketIds = prodBasket.map(prod => prod.productId._id);
    const favsIds = user?.favourite.map(favId => favId._id)
    const reloaded = () => { setBasket(!basket) }
  
    let stock;
    if(card?.stock > 0) {
        stock = [...Array(card?.stock).keys()]
    }

    useEffect(() => {
        dispatch(productActions.getOneProduct(id))
            .then(res => setCard(res.data.response.product))


    }, [id, reload])

    useEffect(() => {
        if (card) {
            dispatch(productActions.getRating(card.reviews))
        }

    }, [card])

    console.log(card)
    async function addBasket(e) {
        const productToAdd = {
            productId: id,
            amount: productModel,
            img: card.img,
            price: card.price,
            name: card.name

        }
        if (user) {
            dispatch(basketActions.addToBasket(productToAdd));
        }
        else {
            let basketLocalStorage = JSON.parse(localStorage.getItem('basket')) || []
            basketLocalStorage.push(productToAdd)
            let basketLocalStorageJSON = JSON.stringify(basketLocalStorage)
            localStorage.setItem('basket', basketLocalStorageJSON)
        }
        reloaded()
        // dispatch(basketActions.addToBasket(product));
        // setBasket(!basket)
    }

    // const userBasket = useSelector(store => store.basketReducer.productsBasket)
    // console.log(userBasket)

    useEffect(() => {
        if (user) {
            dispatch(basketActions.getUserBasket())
        }
    }, [basket])



    const handleReload = () => {
        setReload(!reload)
    }

    const handleFavourite = async () => {

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

    console.log(rating.value)

    function selected(event) {
        console.log(event.target.value);
        setProductmodel(event.target.value);
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

            <Box key={card?._id} className='main-containerProdDet'>

                <Box className='cards-product-details'>

                    <Box className='container-img-detail'>
                        <img src={card?.img} alt="card-detail" className='img-detail' />
                    </Box>

                    <Box className='box-information-product'>
                        <div className='card-info-detail'>
                            <div className='info-detail'>
                                <Typography className='title-detail' component={'div'}>
                                    {card?.name}
                                </Typography>
                                <Stack className='price-detail' spacing={1}>
                                    <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
                                </Stack>
                                <Typography className='price-detail'>Price: $ {card?.price} </Typography>
                                <Typography className='price-detail' variant="body2" color="text.secondary">
                                    {card?.detail}
                                </Typography>
                                <Typography className='price-detail' variant="body2" color="text.secondary">
                                    Sizes: {card?.size}
                                </Typography>
                            </div>
                            <div className='container-selectBotton'>
                                {/* <select className='box-select'><option>1</option></select> */}
                                <select className='box-select' onChange={selected}>

                                    {stock?.map((stock, index) => (
                                        <option key={index}>{stock + 1}</option>
                                    ))}
                                </select>


                                <div className='box-buttons'>
                                {(basketIds.includes(card?._id)) ? (
                                    //    <Button sx={{ size: "small", color: 'gray' }} onClick={basketAlert}> <AddShoppingCartIcon /></Button>
                                    <button className='button-add' onClick={basketAlert} >
                                        <AddShoppingCartIcon />
                                        ⠀⠀Added to cart
                                    </button>
                                     ) : (
                                        <button className='button-add' onClick={addBasket} >
                                        <LocalGroceryStoreIcon />
                                        ⠀⠀Add to cart
                                    </button>
                                    //    <Button sx={{ size: "small", color: '#000000' }} onClick={addBasket}> <LocalGroceryStoreIcon /></Button>
                                )}
                                    <button className='button-fav' onClick={handleFavourite} disableElevation>
                                        <VolunteerActivismIcon />
                                        ⠀⠀
                                        Add to favorite
                                    </button>
                                </div>
                            </div>
                        </div >
                    </Box >
                </Box >
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <CarouselProduct basketIds={basketIds} reloaded={reloaded} favsIds={favsIds}/>
                </Box>
                <Box sx={{ margin: '5rem auto', backgroundColor: 'white' }}>
                    <div className='review-title'>
                        <p>Ratings and Reviews</p>
                        <a>Write a review</a>
                    </div>
                    <div className='line'></div>
                    <div className='box-infoRev'>
                        <div className='box-revInfo'>
                            <div className='review-info'>
                                {
                                    (card?.reviews.length == 0) ?
                                        <p>0 stars</p>
                                        :
                                        <p>{Math.round(rating)} stars</p>
                                }
                                <p>|</p>
                                <p>{card?.reviews.length} Reviews</p>
                            </div>
                            <Stack className='review-stars' spacing={1}>
                                <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
                            </Stack>
                        </div>
                        <div className='box-reco'>
                            {
                                (card?.reviews.length == 0) ?
                                    <p style={{marginBottom: '.3rem'}}>No reviews yet, be the first one</p>
                                    :
                                    <p style={{marginBottom: '.3rem'}}>{Math.round(rating) * 20}% Recommended</p>
                            }
                            <CheckCircleOutlineIcon />
                        </div>
                    </div>
                    <Box className='box-review' sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
                        <Card sx={{ width: '50rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            <Typography variant="body2" color="text.secondary">
                                < RatingReview product={card} ratingProduct={rating} handleReload={handleReload} />
                            </Typography>
                        </Card>
                    </Box>
                </Box>
            </Box >
        </>
    );
}