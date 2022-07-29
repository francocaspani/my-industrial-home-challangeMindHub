import axios from "axios";
import { urlBackend } from "../../App";


const reviewActions = {
    addReview: (review, token) => {
        return async (dispatch, getState) => {
                const res = await axios.post(`${urlBackend}/product/review`,  review , {
                    headers: { 'Authorization': 'Bearer ' + token }
                })
                return res
            }
    },
    modifyComment: (review) => {
        const token = localStorage.getItem('token') 
        return async (dispatch, getState) => {
            const res = await axios.put(`${urlBackend}/product/review`, { review }, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            return res
        }
    },
    deleteComment: (reviewId) => {
        const token = localStorage.getItem('token') 
        return async (dispatch, getState) => {
            const res = await axios.post(`${urlBackend}/review/${reviewId}`, {}, {
                headers: {'Authorization': `Bearer ${token}`}
            })
            return res
        }
        
    },
    

}

export default reviewActions