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
    likeAndDislike:(id)=>{
        // console.log(id)
        const token= localStorage.getItem("token")
        console.log(token);
        return async()=>{
            try{
                let res= await axios.put(`${urlBackend}/products/${id}`, {},
                {
                    headers:{
                        "Authorization":"Bearer "+ token
                    }
                })
                //console.log(res)
                return res

            } catch(error){
               // console.log(error)
            }
        }
    }
}

export default productActions