import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Box } from '@mui/material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
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

    const { id } = useParams()
    const dispatch = useDispatch()
    const [basket, setBasket] = useState(false)
    const user = useSelector(store => store.usersReducer.userData)
    const rating = useSelector(store => store.productsReducer.rating)

    useEffect(() => {
        dispatch(productActions.getOneProduct(id))
            .then(res => setCard(res.data.response.product))


    }, [id, reload])

    useEffect(() => {
        if (card){
            dispatch(productActions.getRating(card.reviews))
        }
        
    }, [card])

    console.log(card)
    async function addBasket(e) {
        const product = {
            productId: id,
            amount: 1

        }
        dispatch(basketActions.addToBasket(product));
        setBasket(!basket)
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



    // async function ratingProduct() {
    //     let prodRating;
    //     const ratings = await card?.reviews.map(rev => rev.rating);
    //     let sumRating = 0;
    //     for (let i = 0; i < ratings.length; i++) {
    //         sumRating = ratings[i] + sumRating
    //     }
    //     prodRating = sumRating / (card.reviews.length)
    //     return prodRating;
    // }
    // ratingProduct().then(res => setMagia(res))
    // console.log(magia)

    return (
        <>

            <Box key={card?._id}>

                <Box className='cards-product-details' sx={{ display: 'flex', justifyContent: 'center' }}>

                    <Box sx={{ paddingTop: '8rem' }}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image={card?.img}
                                    alt="product"
                                />
                            </CardActionArea>


                        </Card>
                        <Box sx={{ marginTop: '1rem' }}>
                            <Card sx={{ height: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Sizes: {card?.size}
                                </Typography>
                            </Card>
                        </Box>
                    </Box>



                    <Box className='box-information-product' sx={{ display: 'flex', justifyConten: 'center', alignItems: 'center', flexDirection: 'column', width: 500, margin: '1rem' }}>
                        <Card sx={{ height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', border: "2px solid" }}>
                            <Typography gutterBottom variant="h5" component={'div'}>
                                {card?.name}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Typography sx={{ marginRight: '2rem' }}>Price: $ {card?.price} </Typography>
                                <Stack sx={{ marginLeft: '2rem' }} spacing={1}>

                                    <Rating name="half-rating-read" value={rating} precision={0.5} readOnly />
                                </Stack>
                            </Box>
                            <Box>
                                <CardContent>

                                    <Typography sx={{ marginTop: '2rem' }} variant="body2" color="text.secondary">
                                        {card?.detail}
                                    </Typography>
                                </CardContent>
                            </Box>
                            <Box>
                                <Button sx={{ width: '13rem', margin: '2rem', backgroundColor: '#4d4d4d', color: 'white' }} color="success" variant="contained" onClick={addBasket} disableElevation>
                                    <AddShoppingCartIcon />
                                    ⠀⠀Add to cart
                                </Button>
                            </Box>
                            <Box>
                                <Button sx={{ width: '13rem', backgroundColor: '#4d4d4d' }} color="success" onClick={handleFavourite} variant="contained" disableElevation>
                                    <VolunteerActivismIcon />
                                    ⠀⠀
                                    Add to favorite
                                </Button>
                            </Box>
                        </Card >
                    </Box >
                </Box >
                <Box>
                    <Box className='box-review' sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
                        <Card sx={{ width: '50rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            <Typography variant="body2" color="text.secondary">
                                < RatingReview product={card} ratingProduct={rating} handleReload={handleReload} />
                            </Typography>
                        </Card>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <CarouselProduct />
                </Box>
            </Box >
        </>
    );
}