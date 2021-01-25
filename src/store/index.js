import {configureStore} from "@reduxjs/toolkit";
import {createLogger} from "redux-logger/src";
import rootReducer from './modules/index'



export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(createLogger())
})