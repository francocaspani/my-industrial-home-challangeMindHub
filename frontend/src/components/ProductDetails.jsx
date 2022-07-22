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
import Carousel from 'react-grid-carousel'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import productActions from '../redux/actions/productActions';
import basketActions from '../redux/actions/basketActions';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';



export default function Product() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [basket, setBasket] = useState(false)
    const user = useSelector(store => store.usersReducer.userData)
    useEffect(() => {
        dispatch(productActions.getOneProduct(id))
    }, [id])

    async function addBasket(e) {
        console.log('hola')
        const productId = e.target.value;
        dispatch(basketActions.addToBasket(productId));
        console.log(productId)
        setBasket(!basket)
    }
    // async function deleteBasket(e) {
    //     console.log('chau')
    //     const productId = e.target.value;
    //     dispatch(basketActions.deleteBasketProduct(productId));
    //     console.log(productId)
    //     setBasket(!basket)
    // }
    // async function modifyBasket(e) {
    //     e.preventDefault()
    //     const newAmount = {
    //         productId: e.target.id,
    //         amount: e.target.value,
    //     }
    //     {console.log(typeof(e.target.value))}
    //     dispatch(basketActions.modifyBasketProduct(newAmount))
    //     setBasket(!basket)
    // }
    const userBasket = useSelector(store => store.basketReducer.productsBasket)
    console.log(userBasket)

    useEffect(() => {
        if(user) {
            dispatch(basketActions.getUserBasket())
        }
      },[basket])

    const card = useSelector(store => store.productsReducer.product)

    return (
        <>
            <Box key={card._id}>

                <Box sx={{ display: 'flex', justifyContent: 'center' }}>

                    <Box sx={{ paddingTop: '8rem', marginRight: '10rem' }}>
                        <Card sx={{ width: 500 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="500"
                                    image={card.img}
                                    alt="product"
                                />
                            </CardActionArea>


                        </Card>
                        <Box sx={{ width: 500, marginTop: '2rem' }}>
                            <Card>
                                <Typography variant="body2" color="text.secondary">
                                    {card.size}
                                </Typography>
                            </Card>
                            <Box>
                                <Box sx={{ width: 500, marginTop: '2rem', marginBottom: '2rem' }}>
                                    <Card sx={{ minHeight: '8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                        <Typography variant="body2" color="text.secondary">
                                            Opinions
                                        </Typography>
                                    </Card>
                                </Box>
                            </Box>
                        </Box>
                    </Box>



                    <Box sx={{ display: 'flex', justifyConten: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '13rem', width: 500, }}>
                        <Typography gutterBottom variant="h5" component="div">
                            {card.name}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ marginRight: '2rem' }}>Price: $ 120 </Typography>
                            <Stack sx={{ marginLeft: '2rem' }} spacing={1}>
                                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                            </Stack>
                        </Box>
                        <Box>
                            <CardContent>

                                <Typography variant="body2" color="text.secondary">
                                    {card.detail}
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box>
                            <Button sx={{ width: '13rem', margin: '2rem', backgroundColor: '#7c5e49', color: 'white' }} value={card._id} onClick={addBasket} color="success" variant="contained" disableElevation>
                                <AddShoppingCartIcon />
                                ⠀⠀Add to cart
                            </Button>
                        </Box>
                        <Box>
                            <Button sx={{ width: '13rem', backgroundColor: '#7c5e49' }} value={card._id} variant="contained" disableElevation>
                                <VolunteerActivismIcon />
                                ⠀⠀
                                Add to favorite
                            </Button>
                        </Box>
                    </Box>



                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Carousel cols={4} rows={1} gap={10} loop autoplay={5000} mobileBreakpoint={200}>

                        <Carousel.Item>
                            <img height='200rem' width="300rem" src="https://i.imgur.com/4HqEtE1.jpg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img height='200rem' width="300rem" src="https://i.imgur.com/1BELyvw.jpg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img height='200rem' width="300rem" src="https://i.imgur.com/VymuMhW.jpg" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img height='200rem' width="300rem" src="https://i.imgur.com/UlPLPyf.jpg" />
                        </Carousel.Item>
                    </Carousel>
                </Box>
            </Box>
        </>
    );
}