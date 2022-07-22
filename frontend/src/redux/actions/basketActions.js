import axios from 'axios'
import { urlBackend } from "../../App";

const basketActions = {

    getUserBasket: () => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            const answer = await axios.get(`${urlBackend}/basket`,{headers: {Authorization: "Bearer "+token}})
            dispatch({type:'getProductsBasket', payload:answer.data.response.basket})
            console.log(answer)
            return answer.data.response.basket
        }
    },

    getProduct: (id) => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            const answer = await axios.get(`${urlBackend}/basket/${id}`,{headers: {Authorization: "Bearer "+token}})
            dispatch({type:'getOne', payload:answer.data.response.basket})
            // console.log(answer.data.response.basket)
            return (answer.data.response.basket)
        }
    },

    addToBasket: (productId)=>{
        console.log(productId)
        const token = localStorage.getItem('token')
        return async(dispatch,getState)=>{
            const answer = await axios.post(`${urlBackend}/basket`,{productId},{headers: {Authorization: "Bearer "+token}})
            dispatch({type: 'message', payload:{view: true, message: answer.data.message, success: answer.data.success}})
            // console.log(answer.data.response)
            return answer.data.response
        }
    },

    deleteBasketProduct: (idProduct) => {
        const token = localStorage.getItem('token')
        return async(dispatch, getState) => {
            try {
                const answer = await axios.delete(`${urlBackend}/basket/${idProduct}`,{headers: {Authorization: "Bearer "+token}})
                dispatch({type: 'message', payload:{view: true, message: answer.data.message, success: answer.data.success}})
                console.log(answer)
                return answer.data.response
            }catch (err) {
                console.log(err)
            }
        }
    },

    modifyBasketProduct: (newAmount) => {
        //console.log(commentData)
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.put(`${urlBackend}/basket`,{...newAmount},
            {headers: {Authorization: "Bearer "+token}})
        dispatch({type: 'message', payload: {view: true, message: answer.data.message, success: answer.data.success}})
        console.log(answer.data.response)
        return answer.data.response
        }
    },

    // modifyState: (commentData) => {
    //     //console.log(commentData)
    //     const token = localStorage.getItem('token')
    //     return async (dispatch, getState) => {
    //         const answer = await axios.put(urlMrWines+`api/buyBasket`,{...commentData},
    //         {headers: {Authorization: "Bearer "+token}})
    //     dispatch({type: 'message', payload: {view: true, message: answer.data.message, success: answer.data.success}})
    //     console.log(answer.data.response)
    //     return answer.data.response
    //     }
    // }

}

export default basketActions