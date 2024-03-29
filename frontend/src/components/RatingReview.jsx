import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import '../styles/RatingReview.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from "react-redux";
import reviewActions from '../redux/actions/reviewActions';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send'
import ModifyDeleteReview from '../components/ModifyDeleteReview'
import { Link as LinkRouter } from 'react-router-dom'

const style = { // estilo para la apertura de la imagen del producto desde la card
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function RatingReview({ product, handleReload, ratingProduct }) {

    const [files, setFiles] = useState()
    const [rating, setRating] = useState(0)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    const user = useSelector(store => store.usersReducer.userData)

    const [open, setOpen] = React.useState(false); // variables para el modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // console.log(rating)

    const handleReview = async (event) => {
        // console.log(files)
        event.preventDefault()
        const file = await files[0]
        const titleReview = await event.target[0].value
        const review = await event.target[1].value
        const idProduct = product._id

        const formData = new FormData()
        formData.append('file', file)
        formData.append('titleReview', titleReview)
        formData.append('review', review)
        formData.append('idProduct', idProduct)
        formData.append('rating', rating)
        const res = await dispatch(reviewActions.addReview(formData, token))
        handleClose()
        handleReload()

    }

    const card = useSelector(store => store.productsReducer.product)

    return (
        <Box className='reviewContainer'>
            <span className='titleReviewContainer'>
                {/* <Typography>Ratings and Reviews</Typography> */}
                {/* <span onClick={handleOpen}><Typography>Write a review</Typography></span> */}
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style} >
                        <Box>
                            <h1>White Your Review</h1>
                            <b><h3>{card.name}</h3></b>
                            <Box className='ratingModal'>
                                <div>
                                    <img height={100} src={card.img} />
                                </div>

                                <Stack spacing={1}>
                                    <span className='ratingSelector'>
                                        <Typography>Product rating</Typography>
                                        <Rating name="simple-controlled" value={rating} precision={0.5} size='large'
                                            onChange={(event, newValue) => setRating(newValue)}
                                        />
                                    </span>

                                </Stack>
                            </Box>
                            <Box className='formBoxReview'>
                                <Typography>Share your thoughts with others.</Typography>
                                <form className='formReview' onSubmit={handleReview}>
                                    <input type="text" placeholder='Review title*' required />
                                    <textarea name="review" id="review" cols="65" rows="10" placeholder='Leave your review here*' className='textarea' required>
                                    </textarea>
                                    <Typography>Upload a photo of the product</Typography>
                                    <input type="file" onChange={(event) => setFiles(event.target.files)} />
                                    <button type='submit'>Submit Review</button>
                                </form>
                            </Box>
                        </Box>
                    </Box>
                </Modal>
            </span>
            {product?.reviews.map((item, index) => {
                return (
                    <ModifyDeleteReview item={item} handleReload={handleReload} />
                )
            })}
            {user ?
                <button className='button-rev' onClick={handleOpen} >Write a review <SendIcon /></button>
                : <Box>
                    <Box color="success" variant="contained" sx={{borderRadius: '.5rem', color: 'white', marginTop: '2rem', backgroundColor: '#4d4d4d' }}>Log in to write a review</Box>
                </Box>
            }
        </Box>
    )
}