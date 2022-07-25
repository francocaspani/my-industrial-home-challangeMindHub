import axios from "axios";
import { urlBackend } from "../../App";

const productActions = {
    getProducts: () => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(`${urlBackend}/products`)
                dispatch({ type: 'getProducts', payload: res.data.response.products })
                return res
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
                return res
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
    },
    filterProductByRoom:(checkBoxSelected)=>{
        return (dispatch,getState) =>{
            dispatch({type:"filterProductByRoom", payload:checkBoxSelected})
        }
    },
    addProduct: (productData) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(`${urlBackend}/products`,  productData )
                dispatch({ type:'addProduct', payload:res.data.response.product })
                return res
            } catch (error) {
                console.log(error)
            }
        }
    },
    deleteComment: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.delete(`${urlBackend}/products/${id}`)
                dispatch({ type:'deleteComment', payload:res})
                {console.log(res)}
                return res
            }
    },
    modifyProduct: (id,productData) => {
        return async (dispatch, getState) => {
            const res = await axios.put(`${urlBackend}/products/${id}`,productData )
            dispatch({type: "modifyProduct", payload: res.data.response.product})
            return res
        }
    },
    getRating: (reviews) => {
        return (dispatch, getState) => {
            dispatch({type: 'getRating' , payload: reviews})
        }
    }
}

export default productActions