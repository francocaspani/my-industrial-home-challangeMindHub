import axios from "axios";
import { urlBackend } from "../../App";

const ambientActions = {
    getAmbients: () => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(`${urlBackend}/ambients`)
                dispatch({ type: 'getAmbients', payload: res.data.response.ambients })
            } catch (error) {
                console.log(error)
            }
        }
    },
    filterAmbients: (value) => {
        return (dispatch, getState) => {
            dispatch({ type: 'filterAmbients', payload: value })
        }
    },
    getOneAmbient: (id) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(`${urlBackend}/ambients/${id}`)
                dispatch({ type: 'getOneAmbient', payload: res.data.response.ambient })
            } catch (error) {
                console.log(error)
            }

        }
    }
}

export default ambientActions