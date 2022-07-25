import axios from 'axios'
import { urlBackend } from "../../App";

const basketActions = {

    getUserBasket: () => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(`${urlBackend}/basket`, { headers: { Authorization: "Bearer " + token } })
                dispatch({ type: 'getProductsBasket', payload: res.data.response.basket })
                console.log(res)
                return res
            } catch (error) {
                console.log(error)
            }
        }
    },

    getProduct: (id) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.get(`${urlBackend}/basket/${id}`, { headers: { Authorization: "Bearer " + token } })
            dispatch({ type: 'getOne', payload: answer.data.response.basket })
            // console.log(answer.data.response.basket)
            return (answer.data.response.basket)
        }
    },

    addToBasket: (product) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.post(`${urlBackend}/basket`,  {product}, { headers: { Authorization: "Bearer " + token } })
            dispatch({ type: 'message', payload: { view: true, message: answer.data.message, success: answer.data.success } })
            // console.log(answer.data.response)
            return answer.data.response
        }
    },

    deleteBasketProduct: (idProduct) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            try {
                const answer = await axios.delete(`${urlBackend}/deletebasket/${idProduct}`, { headers: { Authorization: "Bearer " + token } })
                dispatch({ type: 'message', payload: { view: true, message: answer.data.message, success: answer.data.success } })
                console.log(answer)
                return answer.data.response
            } catch (err) {
                console.log(err)
            }
        }
    },

    modifyBasketProduct: (toModify) => {
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.put(`${urlBackend}/basket`, {toModify} ,
                { headers: { Authorization: "Bearer " + token } })
            dispatch({ type: 'message', payload: { view: true, message: answer.data.message, success: answer.data.success } })
            console.log(answer.data.response)
            return answer.data.response
        }
    },

    modifyState: (sku, buyState) => {
        console.log(sku)
        console.log(buyState)
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.put(`${urlBackend}/hola`,{sku, buyState},
            {headers: {Authorization: "Bearer "+token}})
            console.log(answer)
        dispatch({type: 'message', payload: {view: true, message: answer.data.message, success: answer.data.success}})
        console.log(answer.data.response)
        return answer.data.response
        }
    },

    modifyStock: (sku) =>{
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const answer = await axios.put(`${urlBackend}/modifyStock/${sku}`,{},
            {headers: {Authorization: "Bearer "+token}})
            console.log(answer)
        dispatch({type: 'message', payload: {view: true, message: answer.data.message, success: answer.data.success}})
        console.log(answer.data.response)
        return answer.data.response
        }
    }

}

export default basketActions