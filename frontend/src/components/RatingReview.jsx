import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import '../styles/RatingReview.css'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from "react-redux";
import reviewActions from '../redux/actions/reviewActions';

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

export default function RatingReview() {
    const user = useSelector(store => store.usersReducer.userData)
    const [files, setFiles] = useState()
    const [rating, setRating] = useState(0)
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')

    const [open, setOpen] = React.useState(false); // variables para el modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log(rating)

    const id = '62d6cf246b9ba7fd1f6c1478'

    const handleReview = async (event) => {
        console.log(files)
        event.preventDefault()
        const file = await files[0]
        const titleReview = await event.target[0].value
        const review = await event.target[1].value
        const idProduct = id

        const formData = new FormData()
        formData.append('file', file)
        formData.append('titleReview', titleReview)
        formData.append('review', review)
        formData.append('idProduct', idProduct)
        formData.append('rating', rating)
        console.log(formData)
        const res = await dispatch(reviewActions.addReview(formData,token))
        console.log(res)
        
    }

    return (
        <div className='reviewContainer'>
            <span className='titleReviewContainer'>
                <p>Ratings and Reviews</p>
                <span onClick={handleOpen}><p>Write a review</p></span>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style} >
                        <div>
                            <h1>White Your Review</h1>
                            <h3>Nombre del producto</h3>
                            <div className='ratingModal'>
                                <p>Imagen del producto</p>
                                <Stack spacing={1}>
                                    <span className='ratingSelector'>
                                        <p>OVERALL PRODUCT RATING *</p>
                                        <Rating name="simple-controlled" value={rating} precision={0.5} size='large'
                                            onChange={(event, newValue) => setRating(newValue)}
                                        />
                                    </span>

                                </Stack>
                            </div>
                            <div className='formBoxReview'>
                                <p>Share your thoughts with others.</p>
                                <form className='formReview' onSubmit={handleReview}>
                                    <input type="text" placeholder='Review title*' required />
                                    <textarea name="review" id="review" cols="65" rows="10" placeholder='Leave your review here*' className='textarea' required>
                                    </textarea>
                                    <p>Upload a photo of the product</p>
                                    <input type="file" onChange={(event) => setFiles(event.target.files)} />
                                    <button type='submit'>Submit Review</button>
                                </form>
                            </div>


                        </div>
                    </Box>
                </Modal>

            </span>

            <div className='ratingBox'>
                <span className='ratingText'>
                    <p>4.5 stars</p>
                    <p>5 Reviews</p>
                </span>
                <Stack spacing={1}>
                    <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} size='large' readOnly />
                </Stack>
            </div>

            {/* Aca empieza el mapeo de cada review */}
            <div className='everyReview'>
                <div className='imgReview'>
                    <p>Imagen cargada por el usuario del producto</p>
                </div>
                <div className='textReview'>
                    <span className='ratingDateReview'>
                        <Stack spacing={1}>
                            <Rating name="half-rating-read" defaultValue={5} precision={0.5} readOnly />
                        </Stack>
                        <p>Fecha review</p>
                    </span>

                    <h2 className='titleReview'>Title review</h2>
                    <p className='descriptionReview'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci consectetur dolores molestias cum necessitatibus dolorem tempore aut iste ut doloremque labore quasi sequi dolore ratione veniam, temporibus nemo iure reiciendis?</p>
                </div>

            </div>
            {/* hasta aca el mapeo */}
        <button onClick={handleOpen}>Write a review</button>
        </div>
    )
}
