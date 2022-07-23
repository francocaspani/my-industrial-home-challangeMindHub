import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from "react-redux";
import reviewActions from '../redux/actions/reviewActions';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import { Typography } from '@mui/material';


export default function ModifyDeleteReview({ item, handleReload }) {
    const user = useSelector(store => store.usersReducer.userData)
    const [modify, setModify] = useState()
    const [modifyTitle, setModifyTitle] = useState()
    const [rating, setRating] = useState(item.rating) 

    const dispatch = useDispatch()
    

    const reviews = [{

    }]

    async function handleModify(event) {
        console.log(event)
        // eslint-disable-next-line
        const reviewMsj = {
            reviewId: event,
            review: modify,
            titleReview: modifyTitle,
            rating: rating
        }
        const res = await dispatch(reviewActions.modifyComment(reviewMsj))
        handleReload()
        
    }

    async function handleDelete(e) {
        await dispatch(reviewActions.deleteComment(item._id))
        handleReload()
    }



    return (
        <Box key={item._id} className='everyReview'>
            <Box className='imgReview'>
                <img height={100} src={item.img} alt='image' />
            </Box>

            <Box className='textReview'>
                <span className='ratingDateReview'>
                    {user && user.id == item.userId ?
                        <Stack spacing={1}>
                            <Rating   onChange={(event, newValue)=> setRating(newValue)} name="simple-controlled" value={item.rating} precision={0.5} />
                        </Stack>
                        :
                        <Stack spacing={1}>
                            <Rating name="half-rating-read" defaultValue={item.rating} precision={0.5} readOnly />
                        </Stack>

                    }

                    <Typography>Fecha review</Typography>
                </span>

                {console.log("++++++", user)}
                
                {user && user.id == item.userId ?
                    <Box className='comments'>
                        <span suppressContentEditableWarning={true} contentEditable className='titleReview' onInput={(event) => setModifyTitle(event.currentTarget.textContent)}><b className='titlereview'>{item.titleReview}</b></span>
                        <span suppressContentEditableWarning={true} contentEditable className='descriptionReview' onInput={(event) => setModify(event.currentTarget.textContent)}>{item.review}</span>
                        <Box className='comments2'>


                            <Button onClick={() => handleModify(item._id)} sx={{ margin: '.2rem' }} variant="outlined" color="success">
                                <EditIcon />
                            </Button>
                            <Button onClick={handleDelete} id={item._id} sx={{ margin: '.2rem' }} variant="outlined" color="error">
                                <DeleteIcon />
                            </Button>
                        </Box>


                    </Box>
                    : <Box className='comments'><span  className='titleReview' onInput={(event) => setModify(event.currentTarget.textContent)}><b className='titlereview'>{item.titleReview}</b></span>
                        <span  className='descriptionReview' onInput={(event) => setModify(event.currentTarget.textContent)}>{item.review}</span> </Box>}
            </Box>


        </Box>




    )

}