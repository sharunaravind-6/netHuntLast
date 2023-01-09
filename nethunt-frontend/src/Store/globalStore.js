import { configureStore } from "@reduxjs/toolkit"
import { globalReducer } from "./globalStoreSlice"

export default configureStore({
    reducer:{
        global:globalReducer  
    }
})