import axios from "axios";
import { urlBackend } from "../../App";

const usersActions = {
    signUpUser: (userData) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(`${urlBackend}/auth/signup`, { userData })
                dispatch({ type: 'signUpUser', payload: res.data })
                return res
            } catch (error) {
                console.log(error)
            }
        }
    },
    logInUser: (loggedUser) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post(`${urlBackend}/auth/login`, { loggedUser })
                dispatch({ type: 'logInUser', payload: res.data })
                console.log(res)
                if (res.data.success) {
                    localStorage.setItem('token', res.data.response.token)
                }
                return res
            } catch (error) {
                console.log(error);
            }
        }
    },
    logOutUser: () => {
        return async (dispatch, getState) => {
            localStorage.removeItem('token')
            dispatch({ type: 'logOutUser', payload: null })
        }
    },
    verifyToken: (token) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`${urlBackend}/auth/verifytoken`, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then(user => {
                    if (user.data.success) {
                        dispatch({ type: 'logInUser', payload: user.data })
                        return user
                    } else {
                        localStorage.removeItem('token')
                    }
                }).catch(error => {
                    if (error.response.status === 401)
                        dispatch({ type: 'logOutUser', payload: null }) 
                        localStorage.removeItem('token')
                    return {
                        data:{
                            success: false,
                            message: 'Please log in again'
                        }
                    }
                })

            return res
        }
    },
    handleFavourites: (idProduct, token) => {
        return async (dispatch, getState) => {
            const res = await axios.post(`${urlBackend}/favourite/${idProduct}`, { },{
            headers: { 'Authorization': 'Bearer ' + token }
        })
        return res
        }
    }
    
}

export default usersActions