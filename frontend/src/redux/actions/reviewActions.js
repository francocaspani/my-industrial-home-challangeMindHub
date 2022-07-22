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
    modifyComment: (comment, token) => {
        return async (dispatch, getState) => {
            const res = await axios.put(`${urlBackend}/itinerary/comment`, { comment }, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            return res
        }
    },
    deleteComment: (info, commentId, token) => {
        return async (dispatch, getState) => {
            const res = await axios.post(`${urlBackend}/itinerary/comment/${commentId}`, {info}, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            return res
        }
    },
    replyComment: (comment,commentId, token) => {
        return async (dispatch, getState) => {
            const res = await axios.put(`${urlBackend}/itinerary/comment/${commentId}`, {comment}, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
            return res
        }
    }

}

export default reviewActions