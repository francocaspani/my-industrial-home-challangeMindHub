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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send'

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

export default function RatingReview({ product, handleReload }) {
    const user = useSelector(store => store.usersReducer.userData)
    const [files, setFiles] = useState()
    const [rating, setRating] = useState(0)
    const dispatch = useDispatch()
    const [reload, setReload] = useState(false)
    const token = localStorage.getItem('token')

    const [open, setOpen] = React.useState(false); // variables para el modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // console.log(rating)

    const id = '62d6cf246b9ba7fd1f6c1478'

    const handleReview = async (event) => {
        // console.log(files)
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
        const res = await dispatch(reviewActions.addReview(formData, token))
        console.log(res)
        handleClose()
        handleReload()

    }

    const reviews = [{

    }]

    async function handleModify(comment, token) {
        // eslint-disable-next-line
        const res = await dispatch(reviewActions.modifyComment(comment, token))
        setReload(!reload)
        console.log(res)
    }


    async function handleDelete(info, commentId, token) {
        await dispatch(reviewActions.deleteComment(info, commentId, token))
            .then(product.getOneProduct)
        // console.log(id)
    }



    const card = useSelector(store => store.productsReducer.product)
    console.log(card)


    return (
        <div className='reviewContainer'>
            <span className='titleReviewContainer'>
                <Typography>Ratings and Reviews</Typography>
                <span onClick={handleOpen}><Typography>Write a review</Typography></span>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style} >
                        <div>
                            <h1>White Your Review</h1>
                            <b><h3>{card.name}</h3></b>
                            <div className='ratingModal'>
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
                            </div>
                            <div className='formBoxReview'>
                                <Typography>Share your thoughts with others.</Typography>
                                <form className='formReview' onSubmit={handleReview}>
                                    <input type="text" placeholder='Review title*' required />
                                    <textarea name="review" id="review" cols="65" rows="10" placeholder='Leave your review here*' className='textarea' required>
                                    </textarea>
                                    <Typography>Upload a photo of the product</Typography>
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

            {/* Aca empieza el mapeo de cada review */}´

            {/* {console.log("+´+´+´+´+ ", reviews)} */}

            {product?.reviews.map((item, index) => {
                return (


                    <div key={index} className='everyReview'>
                        <div className='imgReview'>
                            <img height={100} src={item.img} alt='image' />
                        </div>
                        <div className='textReview'>
                            <span className='ratingDateReview'>
                                <Stack spacing={1}>
                                    <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly />
                                </Stack>
                                <p>Fecha review</p>
                            </span>

                            {/* {user && user.id === item.userId._id ? */}
                            <div className='comments'>
                                <h2 suppressContentEditableWarning={true} contentEditable className='titleReview'>{item.titleReview}</h2>
                                <p suppressContentEditableWarning={true} contentEditable className='descriptionReview'>{item.review}</p>
                                <div className='comments2'>


                                    <Button onClick={() => handleModify(item._id)} sx={{ margin: '.2rem' }} variant="outlined" color="success">
                                        <EditIcon />
                                    </Button>
                                    <Button onClick={() => handleDelete(item._id)} sx={{ margin: '.2rem' }} variant="outlined" color="error">
                                        <DeleteIcon />
                                    </Button>
                                </div>


                            </div>
                            {/* : <div> </div>} */}
                        </div>


                    </div>
                )
            })}

            {/* hasta aca el mapeo */}

            <Button sx={{ marginLeft: '2rem',backgroundColor: '#4d4d4d' }} onClick={handleOpen} variant="contained" endIcon={<SendIcon />}>Write a review</Button>
        </div>
    )
}