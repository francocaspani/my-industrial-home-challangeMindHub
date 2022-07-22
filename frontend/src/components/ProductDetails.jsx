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
import Carousel from '../components/CarouselProduct'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import productActions from '../redux/actions/productActions'
import { useEffect, useState} from 'react';
import RatingDetails from '../components/RatingReview'


export default function Product(props) {


    const [reload, setReload] = useState(false)
    const [card, setCard] = useState()

    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(productActions.getOneProduct('62d6cf246b9ba7fd1f6c1478'))
        .then(res => setCard(res.data.response.product))
    }, [id, reload])
    console.log(id)


    const handleReload = () => {
        setReload(!reload)
    }

    return (
        <>
            <Box key={card?._id}>

                <Box className='cards-product-details' sx={{display: 'flex', justifyContent: 'center' }}>

                    <Box sx={{ paddingTop: '8rem', margin: '1rem',  }}>
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
                            <Card sx={{height: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Typography variant="body2" color="text.secondary">
                                Sizes: {card?.size}
                                </Typography>
                            </Card>
                        </Box>
                    </Box>



                    <Box sx={{ display: 'flex', justifyConten: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '8rem', width: 500, margin: '1rem' }}>
                    <Card sx={{ height: 500 , display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <Typography gutterBottom variant="h5" component={'div'}>
                            {card?.name}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <Typography sx={{ marginRight: '2rem' }}>Price: $ {card?.price} </Typography>
                            <Stack sx={{ marginLeft: '2rem' }} spacing={1}>
                                
                                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                            </Stack>
                        </Box>
                        <Box>
                            <CardContent>

                                <Typography sx={{marginTop: '2rem'}} variant="body2" color="text.secondary">
                                    {card?.detail}
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box>
                            <Button sx={{ width: '13rem', margin: '2rem', backgroundColor: '#4d4d4d', color: 'white' }} color="success" variant="contained" disableElevation>
                                <AddShoppingCartIcon />
                                ⠀⠀Add to cart
                            </Button>
                        </Box>
                        <Box>
                            <Button sx={{ width: '13rem', backgroundColor: '#4d4d4d' }} color="success" variant="contained" disableElevation>
                                <VolunteerActivismIcon />
                                ⠀⠀
                                Add to favorite
                            </Button>
                        </Box>
                        </Card>
                    </Box>
                </Box>
                <Box>
                                <Box className='box-review' sx={{ marginTop: '2rem', marginBottom: '2rem'}}>
                                    <Card sx={{width: '50rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                        <Typography variant="body2" color="text.secondary">
                                        < RatingDetails product={card} handleReload={handleReload} />
                                        </Typography>
                                    </Card>
                                </Box>
                            </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Carousel />
                </Box>
            </Box>
        </>
    );
}