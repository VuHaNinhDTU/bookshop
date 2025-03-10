import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slides/counterslides'
import useReducer from './slides/userSlide'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        user: useReducer
    },
    devTools: true,
})