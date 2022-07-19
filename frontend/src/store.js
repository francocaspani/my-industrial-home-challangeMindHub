import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import mainReducer from './redux/reducers/mainReducer'

const store = configureStore ({
    reducer: mainReducer,
    middleware: [thunk]
})

export default store