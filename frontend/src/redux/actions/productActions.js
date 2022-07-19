import axios from "axios";
import { urlBackend } from "../../App";

const productActions = {
    getProducts: () => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(`${urlBackend}/products`)
                dispatch({ type: 'getProducts', payload: res.data.response.products })
            } catch (error) {
                console.log(error)
            }
        }
    },
    filterProductsByName: (value) => {
        return (dispatch, getState) => {
            dispatch({ type: 'filterProductsByName', payload: value })
        }
    },
    getOneProduct: (id) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(`${urlBackend}/products/${id}`)
                dispatch({ type: 'getOneProduct', payload: res.data.response.product })
            } catch (error) {
                console.log(error)
            }
        }
    },
    getProductsByAmbient: (id) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(`${urlBackend}/productsByAmbient/${id}`)
                dispatch({ type: 'getProductsByAmbient', payload: res.data.response.products })
                return res
            } catch (error) {
                console.log(error)
            }
        }
    }
}

export default productActions