import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../reducers/productSlice";
import filtersSlice from "../reducers/filtersSlice";

const store = configureStore({
    reducer: {
        productList: productSlice.reducer,
        filters: filtersSlice.reducer
    }
})

export default store